import { STUDIO } from "@/data/studio";

/**
 * Canonical origin. Falls back to localhost so `next build` works on a machine
 * with no env file; CI and production set NEXT_PUBLIC_SITE_URL.
 */
export const SITE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export function absoluteUrl(path = "/"): string {
    return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Pages that exist but must not be indexed until their copy is reviewed. */
export const NOINDEX_ROUTES = new Set(["/privacy", "/terms"]);

/* ───────────────────────────── JSON-LD ─────────────────────────────────
   Deliberately conservative.

   NOT emitted, and not to be added casually:

   - LocalBusiness / ProfessionalService. It wants a street address, postal
     code, geo coordinates and opening hours. src/data/studio.ts has none of
     those, and its phone is the canonical Indian dummy number. Publishing
     structured data the business cannot stand behind is worse than
     publishing none.
   - Review / AggregateRating. Self-serving review markup has been ineligible
     for rich results since 2019 and risks a manual action — and the six
     testimonials in the repo are fabricated anyway.

   What is here is true today: the site exists, the organisation is named, and
   breadcrumbs mirror the page's own visible trail.
   ──────────────────────────────────────────────────────────────────────── */

export function websiteJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name: STUDIO.name,
        inLanguage: "en-IN",
        publisher: { "@id": absoluteUrl("/#organization") },
    };
}

export function organizationJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": absoluteUrl("/#organization"),
        name: STUDIO.name,
        url: absoluteUrl("/"),
        logo: absoluteUrl("/Logos/ART_SPACES_DESIGN_LOGO.png"),
        description: STUDIO.tagline,
        // areaServed is a claim we can actually support from the city list.
        areaServed: STUDIO.servedCities.map((city) => ({
            "@type": "City",
            name: city,
        })),
        // No telephone, address or email until the real ones replace the
        // placeholders in src/data/studio.ts.
    };
}

export type BreadcrumbEntry = { label: string; href?: string };

export function breadcrumbJsonLd(entries: BreadcrumbEntry[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: entries.map((entry, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: entry.label,
            ...(entry.href ? { item: absoluteUrl(entry.href) } : {}),
        })),
    };
}
