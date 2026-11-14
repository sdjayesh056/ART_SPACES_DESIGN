import { BRASS, CLAY, CREAM, DEEP, G500, G600, G700 } from "./iso";
import { MATERIAL as M } from "./palette";

/**
 * Rooms for the design studio, described as data so one camera can turn them,
 * flatten them into a plan and relight them. `buildRoom` furnishes a room in
 * the fabric and timber the visitor picked.
 *
 * Coordinates match iso.tsx: a 6 x 6 unit floor with its back corner at the
 * origin, one unit to roughly a metre. Solid boxes must not intersect — the
 * painter's ordering in Stage3D relies on it. Touching is fine.
 */

export type Tone = { top: string; left: string; right: string };

export type RoomItem =
    | { kind: "box"; x: number; y: number; z: number; w: number; d: number; h: number; tone: Tone; glass: boolean }
    | { kind: "ball"; x: number; y: number; z: number; r: number; fill: string }
    /** `hung` is the height its cord drops from; leave it out for a lamp that stands. */
    | { kind: "light"; x: number; y: number; z: number; hung?: number };

/** A window or a framed piece on one of the two back walls. */
export type RoomDecal = { wall: "x" | "y"; kind: "window" | "art"; from: number; to: number; sill: number; head: number };

export type RoomScene = {
    title: string;
    items: RoomItem[];
    decals: RoomDecal[];
    /** The walking route from the door, drawn on the plan. */
    route: [number, number][];
};

export type RoomId = "living" | "bedroom" | "workspace" | "cafe";
export type RoomLook = { fabric: Tone; timber: Tone; green: 0 | 1 | 2 };

export const ROOM_HEIGHT = 3.2;
const H = ROOM_HEIGHT;

const LINEN: Tone = CREAM;
const PALE: Tone = { top: M.rug, left: M.creamShade, right: M.creamShade };
const STONE: Tone = { top: M.concrete, left: M.concreteLine, right: M.concreteLine };
const GLASS: Tone = { top: M.skyLight, left: M.sky, right: M.sky };
const TRUNK: Tone = { top: M.wood, left: M.woodDark, right: M.woodDark };

const box = (x: number, y: number, w: number, d: number, h: number, tone: Tone, z = 0, glass = false): RoomItem => ({ kind: "box", x, y, z, w, d, h, tone, glass });
const ball = (x: number, y: number, z: number, r: number, fill: string): RoomItem => ({ kind: "ball", x, y, z, r, fill });
const light = (x: number, y: number, z: number, hung?: number): RoomItem => ({ kind: "light", x, y, z, hung });

/** Four legs and a top. */
const table = (x: number, y: number, w: number, d: number, h: number, tone: Tone): RoomItem[] => [
    box(x + 0.06, y + 0.06, 0.08, 0.08, h - 0.07, tone),
    box(x + w - 0.14, y + 0.06, 0.08, 0.08, h - 0.07, tone),
    box(x + 0.06, y + d - 0.14, 0.08, 0.08, h - 0.07, tone),
    box(x + w - 0.14, y + d - 0.14, 0.08, 0.08, h - 0.07, tone),
    box(x, y, w, d, 0.07, tone, h - 0.07),
];
/** `back` is the side its backrest stands on: -1 toward the far wall, 1 toward the eye. */
const chair = (x: number, y: number, tone: Tone, back: 1 | -1): RoomItem[] => [box(x, y, 0.44, 0.44, 0.44, tone), box(x, back === 1 ? y + 0.44 : y - 0.08, 0.44, 0.08, 0.9, tone)];
/** A sofa with its back to the left-hand wall: back, two arms, seat and two cushions. */
const sofa = (x: number, y: number, length: number, tone: Tone): RoomItem[] => [
    box(x, y, 0.28, length, 0.92, tone),
    box(x + 0.28, y, 0.85, 0.2, 0.62, tone),
    box(x + 0.28, y + length - 0.2, 0.85, 0.2, 0.62, tone),
    box(x + 0.28, y + 0.2, 0.85, length - 0.4, 0.42, tone),
    box(x + 0.3, y + 0.32, 0.2, 0.5, 0.32, BRASS, 0.42),
    box(x + 0.3, y + length - 0.82, 0.2, 0.5, 0.32, PALE, 0.42),
];
const armchair = (x: number, y: number): RoomItem[] => [box(x, y, 0.9, 0.8, 0.42, LINEN), box(x, y + 0.8, 0.9, 0.2, 0.9, LINEN)];
/** A bordered rug: two flat layers, drawn before anything stands on them. */
const rug = (x: number, y: number, w: number, d: number, tone: Tone): RoomItem[] => [box(x, y, w, d, 0.03, tone), box(x + 0.13, y + 0.13, w - 0.26, d - 0.26, 0.04, PALE)];
/** Curtains either side of a window on the left-hand wall. */
const curtains = (from: number, to: number): RoomItem[] => [box(0.03, from - 0.34, 0.1, 0.34, 2.7, LINEN), box(0.03, to, 0.1, 0.34, 2.7, LINEN)];
const plant = (x: number, y: number): RoomItem[] => [box(x, y, 0.45, 0.45, 0.55, CLAY), ball(x + 0.22, y + 0.22, 1.05, 0.42, G600), ball(x + 0.1, y + 0.3, 1.45, 0.3, G500)];
const tree = (x: number, y: number): RoomItem[] => [
    box(x, y, 0.4, 0.4, 0.45, STONE),
    box(x + 0.17, y + 0.17, 0.06, 0.06, 0.95, TRUNK, 0.45),
    ball(x + 0.2, y + 0.2, 1.75, 0.46, G600),
    ball(x + 0.02, y + 0.3, 2.15, 0.32, G500),
    ball(x + 0.4, y + 0.08, 2.1, 0.3, G700),
];

const ROOMS: Record<RoomId, (look: RoomLook) => RoomScene> = {
    living: ({ fabric, timber, green }) => ({
        title: "A living room: sofa, coffee table, sideboard, armchair, a floor lamp and a pendant",
        items: [
            ...rug(1.45, 1.35, 3.4, 3.4, fabric),
            ...sofa(0.25, 1.55, 3.1, fabric),
            ...table(2.35, 2.45, 1.0, 1.4, 0.36, timber),
            box(2.65, 2.9, 0.4, 0.5, 0.06, BRASS, 0.36),
            box(2.0, 0.15, 2.6, 0.5, 0.72, timber),
            ball(2.45, 0.4, 0.98, 0.2, M.clay),
            box(3.7, 0.22, 0.5, 0.3, 0.1, fabric, 0.72),
            ...armchair(3.7, 4.45),
            box(4.95, 4.65, 0.4, 0.4, 0.5, BRASS),
            box(0.3, 0.75, 0.08, 0.08, 1.5, BRASS),
            light(0.34, 0.79, 1.62),
            light(2.85, 3.15, 2.35, H),
            ...curtains(1.9, 4.3),
            ...(green >= 1 ? [...plant(5.2, 0.4), ball(5.15, 4.85, 0.72, 0.17, G500)] : []),
            ...(green === 2 ? [...tree(0.35, 5.2), ...plant(5.3, 5.3), ball(4.3, 0.4, 0.95, 0.2, G600)] : []),
        ],
        decals: [
            { wall: "x", kind: "window", from: 1.9, to: 4.3, sill: 1.15, head: 2.7 },
            { wall: "y", kind: "art", from: 2.5, to: 4.1, sill: 1.3, head: 2.4 },
        ],
        route: [
            [4.78, 5.9],
            [4.78, 4.15],
            [1.5, 4.15],
        ],
    }),
    bedroom: ({ fabric, timber, green }) => ({
        title: "A bedroom: bed and headboard, bedside tables with lamps, a wardrobe, a bench and a desk",
        items: [
            ...rug(1.3, 1.5, 3.6, 2.7, fabric),
            box(1.75, 0.12, 2.5, 0.24, 1.2, fabric),
            box(1.95, 0.36, 2.1, 2.35, 0.24, timber),
            box(1.95, 0.36, 2.1, 2.35, 0.2, LINEN, 0.24),
            box(2.1, 0.46, 0.75, 0.42, 0.14, PALE, 0.44),
            box(3.15, 0.46, 0.75, 0.42, 0.14, PALE, 0.44),
            box(1.95, 1.85, 2.1, 0.7, 0.05, fabric, 0.44),
            ...table(1.15, 0.2, 0.5, 0.5, 0.5, timber),
            light(1.4, 0.45, 0.82),
            ...table(4.35, 0.2, 0.5, 0.5, 0.5, timber),
            light(4.6, 0.45, 0.82),
            box(0.15, 3.3, 0.6, 2.4, 2.2, timber),
            box(2.4, 2.95, 1.2, 0.42, 0.4, fabric),
            ...table(5.3, 3.3, 0.55, 1.4, 0.72, timber),
            ...chair(4.78, 3.8, fabric, 1),
            light(3.0, 3.7, 2.35, H),
            ...curtains(0.9, 2.6),
            ...(green >= 1 ? [...plant(5.35, 5.35), ball(5.57, 3.55, 0.9, 0.16, G500)] : []),
            ...(green === 2 ? [...tree(0.3, 0.2), ...plant(1.2, 5.3)] : []),
        ],
        decals: [
            { wall: "x", kind: "window", from: 0.9, to: 2.6, sill: 1.1, head: 2.7 },
            { wall: "y", kind: "art", from: 2.4, to: 3.6, sill: 1.55, head: 2.5 },
        ],
        route: [
            [3.4, 5.9],
            [3.4, 3.65],
            [1.2, 3.65],
        ],
    }),
    workspace: ({ fabric, timber, green }) => ({
        title: "A workspace: bench desks with screens, a glazed meeting room, a lounge and storage",
        items: [
            ...rug(0.25, 3.35, 2.2, 1.1, fabric),
            ...table(0.9, 1.0, 2.6, 1.2, 0.72, timber),
            box(1.2, 1.57, 0.6, 0.06, 0.38, DEEP, 0.72),
            box(2.5, 1.57, 0.6, 0.06, 0.38, DEEP, 0.72),
            ...chair(1.25, 0.4, fabric, -1),
            ...chair(2.55, 0.4, fabric, -1),
            ...chair(1.25, 2.3, fabric, 1),
            ...chair(2.55, 2.3, fabric, 1),
            box(3.8, 3.4, 0.08, 2.6, 2.3, GLASS, 0, true),
            box(3.88, 3.4, 2.12, 0.08, 2.3, GLASS, 0, true),
            ...table(4.4, 4.2, 1.0, 1.4, 0.72, timber),
            box(3.95, 4.65, 0.4, 0.44, 0.44, LINEN),
            box(5.45, 4.65, 0.4, 0.44, 0.44, LINEN),
            box(0.4, 4.5, 1.8, 0.8, 0.42, fabric),
            box(0.4, 5.3, 1.8, 0.25, 0.85, fabric),
            ...table(0.95, 3.6, 0.7, 0.6, 0.32, BRASS),
            box(5.4, 1.2, 0.5, 1.8, 1.5, timber),
            light(2.2, 1.6, 2.35, H),
            light(4.9, 4.9, 2.45, H),
            light(1.3, 4.9, 2.45, H),
            ...(green >= 1 ? [box(4.3, 0.3, 1.5, 0.4, 0.6, LINEN), ball(4.6, 0.5, 0.95, 0.35, G600), ball(5.05, 0.5, 1.05, 0.38, G500), ball(5.5, 0.5, 0.95, 0.35, G700)] : []),
            ...(green === 2 ? [...tree(0.3, 0.3), ...plant(3.2, 5.3), ball(5.65, 1.6, 1.68, 0.2, G500)] : []),
        ],
        decals: [
            { wall: "x", kind: "window", from: 0.8, to: 5.2, sill: 1.0, head: 2.8 },
            { wall: "y", kind: "art", from: 1.4, to: 3.2, sill: 1.3, head: 2.45 },
        ],
        route: [
            [3.0, 5.9],
            [3.0, 3.05],
            [0.6, 3.05],
        ],
    }),
    cafe: ({ fabric, timber, green }) => ({
        title: "A café: a serving counter with stools, a bottle shelf, three tables and pendant lights",
        items: [
            box(0.2, 0.3, 0.6, 3.2, 1.0, timber),
            box(0.15, 0.25, 0.7, 3.3, 0.06, STONE, 1.0),
            box(0.3, 0.6, 0.4, 0.5, 0.35, DEEP, 1.06),
            ball(0.5, 2.6, 1.22, 0.18, M.clay),
            box(0.95, 1.2, 0.34, 0.34, 0.66, fabric),
            box(0.95, 2.2, 0.34, 0.34, 0.66, fabric),
            box(1.4, 0.05, 3.2, 0.26, 0.05, timber, 1.5),
            box(1.4, 0.05, 3.2, 0.26, 0.05, timber, 2.1),
            box(1.6, 0.1, 0.12, 0.12, 0.3, BRASS, 1.55),
            box(2.1, 0.1, 0.12, 0.12, 0.26, DEEP, 1.55),
            box(2.6, 0.1, 0.3, 0.14, 0.14, PALE, 1.55),
            box(3.4, 0.1, 0.12, 0.12, 0.3, DEEP, 1.55),
            box(4.0, 0.1, 0.12, 0.12, 0.24, BRASS, 1.55),
            box(1.8, 0.1, 0.3, 0.14, 0.14, PALE, 2.15),
            box(3.0, 0.1, 0.12, 0.12, 0.28, BRASS, 2.15),
            box(3.9, 0.1, 0.12, 0.12, 0.26, DEEP, 2.15),
            ...table(2.2, 2.2, 0.8, 0.8, 0.74, timber),
            ...chair(2.38, 1.68, fabric, -1),
            ...chair(2.38, 3.05, fabric, 1),
            ...table(4.0, 2.6, 0.8, 0.8, 0.74, timber),
            ...chair(4.18, 2.08, fabric, -1),
            ...chair(4.18, 3.45, fabric, 1),
            ...table(2.6, 4.6, 0.8, 0.8, 0.74, timber),
            ...chair(2.78, 4.08, fabric, -1),
            ...chair(2.78, 5.45, fabric, 1),
            light(2.6, 2.6, 2.1, H),
            light(4.4, 3.0, 2.1, H),
            light(3.0, 5.0, 2.1, H),
            ...(green >= 1 ? [...plant(5.3, 0.4), ball(2.6, 2.6, 0.9, 0.13, G500), ball(4.4, 3.0, 0.9, 0.13, G600)] : []),
            ...(green === 2 ? [...tree(5.3, 5.2), ...plant(0.3, 4.2), ball(4.6, 0.18, 2.35, 0.22, G600)] : []),
        ],
        decals: [
            { wall: "x", kind: "art", from: 0.8, to: 2.8, sill: 1.75, head: 2.6 },
            { wall: "y", kind: "window", from: 4.8, to: 5.8, sill: 0.9, head: 2.6 },
        ],
        route: [
            [5.05, 5.9],
            [5.05, 1.4],
            [1.6, 1.4],
        ],
    }),
};

export function buildRoom(id: RoomId, look: RoomLook): RoomScene {
    return ROOMS[id](look);
}
