import { NextResponse } from "next/server";
import { getBackendAddress } from "@/app/actions";
import { isAccountSharingEnabled } from "@/lib/account-sharing/config";
import {
    appendClearAuthCookies,
    readDeviceId,
} from "@/lib/account-sharing/device-cookie";
import { readRevokeToken } from "@/lib/account-sharing/revoke-token";
import {
    deleteSessionsForUser,
    listStoredSessions,
} from "@/lib/account-sharing/sessions";

export async function GET(request: Request) {
    const origin = await getBackendAddress(request.headers);
    if (!isAccountSharingEnabled()) {
        return NextResponse.redirect(`${origin}/login`);
    }

    const token = new URL(request.url).searchParams.get("token") || "";
    const secret = process.env.AUTH_SECRET || "";
    const authUserId = secret ? readRevokeToken(token, secret) : null;

    if (!authUserId) {
        return NextResponse.redirect(`${origin}/login`);
    }

    const deviceId = readDeviceId(request.headers.get("cookie"));
    const sessions = await listStoredSessions(authUserId);
    const keepCurrentDevice =
        !!deviceId && sessions.some((session) => session.deviceId === deviceId);

    await deleteSessionsForUser(
        authUserId,
        keepCurrentDevice ? deviceId : undefined,
    );

    if (keepCurrentDevice) {
        return NextResponse.redirect(`${origin}/dashboard`);
    }

    const response = NextResponse.redirect(`${origin}/login?reason=revoked`);
    appendClearAuthCookies(response);
    return response;
}
