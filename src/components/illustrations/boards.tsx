import React, { useId } from "react";

import type { IllustrationProps } from "@/types/content";

import { GOLD, GOLD_LIGHT, GOLD_SOFT, GROUND, INK, Label, MID, PAPER, RULE, Sheet, SOFT, TINT } from "./frame";

/** Material and swatch board: timber, stone, textile, metal, terrazzo and paint. */
export function MaterialBoard(props: IllustrationProps) {
    return (
        <Sheet {...props}>
            <rect x={24} y={24} width={432} height={312} rx={10} fill={PAPER} strokeWidth={1} />

            {/* Oak veneer */}
            <rect x={44} y={44} width={130} height={120} fill={GOLD_SOFT} />
            {[60, 78, 98, 120, 142].map((y, index) => (
                <path key={y} d={`M44 ${y}q32 ${index % 2 ? 9 : -9} 65 0t65 0`} stroke={GOLD} strokeWidth={1} />
            ))}

            {/* Marble */}
            <rect x={190} y={44} width={130} height={84} fill={PAPER} />
            <path d="M190 70l34 12l22 -18l40 26l34 -14M214 128l18 -30l30 8l22 -24" stroke={RULE} strokeWidth={1} />

            {/* Linen */}
            <rect x={336} y={44} width={100} height={110} fill={SOFT} />
            {Array.from({ length: 9 }, (_, index) => 346 + index * 10).map((x) => (
                <path key={x} d={`M${x} 44V154`} stroke={TINT} strokeWidth={1} />
            ))}
            {Array.from({ length: 10 }, (_, index) => 54 + index * 10).map((y) => (
                <path key={y} d={`M336 ${y}H436`} stroke={TINT} strokeWidth={1} />
            ))}
            <rect x={336} y={44} width={100} height={110} />

            {/* Brass */}
            <circle cx={255} cy={196} r={38} fill={GOLD_LIGHT} stroke={GOLD} />
            <circle cx={255} cy={196} r={26} stroke={GOLD} strokeWidth={1} />
            <path d="M232 180a30 30 0 0 1 30 -16" stroke={PAPER} strokeWidth={3} />

            {/* Terrazzo */}
            <rect x={44} y={196} width={130} height={110} fill={GROUND} />
            {[[62, 214], [96, 232], [140, 216], [70, 262], [112, 276], [150, 256], [128, 244], [88, 290]].map(([x, y], index) => (
                <path
                    key={`${x}-${y}`}
                    d={`M${x} ${y}l9 -5l7 6l-4 9l-10 1z`}
                    fill={index % 3 === 0 ? GOLD_LIGHT : index % 3 === 1 ? TINT : MID}
                    strokeWidth={1}
                />
            ))}

            {/* Paint chips */}
            <g transform="rotate(-8 380 240)">
                <rect x={330} y={190} width={44} height={96} fill={INK} />
                <rect x={366} y={190} width={44} height={96} fill={MID} />
                <rect x={402} y={190} width={44} height={96} fill={GOLD_LIGHT} />
            </g>

            {[[109, 44], [255, 44], [386, 44]].map(([cx, cy]) => (
                <circle key={cx} cx={cx} cy={cy} r={4} fill={GOLD} stroke="none" />
            ))}

            <Label x={109} y={182} strong>OAK VENEER</Label>
            <Label x={255} y={144} strong>STATUARIO</Label>
            <Label x={386} y={170} strong>LINEN</Label>
            <Label x={255} y={254} strong>AGED BRASS</Label>
            <Label x={109} y={324} strong>TERRAZZO</Label>
            <Label x={386} y={316} strong>PAINT</Label>
        </Sheet>
    );
}

/** Lighting layer diagram: ambient cove, task pendant and accent spot in one room section. */
export function LightingLayers(props: IllustrationProps) {
    return (
        <Sheet {...props}>
            <rect x={50} y={50} width={380} height={220} fill={PAPER} stroke="none" />

            {/* Ambient: cove wash across the ceiling */}
            <path d="M70 62H410L370 120H110Z" fill={GOLD_SOFT} stroke="none" />
            <path d="M70 62H410" stroke={GOLD} strokeDasharray="2 6" strokeWidth={3} />

            {/* Task: pendant over the table */}
            <path d="M170 50V112" strokeWidth={1} />
            <path d="M152 124a18 12 0 0 1 36 0Z" fill={GOLD_LIGHT} stroke={GOLD} />
            <path d="M156 124L116 220H224L184 124Z" fill={GOLD_LIGHT} stroke="none" opacity={0.45} />
            <rect x={110} y={220} width={120} height={8} fill={SOFT} />
            <path d="M124 228V270M216 228V270" />

            {/* Accent: spot on the artwork */}
            <rect x={300} y={56} width={14} height={10} fill={INK} stroke="none" />
            <path d="M307 66L318 122H388Z" fill={GOLD} stroke="none" opacity={0.35} />
            <rect x={318} y={122} width={70} height={76} fill={TINT} />
            <path d="M330 180l16 -24l14 14l10 -12l8 22" strokeWidth={1} />
            <rect x={300} y={232} width={106} height={38} rx={8} fill={SOFT} />

            <g strokeWidth={3}>
                <path d="M50 50H430V270H50Z" />
            </g>

            {[
                { x: 60, colour: GOLD_SOFT, label: "AMBIENT · COVE" },
                { x: 200, colour: GOLD_LIGHT, label: "TASK · PENDANT" },
                { x: 340, colour: GOLD, label: "ACCENT · SPOT" },
            ].map((layer) => (
                <g key={layer.label}>
                    <circle cx={layer.x} cy={306} r={7} fill={layer.colour} strokeWidth={1} />
                    <Label x={layer.x + 14} y={310} anchor="start" strong>
                        {layer.label}
                    </Label>
                </g>
            ))}
            <Label x={240} y={338}>THREE LAYERS, THREE CIRCUITS, ONE SCENE CONTROLLER</Label>
        </Sheet>
    );
}

export type SceneVariant = "living" | "office" | "suite" | "store";

export const SCENE_LABELS: Record<SceneVariant, string> = {
    living: "living room",
    office: "workplace",
    suite: "hotel suite",
    store: "retail store",
};

/**
 * One-point perspective of an interior, drawable as construction lines or as
 * a finished render. The shell is shared; `variant` furnishes it as a living
 * room, a workplace, a hotel suite or a store, so the compare slider shows a
 * space that belongs to the page it sits on.
 */
export function RoomScene({ mode, variant = "living" }: { mode: "wire" | "render"; variant?: SceneVariant }) {
    const render = mode === "render";
    const fill = (colour: string) => (render ? colour : "none");
    const pen = render ? { strokeWidth: 1.5 } : { strokeWidth: 1, strokeDasharray: "5 4" };

    return (
        <g {...pen}>
            <rect x={0} y={0} width={480} height={360} fill={render ? PAPER : GROUND} stroke="none" />
            {/* Ceiling, walls, floor */}
            <polygon points="0,0 480,0 330,96 150,96" fill={fill(PAPER)} />
            <polygon points="0,0 150,96 150,236 0,360" fill={fill(SOFT)} />
            <polygon points="480,0 330,96 330,236 480,360" fill={fill(SOFT)} />
            <polygon points="0,360 150,236 330,236 480,360" fill={fill(variant === "office" || variant === "store" ? GROUND : GOLD_SOFT)} />
            <rect x={150} y={96} width={180} height={140} fill={fill(TINT)} />

            {variant === "living" && (
                <g>
                    <rect x={196} y={116} width={88} height={78} fill={fill(PAPER)} />
                    <path d="M240 116V194M196 155H284" />
                    <polygon points="42,112 110,130 110,206 42,232" fill={fill(GOLD_LIGHT)} />
                    <polygon points="372,126 440,104 440,270 372,222" fill={fill(PAPER)} />
                    <path d="M372 158L440 150M372 190L440 206" />
                    <ellipse cx={240} cy={298} rx={150} ry={30} fill={fill(GOLD_LIGHT)} />
                    <rect x={150} y={214} width={180} height={44} rx={10} fill={fill(MID)} />
                    <rect x={140} y={236} width={200} height={34} rx={10} fill={fill(INK)} />
                    <rect x={206} y={284} width={68} height={20} rx={4} fill={fill(PAPER)} />
                    <path d="M356 270V176" />
                    <path d="M340 176h32l-8 -26h-16z" fill={fill(GOLD)} />
                </g>
            )}

            {variant === "office" && (
                <g>
                    {/* Ribbon window, whiteboard, acoustic panels */}
                    <rect x={166} y={112} width={148} height={64} fill={fill(PAPER)} />
                    <path d="M215 112V176M265 112V176" />
                    <polygon points="36,118 112,136 112,204 36,236" fill={fill(PAPER)} />
                    <path d="M52 158L96 164M52 180L84 183" />
                    {[0, 1, 2].map((panel) => (
                        <polygon
                            key={panel}
                            points={`${372 + panel * 26},${128 - panel * 8} ${392 + panel * 26},${122 - panel * 8} ${392 + panel * 26},${214 + panel * 13} ${372 + panel * 26},${204 + panel * 13}`}
                            fill={fill(panel === 1 ? GOLD_LIGHT : MID)}
                        />
                    ))}
                    {/* Linear pendant */}
                    <path d="M186 40V70M294 40V70" />
                    <rect x={170} y={70} width={140} height={8} rx={4} fill={fill(GOLD)} />
                    {/* Two benches of desks, screens and chairs */}
                    {[66, 262].map((x) => (
                        <g key={x}>
                            <polygon points={`${x + 24},262 ${x + 128},262 ${x + 152},292 ${x},292`} fill={fill(GOLD_LIGHT)} />
                            <path d={`M${x + 8} 292V330M${x + 144} 292V330`} />
                            <rect x={x + 34} y={234} width={36} height={24} rx={2} fill={fill(INK)} />
                            <rect x={x + 84} y={234} width={36} height={24} rx={2} fill={fill(INK)} />
                            <rect x={x + 28} y={304} width={40} height={30} rx={10} fill={fill(MID)} />
                            <rect x={x + 86} y={304} width={40} height={30} rx={10} fill={fill(MID)} />
                        </g>
                    ))}
                    <rect x={226} y={212} width={28} height={24} fill={fill(GOLD)} />
                    <circle cx={240} cy={196} r={20} fill={fill(MID)} />
                </g>
            )}

            {variant === "suite" && (
                <g>
                    {/* Curtained window, wardrobe */}
                    <polygon points="36,104 112,126 112,210 36,244" fill={fill(PAPER)} />
                    <path d="M74 115V227" />
                    <polygon points="372,126 444,102 444,276 372,224" fill={fill(GOLD_LIGHT)} />
                    <path d="M408 114V250" />
                    {/* Headboard wall, bed, bedside lamps */}
                    <rect x={176} y={132} width={128} height={86} rx={8} fill={fill(MID)} />
                    <path d="M208 132V218M240 132V218M272 132V218" />
                    <ellipse cx={240} cy={312} rx={176} ry={34} fill={fill(TINT)} />
                    <polygon points="170,226 310,226 348,318 132,318" fill={fill(PAPER)} />
                    <rect x={186} y={206} width={48} height={24} rx={8} fill={fill(PAPER)} />
                    <rect x={246} y={206} width={48} height={24} rx={8} fill={fill(PAPER)} />
                    <polygon points="146,284 334,284 348,318 132,318" fill={fill(INK)} />
                    {[136, 318].map((x) => (
                        <g key={x}>
                            <rect x={x} y={214} width={26} height={24} fill={fill(GOLD_LIGHT)} />
                            <path d={`M${x + 13} 214V198`} />
                            <circle cx={x + 13} cy={190} r={9} fill={fill(GOLD)} />
                        </g>
                    ))}
                </g>
            )}

            {variant === "store" && (
                <g>
                    {/* Shelving wall with product */}
                    <rect x={164} y={108} width={152} height={112} fill={fill(PAPER)} />
                    <path d="M164 146H316M164 184H316" />
                    {[0, 1, 2].map((row) =>
                        [0, 1, 2, 3].map((column) => (
                            <rect
                                key={`${row}-${column}`}
                                x={174 + column * 36}
                                y={124 + row * 38 - ((row + column) % 2) * 6}
                                width={22}
                                height={22 + ((row + column) % 2) * 6}
                                fill={fill((row + column) % 3 === 0 ? GOLD : (row + column) % 3 === 1 ? MID : GOLD_LIGHT)}
                            />
                        )),
                    )}
                    {/* Shopfront glazing, garment rail */}
                    <polygon points="30,84 116,116 116,214 30,262" fill={fill(PAPER)} />
                    <path d="M73 100V238" />
                    <path d="M366 148L452 126" strokeWidth={render ? 3 : 1} />
                    {[0, 1, 2, 3].map((item) => (
                        <polygon
                            key={item}
                            points={`${372 + item * 20},${148 - item * 5} ${388 + item * 20},${144 - item * 5} ${392 + item * 20},${222 + item * 9} ${370 + item * 20},${216 + item * 9}`}
                            fill={fill(item % 2 ? GOLD_LIGHT : MID)}
                        />
                    ))}
                    {/* Track spots, display table, cash desk */}
                    {[196, 240, 284].map((x) => (
                        <g key={x}>
                            <path d={`M${x} 46V58`} />
                            <circle cx={x} cy={64} r={6} fill={fill(GOLD)} />
                        </g>
                    ))}
                    <polygon points="150,276 286,276 300,298 136,298" fill={fill(PAPER)} />
                    <rect x={136} y={298} width={164} height={26} fill={fill(GOLD_LIGHT)} />
                    <rect x={166} y={258} width={30} height={18} fill={fill(MID)} />
                    <rect x={212} y={252} width={18} height={24} fill={fill(GOLD)} />
                    <rect x={246} y={262} width={30} height={14} fill={fill(INK)} />
                    <rect x={340} y={272} width={104} height={56} fill={fill(INK)} />
                    <rect x={334} y={264} width={116} height={10} fill={fill(GOLD)} />
                </g>
            )}

            {!render && (
                <g stroke={GOLD} strokeDasharray="none" strokeWidth={1}>
                    <path d="M240 166L0 0M240 166L480 0M240 166L0 360M240 166L480 360" opacity={0.5} />
                    <circle cx={240} cy={166} r={4} fill={GOLD} stroke="none" />
                </g>
            )}
        </g>
    );
}

/** The 3D service anchor: the same room, half construction lines and half render. */
export function WireframeRender(props: IllustrationProps) {
    const clipId = useId();

    return (
        <Sheet {...props}>
            <clipPath id={clipId}>
                <rect x={240} y={0} width={240} height={360} />
            </clipPath>
            <RoomScene mode="wire" />
            <g clipPath={`url(#${clipId})`}>
                <RoomScene mode="render" />
            </g>
            <path d="M240 0V360" stroke={GOLD} strokeWidth={2} />
            <circle cx={240} cy={180} r={13} fill={PAPER} stroke={GOLD} strokeWidth={2} />
            <path d="M234 180l-4 0M246 180l4 0M233 176l-4 4l4 4M247 176l4 4l-4 4" stroke={GOLD} />
            <rect x={14} y={14} width={96} height={22} rx={11} fill={PAPER} strokeWidth={1} />
            <Label x={62} y={29} strong>WIREFRAME</Label>
            <rect x={388} y={14} width={78} height={22} rx={11} fill={PAPER} strokeWidth={1} />
            <Label x={427} y={29} strong>RENDER</Label>
            <rect x={0.75} y={0.75} width={478.5} height={358.5} />
        </Sheet>
    );
}
