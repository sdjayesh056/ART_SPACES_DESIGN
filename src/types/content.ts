import type { ComponentType } from "react";
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

/* ── Shared inner-page content shapes ──────────────────────────────────── */

export type IllustrationProps = {
    className?: string;
    /** When set the drawing is exposed as an image; otherwise it is hidden from assistive tech. */
    title?: string;
};

/** A component reference, so data modules can name a drawing without holding JSX. */
export type Illustration = ComponentType<IllustrationProps>;

export type Faq = { question: string; answer: string };

export type Feature = { title: string; body: string; icon?: LucideIcon };

export type Fact = { label: string; value: string };

export type Phase = {
    id: string;
    title: string;
    duration: string;
    summary: string;
    deliverables: string[];
};

export type LongFormSection = { id: string; heading: string; paragraphs: string[] };

export type Service = {
    slug: string;
    title: string;
    description: string;
    icon: LucideIcon;
    /** Search terms this service should rank for. */
    keywords: string[];

    /* Long-form fields for /services/[slug]. `title` and `description` above
       stay exactly as the home page renders them. */
    /** Search-phrased name, e.g. "Residential Interior Design". */
    heading: string;
    /** 140–160 characters, naming the service and Mumbai. */
    metaDescription: string;
    summary: string;
    overview: string[];
    includes: Feature[];
    deliverables: string[];
    verticals: Vertical[];
    faqs: Faq[];
    illustration: Illustration;
    illustrationTitle: string;
};

export type Project = {
    slug: string;
    title: string;
    category: ProjectCategory;
    image: string;
    description: string;
    /** Headline outcome, e.g. "35% lower energy use". */
    highlight: string;

    /* Case-study fields for /portfolio/[slug]. Optional so a project can be
       listed before its write-up exists. */
    location?: string;
    year?: string;
    area?: string;
    scope?: string[];
    brief?: string;
    approach?: string;
    outcome?: string;
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
