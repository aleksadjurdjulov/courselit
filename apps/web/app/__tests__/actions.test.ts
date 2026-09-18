/**
 * @jest-environment node
 */

import { getBackendAddress } from "@/app/actions";

describe("getBackendAddress", () => {
    const originalDomain = process.env.DOMAIN;

    afterEach(() => {
        process.env.DOMAIN = originalDomain;
    });

    it("prefers x-forwarded-host over host", async () => {
        const headers = new Headers({
            host: "0.0.0.0:80",
            "x-forwarded-host": "school.example.com",
            "x-forwarded-proto": "https",
        });

        await expect(getBackendAddress(headers)).resolves.toBe(
            "https://school.example.com",
        );
    });

    it("replaces bind addresses with DOMAIN when set", async () => {
        process.env.DOMAIN = "myschool.com";
        const headers = new Headers({
            host: "0.0.0.0:80",
            "x-forwarded-proto": "https",
        });

        await expect(getBackendAddress(headers)).resolves.toBe(
            "https://myschool.com",
        );
    });

    it("defaults protocol to http when x-forwarded-proto is missing", async () => {
        const headers = new Headers({
            host: "localhost:3000",
        });

        await expect(getBackendAddress(headers)).resolves.toBe(
            "http://localhost:3000",
        );
    });
});
