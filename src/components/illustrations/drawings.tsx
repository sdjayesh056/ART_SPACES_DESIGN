import React from "react";

import type { IllustrationProps } from "@/types/content";

import { Callout, Dim, GOLD, GOLD_LIGHT, GOLD_SOFT, GROUND, Label, MID, PAPER, RULE, Sheet, SOFT, TINT } from "./frame";

/*
    Isometric projection for the room cutaway. Units are metres-ish: the room
    is 6 x 6 on plan and 4 high, with the back corner at the origin.
*/
function iso(x: number, y: number, z = 0): string {
    return `${240 + (x - y) * 26},${130 + (x + y) * 15 - z * 30}`;
}

type BoxProps = { x: number; y: number; z?: number; w: number; d: number; h: number; top?: string; left?: string; right?: string };

/** An extruded box showing its three visible faces. */
function Box({ x, y, z = 0, w, d, h, top = PAPER, left = SOFT, right = TINT }: BoxProps) {
    return (
        <g>
            <polygon points={[iso(x, y + d, z), iso(x + w, y + d, z), iso(x + w, y + d, z + h), iso(x, y + d, z + h)].join(" ")} fill={left} />
            <polygon points={[iso(x + w, y, z), iso(x + w, y + d, z), iso(x + w, y + d, z + h), iso(x + w, y, z + h)].join(" ")} fill={right} />
            <polygon points={[iso(x, y, z + h), iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x, y + d, z + h)].join(" ")} fill={top} />
        </g>
    );
}

/** Isometric living-room cutaway — two walls removed so the layout reads at a glance. */
export function IsometricRoom(props: IllustrationProps) {
    return (
        <Sheet {...props}>
            {/* Floor and the two standing walls */}
            <polygon points={[iso(0, 0), iso(6, 0), iso(6, 6), iso(0, 6)].join(" ")} fill={GROUND} />
            <polygon points={[iso(0, 0), iso(0, 6), iso(0, 6, 4), iso(0, 0, 4)].join(" ")} fill={SOFT} />
            <polygon points={[iso(0, 0), iso(6, 0), iso(6, 0, 4), iso(0, 0, 4)].join(" ")} fill={PAPER} />

            {/* Window, artwork, rug */}
            <polygon points={[iso(2, 0, 1.4), iso(4.6, 0, 1.4), iso(4.6, 0, 3.3), iso(2, 0, 3.3)].join(" ")} fill={TINT} />
            <path d={`M${iso(3.3, 0, 1.4)}L${iso(3.3, 0, 3.3)}`} strokeWidth={1} />
            <polygon points={[iso(0, 2.2, 1.9), iso(0, 4, 1.9), iso(0, 4, 3.1), iso(0, 2.2, 3.1)].join(" ")} fill={GOLD_SOFT} stroke={GOLD} />
            <polygon points={[iso(1.6, 1.4), iso(4.8, 1.4), iso(4.8, 4.8), iso(1.6, 4.8)].join(" ")} fill={GOLD_SOFT} strokeWidth={1} />

            {/* Furniture, drawn back to front */}
            <Box x={1.8} y={0.15} w={2.8} d={0.6} h={0.9} />
            <Box x={0.15} y={1.6} w={0.4} d={3} h={1.5} left={TINT} right={MID} top={TINT} />
            <Box x={0.55} y={1.6} w={1} d={3} h={0.8} left={TINT} right={MID} top={SOFT} />
            <Box x={2.5} y={2.6} w={1.3} d={1.1} h={0.45} top={PAPER} left={GOLD_LIGHT} right={GOLD} />
            <Box x={4.3} y={3.9} w={0.9} d={0.9} h={0.8} left={TINT} right={MID} top={SOFT} />
            <Box x={5.1} y={0.3} w={0.5} d={0.5} h={0.6} left={GOLD_LIGHT} right={GOLD} />
            <circle cx={Number(iso(5.35, 0.55, 1.6).split(",")[0])} cy={Number(iso(5.35, 0.55, 1.6).split(",")[1])} r={17} fill={TINT} />

            {/* Pendant */}
            <path d={`M${iso(3.1, 3.1, 4.4)}L${iso(3.1, 3.1, 2.9)}`} strokeWidth={1} />
            <ellipse cx={Number(iso(3.1, 3.1, 2.8).split(",")[0])} cy={Number(iso(3.1, 3.1, 2.8).split(",")[1])} rx={20} ry={9} fill={GOLD_LIGHT} stroke={GOLD} />

            <Callout x={74} y={150} toX={30} toY={62} label="ARTWORK WALL" />
            <Callout x={330} y={228} toX={398} toY={300} label="WOOL RUG" />
            <Label x={240} y={346} strong>LIVING ROOM · 6.0 × 6.0 M</Label>
        </Sheet>
    );
}

/** Interior elevation of a media wall with dimension lines and material callouts. */
export function Elevation(props: IllustrationProps) {
    return (
        <Sheet {...props}>
            <rect x={36} y={60} width={390} height={230} fill={PAPER} strokeWidth={1} />
            <path d="M20 290H444" strokeWidth={3} />
            <path d="M36 60H426" strokeWidth={3} />

            {/* Door */}
            <rect x={52} y={112} width={64} height={178} fill={SOFT} />
            <circle cx={106} cy={204} r={3} fill={GOLD} stroke="none" />

            {/* Fluted panel and screen */}
            <rect x={150} y={96} width={180} height={140} fill={GOLD_SOFT} />
            {Array.from({ length: 17 }, (_, index) => 160 + index * 10).map((x) => (
                <path key={x} d={`M${x} 96V236`} stroke={GOLD} strokeWidth={1} opacity={0.6} />
            ))}
            <rect x={188} y={126} width={104} height={62} rx={3} fill={MID} />

            {/* Floating console */}
            <rect x={138} y={244} width={204} height={30} fill={PAPER} />
            <path d="M189 244V274M240 244V274M291 244V274" strokeWidth={1} />
            <path d="M138 252H342" stroke={GOLD} strokeWidth={1} />

            {/* Shelving niche */}
            <rect x={354} y={96} width={58} height={178} fill={SOFT} />
            <path d="M354 140H412M354 186H412M354 230H412" />
            <rect x={364} y={120} width={12} height={20} strokeWidth={1} fill={PAPER} />
            <rect x={380} y={126} width={18} height={14} strokeWidth={1} fill={GOLD_LIGHT} />
            <circle cx={384} cy={174} r={9} strokeWidth={1} fill={PAPER} />
            <rect x={362} y={214} width={34} height={16} strokeWidth={1} fill={PAPER} />

            {/* Cove */}
            <path d="M150 88H330" stroke={GOLD} strokeDasharray="2 5" strokeWidth={2} />

            <Callout x={166} y={110} toX={110} toY={84} label="FLUTED OAK" anchor="end" />
            <Callout x={320} y={252} toX={362} toY={300} label="BRASS INLAY" />
            <Dim from={36} to={426} at={316} label="4 800" />
            <Dim from={60} to={290} at={446} label="2 700" vertical />
            <Label x={240} y={48} strong>ELEVATION A · MEDIA WALL</Label>
        </Sheet>
    );
}

/** Garden section through house edge, deck, planting and water. */
export function LandscapeSection(props: IllustrationProps) {
    return (
        <Sheet {...props}>
            {/* Soil build-up */}
            <rect x={20} y={250} width={440} height={56} fill={GROUND} stroke="none" />
            {Array.from({ length: 22 }, (_, index) => 26 + index * 20).map((x) => (
                <path key={x} d={`M${x} 306L${x + 12} 290`} stroke={RULE} strokeWidth={1} />
            ))}
            <path d="M20 280H460" stroke={RULE} strokeDasharray="5 5" strokeWidth={1} />

            {/* House edge */}
            <rect x={28} y={96} width={64} height={154} fill={PAPER} />
            <rect x={52} y={170} width={30} height={80} fill={SOFT} strokeWidth={1} />
            <path d="M20 96H104" strokeWidth={3} />

            {/* Deck and pergola */}
            <rect x={92} y={240} width={110} height={10} fill={GOLD_LIGHT} stroke={GOLD} />
            <path d="M104 240V150M190 240V150" />
            <path d="M92 150H204" strokeWidth={3} />
            {[112, 132, 152, 172].map((x) => (
                <path key={x} d={`M${x} 150v-10`} strokeWidth={1} />
            ))}
            <rect x={126} y={222} width={44} height={18} rx={4} fill={PAPER} strokeWidth={1} />

            {/* Planting */}
            {[[224, 232, 16], [250, 224, 22], [280, 234, 14]].map(([cx, cy, r]) => (
                <circle key={cx} cx={cx} cy={cy} r={r} fill={TINT} />
            ))}
            <path d="M340 250V170" strokeWidth={3} />
            <circle cx={340} cy={128} r={46} fill={SOFT} />
            <circle cx={316} cy={150} r={24} fill={TINT} strokeWidth={1} />
            <circle cx={364} cy={146} r={26} fill={TINT} strokeWidth={1} />

            {/* Water rill */}
            <path d="M396 250V268H452V250" fill={PAPER} />
            <path d="M402 258q6 -5 12 0t12 0t12 0t10 0" stroke={MID} strokeWidth={1} />

            <path d="M20 250H396M452 250H460" strokeWidth={3} />

            <Label x={148} y={132} strong>PERGOLA</Label>
            <Label x={252} y={196}>NATIVE PLANTING</Label>
            <Label x={424} y={240}>RILL</Label>
            <Label x={36} y={274} anchor="start">TOPSOIL 300</Label>
            <Label x={36} y={300} anchor="start">DRAINAGE LAYER</Label>
            <Dim from={92} to={202} at={322} label="DECK 3 600" />
            <Dim from={210} to={390} at={322} label="SOFTSCAPE 6 000" />
        </Sheet>
    );
}
