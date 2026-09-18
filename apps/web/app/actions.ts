import { headers as headersType } from "next/headers";

const UNUSABLE_HOSTNAMES = new Set(["0.0.0.0", "::", "[::]"]);

function isUnusableHost(host: string | null | undefined): boolean {
    if (!host) {
        return true;
    }
    const hostname = host.split(":")[0]?.toLowerCase();
    return !hostname || UNUSABLE_HOSTNAMES.has(hostname);
}

export async function getBackendAddress(
    headers: Headers,
): Promise<`${string}://${string}`> {
    const protocol =
        headers.get("x-forwarded-proto")?.split(",")[0]?.trim() || "http";
    const forwardedHost = headers
        .get("x-forwarded-host")
        ?.split(",")[0]
        ?.trim();
    const requestHost = headers.get("host");

    let host = forwardedHost || requestHost || "";
    if (isUnusableHost(host) && process.env.DOMAIN) {
        host = process.env.DOMAIN;
    }

    return `${protocol}://${host}`;
}

export async function getAddressFromHeaders(headers: typeof headersType) {
    const headersList = await headers();
    const address = await getBackendAddress(headersList);
    return address;
}
