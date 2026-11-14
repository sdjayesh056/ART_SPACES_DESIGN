import { BedDouble, Coffee, Laptop, Leaf, type LucideIcon, Minus, Sofa, Trees } from "lucide-react";

import { BRASS, CLAY, CREAM, GREEN, WOOD } from "@/components/illustrations/iso";
import type { RoomId, Tone } from "@/components/illustrations/room-kit";

/**
 * Everything the design studio on the virtual tours page offers: the rooms,
 * the starting styles, the finishes and the five steps. Each step is one of
 * the studio's services, so the visitor meets the services by using them.
 *
 * The colours here are paints, floors and fabrics — real materials, like
 * palette.ts — which is why they are hex values and not brand tokens.
 */

export type RoomOption = { id: RoomId; label: string; sector: string; icon: LucideIcon };
export const ROOMS: RoomOption[] = [
    { id: "living", label: "Living room", sector: "Residential", icon: Sofa },
    { id: "bedroom", label: "Bedroom", sector: "Residential", icon: BedDouble },
    { id: "workspace", label: "Workspace", sector: "Commercial", icon: Laptop },
    { id: "cafe", label: "Café", sector: "Hospitality", icon: Coffee },
];

export type Paint = { label: string; wall: string; shade: string };
export const PAINTS: Paint[] = [
    { label: "Chalk", wall: "#F7F2E8", shade: "#ECE4D4" },
    { label: "Sage", wall: "#DCE3D2", shade: "#CAD3BE" },
    { label: "Clay", wall: "#EBD5C4", shade: "#DEC3AF" },
    { label: "Mist", wall: "#DDE5E8", shade: "#CBD5DA" },
    { label: "Olive", wall: "#8A9C82", shade: "#798B72" },
];

export type Floor = { label: string; base: string; line: string; kind: "planks" | "tiles" | "marble" };
export const FLOORS: Floor[] = [
    { label: "Oak", base: "#DDBE96", line: "#B99364", kind: "planks" },
    { label: "Walnut", base: "#9A7352", line: "#7A593D", kind: "planks" },
    { label: "Marble", base: "#EEECE6", line: "#C9C4BA", kind: "marble" },
    { label: "Terrazzo", base: "#DAD6CD", line: "#B8B3A9", kind: "tiles" },
];

export type Fabric = { label: string; tone: Tone };
export const FABRICS: Fabric[] = [
    { label: "Sage", tone: GREEN },
    { label: "Linen", tone: CREAM },
    { label: "Terracotta", tone: CLAY },
    { label: "Slate", tone: { top: "#7B8A93", left: "#687780", right: "#59666E" } },
    { label: "Mustard", tone: BRASS },
];

const WALNUT: Tone = { top: "#9A7352", left: "#7F5E42", right: "#684C35" };

/** A starting point: indexes into PAINTS, FLOORS and FABRICS, plus the timber the furniture is made in. */
export type Style = { label: string; paint: number; floor: number; fabric: number; timber: Tone };
export const STYLES: Style[] = [
    { label: "Warm Minimal", paint: 0, floor: 0, fabric: 0, timber: WOOD },
    { label: "Modern Luxe", paint: 4, floor: 2, fabric: 4, timber: WALNUT },
    { label: "Earthy Japandi", paint: 2, floor: 0, fabric: 1, timber: WALNUT },
    { label: "Urban Loft", paint: 3, floor: 3, fabric: 3, timber: WALNUT },
];

/** Presets on the day-to-night slider, 0 to 100. */
export const MOODS = [
    { label: "Daylight", value: 0 },
    { label: "Golden hour", value: 50 },
    { label: "After dark", value: 100 },
];

export const GREENS: { label: string; blurb: string; icon: LucideIcon }[] = [
    { label: "Clean lines", blurb: "No planting. The furniture and the light do the work.", icon: Minus },
    { label: "A few plants", blurb: "One statement plant and a little green on the surfaces.", icon: Leaf },
    { label: "Indoor garden", blurb: "A tree, floor planters and trailing green up high.", icon: Trees },
];

/** One step per service. `slug` links to that service's page. */
export const DESIGN_STEPS = [
    {
        service: "Space planning",
        slug: "space-planning",
        question: "Which room shall we design?",
        help: "Every project starts as a measured plan. Pick a room and it is drawn to scale, with the way in dotted from the door.",
    },
    {
        service: "Interior design",
        slug: "residential-interior-design",
        question: "Choose a style, then make it yours",
        help: "Start from a look you like, then change the walls, the floor and the fabric until it feels right.",
    },
    {
        service: "Lighting design",
        slug: "lighting-design",
        question: "Set the mood",
        help: "Drag from daylight to after dark and watch the lamps take over from the window.",
    },
    {
        service: "Landscape design",
        slug: "landscape-design",
        question: "How much green?",
        help: "Planting is designed with the room, not added at the end.",
    },
    {
        service: "3D visualisation",
        slug: "3d-visualisation",
        question: "Your room is ready",
        help: "This is a quick sketch. Send it to a designer and the next one is built from your own floor plan, to walk through before anything is bought.",
    },
];
