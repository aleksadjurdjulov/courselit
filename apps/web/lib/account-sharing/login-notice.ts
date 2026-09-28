import {
    ACCOUNT_SHARING_NEW_NETWORK,
    ACCOUNT_SHARING_SESSIONS_REVOKED,
    ACCOUNT_SHARING_SIGNED_IN_ELSEWHERE,
} from "@ui-config/strings";

export function accountSharingLoginNotice(
    reason: string | undefined,
): string | undefined {
    if (reason === "elsewhere") {
        return ACCOUNT_SHARING_SIGNED_IN_ELSEWHERE;
    }

    if (reason === "reauth") {
        return ACCOUNT_SHARING_NEW_NETWORK;
    }

    if (reason === "revoked") {
        return ACCOUNT_SHARING_SESSIONS_REVOKED;
    }

    return undefined;
}
