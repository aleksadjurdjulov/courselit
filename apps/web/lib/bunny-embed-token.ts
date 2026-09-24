import { createHash } from "crypto";

const BUNNY_EMBED_HOSTS = new Set([
    "iframe.mediadelivery.net",
    "player.mediadelivery.net",
]);

export const BUNNY_EMBED_TOKEN_TTL_SECONDS = 6 * 60 * 60;

export function signBunnyEmbedUrl(
    rawUrl: string,
    tokenKey: string,
    now = Date.now(),
): string {
    const key = tokenKey.trim();
    if (!key) {
        return rawUrl;
    }

    let url: URL;
    try {
        url = new URL(rawUrl);
    } catch {
        return rawUrl;
    }

    if (!BUNNY_EMBED_HOSTS.has(url.hostname)) {
        return rawUrl;
    }

    const match = url.pathname.match(/^\/embed\/\d+\/([A-Za-z0-9-]+)\/?$/);
    if (!match) {
        return rawUrl;
    }

    const expires = Math.floor(now / 1000) + BUNNY_EMBED_TOKEN_TTL_SECONDS;
    const token = createHash("sha256")
        .update(`${key}${match[1]}${expires}`)
        .digest("hex");
    url.searchParams.set("token", token);
    url.searchParams.set("expires", String(expires));
    return url.toString();
}

export function signBunnyEmbedHtml(
    html: string,
    tokenKey: string,
    now = Date.now(),
): string {
    const key = tokenKey.trim();
    if (!key || !html) {
        return html;
    }

    const trimmed = html.trim();
    if (/^https?:\/\//i.test(trimmed) && !trimmed.includes("<")) {
        return signBunnyEmbedUrl(trimmed, key, now);
    }

    return html.replace(
        /src\s*=\s*(["'])([\s\S]*?)\1/gi,
        (match, quote: string, src: string) => {
            const decoded = src.replace(/&amp;/gi, "&");
            const signed = signBunnyEmbedUrl(decoded, key, now);
            if (signed === decoded) {
                return match;
            }
            const escaped = src.toLowerCase().includes("&amp;")
                ? signed.replace(/&/g, "&amp;")
                : signed;
            return `src=${quote}${escaped}${quote}`;
        },
    );
}
