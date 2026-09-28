export type SessionCapCandidate = {
    token: string;
    createdAt: Date;
};

export type HeartbeatSession = {
    token: string;
    createdAt: Date;
    lastHeartbeatAt: Date | null;
    networkKey: string | null;
    country: string | null;
};

export type LocationSignal = {
    networkKey: string | null;
    country: string | null;
};

export type HeartbeatAction =
    | { type: "ok" }
    | { type: "reauth" }
    | { type: "end-current" }
    | { type: "end-others"; tokens: string[] };

const COUNTRY_HEADERS = [
    "cf-ipcountry",
    "x-vercel-ip-country",
    "cloudfront-viewer-country",
];

export function toDate(value: Date | string | number | undefined | null): Date {
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
        return value;
    }

    const date = new Date(value ?? 0);
    if (Number.isNaN(date.getTime())) {
        return new Date(0);
    }

    return date;
}

export function readRequestIp(headers: {
    get(name: string): string | null;
}): string | null {
    const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const realIp = headers.get("x-real-ip")?.trim();
    const value = forwarded || realIp;
    return value || null;
}

export function readCountryCode(headers: {
    get(name: string): string | null;
}): string | null {
    for (const name of COUNTRY_HEADERS) {
        const value = headers.get(name)?.trim().toUpperCase();
        if (
            value &&
            /^[A-Z]{2}$/.test(value) &&
            value !== "XX" &&
            value !== "T1"
        ) {
            return value;
        }
    }

    return null;
}

export function getNetworkKey(ip: string | null | undefined): string | null {
    const value = normalizeIp(ip);
    if (!value || value === "127.0.0.1" || value === "::1") {
        return null;
    }

    if (value.includes(".")) {
        const numbers = value.split(".").map((part) => Number(part));
        if (
            numbers.length !== 4 ||
            numbers.some(
                (part) => !Number.isInteger(part) || part < 0 || part > 255,
            )
        ) {
            return null;
        }

        return `v4:${numbers[0]}.${numbers[1]}.${numbers[2]}`;
    }

    const groups = expandIpv6(value);
    if (!groups) {
        return null;
    }

    return `v6:${groups.slice(0, 4).join(":")}`;
}

/**
 * Country comes from the proxy (CF-IPCountry, x-vercel-ip-country, or
 * CloudFront-Viewer-Country). Without it, two live sessions are left in place
 * and the session cap still applies.
 */
export function areConcurrentLocationsFarApart(
    left: LocationSignal,
    right: LocationSignal,
): boolean {
    if (
        left.networkKey &&
        right.networkKey &&
        left.networkKey === right.networkKey
    ) {
        return false;
    }

    if (left.country && right.country) {
        return left.country !== right.country;
    }

    return false;
}

export function selectSessionTokensToRevoke(
    sessions: SessionCapCandidate[],
    cap: number,
    currentToken: string,
): string[] {
    const capSize = Math.max(1, cap);
    const sorted = [...sessions].sort(
        (left, right) => right.createdAt.getTime() - left.createdAt.getTime(),
    );
    const kept = new Set<string>();

    for (const session of sorted) {
        if (kept.size >= capSize) {
            break;
        }
        kept.add(session.token);
    }

    if (currentToken && !kept.has(currentToken)) {
        const oldestKept = [...sorted]
            .reverse()
            .find((session) => kept.has(session.token));
        if (oldestKept) {
            kept.delete(oldestKept.token);
        }
        kept.add(currentToken);
    }

    return sessions
        .filter((session) => !kept.has(session.token))
        .map((session) => session.token);
}

export function decideHeartbeat(input: {
    current: HeartbeatSession;
    others: HeartbeatSession[];
    requestNetworkKey: string | null;
    requestCountry: string | null;
    knownNetworkKeys: string[];
    activeWindowMs: number;
    now: number;
}): HeartbeatAction {
    const knownNetworks = new Set(input.knownNetworkKeys);
    if (input.current.networkKey) {
        knownNetworks.add(input.current.networkKey);
    }

    if (
        input.requestNetworkKey &&
        !knownNetworks.has(input.requestNetworkKey)
    ) {
        return { type: "reauth" };
    }

    const requestLocation: LocationSignal = {
        networkKey: input.requestNetworkKey ?? input.current.networkKey,
        country: input.requestCountry ?? input.current.country,
    };
    const olderTokens: string[] = [];
    let newerFarSession = false;

    for (const other of input.others) {
        if (other.token === input.current.token || !other.lastHeartbeatAt) {
            continue;
        }

        if (
            input.now - other.lastHeartbeatAt.getTime() >
            input.activeWindowMs
        ) {
            continue;
        }

        if (
            !areConcurrentLocationsFarApart(requestLocation, {
                networkKey: other.networkKey,
                country: other.country,
            })
        ) {
            continue;
        }

        if (other.createdAt.getTime() < input.current.createdAt.getTime()) {
            olderTokens.push(other.token);
            continue;
        }

        if (other.createdAt.getTime() > input.current.createdAt.getTime()) {
            newerFarSession = true;
        }
    }

    if (newerFarSession) {
        return { type: "end-current" };
    }

    if (olderTokens.length > 0) {
        return { type: "end-others", tokens: olderTokens };
    }

    return { type: "ok" };
}

function normalizeIp(ip: string | null | undefined): string | null {
    if (!ip) {
        return null;
    }

    let value = ip.split(",")[0]?.trim() ?? "";
    if (!value) {
        return null;
    }

    if (value.startsWith("::ffff:")) {
        value = value.slice("::ffff:".length);
    }

    return value;
}

function expandIpv6(ip: string): string[] | null {
    const pieces = ip.split("::");
    if (pieces.length > 2) {
        return null;
    }

    const head = pieces[0] ? pieces[0].split(":") : [];
    if (pieces.length === 1) {
        return head.length === 8 ? normalizeIpv6Groups(head) : null;
    }

    const tail = pieces[1] ? pieces[1].split(":") : [];
    const missing = 8 - head.length - tail.length;
    if (missing < 0) {
        return null;
    }

    return normalizeIpv6Groups([
        ...head,
        ...Array.from({ length: missing }, () => "0"),
        ...tail,
    ]);
}

function normalizeIpv6Groups(parts: string[]): string[] | null {
    if (parts.length !== 8) {
        return null;
    }

    const groups: string[] = [];
    for (const part of parts) {
        if (!/^[0-9a-fA-F]{1,4}$/.test(part)) {
            return null;
        }
        groups.push(part.padStart(4, "0").toLowerCase());
    }

    return groups;
}
