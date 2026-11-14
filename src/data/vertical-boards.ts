import { RoomIllustration } from "@/components/illustrations/RoomIllustration";
import { OfficeScene, StoreScene, SuiteScene } from "@/components/illustrations/scenes";
import type { SwatchKind } from "@/components/illustrations/Swatch";
import type { Illustration } from "@/types/content";

/**
 * The "designer's board" for each vertical: colour palette, material samples
 * and where the numbered pins sit on its drawing.
 *
 * ⚠️ PLACEHOLDER — palettes and material picks are illustrative. Colours here
 * are DATA (the materials being shown), not UI colour, which is why they are
 * hex literals in this file and never in a .tsx file.
 */
export type Material = { name: string; note: string; kind: SwatchKind; base: string; line: string };

const MATERIALS = {
    oak: { name: "Natural oak veneer", note: "Warm, quiet grain. Sealed on every face for humidity.", kind: "grain", base: "#C9A77C", line: "#7A5630" },
    walnut: { name: "American walnut", note: "Depth and richness for joinery and panelling.", kind: "grain", base: "#6B4A36", line: "#2E1D13" },
    marble: { name: "Statuario marble", note: "Book-matched for vanities and feature walls.", kind: "vein", base: "#F1EEE8", line: "#8C8A86" },
    linen: { name: "Belgian linen", note: "Soft, breathable upholstery and drapery.", kind: "weave", base: "#D9CFBF", line: "#8F8676" },
    felt: { name: "Acoustic wool felt", note: "Absorbs sound in meeting rooms and booths.", kind: "weave", base: "#5E7F6B", line: "#1F3D2E" },
    brass: { name: "Aged brass", note: "Handles, inlay and light fittings that patinate well.", kind: "sheen", base: "#B8935A", line: "#6E5327" },
    terrazzo: { name: "Cast terrazzo", note: "Hard-wearing floors with a hand-made character.", kind: "chip", base: "#E7E1D6", line: "#8A5A36" },
    concrete: { name: "Polished concrete", note: "Seamless, durable and honest underfoot.", kind: "speckle", base: "#B4B2AD", line: "#4A4A48" },
    stone: { name: "Honed Kota stone", note: "A local stone that shrugs off monsoon and footfall.", kind: "speckle", base: "#8E9A8C", line: "#3F4A40" },
} satisfies Record<string, Material>;

type Board = {
    palette: { name: string; hex: string }[];
    materials: Material[];
    /** Pin positions over the drawing, in percent, one per approach point. */
    pins: { x: number; y: number }[];
    /** The filled isometric scene shown for this vertical. */
    drawing: Illustration;
    /** Labels pinned around the scene, clockwise from the top. */
    callouts: [string, string, string, string];
};

export const BOARDS: Record<string, Board> = {
    residential: {
        palette: [
            { name: "Chalk", hex: "#F4F1EA" },
            { name: "Oat", hex: "#D9CFBF" },
            { name: "Oak", hex: "#C9A77C" },
            { name: "Brass", hex: "#B8935A" },
            { name: "Forest", hex: "#1F3D2E" },
        ],
        materials: [MATERIALS.oak, MATERIALS.marble, MATERIALS.linen, MATERIALS.brass, MATERIALS.terrazzo],
        pins: [{ x: 50, y: 68 }, { x: 24, y: 44 }, { x: 66, y: 44 }, { x: 50, y: 30 }],
        drawing: RoomIllustration,
        callouts: ["Layered lighting", "Custom joinery", "Monsoon-proof materials", "Planned storage"],
    },
    commercial: {
        palette: [
            { name: "Paper", hex: "#F2F1EE" },
            { name: "Concrete", hex: "#B4B2AD" },
            { name: "Oak", hex: "#C9A77C" },
            { name: "Sage", hex: "#5E7F6B" },
            { name: "Graphite", hex: "#2F3133" },
        ],
        materials: [MATERIALS.concrete, MATERIALS.oak, MATERIALS.felt, MATERIALS.terrazzo, MATERIALS.brass],
        pins: [{ x: 28, y: 34 }, { x: 59, y: 24 }, { x: 74, y: 62 }, { x: 28, y: 70 }],
        drawing: OfficeScene,
        callouts: ["Glare-free lighting", "Daylit workpoints", "Acoustic panels", "Soft collaboration zone"],
    },
    hospitality: {
        palette: [
            { name: "Ivory", hex: "#EFE8DC" },
            { name: "Travertine", hex: "#D8C7AC" },
            { name: "Walnut", hex: "#6B4A36" },
            { name: "Brass", hex: "#B8935A" },
            { name: "Deep green", hex: "#1F3D2E" },
        ],
        materials: [MATERIALS.walnut, MATERIALS.marble, MATERIALS.brass, MATERIALS.linen, MATERIALS.stone],
        pins: [{ x: 19, y: 74 }, { x: 22, y: 34 }, { x: 51, y: 34 }, { x: 78, y: 42 }],
        drawing: SuiteScene,
        callouts: ["Scene-set lighting", "Blackout drapery", "Upholstered headboard wall", "Contract-grade fabrics"],
    },
    retail: {
        palette: [
            { name: "Gallery white", hex: "#F5F3EF" },
            { name: "Sand", hex: "#E7E1D6" },
            { name: "Oak", hex: "#C9A77C" },
            { name: "Brass", hex: "#B8935A" },
            { name: "Ink", hex: "#22262A" },
        ],
        materials: [MATERIALS.terrazzo, MATERIALS.oak, MATERIALS.brass, MATERIALS.concrete, MATERIALS.linen],
        pins: [{ x: 21, y: 52 }, { x: 50, y: 51 }, { x: 80, y: 52 }, { x: 78, y: 19 }],
        drawing: StoreScene,
        callouts: ["Accent on product", "Window that sells", "Flexible shelving wall", "A clear customer loop"],
    },
};
