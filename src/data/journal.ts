import type { LongFormSection } from "@/types/content";

import { photo } from "./photos";

/**
 * Journal articles.
 *
 * ⚠️ PLACEHOLDER — all three articles are sample pieces written to prove the
 * template and the internal linking. Dates are illustrative. Replace with the
 * studio's own writing before the SEO pass; the shape is what the pages need.
 */
export type Article = {
    slug: string;
    title: string;
    /** 140–160 characters. */
    metaDescription: string;
    excerpt: string;
    category: string;
    /** ISO date. */
    datePublished: string;
    readingTime: string;
    image: string;
    imageAlt: string;
    sections: LongFormSection[];
    /** Internal links offered at the end of the article. */
    related: { label: string; href: string }[];
};

export const ARTICLES: Article[] = [
    {
        slug: "planning-a-3bhk-interior-in-mumbai",
        title: "Planning a 3 BHK interior in Mumbai: where the time and money go",
        metaDescription:
            "A practical guide to planning a 3 BHK interior in Mumbai: the stages, a realistic timeline, where budgets move and the decisions worth making early.",
        excerpt:
            "The stages of a full home interior, a realistic timeline, and the handful of early decisions that decide whether the budget holds.",
        category: "Residential",
        datePublished: "2026-09-14",
        readingTime: "6 min read",
        image: photo("residential"),
        imageAlt: "Contemporary apartment living space — reference photograph",
        sections: [
            {
                id: "stages",
                heading: "The stages, in order",
                paragraphs: [
                    "A full home interior moves through the same stages whatever its size: brief and survey, layout, design development, working drawings, execution and handover. Skipping one does not save time; it moves the decision to site, where it costs more.",
                    "For a typical 3 BHK, allow four to six weeks of design before any work begins. It feels slow when you are paying rent elsewhere, but every week spent drawing removes several of rework later.",
                ],
            },
            {
                id: "budget",
                heading: "Where the budget actually moves",
                paragraphs: [
                    "Joinery is usually the largest single line: wardrobes, kitchen, vanities and storage walls. The finish you choose for it — laminate, veneer, lacquer — swings the total more than almost any other decision.",
                    "Stone, air-conditioning and lighting follow. Loose furniture and soft furnishings are best budgeted separately, because they are the easiest items to phase if you need to.",
                ],
            },
            {
                id: "early-decisions",
                heading: "Decisions worth making early",
                paragraphs: [
                    "Fix the layout, the kitchen configuration and the air-conditioning type before anything else. All three determine civil and electrical work, and all three are expensive to revisit once the ceiling is closed.",
                    "Everything that sits on top — colours, fabrics, artwork — can wait, and is often better chosen once you can stand in the rooms.",
                ],
            },
        ],
        related: [
            { label: "Residential interior design", href: "/services/residential-interior-design" },
            { label: "Our design process", href: "/consultation/process" },
        ],
    },
    {
        slug: "monsoon-proof-materials-for-coastal-homes",
        title: "Monsoon-proof materials: what lasts in a coastal home",
        metaDescription:
            "Which interior materials survive Mumbai's humidity and monsoon: plywood grades, veneers, stone, metals and fabrics, and the details that protect them.",
        excerpt:
            "Humidity, salt air and four months of rain are hard on interiors. A material-by-material look at what holds up, and what does not.",
        category: "Materials",
        datePublished: "2026-08-02",
        readingTime: "5 min read",
        image: photo("styles"),
        imageAlt: "Living room with layered natural materials — reference photograph",
        sections: [
            {
                id: "timber",
                heading: "Timber and board",
                paragraphs: [
                    "The carcass matters more than the face. Boiling-water-resistant plywood in kitchens, bathrooms and anywhere near an external wall is the single most useful upgrade in a coastal home.",
                    "Veneers perform well when sealed on every face, including the edges nobody sees. Solid timber moves with humidity, so it needs detailing that lets it.",
                ],
            },
            {
                id: "stone-and-metal",
                heading: "Stone and metal",
                paragraphs: [
                    "Dense stones cope best. Porous marbles need sealing on installation and again every couple of years, particularly on window sills and bathroom thresholds.",
                    "For metal, specify stainless steel of a marine grade or properly coated brass. Plated finishes pit quickly within a few kilometres of the sea.",
                ],
            },
            {
                id: "details",
                heading: "The details that protect everything else",
                paragraphs: [
                    "Most monsoon damage is a detailing failure, not a material one: a wardrobe built hard against a damp wall, a skirting with no gap, a balcony threshold with no upstand.",
                    "Leave ventilation gaps behind joinery on external walls, raise carcasses off the floor, and waterproof wet areas well beyond the shower itself.",
                ],
            },
        ],
        related: [
            { label: "Explore materials by style", href: "/portfolio/styles" },
            { label: "Landscape and terrace garden design", href: "/services/landscape-design" },
        ],
    },
    {
        slug: "how-lighting-layers-change-a-room",
        title: "Ambient, task, accent: how three layers of light change a room",
        metaDescription:
            "How layered lighting works in an interior: what ambient, task and accent light each do, how to circuit them, and the mistakes that flatten a room.",
        excerpt:
            "A grid of downlights is the most common lighting mistake in Indian homes. What to do instead, layer by layer.",
        category: "Lighting",
        datePublished: "2026-06-21",
        readingTime: "4 min read",
        image: photo("awards"),
        imageAlt: "Interior with warm layered lighting — reference photograph",
        sections: [
            {
                id: "three-layers",
                heading: "What each layer does",
                paragraphs: [
                    "Ambient light fills the room softly, usually from a cove or concealed source. Task light is for doing things: cooking, reading, working. Accent light is for looking at things: art, texture, a stone wall.",
                    "A room lit by only one of these feels wrong in a way most people sense but cannot name. With all three it has depth, and somewhere for the eye to rest.",
                ],
            },
            {
                id: "circuits",
                heading: "Circuit them separately",
                paragraphs: [
                    "The layers only work if you can control them independently. Three circuits and three dimmers give you a bright room for cleaning, a soft one for dinner and a low one for a film, from the same fittings.",
                    "This is planned on the electrical drawing, before the ceiling is built. It is very difficult to add afterwards.",
                ],
            },
            {
                id: "mistakes",
                heading: "Common mistakes",
                paragraphs: [
                    "Too many downlights, all on one switch. Colour temperatures mixed within a room. Fittings placed over walkways instead of over the surfaces you use.",
                    "Fewer fittings in better places almost always produce a better room, and a lower electricity bill.",
                ],
            },
        ],
        related: [
            { label: "Architectural lighting design", href: "/services/lighting-design" },
            { label: "See it before it is built", href: "/consultation/virtual-tours" },
        ],
    },
];

export function findArticle(slug: string): Article | undefined {
    return ARTICLES.find((article) => article.slug === slug);
}
