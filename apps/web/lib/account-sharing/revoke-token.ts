import { jwtUtils } from "@courselit/common-logic";

const PURPOSE = "revoke-account-sessions";

type RevokeTokenPayload = {
    purpose?: string;
    authUserId?: string;
};

export function createRevokeToken(authUserId: string, secret: string): string {
    return jwtUtils.generateToken(
        { purpose: PURPOSE, authUserId },
        secret,
        "7d",
    );
}

export function readRevokeToken(token: string, secret: string): string | null {
    try {
        const payload = jwtUtils.verifyToken(
            token,
            secret,
        ) as RevokeTokenPayload;
        if (payload?.purpose !== PURPOSE || !payload.authUserId) {
            return null;
        }

        return payload.authUserId;
    } catch {
        return null;
    }
}
