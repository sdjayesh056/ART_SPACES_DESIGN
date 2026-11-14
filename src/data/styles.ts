/**
 * Interior styles for /portfolio/styles.
 *
 * ⚠️ PLACEHOLDER — the style descriptions are general design knowledge and
 * safe to keep, but the `projects` mapping ties each style to a placeholder
 * project and must be redone once real work is photographed.
 *
 * Swatch colours are DATA (the palette being described), not UI colour, which
 * is why they are hex literals here and never appear in a .tsx file.
 */
export type Swatch = { name: string; hex: string };

export type InteriorStyle = {
    id: string;
    name: string;
    summary: string;
    description: string;
    palette: Swatch[];
    materials: string[];
    suits: string;
    /** Slugs from PROJECTS. */
    projects: string[];
};

export const STYLES: InteriorStyle[] = [
    {
        id: "contemporary-minimal",
        name: "Contemporary Minimal",
        summary: "Calm, uncluttered rooms where proportion and light do the work.",
        description:
            "Few materials, used generously. Storage is built in and handle-free, surfaces are quiet, and one or two strong pieces are given room to breathe. It suits compact city apartments particularly well, because nothing competes for attention.",
        palette: [
            { name: "Chalk", hex: "#F4F1EA" },
            { name: "Stone", hex: "#CFC9BD" },
            { name: "Ash oak", hex: "#B9A387" },
            { name: "Graphite", hex: "#3A3C3F" },
        ],
        materials: ["Ash or oak veneer", "Microcement", "Matt lacquer", "Linen"],
        suits: "Apartments, studios, clinics",
        projects: ["next-gen-retail-experience", "avant-garde-tech-hq"],
    },
    {
        id: "modern-luxury",
        name: "Modern Luxury",
        summary: "Rich materials and precise detailing, without ornament for its own sake.",
        description:
            "Book-matched stone, deep veneers, brass or bronze accents and upholstery you want to touch. The luxury is in the quality of making and the lighting, so the rooms feel expensive without feeling loud.",
        palette: [
            { name: "Ivory", hex: "#EFE8DC" },
            { name: "Travertine", hex: "#D8C7AC" },
            { name: "Walnut", hex: "#5C4033" },
            { name: "Aged brass", hex: "#B08D57" },
            { name: "Deep green", hex: "#1F3D2E" },
        ],
        materials: ["Italian marble", "Walnut veneer", "Aged brass", "Bouclé and velvet"],
        suits: "Penthouses, villas, suites",
        projects: ["eco-futuristic-smart-villa", "neoclassical-boutique-hotel"],
    },
    {
        id: "japandi",
        name: "Japandi",
        summary: "Japanese restraint meets Scandinavian warmth.",
        description:
            "Low furniture, pale timber, hand-finished plaster and a great deal of empty space. Every object is useful or loved. It is the quietest style we work in, and the least forgiving of clutter.",
        palette: [
            { name: "Rice paper", hex: "#F2EDE4" },
            { name: "Clay", hex: "#C9B8A3" },
            { name: "Pale oak", hex: "#C8AD8A" },
            { name: "Moss", hex: "#6E7B5A" },
            { name: "Charcoal", hex: "#2F2F2D" },
        ],
        materials: ["Pale oak", "Lime plaster", "Paper and cane", "Honed stone"],
        suits: "Bedrooms, spas, weekend homes",
        projects: ["minimalist-zen-spa-retreat"],
    },
    {
        id: "industrial-loft",
        name: "Industrial Loft",
        summary: "Honest structure, raw texture and generous volume.",
        description:
            "Exposed brick, concrete and steel, softened with leather, timber and warm light. It works where the building has real bones to show, and looks forced where it does not.",
        palette: [
            { name: "Concrete", hex: "#A7A6A2" },
            { name: "Brick", hex: "#9C5A44" },
            { name: "Tan leather", hex: "#A8763E" },
            { name: "Blackened steel", hex: "#2B2D2F" },
        ],
        materials: ["Exposed brick", "Blackened steel", "Polished concrete", "Aniline leather"],
        suits: "Mill conversions, studios, cafés",
        projects: ["urban-industrial-loft", "avant-garde-tech-hq"],
    },
    {
        id: "indian-contemporary",
        name: "Indian Contemporary",
        summary: "Craft, colour and pattern, edited for a modern home.",
        description:
            "Hand-carved timber, inlay, block-printed textiles and brass used with discipline, against calm backgrounds. Traditional craft is commissioned from the people who still practise it, then given a clean, contemporary setting.",
        palette: [
            { name: "Lime wash", hex: "#F3EBDD" },
            { name: "Teak", hex: "#8A5A36" },
            { name: "Marigold", hex: "#D99A2B" },
            { name: "Indigo", hex: "#2E3F66" },
            { name: "Terracotta", hex: "#B5593C" },
        ],
        materials: ["Teak and rosewood", "Brass inlay", "Handloom textiles", "Kota and Jaisalmer stone"],
        suits: "Family homes, restaurants, boutique hotels",
        projects: ["eco-futuristic-smart-villa"],
    },
    {
        id: "neoclassical",
        name: "Neoclassical",
        summary: "Symmetry, panelling and proportion, lightened for today.",
        description:
            "Wall mouldings, cornices, herringbone floors and classical proportion, paired with contemporary furniture so the room never becomes a period set. It rewards high ceilings and good daylight.",
        palette: [
            { name: "Porcelain", hex: "#F5F2EC" },
            { name: "Greige", hex: "#D5CEC2" },
            { name: "Dusty blue", hex: "#8FA3B0" },
            { name: "Gilt", hex: "#B89A5E" },
        ],
        materials: ["Wall panelling", "Herringbone oak", "Carrara marble", "Antique brass"],
        suits: "Heritage buildings, formal living rooms, hotels",
        projects: ["neoclassical-boutique-hotel"],
    },
    {
        id: "biophilic",
        name: "Biophilic",
        summary: "Interiors built around daylight, planting and natural material.",
        description:
            "Planting is designed in, not added: irrigated planters, green walls and views to them from where you sit. Natural light is maximised, materials are tactile and untreated where possible, and the air is noticeably better.",
        palette: [
            { name: "Sand", hex: "#E6DCC8" },
            { name: "Rattan", hex: "#C4A574" },
            { name: "Fern", hex: "#5E7F4F" },
            { name: "Forest", hex: "#24452F" },
        ],
        materials: ["Reclaimed timber", "Rattan and cane", "Terracotta", "Living green walls"],
        suits: "Workplaces, wellness spaces, villas",
        projects: ["eco-futuristic-smart-villa", "futuristic-health-centre"],
    },
];
