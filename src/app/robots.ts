import type { MetadataRoute } from "next";

import { absoluteUrl, NOINDEX_ROUTES } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            // Belt and braces: these pages also carry robots: { index: false }.
            disallow: [...NOINDEX_ROUTES],
        },
        sitemap: absoluteUrl("/sitemap.xml"),
        host: absoluteUrl("/"),
    };
}
