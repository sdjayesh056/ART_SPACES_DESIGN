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

/* ── Page-level structured data ────────────────────────────────────────────
   Each of these describes something the page visibly is. All reference the
   Organization node by @id rather than restating it.
   ──────────────────────────────────────────────────────────────────────── */

const ORGANIZATION_REF = { "@id": absoluteUrl("/#organization") };

export function serviceJsonLd(service: { name: string; description: string; path: string }) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.name,
        serviceType: service.name,
        description: service.description,
        url: absoluteUrl(service.path),
        provider: ORGANIZATION_REF,
        areaServed: STUDIO.servedCities.map((city) => ({ "@type": "City", name: city })),
    };
}

export function creativeWorkJsonLd(work: { name: string; description: string; path: string; image: string; genre: string }) {
    return {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: work.name,
        description: work.description,
        url: absoluteUrl(work.path),
        image: work.image.startsWith("http") ? work.image : absoluteUrl(work.image),
        genre: work.genre,
        creator: ORGANIZATION_REF,
    };
}

export function articleJsonLd(article: { headline: string; description: string; path: string; datePublished: string; image: string }) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.headline,
        description: article.description,
        mainEntityOfPage: absoluteUrl(article.path),
        datePublished: article.datePublished,
        image: article.image.startsWith("http") ? article.image : absoluteUrl(article.image),
        author: ORGANIZATION_REF,
        publisher: ORGANIZATION_REF,
    };
}

/** Trims a meta description to a length limit at a word boundary. */
export function clampDescription(text: string, max = 158): string {
    if (text.length <= max) return text;
    const cut = text.slice(0, max - 1);
    return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "")}…`;
}
