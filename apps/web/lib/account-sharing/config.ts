const DEFAULT_SESSION_CAP = 2;
const DEFAULT_HEARTBEAT_INTERVAL_SECONDS = 60;
const MIN_HEARTBEAT_INTERVAL_SECONDS = 15;

function readBoolean(raw: string | undefined, fallback: boolean): boolean {
    if (!raw?.trim()) {
        return fallback;
    }

    const value = raw.trim().toLowerCase();
    if (
        value === "1" ||
        value === "true" ||
        value === "yes" ||
        value === "on"
    ) {
        return true;
    }
    if (
        value === "0" ||
        value === "false" ||
        value === "no" ||
        value === "off"
    ) {
        return false;
    }

    return fallback;
}

function readPositiveInt(raw: string | undefined, fallback: number): number {
    if (!raw?.trim()) {
        return fallback;
    }

    const parsed = Number.parseInt(raw, 10);
    if (!Number.isInteger(parsed) || parsed < 1) {
        return fallback;
    }

    return parsed;
}

export function isAccountSharingEnabled(): boolean {
    return readBoolean(process.env.ACCOUNT_SHARING_ENABLED, true);
}

export function getAccountSessionCap(): number {
    return readPositiveInt(
        process.env.ACCOUNT_SESSION_CAP,
        DEFAULT_SESSION_CAP,
    );
}

export function getAccountHeartbeatIntervalSeconds(): number {
    return Math.max(
        readPositiveInt(
            process.env.ACCOUNT_HEARTBEAT_INTERVAL_SECONDS,
            DEFAULT_HEARTBEAT_INTERVAL_SECONDS,
        ),
        MIN_HEARTBEAT_INTERVAL_SECONDS,
    );
}

/** A player still counts as open if it pinged within two intervals. */
export function getHeartbeatActiveWindowMs(): number {
    return getAccountHeartbeatIntervalSeconds() * 2 * 1000;
}
