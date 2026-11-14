import type { Project, ProjectCategory } from "@/types/content";

import { HERO_PHOTO, photo } from "./photos";

/**
 * Portfolio projects.
 *
 * ⚠️ PLACEHOLDER — imagery AND case-study facts. All eight entries point at
 * one of two stock PNGs, and every location, year, area, brief, approach and
 * outcome below is illustrative copy written to prove the case-study template.
 * None of it describes a real commission. Replace per project with the
 * studio's own photography and facts before launch.
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
        location: "Alibaug",
        year: "2025",
        area: "6,200 sq ft",
        scope: ["Interior design", "Lighting design", "Landscape", "Turnkey execution"],
        brief: "A family of five wanted a weekend home that ran cool without constant air-conditioning, opened fully to its garden and needed almost no upkeep between visits.",
        approach: "We planned every principal room for cross-ventilation, shaded the western face with deep verandahs and used lime plaster, local stone and reclaimed teak throughout. Lighting and climate run on scenes, so the house can be closed up or woken with one touch.",
        outcome: "The villa stays comfortable for most of the year on ceiling fans alone, and its measured energy use is roughly a third lower than a comparable conventionally built home.",
    },
    {
        slug: "avant-garde-tech-hq",
        title: "Avant-Garde Tech HQ",
        category: "Commercial",
        image: "/portfolio-2.png",
        description:
            "A hyper-collaborative workspace engineered for productivity, featuring sound-proof pods and modular meeting zones.",
        highlight: "Seats 500+",
        location: "Bandra Kurla Complex, Mumbai",
        year: "2024",
        area: "48,000 sq ft",
        scope: ["Workplace strategy", "Interior design", "Acoustics", "Design and build"],
        brief: "A fast-growing technology company needed two floors that could seat five hundred people, absorb another hundred within a year, and stop meetings spilling into the open office.",
        approach: "A utilisation study set the ratio of desks to rooms. We ringed the floor with enclosed rooms and phone pods, kept the centre for focused work and placed a café at the stair so both floors meet daily. Furniture is modular and re-plannable over a weekend.",
        outcome: "The office opened on programme, and the planned expansion was absorbed without building work by re-planning two neighbourhoods of desks.",
    },
    {
        slug: "minimalist-zen-spa-retreat",
        title: "Minimalist Zen Spa Retreat",
        category: "Hospitality",
        image: "/portfolio-1.png",
        description:
            "An ultra-luxury wellness sanctuary emphasizing negative space, natural stone textures, and therapeutic lighting design.",
        highlight: "5-star rated",
        location: "Lonavala",
        year: "2024",
        area: "9,500 sq ft",
        scope: ["Concept design", "Interior design", "Lighting design", "FF&E specification"],
        brief: "The operator asked for a spa that felt silent: no visible services, no signage clutter, and a guest journey that slowed people down from the moment they arrived.",
        approach: "We removed everything that was not needed. Treatment rooms are lined in honed stone and oiled timber, services are concealed behind flush panels, and light is low, warm and always indirect. The route from reception to treatment is deliberately long and dim.",
        outcome: "The spa trades as the property's signature amenity, and its interiors have needed no refurbishment through two monsoon seasons of heavy use.",
    },
    {
        slug: "urban-industrial-loft",
        title: "Urban Industrial Loft",
        category: "Residential",
        image: "/portfolio-2.png",
        description:
            "Transforming a raw warehouse into a sophisticated living space with exposed brick, steel beams, and smart glass partitions.",
        highlight: "Gold award winner",
        location: "Lower Parel, Mumbai",
        year: "2023",
        area: "3,400 sq ft",
        scope: ["Space planning", "Interior design", "Custom joinery", "Turnkey execution"],
        brief: "A couple bought a former mill unit for its volume and wanted to live in it without losing the height, the brick or the steel that made them buy it.",
        approach: "The plan keeps the full double height over the living space and tucks bedrooms onto a new mezzanine. Original brick was cleaned and sealed, new steel was detailed to match the old, and switchable glass gives the bedrooms privacy without walls.",
        outcome: "A two-bedroom home that still reads as one industrial room. The project was recognised in a national residential design awards programme.",
    },
    {
        slug: "next-gen-retail-experience",
        title: "Next-Gen Retail Experience",
        category: "Retail",
        image: "/portfolio-1.png",
        description:
            "A futuristic retail showroom integrating AR mirrors, interactive displays, and dynamic flow layouts.",
        highlight: "200% more footfall",
        location: "Bandra West, Mumbai",
        year: "2025",
        area: "2,800 sq ft",
        scope: ["Retail concept", "Interior design", "Lighting design", "Mall approvals"],
        brief: "A lifestyle brand opening its first flagship wanted a store people would walk into from the atrium, stay in, and photograph.",
        approach: "We opened the whole frontage, set a single sculptural display at the threshold and drew a clear loop past every category to a cash desk at the back. Fixtures are a re-usable kit, and accent lighting is tuned to the product rather than the floor.",
        outcome: "Footfall in the first quarter ran at around three times the brand's previous shop-in-shop, and the fixture kit has since been reused for a second store.",
    },
    {
        slug: "neoclassical-boutique-hotel",
        title: "Neoclassical Boutique Hotel",
        category: "Hospitality",
        image: "/portfolio-2.png",
        description:
            "A seamless blend of historical grandeur and contemporary luxury, featuring restored architectural details.",
        highlight: "Heritage restoration",
        location: "Fort, Mumbai",
        year: "2023",
        area: "22,000 sq ft",
        scope: ["Heritage interior design", "Guest rooms and suites", "Public areas", "FF&E specification"],
        brief: "The owners of a listed building wanted twenty-four keys and a restaurant inserted without harming the cornices, staircases and floors that gave it its character.",
        approach: "A mock-up room settled every detail before roll-out. New services run in reversible joinery rather than chased into old walls, original floors were lifted, repaired and relaid, and new pieces are plainly contemporary so the old fabric reads clearly.",
        outcome: "The hotel opened with its heritage features intact and visible, and the mock-up process kept the guest-room fit-out within its original budget.",
    },
    {
        slug: "smart-educational-hub",
        title: "Smart Educational Hub",
        category: "Institutional",
        image: "/portfolio-1.png",
        description:
            "A smart campus designed for interactive learning, featuring digital classrooms, collaborative labs, and energy-efficient systems.",
        highlight: "Capacity for 1,000",
        location: "Pune",
        year: "2024",
        area: "65,000 sq ft",
        scope: ["Interior design", "Learning-space planning", "Lighting design", "Furniture specification"],
        brief: "A school trust wanted classrooms that could switch between lecture, group and project work in minutes, and corridors that were more than circulation.",
        approach: "Classrooms have mobile furniture, writable walls and daylight on two sides. Corridors widen into break-out bays with seating and display, and finishes were chosen for durability and easy repair over a twenty-year life.",
        outcome: "Teachers reconfigure rooms daily without help, and the break-out bays have become the most used spaces on campus.",
    },
    {
        slug: "futuristic-health-centre",
        title: "Futuristic Health Centre",
        category: "Healthcare",
        image: "/portfolio-2.png",
        description:
            "A state-of-the-art medical facility integrating advanced technology, patient-centric design, and biophilic elements for healing.",
        highlight: "200+ beds",
        location: "Ahmedabad",
        year: "2025",
        area: "1,10,000 sq ft",
        scope: ["Interior design", "Wayfinding", "Lighting design", "Patient-room mock-up"],
        brief: "A hospital group wanted a facility that felt less clinical to patients and families without compromising infection control or staff workflow.",
        approach: "We separated public, patient and service routes on plan, brought daylight and planting into waiting areas and used warm, cleanable finishes in patient rooms. Wayfinding relies on colour and landmark rather than long signs.",
        outcome: "Patient-room details were proven in a full-scale mock-up before roll-out, which removed most site changes during fit-out.",
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

/** The project the portfolio page leads with. */
export const FEATURED_PROJECT = PROJECTS[0];

export function findProject(slug: string): Project | undefined {
    return PROJECTS.find((project) => project.slug === slug);
}

/** The project after this one, wrapping at the end — the case study's onward link. */
export function nextProject(slug: string): Project {
    const index = PROJECTS.findIndex((project) => project.slug === slug);
    return PROJECTS[(index + 1) % PROJECTS.length];
}

/**
 * Gallery frames for a case study.
 *
 * ⚠️ PLACEHOLDER — there is no per-project photography yet, so every case
 * study shows the same three supporting images. Replace with a `gallery`
 * field per project when real photographs arrive.
 */
export function galleryFor(project: Project): { src: string; alt: string }[] {
    return [
        { src: photo("awards"), alt: `${project.title} — interior detail, reference photograph` },
        { src: photo("styles"), alt: `${project.title} — furnished living area, reference photograph` },
        { src: project.image === "/portfolio-1.png" ? HERO_PHOTO : photo("residential"), alt: `${project.title} — materials and light, reference photograph` },
    ];
}
