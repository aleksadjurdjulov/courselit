export const DEVICE_COOKIE_NAME = "courselit.device_id";
export const DEVICE_ID_HEADER = "x-courselit-device-id";

const DEVICE_ID_PATTERN = /^[A-Za-z0-9_-]{8,64}$/;
const DEVICE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

const AUTH_COOKIE_NAMES = [
    "courselit.session_token",
    "courselit.session_data",
    "courselit.account_data",
    "__Secure-courselit.session_token",
    "__Secure-courselit.session_data",
    "__Secure-courselit.account_data",
];

export function isDeviceId(value: string | null | undefined): value is string {
    return !!value && DEVICE_ID_PATTERN.test(value);
}

export function readDeviceId(cookieHeader: string | null): string | null {
    if (!cookieHeader) {
        return null;
    }

    const pair = cookieHeader
        .split(";")
        .map((part) => part.trim())
        .find((part) => part.startsWith(`${DEVICE_COOKIE_NAME}=`));

    if (!pair) {
        return null;
    }

    const raw = pair.slice(DEVICE_COOKIE_NAME.length + 1);
    let value = raw;
    try {
        value = decodeURIComponent(raw);
    } catch {
        value = raw;
    }

    return isDeviceId(value) ? value : null;
}

export function serializeDeviceCookie(deviceId: string): string {
    const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
    return `${DEVICE_COOKIE_NAME}=${encodeURIComponent(deviceId)}; Path=/; Max-Age=${DEVICE_COOKIE_MAX_AGE_SECONDS}; HttpOnly; SameSite=Lax${secure}`;
}

export function appendClearAuthCookies(response: Response): void {
    for (const name of AUTH_COOKIE_NAMES) {
        const secure = name.startsWith("__Secure-") ? "; Secure" : "";
        response.headers.append(
            "set-cookie",
            `${name}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax${secure}`,
        );
    }
}
