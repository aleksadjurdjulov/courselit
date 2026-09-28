import { auth } from "@/auth";
import { isAccountSharingEnabled } from "@/lib/account-sharing/config";
import { handleHeartbeat } from "@/lib/account-sharing/handle-heartbeat";
import { readCountryCode, readRequestIp } from "@/lib/account-sharing/policy";

export async function POST(request: Request) {
    if (!isAccountSharingEnabled()) {
        return Response.json({ code: "ok" });
    }

    const session = await auth.api.getSession({
        headers: request.headers,
        query: {
            disableCookieCache: true,
        },
    });

    if (!session?.session?.token || !session.user?.id) {
        return Response.json({ code: "signed_out" }, { status: 401 });
    }

    const result = await handleHeartbeat({
        authUserId: session.user.id,
        currentToken: session.session.token,
        requestIp: readRequestIp(request.headers),
        requestCountry: readCountryCode(request.headers),
    });

    return Response.json(result, {
        status: result.code === "ok" ? 200 : 401,
    });
}
