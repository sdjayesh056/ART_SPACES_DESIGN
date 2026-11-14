/**
 * Awards and press for /portfolio/awards.
 *
 * ⚠️ PLACEHOLDER — every entry is deliberately GENERIC. No award body,
 * publication or year here is real; they describe the kind of recognition
 * the page is laid out to hold. Replace each with a real, verifiable entry
 * (name of the programme, year, project) or delete it. Do not launch this
 * page with these entries.
 */
export type Recognition = {
    year: string;
    title: string;
    /** Who gave it. Generic until the client supplies the real name. */
    body: string;
    category: string;
    /** Slug from PROJECTS, when the recognition was for a listed project. */
    project?: string;
};

export const AWARDS: Recognition[] = [
    { year: "2025", title: "Residential Interior of the Year — Winner", body: "National interior design awards programme", category: "Residential", project: "eco-futuristic-smart-villa" },
    { year: "2025", title: "Best Retail Flagship — Shortlist", body: "Retail design awards programme", category: "Retail", project: "next-gen-retail-experience" },
    { year: "2024", title: "Workplace Design — Winner", body: "Commercial interiors awards programme", category: "Commercial", project: "avant-garde-tech-hq" },
    { year: "2024", title: "Hospitality Interior, Spa and Wellness — Winner", body: "Hospitality design awards programme", category: "Hospitality", project: "minimalist-zen-spa-retreat" },
    { year: "2023", title: "Adaptive Reuse, Residential — Gold", body: "National residential design awards programme", category: "Residential", project: "urban-industrial-loft" },
    { year: "2023", title: "Heritage Conservation Interior — Commendation", body: "Regional architecture and heritage awards", category: "Hospitality", project: "neoclassical-boutique-hotel" },
];

export const PRESS: Recognition[] = [
    { year: "2025", title: "Home feature: a villa that breathes", body: "National architecture and interiors magazine", category: "Feature" },
    { year: "2024", title: "The offices changing how Mumbai works", body: "Business daily, weekend edition", category: "Round-up" },
    { year: "2024", title: "Studio profile", body: "Design and lifestyle monthly", category: "Profile" },
    { year: "2023", title: "Material stories: building for the monsoon", body: "Trade journal for interior professionals", category: "Opinion" },
];

export const JUDGING_CRITERIA = [
    { title: "Planning", body: "Does the layout solve the brief, or decorate around it?" },
    { title: "Craft", body: "Are the junctions, edges and joinery resolved as well as the big moves?" },
    { title: "Longevity", body: "Will it look and work as well in ten years as it does on the day of the shoot?" },
];
