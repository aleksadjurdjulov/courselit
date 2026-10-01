import type { MetadataRoute } from "next";

// Temporary: allow crawling so Google can see the site-wide noindex meta tag
// and drop already-indexed pages. Keep noindex in layout/page metadata until go-live.
// Do not use Disallow: / here — that can block Google from reading noindex.
export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
    };
}
