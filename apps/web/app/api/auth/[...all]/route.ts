import { als } from "@/async-local-storage";
import { getBackendAddress } from "@/app/actions";
import { getAuth } from "@/auth";
import { toNextJsHandler } from "better-auth/next-js";
import {
    findUserByEmailForDomain,
    getDomainInviteOnlyStatus,
} from "@/lib/invite-only";
import { sanitizeEmail } from "@/lib/sanitize-email";
import { generateUniqueId } from "@courselit/utils";
import { isAccountSharingEnabled } from "@/lib/account-sharing/config";
import {
    DEVICE_ID_HEADER,
    readDeviceId,
    serializeDeviceCookie,
} from "@/lib/account-sharing/device-cookie";

const getHandlers = (baseURL: string) => toNextJsHandler(getAuth(baseURL));

// This is needed to prevent creating URLs like https://0.0.0.0:3000/api/auth/sign-in/sso
export const rewriteAuthRequestOrigin = async (req: Request) => {
    const publicOrigin = await getBackendAddress(req.headers);
    const currentUrl = new URL(req.url);

    if (currentUrl.origin === publicOrigin) {
        return req;
    }

    const rewrittenUrl = new URL(
        `${currentUrl.pathname}${currentUrl.search}`,
        publicOrigin,
    );

    return new Request(rewrittenUrl, req);
};

async function enforceInviteOnlyAuth(req: Request): Promise<Response | null> {
    const inviteOnlyHeader = req.headers.get("inviteonly") === "true";
    const domainId = req.headers.get("domainId");
    const inviteOnly =
        inviteOnlyHeader || (await getDomainInviteOnlyStatus(domainId));

    if (!inviteOnly) {
        return null;
    }

    const pathname = new URL(req.url).pathname;
    const isSendOtp = pathname.endsWith("/email-otp/send-verification-otp");
    const isSignInOtp = pathname.endsWith("/sign-in/email-otp");

    if (!isSendOtp && !isSignInOtp) {
        return null;
    }

    let body: { email?: string; type?: string };
    try {
        body = await req.clone().json();
    } catch {
        return null;
    }

    if (!body.email || !domainId) {
        return null;
    }

    const existingUser = await findUserByEmailForDomain({
        email: sanitizeEmail(body.email),
        domainId,
    });

    if (existingUser) {
        return null;
    }

    // Mirror Better Auth emailOTP disableSignUp behavior for unknown emails.
    if (isSendOtp && body.type === "sign-in") {
        return Response.json({ success: true });
    }

    if (isSignInOtp) {
        return Response.json(
            {
                message: "Invalid OTP",
                code: "INVALID_OTP",
            },
            { status: 400 },
        );
    }

    return null;
}

function attachDevice(req: Request): {
    request: Request;
    deviceId: string;
    isNew: boolean;
} {
    const existing = readDeviceId(req.headers.get("cookie"));
    const deviceId = existing ?? generateUniqueId();
    const headers = new Headers(req.headers);
    headers.set(DEVICE_ID_HEADER, deviceId);

    return {
        request: new Request(req, { headers }),
        deviceId,
        isNew: !existing,
    };
}

function rememberDevice(
    response: Response,
    device: { deviceId: string; isNew: boolean },
): Response {
    if (device.isNew) {
        response.headers.append(
            "set-cookie",
            serializeDeviceCookie(device.deviceId),
        );
    }

    return response;
}

export const POST = async (req: Request) => {
    const rewrittenReq = await rewriteAuthRequestOrigin(req);
    const device = isAccountSharingEnabled()
        ? attachDevice(rewrittenReq)
        : null;
    const authRequest = device?.request ?? rewrittenReq;
    const handlers = getHandlers(new URL(rewrittenReq.url).origin);
    const map = new Map();
    map.set("domain", req.headers.get("domain"));
    map.set("domainId", req.headers.get("domainId"));

    return als.run(map, async () => {
        const blocked = await enforceInviteOnlyAuth(authRequest);
        if (blocked) {
            return device ? rememberDevice(blocked, device) : blocked;
        }
        const response = await handlers.POST(authRequest);
        return device ? rememberDevice(response, device) : response;
    });
};

export const GET = async (req: Request) => {
    const rewrittenReq = await rewriteAuthRequestOrigin(req);
    const device = isAccountSharingEnabled()
        ? attachDevice(rewrittenReq)
        : null;
    const authRequest = device?.request ?? rewrittenReq;
    const handlers = getHandlers(new URL(rewrittenReq.url).origin);
    const map = new Map();
    map.set("domain", req.headers.get("domain"));
    map.set("domainId", req.headers.get("domainId"));
    return als.run(map, async () => {
        const response = await handlers.GET(authRequest);
        return device ? rememberDevice(response, device) : response;
    });
};
