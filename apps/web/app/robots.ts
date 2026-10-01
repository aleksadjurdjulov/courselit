import type { MetadataRoute } from "next";

// Temporary: block all crawlers until the platform goes live.
// Remove or update this file when launching.
export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            disallow: "/",
        },
    };
}
