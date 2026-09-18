/**
 * @jest-environment node
 */

import { getSiteUrl } from "../../../../packages/common-logic/src/utils/get-site-url";

describe("getSiteUrl", () => {
    const originalEnv = { ...process.env };

    afterEach(() => {
        process.env = { ...originalEnv };
    });

    it("prefers customDomain over DOMAIN", () => {
        process.env.DOMAIN = "courselit.app";
        process.env.PROTOCOL = "https";

        expect(
            getSiteUrl({
                name: "school",
                customDomain: "learn.example.com",
            }),
        ).toBe("https://learn.example.com");
    });

    it("uses DOMAIN for single-tenant deployments", () => {
        process.env.DOMAIN = "myschool.com";
        process.env.PROTOCOL = "https";
        delete process.env.MULTITENANT;

        expect(
            getSiteUrl({
                name: "main",
                customDomain: "",
            }),
        ).toBe("https://myschool.com");
    });

    it("uses subdomain.DOMAIN when MULTITENANT=true", () => {
        process.env.DOMAIN = "courselit.app";
        process.env.PROTOCOL = "https";
        process.env.MULTITENANT = "true";

        expect(
            getSiteUrl({
                name: "school",
                customDomain: "",
            }),
        ).toBe("https://school.courselit.app");
    });

    it("falls back to the request address when DOMAIN is unset", () => {
        delete process.env.DOMAIN;
        delete process.env.MULTITENANT;

        expect(
            getSiteUrl(
                {
                    name: "main",
                    customDomain: "",
                },
                "https://deployed.example.com/",
            ),
        ).toBe("https://deployed.example.com");
    });
});
