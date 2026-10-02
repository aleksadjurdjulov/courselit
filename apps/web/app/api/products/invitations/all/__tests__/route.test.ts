/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";
import Domain from "@models/Domain";
import ApiKey from "@models/ApiKey";
import User from "@models/User";
import { inviteCustomerToAllPublishedProducts } from "@/graphql/users/logic";

jest.mock("@models/Domain");
jest.mock("@models/ApiKey");
jest.mock("@models/User");
jest.mock("@/graphql/users/logic", () => ({
    inviteCustomerToAllPublishedProducts: jest.fn(),
}));

const domain = {
    _id: "domain-id",
    name: "school",
};

const request = (body?: Record<string, unknown>) =>
    ({
        url: "https://school.test/api/products/invitations/all",
        json: jest.fn().mockResolvedValue(body ?? {}),
        headers: {
            get: jest.fn((name: string) => {
                if (name === "domain") return "school";
                if (name === "x-api-key") return "api-key";
                return null;
            }),
        },
    }) as unknown as NextRequest;

describe("/api/products/invitations/all", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (Domain.findOne as jest.Mock).mockResolvedValue(domain);
        (ApiKey.findOne as jest.Mock).mockResolvedValue({ key: "api-key" });
        (User.findOne as jest.Mock).mockResolvedValue({
            userId: "owner",
            email: "owner@example.com",
            permissions: ["user:manage"],
        });
    });

    it("invites a customer to all published products", async () => {
        (inviteCustomerToAllPublishedProducts as jest.Mock).mockResolvedValue({
            user: {
                userId: "user-1",
                email: "student@example.com",
                name: "Student",
                avatar: { mediaId: "avatar-1" },
            },
            products: [
                {
                    productId: "course-1",
                    membership: {
                        membershipId: "mem-1",
                        userId: "user-1",
                        status: "active",
                        subscriptionMethod: "internal",
                        createdAt: new Date("2026-01-01T00:00:00.000Z"),
                        updatedAt: new Date("2026-01-02T00:00:00.000Z"),
                    },
                },
            ],
        });

        const { POST } = await import("../route");
        const response = await POST(
            request({
                email: "student@example.com",
                tags: ["ai"],
            }),
        );

        expect(response.status).toBe(201);
        expect(inviteCustomerToAllPublishedProducts).toHaveBeenCalledWith(
            "student@example.com",
            ["ai"],
            expect.objectContaining({ subdomain: domain }),
        );
        await expect(response.json()).resolves.toMatchObject({
            userId: "user-1",
            email: "student@example.com",
            products: [{ productId: "course-1", membershipStatus: "active" }],
        });
    });

    it("rejects unsupported invitation fields", async () => {
        const { POST } = await import("../route");
        const response = await POST(
            request({
                email: "student@example.com",
                productIds: ["course-1"],
            }),
        );

        expect(response.status).toBe(400);
        expect(inviteCustomerToAllPublishedProducts).not.toHaveBeenCalled();
        await expect(response.json()).resolves.toEqual({
            error: {
                code: "bad_request",
                message: "Unsupported customer invitation field: productIds",
            },
        });
    });

    it("requires email", async () => {
        const { POST } = await import("../route");
        const response = await POST(request({ tags: ["ai"] }));

        expect(response.status).toBe(400);
        expect(inviteCustomerToAllPublishedProducts).not.toHaveBeenCalled();
    });
});
