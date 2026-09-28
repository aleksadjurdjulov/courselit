/**
 * @jest-environment node
 */

jest.mock("@/services/queue", () => ({
    addMailJob: jest.fn(),
}));

import { ObjectId } from "mongodb";
import AccountNetworkModel from "@models/AccountNetwork";
import AccountSignInModel from "@models/AccountSignIn";
import DomainModel from "@models/Domain";
import UserModel from "@models/User";
import { addMailJob } from "@/services/queue";
import { onAccountSessionCreated } from "../on-session-created";

const addMailJobMock = addMailJob as jest.Mock;

describe("onAccountSessionCreated", () => {
    const originalCap = process.env.ACCOUNT_SESSION_CAP;
    const originalSecret = process.env.AUTH_SECRET;
    const originalEnabled = process.env.ACCOUNT_SHARING_ENABLED;
    let domainId: ObjectId;

    beforeEach(async () => {
        process.env.ACCOUNT_SESSION_CAP = "2";
        process.env.ACCOUNT_SHARING_ENABLED = "true";
        process.env.AUTH_SECRET = "test-auth-secret";
        addMailJobMock.mockReset();
        addMailJobMock.mockResolvedValue(undefined);

        const domain = await DomainModel.create({
            name: `account-sharing-${new ObjectId().toString()}`,
            email: `owner-${new ObjectId().toString()}@example.com`,
        });
        domainId = domain._id;
    });

    afterEach(async () => {
        process.env.ACCOUNT_SESSION_CAP = originalCap;
        process.env.ACCOUNT_SHARING_ENABLED = originalEnabled;
        process.env.AUTH_SECRET = originalSecret;
        await Promise.all([
            UserModel.deleteMany({ domain: domainId }),
            AccountNetworkModel.deleteMany({ domain: domainId }),
            AccountSignInModel.deleteMany({ domain: domainId }),
            DomainModel.deleteMany({ _id: domainId }),
        ]);
    });

    it("does nothing when account sharing is disabled", async () => {
        process.env.ACCOUNT_SHARING_ENABLED = "false";
        const deleted: string[] = [];

        await onAccountSessionCreated({
            session: {
                token: "current",
                userId: "user-1",
            },
            headers: null,
            listSessions: async () => {
                throw new Error("should not list sessions");
            },
            deleteSession: async (token) => {
                deleted.push(token);
            },
        });

        expect(deleted).toEqual([]);
        expect(addMailJobMock).not.toHaveBeenCalled();
    });

    it("drops sessions above the cap and emails on a later new device", async () => {
        const user = await UserModel.create({
            domain: domainId,
            userId: `learner-${domainId.toString()}`,
            email: `learner-${domainId.toString()}@example.com`,
            active: true,
            permissions: [],
            purchases: [],
            unsubscribeToken: `unsub-${domainId.toString()}`,
        });
        const headers = new Headers({
            host: "school.example",
            "x-forwarded-proto": "https",
            domaintitle: "School",
            hidecourselitbranding: "true",
        });
        const deleted: string[] = [];
        const now = Date.now();
        const createdAt = new Date(now);
        const expiresAt = new Date(now + 86_400_000);

        await onAccountSessionCreated({
            session: {
                id: "session-new",
                token: "current",
                userId: user._id.toString(),
                createdAt,
                expiresAt,
                ipAddress: "203.0.113.10",
                userAgent: "Browser One",
                deviceId: "device-one",
                networkKey: "v4:203.0.113",
                country: "RS",
            },
            headers,
            listSessions: async () => [
                {
                    token: "oldest",
                    createdAt: new Date(now - 3_000),
                    expiresAt,
                },
                {
                    token: "middle",
                    createdAt: new Date(now - 2_000),
                    expiresAt,
                },
                {
                    token: "current",
                    createdAt,
                    expiresAt,
                },
            ],
            deleteSession: async (token) => {
                deleted.push(token);
            },
        });

        expect(deleted).toEqual(["oldest"]);
        expect(addMailJobMock).not.toHaveBeenCalled();
        expect(
            await AccountNetworkModel.countDocuments({
                authUserId: user._id.toString(),
                networkKey: "v4:203.0.113",
            }),
        ).toBe(1);

        await onAccountSessionCreated({
            session: {
                id: "session-second",
                token: "second",
                userId: user._id.toString(),
                createdAt: new Date(now + 1_000),
                expiresAt,
                ipAddress: "198.51.100.20",
                userAgent: "Browser Two",
                deviceId: "device-two",
                networkKey: "v4:198.51.100",
                country: "US",
            },
            headers,
            listSessions: async () => [
                {
                    token: "second",
                    createdAt: new Date(now + 1_000),
                    expiresAt,
                },
            ],
            deleteSession: async () => undefined,
        });

        expect(addMailJobMock).toHaveBeenCalledTimes(1);
        const mail = addMailJobMock.mock.calls[0][0];
        expect(mail.to).toEqual([user.email]);
        expect(mail.subject).toContain("School");
        expect(mail.body).toContain("/api/account-session/revoke?token=");
        expect(mail.body).toContain("Browser Two");
    });
});
