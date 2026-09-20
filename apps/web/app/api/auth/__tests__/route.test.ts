/**
 * @jest-environment node
 */

const mockGetAuth = jest.fn(() => ({}));
const mockHandlerGet = jest.fn();
const mockHandlerPost = jest.fn();

jest.mock("@/app/actions", () => ({
    getBackendAddress: jest.fn(),
}));

jest.mock(
    "@/async-local-storage",
    () => ({
        als: {
            run: jest.fn((_: unknown, fn: () => unknown) => fn()),
        },
    }),
    { virtual: true },
);

jest.mock("@/auth", () => ({
    auth: {},
    getAuth: mockGetAuth,
}));

jest.mock("@/lib/invite-only", () => ({
    findUserByEmailForDomain: jest.fn().mockResolvedValue(null),
    getDomainInviteOnlyStatus: jest.fn().mockResolvedValue(false),
}));

jest.mock("better-auth/next-js", () => ({
    toNextJsHandler: () => ({
        GET: mockHandlerGet,
        POST: mockHandlerPost,
    }),
}));

import { getBackendAddress } from "@/app/actions";
import { getAuth } from "@/auth";
import {
    findUserByEmailForDomain,
    getDomainInviteOnlyStatus,
} from "@/lib/invite-only";
import { POST, rewriteAuthRequestOrigin } from "../[...all]/route";

const findUserByEmailForDomainMock = findUserByEmailForDomain as jest.Mock;
const getDomainInviteOnlyStatusMock = getDomainInviteOnlyStatus as jest.Mock;

describe("Auth Route Origin Rewrite", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        getDomainInviteOnlyStatusMock.mockResolvedValue(false);
        findUserByEmailForDomainMock.mockResolvedValue(null);
    });

    it("rewrites auth requests to the forwarded school origin", async () => {
        (getBackendAddress as jest.Mock).mockResolvedValue(
            "https://domain1.clqa.site",
        );

        const req = new Request(
            "http://0.0.0.0:3000/api/auth/sso/callback/google?foo=bar",
            {
                headers: {
                    host: "0.0.0.0:3000",
                    "x-forwarded-host": "domain1.clqa.site",
                    "x-forwarded-proto": "https",
                    domain: "domain1",
                    domainId: "domain-id-1",
                },
            },
        );

        const rewritten = await rewriteAuthRequestOrigin(req);

        expect(rewritten).not.toBe(req);
        expect(rewritten.url).toBe(
            "https://domain1.clqa.site/api/auth/sso/callback/google?foo=bar",
        );
        expect(rewritten.headers.get("domain")).toBe("domain1");
        expect(rewritten.headers.get("domainId")).toBe("domain-id-1");
    });

    it("returns the original request when the origin already matches", async () => {
        (getBackendAddress as jest.Mock).mockResolvedValue(
            "https://domain1.clqa.site",
        );

        const req = new Request(
            "https://domain1.clqa.site/api/auth/sso/callback/google",
        );

        const rewritten = await rewriteAuthRequestOrigin(req);

        expect(rewritten).toBe(req);
    });

    it("preserves method, body, and headers for post requests", async () => {
        (getBackendAddress as jest.Mock).mockResolvedValue(
            "https://domain1.clqa.site",
        );

        const req = new Request("http://0.0.0.0:3000/api/auth/sign-in/sso", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                domain: "domain1",
                domainId: "domain-id-1",
            },
            body: JSON.stringify({
                providerId: "google",
                callbackURL: "/checkout?id=123",
            }),
        });

        const rewritten = await rewriteAuthRequestOrigin(req);

        expect(rewritten.method).toBe("POST");
        expect(rewritten.url).toBe(
            "https://domain1.clqa.site/api/auth/sign-in/sso",
        );
        expect(rewritten.headers.get("content-type")).toBe("application/json");
        expect(rewritten.headers.get("domainId")).toBe("domain-id-1");
        await expect(rewritten.text()).resolves.toBe(
            JSON.stringify({
                providerId: "google",
                callbackURL: "/checkout?id=123",
            }),
        );
    });

    it("creates request-scoped auth handlers per rewritten origin", async () => {
        (getBackendAddress as jest.Mock).mockResolvedValue(
            "https://domain1.clqa.site",
        );
        mockHandlerPost.mockResolvedValue(new Response(null, { status: 200 }));

        const req = new Request("https://0.0.0.0:3000/api/auth/sign-in/sso", {
            method: "POST",
            headers: {
                host: "domain1.clqa.site",
                domain: "domain1",
                domainId: "domain-id-1",
            },
            body: JSON.stringify({
                providerId: "google",
                callbackURL: "/dashboard",
            }),
        });

        await POST(req);

        expect(getAuth).toHaveBeenCalledWith("https://domain1.clqa.site");
        expect(mockHandlerPost).toHaveBeenCalledTimes(1);
        const rewrittenRequest = mockHandlerPost.mock.calls[0][0] as Request;
        expect(rewrittenRequest.url).toBe(
            "https://domain1.clqa.site/api/auth/sign-in/sso",
        );
    });

    it("fakes OTP send success for unknown emails when invite-only is enabled", async () => {
        (getBackendAddress as jest.Mock).mockResolvedValue(
            "https://domain1.clqa.site",
        );
        getDomainInviteOnlyStatusMock.mockResolvedValue(true);
        findUserByEmailForDomainMock.mockResolvedValue(null);

        const req = new Request(
            "https://domain1.clqa.site/api/auth/email-otp/send-verification-otp",
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    domain: "domain1",
                    domainId: "507f1f77bcf86cd799439011",
                    inviteonly: "true",
                },
                body: JSON.stringify({
                    email: "new@example.com",
                    type: "sign-in",
                }),
            },
        );

        const response = await POST(req);
        const payload = await response.json();

        expect(payload).toEqual({ success: true });
        expect(mockHandlerPost).not.toHaveBeenCalled();
    });

    it("rejects OTP sign-in for unknown emails when invite-only is enabled", async () => {
        (getBackendAddress as jest.Mock).mockResolvedValue(
            "https://domain1.clqa.site",
        );
        getDomainInviteOnlyStatusMock.mockResolvedValue(true);
        findUserByEmailForDomainMock.mockResolvedValue(null);

        const req = new Request(
            "https://domain1.clqa.site/api/auth/sign-in/email-otp",
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    domain: "domain1",
                    domainId: "507f1f77bcf86cd799439011",
                    inviteonly: "true",
                },
                body: JSON.stringify({
                    email: "new@example.com",
                    otp: "123456",
                }),
            },
        );

        const response = await POST(req);
        const payload = await response.json();

        expect(response.status).toBe(400);
        expect(payload.code).toBe("INVALID_OTP");
        expect(mockHandlerPost).not.toHaveBeenCalled();
    });

    it("allows OTP sign-in for existing users when invite-only is enabled", async () => {
        (getBackendAddress as jest.Mock).mockResolvedValue(
            "https://domain1.clqa.site",
        );
        getDomainInviteOnlyStatusMock.mockResolvedValue(true);
        findUserByEmailForDomainMock.mockResolvedValue({
            email: "member@example.com",
        });
        mockHandlerPost.mockResolvedValue(new Response(null, { status: 200 }));

        const req = new Request(
            "https://domain1.clqa.site/api/auth/sign-in/email-otp",
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    domain: "domain1",
                    domainId: "507f1f77bcf86cd799439011",
                    inviteonly: "true",
                },
                body: JSON.stringify({
                    email: "member@example.com",
                    otp: "123456",
                }),
            },
        );

        await POST(req);

        expect(mockHandlerPost).toHaveBeenCalledTimes(1);
    });
});
