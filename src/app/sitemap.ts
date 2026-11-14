import type { MetadataRoute } from "next";

import { LIVE_ROUTES } from "@/data/navigation";
import { ARTICLES } from "@/data/journal";
import { PROJECTS } from "@/data/projects";
import { SERVICES } from "@/data/services";
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
        if (route === "/portfolio" || route === "/services" || route.startsWith("/spaces/")) return 0.8;
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

    const serviceRoutes = SERVICES.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const articleRoutes = ARTICLES.map((article) => ({
    url: absoluteUrl(`/journal/${article.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...articleRoutes];
}
