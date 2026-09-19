import { Building2, Cuboid, Lightbulb, Palette, Scan, Trees } from "lucide-react";

import type { Service } from "@/types/content";

/**
 * Services offered, in the order they appear on the home page.
 *
 * `slug` anticipates /spaces/[vertical] and per-service pages in Phase 3.
 * Per-item `color` has been dropped in favour of the shared accent rotation in
 * src/lib/accents.ts — these carried six hexes from six unrelated palettes.
 *
 * ⚠️ COPY — the titles and descriptions here are written in a sci-fi register
 * ("ecosystems", "photonics engineering") that does not match a luxury
 * interior studio, and none of them lead with the terms a buyer searches for.
 * Phase 4 rewrites them to their searched forms (Residential Interior Design,
 * Commercial & Office Interior Design, Architectural Lighting Design, …).
 */
export const SERVICES: Service[] = [
    {
        slug: "residential-interior-design",
        title: "Residential Interior Ecosystems",
        description:
            "Curating bespoke living environments that blend ergonomic comfort with high-end aesthetic precision. Experience personalized luxury.",
        icon: Palette,
        keywords: ["Luxury Interiors", "Home Styling", "Bespoke Design"],
    },
    {
        slug: "space-planning",
        title: "Smart Space Optimization",
        description:
            "Utilizing data-driven layouts to maximize utility and flow. We engineer spaces that breathe and adapt to your modern lifestyle.",
        icon: Scan,
        keywords: ["Floor Planning", "Spatial Logic", "Efficiency"],
    },
    {
        slug: "commercial-interior-design",
        title: "Commercial & Tech Hubs",
        description:
            "Future-proof office architectures designed for collaboration and productivity. Redefining the corporate workspace experience.",
        icon: Building2,
        keywords: ["Office Design", "Corporate Branding", "Workspaces"],
    },
    {
        slug: "landscape-design",
        title: "Sustainable Landscapes",
        description:
            "Eco-conscious outdoor designs that harmonize nature with architecture. Create a serene, green sanctuary right at your doorstep.",
        icon: Trees,
        keywords: ["Landscape Arch", "Eco-Design", "Outdoor Living"],
    },
    {
        slug: "lighting-design",
        title: "Intelligent Lighting Systems",
        description:
            "Automated and mood-adaptive lighting solutions. Transform atmospheres instantly with our cutting-edge photonics engineering.",
        icon: Lightbulb,
        keywords: ["Smart Lighting", "Ambiance", "Energy Saving"],
    },
    {
        slug: "3d-visualisation",
        title: "3D Visualization & VR",
        description:
            "Immersive virtual reality walkthroughs and hyper-realistic renders. Visualize your dream project before the first brick is laid.",
        icon: Cuboid,
        keywords: ["3D Rendering", "VR Walkthrough", "Digital Twin"],
    },
];
