import { MATERIAL } from "@/components/illustrations/palette";

/*
 * The pen set for the footer's site plan. Materials come from the shared
 * illustration palette, greens and golds from the brand tokens, and the few
 * tones in between are mixed from the two so they retune with the palette.
 * A .ts module because the colour lint rule bans hex in .tsx.
 */
const mix = (colour: string, share: number, into: string) => `color-mix(in srgb, ${colour} ${share}%, ${into})`;

export const TONE = {
    wall: MATERIAL.wall,
    floor: MATERIAL.floor,
    floorLine: MATERIAL.floorLine,
    wood: MATERIAL.wood,
    woodDark: MATERIAL.woodDark,
    woodLight: MATERIAL.woodLight,
    cream: MATERIAL.cream,
    creamShade: MATERIAL.creamShade,
    rug: MATERIAL.rug,
    clay: MATERIAL.clay,
    concrete: MATERIAL.concrete,
    concreteLine: MATERIAL.concreteLine,
    shadow: MATERIAL.shadow,

    paper: "var(--color-surface)",
    green500: "var(--color-brand-500)",
    green600: "var(--color-brand-600)",
    green700: "var(--color-brand-700)",
    green800: "var(--color-brand-800)",
    green900: "var(--color-brand-900)",
    green950: "var(--color-brand-950)",
    gold: "var(--color-accent-400)",
    goldDeep: "var(--color-accent-500)",
    goldLight: "var(--color-accent-300)",
    scrim: "var(--color-scrim)",

    /** Upholstery and the hall runner: cloth with a little of the brand green in it. */
    sage: mix("var(--color-brand-700)", 30, MATERIAL.cream),
    /** Cut walls: plaster, taken down a touch so it sits in evening light. */
    poche: mix(MATERIAL.wall, 90, "var(--color-brand-800)"),
    /** The timber threshold under each door opening. */
    sill: mix(MATERIAL.wood, 42, "var(--color-brand-950)"),
    /** The green a room is washed with while its light is off. */
    dusk: mix("var(--color-brand-900)", 68, "var(--color-brand-800)"),
    lawn: mix("var(--color-brand-900)", 36, "var(--color-brand-950)"),
    canopy: mix("var(--color-brand-800)", 62, "var(--color-brand-900)"),
    stone: mix(MATERIAL.concrete, 26, "var(--color-brand-950)"),
    swing: mix("var(--color-ink-inverse)", 55, "transparent"),
    sweep: mix("var(--color-ink-inverse)", 9, "transparent"),
    frontSweep: mix("var(--color-accent-400)", 26, "transparent"),
    ring: mix("var(--color-ink-inverse)", 26, "transparent"),
    note: mix("var(--color-ink-inverse)", 80, "transparent"),
} as const;

/** The hard little shadow furniture and trees throw in plan: light from the top left. */
export const FURNITURE_SHADOW = `drop-shadow(1.5px 2.5px 0 ${mix(MATERIAL.shadow, 26, "transparent")})`;
export const TREE_SHADOW = `drop-shadow(3px 4px 0 ${mix("var(--color-scrim)", 34, "transparent")})`;
