/**
 * Material colours for the filled illustrations: plaster, timber, cloth, sky.
 * They depict real materials, so they are not brand tokens — and they live in
 * a .ts module because the colour lint rule (rightly) bans hex in .tsx.
 * Greens and golds in the drawings still come from the brand tokens.
 */
export const MATERIAL = {
    wall: "#F7F2E8",
    wallShade: "#ECE4D4",
    floor: "#DDBE96",
    floorLine: "#B99364",
    wood: "#B07F4F",
    woodDark: "#8A6038",
    woodLight: "#CFA273",
    cream: "#EFE6D4",
    creamShade: "#DDD1B9",
    rug: "#F3EBDC",
    sky: "#D6E9F2",
    skyLight: "#F2FAFD",
    clay: "#C2704B",
    clayShade: "#9E5636",
    shadow: "#3B2A18",
    concrete: "#E2DFD8",
    concreteLine: "#BDB9B0",
} as const;
