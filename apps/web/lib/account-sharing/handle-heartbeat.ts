import AccountNetworkModel from "@models/AccountNetwork";
import {
    getAccountSessionCap,
    getHeartbeatActiveWindowMs,
    isAccountSharingEnabled,
} from "./config";
import {
    decideHeartbeat,
    getNetworkKey,
    selectSessionTokensToRevoke,
} from "./policy";
import {
    deleteSessionsByToken,
    listStoredSessions,
    touchSession,
} from "./sessions";

export type HeartbeatCode =
    | "ok"
    | "signed_out"
    | "reauth"
    | "signed_in_elsewhere";

export async function handleHeartbeat({
    authUserId,
    currentToken,
    requestIp,
    requestCountry,
    now = new Date(),
}: {
    authUserId: string;
    currentToken: string;
    requestIp: string | null;
    requestCountry: string | null;
    now?: Date;
}): Promise<{ code: HeartbeatCode }> {
    if (!isAccountSharingEnabled()) {
        return { code: "ok" };
    }

    const sessions = await listStoredSessions(authUserId);
    const active = sessions.filter(
        (session) => session.expiresAt.getTime() > now.getTime(),
    );
    const capTokens = selectSessionTokensToRevoke(
        active.map((session) => ({
            token: session.token,
            createdAt: session.createdAt,
        })),
        getAccountSessionCap(),
        currentToken,
    );

    if (capTokens.includes(currentToken)) {
        await deleteSessionsByToken(capTokens);
        return { code: "signed_out" };
    }

    if (capTokens.length > 0) {
        await deleteSessionsByToken(capTokens);
    }

    const current = active.find((session) => session.token === currentToken);
    if (!current) {
        return { code: "signed_out" };
    }

    const requestNetworkKey = getNetworkKey(requestIp);
    const knownNetworks = await AccountNetworkModel.find({ authUserId })
        .select("networkKey")
        .lean();
    const decision = decideHeartbeat({
        current: {
            token: current.token,
            createdAt: current.createdAt,
            lastHeartbeatAt: current.lastHeartbeatAt,
            networkKey: current.networkKey,
            country: current.country,
        },
        others: active
            .filter((session) => session.token !== current.token)
            .filter((session) => !capTokens.includes(session.token))
            .map((session) => ({
                token: session.token,
                createdAt: session.createdAt,
                lastHeartbeatAt: session.lastHeartbeatAt,
                networkKey: session.networkKey,
                country: session.country,
            })),
        requestNetworkKey,
        requestCountry,
        knownNetworkKeys: knownNetworks.map((network) => network.networkKey),
        activeWindowMs: getHeartbeatActiveWindowMs(),
        now: now.getTime(),
    });

    if (decision.type === "reauth" || decision.type === "end-current") {
        await deleteSessionsByToken([current.token]);
        return {
            code: decision.type === "reauth" ? "reauth" : "signed_in_elsewhere",
        };
    }

    if (decision.type === "end-others") {
        await deleteSessionsByToken(decision.tokens);
    }

    const acceptedNetwork =
        requestNetworkKey &&
        (requestNetworkKey === current.networkKey ||
            knownNetworks.some(
                (network) => network.networkKey === requestNetworkKey,
            ))
            ? requestNetworkKey
            : current.networkKey;

    await touchSession(current.token, {
        lastHeartbeatAt: now,
        ipAddress: requestIp,
        networkKey: acceptedNetwork,
        country: requestCountry || current.country,
    });

    return { code: "ok" };
}
