import type { MetadataRoute } from "next";

import { LIVE_ROUTES } from "@/data/navigation";
import { PROJECTS } from "@/data/projects";
import { absoluteUrl, NOINDEX_ROUTES } from "@/lib/seo";

/**
 * Generated from LIVE_ROUTES — the set that records which routes actually
 * exist — rather than from the navigation's wish list. Shipping a sitemap
 * full of 404s is worse than shipping none, and the two lists have already
 * drifted once in this repo.
 *
 * /privacy and /terms are excluded: they are noindex until reviewed text
 * replaces the interim copy.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const priorityFor = (route: string) => {
        if (route === "/") return 1;
        if (route === "/contact" || route === "/consultation/booking") return 0.9;
        if (route === "/portfolio" || route.startsWith("/spaces/")) return 0.8;
        return 0.6;
    };

    const staticRoutes = [...LIVE_ROUTES]
        .filter((route) => !NOINDEX_ROUTES.has(route))
        .sort()
        .map((route) => ({
            url: absoluteUrl(route),
            changeFrequency: (route === "/" ? "weekly" : "monthly") as "weekly" | "monthly",
            priority: priorityFor(route),
        }));

    const projectRoutes = PROJECTS.map((project) => ({
        url: absoluteUrl(`/portfolio/${project.slug}`),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...projectRoutes];
}
