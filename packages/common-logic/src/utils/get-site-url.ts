import { Domain } from "@courselit/common-models";

export function getSiteUrl(
    domain: Pick<Domain, "name" | "customDomain">,
    fallback?: string,
): string {
    const protocol = process.env.PROTOCOL || "https";
    const host = domain.customDomain
        ? domain.customDomain
        : process.env.MULTITENANT === "true"
          ? process.env.DOMAIN
              ? `${domain.name}.${process.env.DOMAIN}`
              : undefined
          : process.env.DOMAIN || undefined;

    if (host) {
        return `${protocol}://${host}`;
    }

    if (fallback) {
        return fallback.replace(/\/$/, "");
    }

    return `${protocol}://localhost`;
}
