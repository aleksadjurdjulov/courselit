import { ObjectId } from "mongodb";
import pug from "pug";
import { getEmailFrom } from "@courselit/utils";
import { getBackendAddress } from "@/app/actions";
import { responses } from "@/config/strings";
import AccountNetworkModel from "@models/AccountNetwork";
import AccountSignInModel from "@models/AccountSignIn";
import UserModel from "@models/User";
import { addMailJob } from "@/services/queue";
import { error } from "@/services/logger";
import connectToDatabase from "@/services/db";
import newSignInEmail from "@/templates/new-sign-in-email";
import { getAccountSessionCap, isAccountSharingEnabled } from "./config";
import { isDeviceId } from "./device-cookie";
import { getNetworkKey, selectSessionTokensToRevoke, toDate } from "./policy";
import { createRevokeToken } from "./revoke-token";

export type CreatedAccountSession = {
    id?: string;
    token: string;
    userId: unknown;
    createdAt?: Date | string;
    expiresAt?: Date | string;
    ipAddress?: string | null;
    userAgent?: string | null;
    deviceId?: string | null;
    networkKey?: string | null;
    country?: string | null;
};

type ListedSession = {
    token: string;
    createdAt: Date | string;
    expiresAt: Date | string;
};

type AccountUser = {
    email?: string;
    domain?: unknown;
};

export async function onAccountSessionCreated({
    session,
    headers,
    listSessions,
    deleteSession,
}: {
    session: CreatedAccountSession;
    headers: Headers | null;
    listSessions: (userId: string) => Promise<ListedSession[]>;
    deleteSession: (token: string) => Promise<void>;
}): Promise<void> {
    if (!isAccountSharingEnabled()) {
        return;
    }

    const authUserId = stringifyId(session.userId);
    if (!authUserId || !session.token) {
        return;
    }

    const now = Date.now();
    const listed = await listSessions(authUserId);
    const active = listed.filter(
        (item) => toDate(item.expiresAt).getTime() > now,
    );
    const tokensToRevoke = selectSessionTokensToRevoke(
        active.map((item) => ({
            token: item.token,
            createdAt: toDate(item.createdAt),
        })),
        getAccountSessionCap(),
        session.token,
    );

    for (const token of tokensToRevoke) {
        await deleteSession(token);
    }

    try {
        await recordSignInAndNotify({ session, headers, authUserId });
    } catch (err) {
        await error("Failed to record account sign-in", {
            fileName: "on-session-created.ts",
            stack: err instanceof Error ? { message: err.message } : undefined,
        });
    }
}

async function recordSignInAndNotify({
    session,
    headers,
    authUserId,
}: {
    session: CreatedAccountSession;
    headers: Headers | null;
    authUserId: string;
}): Promise<void> {
    await connectToDatabase();
    const user = (await UserModel.findById(authUserId)
        .select("email domain")
        .lean()) as AccountUser | null;
    const domain = resolveDomain(user?.domain, headers?.get("domainId"));
    if (!domain) {
        return;
    }

    const deviceId = isDeviceId(session.deviceId)
        ? session.deviceId
        : undefined;
    const networkKey =
        session.networkKey || getNetworkKey(session.ipAddress) || undefined;
    const country = session.country || undefined;
    const [priorSignIn, knownDevice, knownNetwork] = await Promise.all([
        AccountSignInModel.exists({ authUserId }),
        deviceId
            ? AccountSignInModel.exists({ authUserId, deviceId })
            : Promise.resolve(null),
        networkKey
            ? AccountNetworkModel.exists({ authUserId, networkKey })
            : Promise.resolve(null),
    ]);

    await AccountSignInModel.create({
        domain,
        authUserId,
        sessionId: session.id,
        ipAddress: session.ipAddress || undefined,
        userAgent: trimUserAgent(session.userAgent),
        deviceId,
        networkKey,
        country,
    });

    if (networkKey) {
        await AccountNetworkModel.updateOne(
            { authUserId, networkKey },
            {
                $set: {
                    domain,
                    lastSeenAt: new Date(),
                    ...(country ? { country } : {}),
                },
                $setOnInsert: { authUserId, networkKey },
            },
            { upsert: true },
        );
    }

    const deviceIsNew = !!deviceId && !knownDevice;
    const networkIsNew = !!networkKey && !knownNetwork;
    if (!priorSignIn || (!deviceIsNew && !networkIsNew) || !user?.email) {
        return;
    }

    await sendNewSignInEmail({
        email: user.email,
        authUserId,
        headers,
        ipAddress: session.ipAddress || "nepoznata",
        userAgent: trimUserAgent(session.userAgent) || "nepoznat",
    });
}

async function sendNewSignInEmail({
    email,
    authUserId,
    headers,
    ipAddress,
    userAgent,
}: {
    email: string;
    authUserId: string;
    headers: Headers | null;
    ipAddress: string;
    userAgent: string;
}): Promise<void> {
    const secret = process.env.AUTH_SECRET;
    if (!secret || !headers) {
        return;
    }

    const origin = await getBackendAddress(headers);
    const token = createRevokeToken(authUserId, secret);
    const schoolName =
        headers.get("domaintitle") ||
        headers.get("domain") ||
        headers.get("host") ||
        "";
    const body = pug.render(newSignInEmail, {
        schoolName,
        ipAddress,
        userAgent,
        revokeLink: `${origin}/api/account-session/revoke?token=${encodeURIComponent(token)}`,
        hideCourseLitBranding: headers.get("hidecourselitbranding") === "true",
    });

    await addMailJob({
        to: [email],
        subject: `${responses.new_sign_in_mail_subject} ${schoolName}`.trim(),
        body,
        from: getEmailFrom({
            name: schoolName,
            email: process.env.EMAIL_FROM || "",
        }),
    });
}

function resolveDomain(
    userDomain: unknown,
    headerDomainId: string | null | undefined,
): ObjectId | null {
    const candidate = stringifyId(userDomain) || headerDomainId || "";
    if (/^[a-f0-9]{24}$/i.test(candidate)) {
        return new ObjectId(candidate);
    }

    return null;
}

function stringifyId(value: unknown): string | null {
    if (typeof value === "string" && value) {
        return value;
    }

    if (
        value &&
        typeof value === "object" &&
        "toString" in value &&
        typeof value.toString === "function"
    ) {
        const serialized = value.toString();
        return serialized || null;
    }

    return null;
}

function trimUserAgent(
    userAgent: string | null | undefined,
): string | undefined {
    const value = userAgent?.trim();
    if (!value) {
        return undefined;
    }

    return value.slice(0, 180);
}
