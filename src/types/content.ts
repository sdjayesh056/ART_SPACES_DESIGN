import type { LucideIcon } from "lucide-react";

/** The four verticals the studio sells, matching the /spaces/* route segments. */
export const VERTICALS = ["Residential", "Commercial", "Hospitality", "Retail"] as const;

export type Vertical = (typeof VERTICALS)[number];

/**
 * Categories a portfolio project can carry. Wider than `Vertical` because the
 * studio has delivered work outside the four it actively sells.
 */
export const PROJECT_CATEGORIES = [
    ...VERTICALS,
    "Institutional",
    "Healthcare",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type Service = {
    slug: string;
    title: string;
    description: string;
    icon: LucideIcon;
    /** Search terms this service should rank for. */
    keywords: string[];
};

export type Project = {
    slug: string;
    title: string;
    category: ProjectCategory;
    image: string;
    description: string;
    /** Headline outcome, e.g. "35% lower energy use". */
    highlight: string;
};

export type Testimonial = {
    id: string;
    quote: string;
    author: string;
    role: string;
    location: string;
    rating: 1 | 2 | 3 | 4 | 5;
};

export type CompanyStat = {
    id: string;
    icon: LucideIcon;
    value: number;
    suffix: string;
    label: string;
    description: string;
};
