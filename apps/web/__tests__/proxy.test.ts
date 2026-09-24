/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";
import { getBackendAddress } from "@/app/actions";
import { auth } from "../auth";
import { proxy } from "../proxy";

jest.mock("@/app/actions", () => ({
    getBackendAddress: jest.fn(),
}));
jest.mock("../auth", () => ({
    auth: {
        api: {
            getSession: jest.fn(),
        },
    },
}));

describe("proxy inbound-email bypass", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("does not derive a tenant from the webhook host", async () => {
        const response = await proxy(
            new NextRequest(
                "https://courselit.example/api/inbound-email/postmark",
            ),
        );

        expect(getBackendAddress).not.toHaveBeenCalled();
        expect(response.headers.get("x-middleware-next")).toBe("1");
    });
});

describe("unauthenticated page access", () => {
    const getSession = auth.api.getSession as unknown as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
        (getBackendAddress as jest.Mock).mockResolvedValue(
            "https://school.example",
        );
        getSession.mockResolvedValue(null);
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => ({
                domain: "school.example",
                domainId: "domain1",
                domainEmail: "owner@school.example",
            }),
        }) as unknown as typeof fetch;
    });

    it("sends the index page to login", async () => {
        const response = await proxy(
            new NextRequest("https://school.example/"),
        );

        expect(response.status).toBe(307);
        expect(response.headers.get("location")).toBe(
            "https://school.example/login",
        );
        expect(getSession).not.toHaveBeenCalled();
    });

    it("lets verify-domain run without calling itself", async () => {
        const response = await proxy(
            new NextRequest("https://school.example/verify-domain"),
        );

        expect(global.fetch).not.toHaveBeenCalled();
        expect(response.headers.get("x-middleware-next")).toBe("1");
    });

    it("allows the login page without a session", async () => {
        const response = await proxy(
            new NextRequest("https://school.example/login"),
        );

        expect(response.headers.get("x-middleware-next")).toBe("1");
        expect(getSession).not.toHaveBeenCalled();
    });

    it("redirects other pages to login when signed out", async () => {
        const response = await proxy(
            new NextRequest("https://school.example/products?tab=courses"),
        );

        expect(response.status).toBe(307);
        expect(response.headers.get("location")).toBe(
            "https://school.example/login?redirect=%2Fproducts%3Ftab%3Dcourses",
        );
    });

    it("allows other pages when signed in", async () => {
        getSession.mockResolvedValue({ user: { id: "user1" } });

        const response = await proxy(
            new NextRequest("https://school.example/dashboard/overview"),
        );

        expect(response.headers.get("x-middleware-next")).toBe("1");
    });

    it("does not redirect api routes", async () => {
        const response = await proxy(
            new NextRequest(
                "https://school.example/api/auth/sign-in/email-otp",
            ),
        );

        expect(response.headers.get("x-middleware-next")).toBe("1");
        expect(getSession).not.toHaveBeenCalled();
    });
});
