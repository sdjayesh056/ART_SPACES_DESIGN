"use client";

import React, { useId, useMemo } from "react";

import { GOLD, GOLD_LIGHT } from "./iso";
import { MATERIAL as M } from "./palette";
import { ROOM_HEIGHT, type RoomItem, type RoomScene } from "./room-kit";

/** `yaw` turns the room, `tilt` moves the eye from isometric (0) to directly overhead (1), `lift` scales every height. */
export type Cam = { yaw: number; tilt: number; lift: number };
export type StageFinish = { wall: string; wallShade: string; floor: string; floorLine: string; floorKind: "planks" | "tiles" | "marble" };

type Point = [number, number, number?];
type Bounds = { x0: number; x1: number; y0: number; y1: number; z0: number; z1: number };

const STAGE = "var(--color-brand-950)";
/* Both drawings share this frame, so the light overlay lines up with the room. */
const FRAME = "0 30 640 500";
const VEINS: Point[][] = [
    [[0.4, 1.2], [1.6, 1.9], [2.2, 3.4]],
    [[3.1, 0.3], [4.2, 1.5], [5.6, 1.9]],
    [[2.8, 4.1], [4.0, 4.6], [5.2, 5.7]],
];
const PAINT = "[transition:fill_450ms_ease-out,stroke_450ms_ease-out]";
const round = (value: number) => Math.round(value * 10) / 10;
const facing = (value: number) => (Math.abs(value) < 1e-3 ? 0 : Math.sign(value));

/** The camera. Everything on the stage is placed through `at`. */
function projector({ yaw, tilt, lift }: Cam) {
    const cos = Math.cos(yaw);
    const sin = Math.sin(yaw);
    /* Overhead, the drawing is a little larger: a plan has no height to make room for. */
    const unit = 40 + 6 * tilt;
    const depth = 23 + 23 * tilt;
    const rise = 46 * lift * (1 - tilt);
    const baseline = 364 - 94 * tilt;
    const at = (x: number, y: number, z = 0): [number, number] => {
        const xr = (x - 3) * cos - (y - 3) * sin;
        const yr = (x - 3) * sin + (y - 3) * cos;
        return [round(320 + (xr - yr) * unit), round(baseline + (xr + yr) * depth - z * rise)];
    };
    const points = (...list: Point[]) => list.map(([x, y, z]) => at(x, y, z).join(",")).join(" ");

    /* camX / camY: how far the eye sits along each floor axis. Their signs say which faces are seen. */
    return { at, points, depth, unit, camX: cos + sin, camY: cos - sin };
}

function bounds(item: RoomItem): Bounds {
    if (item.kind === "box") return { x0: item.x, x1: item.x + item.w, y0: item.y, y1: item.y + item.d, z0: item.z, z1: item.z + item.h };
    const r = item.kind === "ball" ? item.r * 0.6 : 0.12;
    return { x0: item.x - r, x1: item.x + r, y0: item.y - r, y1: item.y + r, z0: item.z - r, z1: item.z + r };
}

const apart = (aMin: number, aMax: number, bMin: number, bMax: number) => (aMin >= bMax - 1e-6 ? 1 : bMin >= aMax - 1e-6 ? -1 : 0);

/**
 * 1 when `a` must be painted after `b`, -1 when before, 0 when it cannot
 * matter. Two boxes that do not intersect are separated along at least one
 * axis, and the one on the eye's side of that gap is in front. If two axes
 * disagree, neither box can cover the other on screen.
 */
function inFront(a: Bounds, b: Bounds, sx: number, sy: number): number {
    let verdict = 0;
    for (const vote of [apart(a.x0, a.x1, b.x0, b.x1) * sx, apart(a.y0, a.y1, b.y0, b.y1) * sy, apart(a.z0, a.z1, b.z0, b.z1)]) {
        if (vote === 0) continue;
        if (verdict !== 0 && verdict !== vote) return 0;
        verdict = vote;
    }
    return verdict;
}

/**
 * Back-to-front order, as indexes into `items`: repeatedly take a piece that
 * nothing left stands behind. It depends only on which quadrant the eye is in,
 * so it is worked out four times at most, not once a frame.
 */
function paintOrder(items: RoomItem[], sx: number, sy: number): number[] {
    const rest = items.map((item, index) => ({ index, box: bounds(item) })).sort((a, b) => (a.box.x0 + a.box.x1 - b.box.x0 - b.box.x1) * sx + (a.box.y0 + a.box.y1 - b.box.y0 - b.box.y1) * sy);
    const ordered: number[] = [];

    while (rest.length > 0) {
        const next = rest.findIndex((candidate) => rest.every((other) => inFront(other.box, candidate.box, sx, sy) >= 0));
        ordered.push(rest.splice(Math.max(next, 0), 1)[0].index);
    }

    return ordered;
}

const isFlat = (item: RoomItem) => item.kind === "box" && item.z === 0 && item.h <= 0.06;

type Stage3DProps = {
    scene: RoomScene;
    finish: StageFinish;
    cam: Cam;
    /** Draw construction lines instead of finished surfaces. */
    wire: boolean;
    /** 0 is midday, 1 is after dark. */
    dusk: number;
    title: string;
    /** True when the visitor prefers reduced motion. */
    still: boolean;
};

/**
 * Draws a room from any angle. Two stacked drawings: the room itself, dimmed
 * as evening falls, and the light from its lamps, which is left bright. Place
 * it inside a `relative` box.
 */
export function Stage3D({ scene, finish, cam, wire, dusk, title, still }: Stage3DProps) {
    const uid = `stage${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
    /* Which quadrant the eye is in: the signs of camX and camY in `projector`. */
    const sx = facing(Math.cos(cam.yaw) + Math.sin(cam.yaw));
    const sy = facing(Math.cos(cam.yaw) - Math.sin(cam.yaw));
    const P = projector(cam);

    const { flats, solids, lights } = useMemo(
        () => ({
            flats: scene.items.filter(isFlat),
            solids: scene.items.filter((item) => !isFlat(item)),
            lights: scene.items.filter((item) => item.kind === "light"),
        }),
        [scene],
    );
    const order = useMemo(() => paintOrder(solids, sx, sy), [solids, sx, sy]);

    const plan = cam.tilt > 0.5;
    const fade = 1 - cam.tilt;
    const paint = still ? undefined : PAINT;
    const glow = wire ? 0 : Math.max(0, (dusk - 0.2) / 0.8);
    /* Evening comes on slowly, then quickly; the warmth of sunset peaks halfway. */
    const dark = dusk * dusk;
    const warm = Math.sin(Math.PI * dusk);

    /** How a surface is drawn in the current view. */
    const skin = (fill: string, glass = false) =>
        wire
            ? { fill: glass ? "none" : STAGE, stroke: GOLD_LIGHT, strokeWidth: 1.1, strokeLinejoin: "round" as const, className: paint }
            : {
                  fill,
                  fillOpacity: glass ? 0.38 : 1,
                  stroke: plan ? STAGE : fill,
                  strokeOpacity: plan ? 0.55 : glass ? 0.38 : 1,
                  strokeWidth: plan ? 1.2 : 0.7,
                  strokeLinejoin: "round" as const,
                  className: paint,
              };

    const draw = (item: RoomItem, key: number) => {
        if (item.kind === "ball") {
            const [cx, cy] = P.at(item.x, item.y, item.z);
            return <circle key={key} cx={cx} cy={cy} r={round(item.r * P.unit)} {...skin(item.fill)} />;
        }

        if (item.kind === "light") {
            const [cx, cy] = P.at(item.x, item.y, item.z);
            /* A ceiling light's cord runs out of the top of the frame, so it reads as hanging rather than floating. */
            const top = item.hung !== undefined && item.hung < ROOM_HEIGHT ? P.at(item.x, item.y, item.hung)[1] : 0;
            return (
                <g key={key}>
                    {item.hung !== undefined && <line x1={cx} y1={top} x2={cx} y2={cy} stroke={GOLD} strokeWidth={1.6} opacity={fade} />}
                    <circle cx={cx} cy={cy} r={15} fill={GOLD_LIGHT} opacity={wire ? 0 : 0.28} />
                    <circle cx={cx} cy={cy} r={7.5} fill={wire ? STAGE : GOLD} stroke={GOLD_LIGHT} strokeWidth={1.1} />
                </g>
            );
        }

        const { x, y, z, tone, glass } = item;
        const x1 = x + item.w;
        const y1 = y + item.d;
        const z1 = z + item.h;
        /* Of the four sides, the two turned toward the eye; one of them faces screen-right. */
        const nearX = P.camX > 0 ? x1 : x;
        const nearY = P.camY > 0 ? y1 : y;
        const xSideFacesRight = P.camX * P.camY > 0;

        return (
            <g key={key}>
                <polygon points={P.points([x, nearY, z], [x1, nearY, z], [x1, nearY, z1], [x, nearY, z1])} {...skin(xSideFacesRight ? tone.left : tone.right, glass)} />
                <polygon points={P.points([nearX, y, z], [nearX, y1, z], [nearX, y1, z1], [nearX, y, z1])} {...skin(xSideFacesRight ? tone.right : tone.left, glass)} />
                <polygon points={P.points([x, y, z1], [x1, y, z1], [x1, y1, z1], [x, y1, z1])} {...skin(tone.top, glass)} />
            </g>
        );
    };

    /* Only the walls behind the room are drawn, so it always opens toward the eye. */
    const walls = [
        { id: "x", shown: P.camX > 0.02, lit: P.camY > 0, a: [0, 0], b: [0, 6] },
        { id: "x6", shown: P.camX < -0.02, lit: P.camY < 0, a: [6, 0], b: [6, 6] },
        { id: "y", shown: P.camY > 0.02, lit: P.camX < 0, a: [0, 0], b: [6, 0] },
        { id: "y6", shown: P.camY < -0.02, lit: P.camX > 0, a: [0, 6], b: [6, 6] },
    ].filter((wall) => wall.shown);
    const decals = scene.decals.filter((decal) => walls.some((wall) => wall.id === decal.wall));
    const onWall = (decal: (typeof decals)[number], along: number, z: number): Point => (decal.wall === "x" ? [0, along, z] : [along, 0, z]);
    /* Where a window's daylight lands: pushed into the room and a little along it. */
    const onFloor = (decal: (typeof decals)[number], along: number, reach: number): Point => (decal.wall === "x" ? [reach, along + reach * 0.35] : [along + reach * 0.35, reach]);

    /* Joints in the floor: boards, square tiles, or large slabs with veining. */
    const step = wire || finish.floorKind === "tiles" ? 1 : finish.floorKind === "marble" ? 2 : 0.5;
    const joints = Array.from({ length: Math.round(6 / step) - 1 }, (_, index) => (index + 1) * step);

    const corners = [P.at(0, 0), P.at(6, 0), P.at(6, 6), P.at(0, 6)];
    const left = Math.min(...corners.map(([x]) => x));
    const right = Math.max(...corners.map(([x]) => x));
    const topEdge = Math.min(...corners.map(([, y]) => y));
    const end = scene.route[scene.route.length - 1];

    return (
        <>
            <svg
                viewBox={FRAME}
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                className="relative block h-auto max-h-[70svh] w-full transition-[filter] duration-300"
                style={{ filter: wire ? "none" : `brightness(${1 - 0.6 * dark}) saturate(${1 - 0.25 * dark}) sepia(${0.35 * warm})` }}
            >
                <title>{title}</title>
                <defs>
                    <linearGradient id={`${uid}fall`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="white" stopOpacity={0.16} />
                        <stop offset="1" stopColor="black" stopOpacity={0.1} />
                    </linearGradient>
                </defs>

                <polygon
                    points={P.points([0, 0], [6, 0], [6, 6], [0, 6])}
                    fill={wire ? STAGE : finish.floor}
                    fillOpacity={wire ? 0.5 : 1}
                    stroke={plan ? STAGE : wire ? GOLD_LIGHT : "none"}
                    strokeWidth={plan ? 6 : 1.1}
                    strokeLinejoin="round"
                    className={paint}
                />
                <g stroke={wire ? GOLD_LIGHT : finish.floorLine} strokeOpacity={wire ? 0.22 : 0.42} strokeWidth={1} fill="none">
                    {joints.map((n) => (
                        <React.Fragment key={n}>
                            <polyline points={P.points([0, n], [6, n])} />
                            {step >= 1 && <polyline points={P.points([n, 0], [n, 6])} />}
                        </React.Fragment>
                    ))}
                    {!wire && finish.floorKind === "marble" && VEINS.map((vein, index) => <polyline key={index} points={P.points(...vein)} strokeOpacity={0.7} />)}
                </g>

                {walls.map((wall) => {
                    const shape = P.points([wall.a[0], wall.a[1], 0], [wall.b[0], wall.b[1], 0], [wall.b[0], wall.b[1], ROOM_HEIGHT], [wall.a[0], wall.a[1], ROOM_HEIGHT]);
                    return (
                        <g key={wall.id} opacity={fade}>
                            <polygon points={shape} fill={wire ? "none" : wall.lit ? finish.wall : finish.wallShade} stroke={wire ? GOLD_LIGHT : "none"} strokeOpacity={0.45} className={paint} />
                            {!wire && <polygon points={shape} fill={`url(#${uid}fall)`} />}
                        </g>
                    );
                })}
                {decals.map((decal) => {
                    const glazed = decal.kind === "window";
                    const middle = (decal.from + decal.to) / 2;
                    return (
                        <g key={`${decal.wall}${decal.from}`} opacity={fade} strokeLinejoin="round">
                            <polygon
                                points={P.points(onWall(decal, decal.from, decal.sill), onWall(decal, decal.to, decal.sill), onWall(decal, decal.to, decal.head), onWall(decal, decal.from, decal.head))}
                                fill={wire ? "none" : glazed ? M.sky : "var(--color-brand-700)"}
                                stroke={wire ? GOLD_LIGHT : glazed ? M.wood : GOLD}
                                strokeWidth={wire ? 1.1 : glazed ? 4 : 3}
                            />
                            {glazed && <polyline points={P.points(onWall(decal, middle, decal.sill), onWall(decal, middle, decal.head))} stroke={wire ? GOLD_LIGHT : M.wood} strokeWidth={wire ? 1.1 : 2.5} />}
                        </g>
                    );
                })}

                {flats.map(draw)}

                {/* Daylight through each window, fading as evening falls. */}
                {!wire &&
                    decals.map(
                        (decal) =>
                            decal.kind === "window" && (
                                <polygon
                                    key={`sun${decal.wall}${decal.from}`}
                                    points={P.points(onFloor(decal, decal.from, 0), onFloor(decal, decal.to, 0), onFloor(decal, decal.to, 2.7), onFloor(decal, decal.from, 2.7))}
                                    fill={dusk > 0.25 ? GOLD_LIGHT : "white"}
                                    opacity={round(0.34 * (1 - dusk) * fade)}
                                />
                            ),
                    )}

                {/* The plan's annotations: the way in, and an overall dimension. */}
                <g opacity={round(Math.max(0, (cam.tilt - 0.7) / 0.3))}>
                    <polyline points={P.points(...scene.route)} fill="none" stroke={GOLD} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 10">
                        {!still && <animate attributeName="stroke-dashoffset" from="11" to="0" dur="0.9s" repeatCount="indefinite" />}
                    </polyline>
                    <circle cx={P.at(end[0], end[1])[0]} cy={P.at(end[0], end[1])[1]} r={6} fill={GOLD} />
                    <path d={`M${left},${topEdge - 22}H${right}M${left},${topEdge - 28}v12M${right},${topEdge - 28}v12`} stroke="var(--color-ink-muted)" strokeWidth={1.2} fill="none" />
                    <text x={(left + right) / 2} y={topEdge - 30} textAnchor="middle" fontSize={13} className="font-mono" fill="var(--color-ink-muted)">
                        6.0 m
                    </text>
                </g>

                {!wire &&
                    !plan &&
                    solids.map(
                        (item, index) =>
                            item.kind === "box" &&
                            item.z === 0 &&
                            !item.glass && (
                                <polygon
                                    key={index}
                                    points={P.points([item.x + 0.16, item.y + 0.16], [item.x + item.w + 0.16, item.y + 0.16], [item.x + item.w + 0.16, item.y + item.d + 0.16], [item.x + 0.16, item.y + item.d + 0.16])}
                                    fill={M.shadow}
                                    opacity={0.13}
                                />
                            ),
                    )}
                {order.map((index) => draw(solids[index], index))}
            </svg>

            {/* The light itself: drawn over the dimmed room so it is the only bright thing in it. */}
            <svg aria-hidden="true" viewBox={FRAME} className="pointer-events-none absolute inset-0 h-full w-full mix-blend-screen transition-opacity duration-300" style={{ opacity: round(glow) }}>
                <defs>
                    <radialGradient id={`${uid}glow`}>
                        <stop offset="0" stopColor={GOLD_LIGHT} stopOpacity={0.9} />
                        <stop offset="0.35" stopColor={GOLD} stopOpacity={0.3} />
                        <stop offset="1" stopColor={GOLD} stopOpacity={0} />
                    </radialGradient>
                    <radialGradient id={`${uid}pool`}>
                        <stop offset="0" stopColor={GOLD_LIGHT} stopOpacity={0.5} />
                        <stop offset="1" stopColor={GOLD_LIGHT} stopOpacity={0} />
                    </radialGradient>
                </defs>
                {lights.map((item, index) => {
                    const [floorX, floorY] = P.at(item.x, item.y);
                    const [cx, cy] = P.at(item.x, item.y, item.z);
                    return (
                        <g key={index}>
                            <ellipse cx={floorX} cy={floorY} rx={78} ry={round(1.95 * P.depth)} fill={`url(#${uid}pool)`} />
                            <circle cx={cx} cy={cy} r={58} fill={`url(#${uid}glow)`} />
                            <circle cx={cx} cy={cy} r={4} fill="white" />
                        </g>
                    );
                })}
            </svg>
        </>
    );
}
