/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";
import Domain from "@models/Domain";
import User from "@models/User";
import { auth } from "@/auth";
import * as medialitService from "@/services/medialit";
import { UIConstants } from "@courselit/common-models";

jest.mock("@models/Domain");
jest.mock("@models/User");
jest.mock("@models/Course");
jest.mock("@models/Lesson");
jest.mock("@models/Page");
jest.mock("@models/CertificateTemplate");
jest.mock("@/auth", () => ({
    auth: {
        api: {
            getSession: jest.fn(),
        },
    },
}));
jest.mock("@/services/medialit", () => ({
    deleteMedia: jest.fn(),
}));

const domain = {
    _id: "domain-id",
    name: "school",
};

function request() {
    return {
        headers: {
            get: jest.fn((name: string) =>
                name === "domain" ? "school" : null,
            ),
        },
    } as unknown as NextRequest;
}

describe("DELETE /api/media/[mediaId]/[type]", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (Domain.findOne as jest.Mock).mockResolvedValue(domain);
        (auth.api.getSession as unknown as jest.Mock).mockResolvedValue({
            user: { email: "admin@example.com" },
        });
        (User.findOne as jest.Mock).mockResolvedValue({
            userId: "admin",
            email: "admin@example.com",
            permissions: [
                UIConstants.permissions.manageMedia,
                UIConstants.permissions.manageCommunity,
            ],
        });
        (medialitService.deleteMedia as jest.Mock).mockResolvedValue(true);
    });

    it("returns the untranslated success token after deleting community media", async () => {
        const { DELETE } = await import("../route");
        const response = await DELETE(request(), {
            params: Promise.resolve({
                mediaId: "media-1",
                type: "community",
            }),
        });

        expect(response.status).toBe(200);
        expect(medialitService.deleteMedia).toHaveBeenCalledWith("media-1");
        await expect(response.json()).resolves.toEqual({ message: "success" });
    });
});
