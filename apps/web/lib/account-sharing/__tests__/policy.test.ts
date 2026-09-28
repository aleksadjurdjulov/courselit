/**
 * @jest-environment node
 */

import {
    ACCOUNT_SHARING_NEW_NETWORK,
    ACCOUNT_SHARING_SESSIONS_REVOKED,
    ACCOUNT_SHARING_SIGNED_IN_ELSEWHERE,
} from "@ui-config/strings";
import {
    getAccountHeartbeatIntervalSeconds,
    getAccountSessionCap,
    getHeartbeatActiveWindowMs,
    isAccountSharingEnabled,
} from "../config";
import { accountSharingLoginNotice } from "../login-notice";
import {
    areConcurrentLocationsFarApart,
    decideHeartbeat,
    getNetworkKey,
    readCountryCode,
    selectSessionTokensToRevoke,
} from "../policy";
import { createRevokeToken, readRevokeToken } from "../revoke-token";

describe("account sharing config", () => {
    const originalCap = process.env.ACCOUNT_SESSION_CAP;
    const originalInterval = process.env.ACCOUNT_HEARTBEAT_INTERVAL_SECONDS;
    const originalEnabled = process.env.ACCOUNT_SHARING_ENABLED;

    afterEach(() => {
        process.env.ACCOUNT_SESSION_CAP = originalCap;
        process.env.ACCOUNT_HEARTBEAT_INTERVAL_SECONDS = originalInterval;
        process.env.ACCOUNT_SHARING_ENABLED = originalEnabled;
    });

    it("defaults the session cap to 2 and the heartbeat to 60 seconds", () => {
        delete process.env.ACCOUNT_SESSION_CAP;
        delete process.env.ACCOUNT_HEARTBEAT_INTERVAL_SECONDS;

        expect(getAccountSessionCap()).toBe(2);
        expect(getAccountHeartbeatIntervalSeconds()).toBe(60);
        expect(getHeartbeatActiveWindowMs()).toBe(120_000);
    });

    it("reads positive environment values and clamps a short heartbeat", () => {
        process.env.ACCOUNT_SESSION_CAP = "4";
        process.env.ACCOUNT_HEARTBEAT_INTERVAL_SECONDS = "5";

        expect(getAccountSessionCap()).toBe(4);
        expect(getAccountHeartbeatIntervalSeconds()).toBe(15);
    });

    it("keeps account sharing on unless the environment turns it off", () => {
        delete process.env.ACCOUNT_SHARING_ENABLED;
        expect(isAccountSharingEnabled()).toBe(true);

        process.env.ACCOUNT_SHARING_ENABLED = "false";
        expect(isAccountSharingEnabled()).toBe(false);

        process.env.ACCOUNT_SHARING_ENABLED = "on";
        expect(isAccountSharingEnabled()).toBe(true);

        process.env.ACCOUNT_SHARING_ENABLED = "maybe";
        expect(isAccountSharingEnabled()).toBe(true);
    });

    it("ignores invalid environment values", () => {
        process.env.ACCOUNT_SESSION_CAP = "0";
        process.env.ACCOUNT_HEARTBEAT_INTERVAL_SECONDS = "soon";

        expect(getAccountSessionCap()).toBe(2);
        expect(getAccountHeartbeatIntervalSeconds()).toBe(60);
    });
});

describe("account sharing policy", () => {
    it("groups an IPv4 address by /24 and an IPv6 address by /64", () => {
        expect(getNetworkKey("203.0.113.10")).toBe("v4:203.0.113");
        expect(getNetworkKey("::ffff:203.0.113.10")).toBe("v4:203.0.113");
        expect(getNetworkKey("2001:db8:85a3::8a2e:370:7334")).toBe(
            "v6:2001:0db8:85a3:0000",
        );
        expect(getNetworkKey("127.0.0.1")).toBeNull();
    });

    it("reads a country only from a proxy country header", () => {
        const headers = new Headers({
            "cf-ipcountry": "rs",
            "x-country": "us",
        });

        expect(readCountryCode(headers)).toBe("RS");
    });

    it("treats different countries as far apart and the same network as close", () => {
        expect(
            areConcurrentLocationsFarApart(
                { networkKey: "v4:1.2.3", country: "RS" },
                { networkKey: "v4:9.9.9", country: "US" },
            ),
        ).toBe(true);
        expect(
            areConcurrentLocationsFarApart(
                { networkKey: "v4:1.2.3", country: "RS" },
                { networkKey: "v4:1.2.3", country: "US" },
            ),
        ).toBe(false);
        expect(
            areConcurrentLocationsFarApart(
                { networkKey: "v4:1.2.3", country: null },
                { networkKey: "v4:9.9.9", country: null },
            ),
        ).toBe(false);
    });

    it("keeps the newest sessions up to the cap, including the session just created", () => {
        const now = Date.now();
        const tokens = selectSessionTokensToRevoke(
            [
                { token: "oldest", createdAt: new Date(now - 3000) },
                { token: "middle", createdAt: new Date(now - 2000) },
                { token: "current", createdAt: new Date(now) },
            ],
            2,
            "current",
        );

        expect(tokens).toEqual(["oldest"]);
    });

    it("asks for a fresh code when the request comes from an unknown network", () => {
        const decision = decideHeartbeat({
            current: {
                token: "current",
                createdAt: new Date("2026-01-01T00:00:00Z"),
                lastHeartbeatAt: null,
                networkKey: "v4:10.0.0",
                country: "RS",
            },
            others: [],
            requestNetworkKey: "v4:10.1.0",
            requestCountry: "RS",
            knownNetworkKeys: ["v4:10.0.0"],
            activeWindowMs: 120_000,
            now: Date.parse("2026-01-01T00:02:00Z"),
        });

        expect(decision).toEqual({ type: "reauth" });
    });

    it("ends the older live session when two players are open in different countries", () => {
        const now = Date.parse("2026-01-01T00:05:00Z");
        const decision = decideHeartbeat({
            current: {
                token: "newer",
                createdAt: new Date("2026-01-01T00:04:00Z"),
                lastHeartbeatAt: new Date(now),
                networkKey: "v4:1.1.1",
                country: "US",
            },
            others: [
                {
                    token: "older",
                    createdAt: new Date("2026-01-01T00:01:00Z"),
                    lastHeartbeatAt: new Date(now - 30_000),
                    networkKey: "v4:2.2.2",
                    country: "RS",
                },
            ],
            requestNetworkKey: "v4:1.1.1",
            requestCountry: "US",
            knownNetworkKeys: ["v4:1.1.1", "v4:2.2.2"],
            activeWindowMs: 120_000,
            now,
        });

        expect(decision).toEqual({ type: "end-others", tokens: ["older"] });
    });

    it("ends the current session when a newer one is already watching from another country", () => {
        const now = Date.parse("2026-01-01T00:05:00Z");
        const decision = decideHeartbeat({
            current: {
                token: "older",
                createdAt: new Date("2026-01-01T00:01:00Z"),
                lastHeartbeatAt: new Date(now),
                networkKey: "v4:2.2.2",
                country: "RS",
            },
            others: [
                {
                    token: "newer",
                    createdAt: new Date("2026-01-01T00:04:00Z"),
                    lastHeartbeatAt: new Date(now - 10_000),
                    networkKey: "v4:1.1.1",
                    country: "US",
                },
            ],
            requestNetworkKey: "v4:2.2.2",
            requestCountry: "RS",
            knownNetworkKeys: ["v4:1.1.1", "v4:2.2.2"],
            activeWindowMs: 120_000,
            now,
        });

        expect(decision).toEqual({ type: "end-current" });
    });

    it("leaves two sessions in the same country alone", () => {
        const now = Date.parse("2026-01-01T00:05:00Z");
        const decision = decideHeartbeat({
            current: {
                token: "phone",
                createdAt: new Date("2026-01-01T00:04:00Z"),
                lastHeartbeatAt: null,
                networkKey: "v4:3.3.3",
                country: "RS",
            },
            others: [
                {
                    token: "laptop",
                    createdAt: new Date("2026-01-01T00:01:00Z"),
                    lastHeartbeatAt: new Date(now - 10_000),
                    networkKey: "v4:4.4.4",
                    country: "RS",
                },
            ],
            requestNetworkKey: "v4:3.3.3",
            requestCountry: "RS",
            knownNetworkKeys: ["v4:3.3.3", "v4:4.4.4"],
            activeWindowMs: 120_000,
            now,
        });

        expect(decision).toEqual({ type: "ok" });
    });
});

describe("account sharing login notice", () => {
    it("maps heartbeat reasons to the login message", () => {
        expect(accountSharingLoginNotice("elsewhere")).toBe(
            ACCOUNT_SHARING_SIGNED_IN_ELSEWHERE,
        );
        expect(accountSharingLoginNotice("reauth")).toBe(
            ACCOUNT_SHARING_NEW_NETWORK,
        );
        expect(accountSharingLoginNotice("revoked")).toBe(
            ACCOUNT_SHARING_SESSIONS_REVOKED,
        );
        expect(accountSharingLoginNotice(undefined)).toBeUndefined();
    });
});

describe("revoke token", () => {
    it("round-trips the account id and rejects another purpose", () => {
        const token = createRevokeToken("user-1", "secret");

        expect(readRevokeToken(token, "secret")).toBe("user-1");
        expect(readRevokeToken(token, "other-secret")).toBeNull();
        expect(readRevokeToken("not-a-token", "secret")).toBeNull();
    });
});
