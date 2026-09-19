import type { Project, ProjectCategory } from "@/types/content";

/**
 * Portfolio projects.
 *
 * ⚠️ PLACEHOLDER IMAGERY — all eight entries point at one of two stock PNGs.
 * Phase 4 replaces these with real photography, one per project, and adds at
 * least one genuine Retail project so every vertical the studio sells has
 * proof behind it.
 *
 * "Next-Gen Retail Experience" was filed under Commercial despite being the
 * only retail work on the site, which left the advertised Retail vertical
 * with zero examples. Recategorised.
 */
export const PROJECTS: Project[] = [
    {
        slug: "eco-futuristic-smart-villa",
        title: "Eco-Futuristic Smart Villa",
        category: "Residential",
        image: "/portfolio-1.png",
        description:
            "A sustainable masterpiece featuring automated climate control, biophilic interiors, and energy-efficient lighting systems.",
        highlight: "35% lower energy use",
    },
    {
        slug: "avant-garde-tech-hq",
        title: "Avant-Garde Tech HQ",
        category: "Commercial",
        image: "/portfolio-2.png",
        description:
            "A hyper-collaborative workspace engineered for productivity, featuring sound-proof pods and modular meeting zones.",
        highlight: "Seats 500+",
    },
    {
        slug: "minimalist-zen-spa-retreat",
        title: "Minimalist Zen Spa Retreat",
        category: "Hospitality",
        image: "/portfolio-1.png",
        description:
            "An ultra-luxury wellness sanctuary emphasizing negative space, natural stone textures, and therapeutic lighting design.",
        highlight: "5-star rated",
    },
    {
        slug: "urban-industrial-loft",
        title: "Urban Industrial Loft",
        category: "Residential",
        image: "/portfolio-2.png",
        description:
            "Transforming a raw warehouse into a sophisticated living space with exposed brick, steel beams, and smart glass partitions.",
        highlight: "Gold award winner",
    },
    {
        slug: "next-gen-retail-experience",
        title: "Next-Gen Retail Experience",
        category: "Retail",
        image: "/portfolio-1.png",
        description:
            "A futuristic retail showroom integrating AR mirrors, interactive displays, and dynamic flow layouts.",
        highlight: "200% more footfall",
    },
    {
        slug: "neoclassical-boutique-hotel",
        title: "Neoclassical Boutique Hotel",
        category: "Hospitality",
        image: "/portfolio-2.png",
        description:
            "A seamless blend of historical grandeur and contemporary luxury, featuring restored architectural details.",
        highlight: "Heritage restoration",
    },
    {
        slug: "smart-educational-hub",
        title: "Smart Educational Hub",
        category: "Institutional",
        image: "/portfolio-1.png",
        description:
            "A smart campus designed for interactive learning, featuring digital classrooms, collaborative labs, and energy-efficient systems.",
        highlight: "Capacity for 1,000",
    },
    {
        slug: "futuristic-health-centre",
        title: "Futuristic Health Centre",
        category: "Healthcare",
        image: "/portfolio-2.png",
        description:
            "A state-of-the-art medical facility integrating advanced technology, patient-centric design, and biophilic elements for healing.",
        highlight: "200+ beds",
    },
];

/**
 * Filter tabs, DERIVED from the projects above rather than hand-listed.
 *
 * The previous hardcoded list omitted Institutional and Healthcare, so two of
 * the eight projects could not be reached by any filter.
 */
export const PROJECT_FILTERS: ("All" | ProjectCategory)[] = [
    "All",
    ...([...new Set(PROJECTS.map((project) => project.category))] as ProjectCategory[]),
];
