import React from "react";

import type { IllustrationProps } from "@/types/content";

import { MATERIAL as M } from "./palette";

export const G900 = "var(--color-brand-900)";
export const G800 = "var(--color-brand-800)";
export const G700 = "var(--color-brand-700)";
export const G600 = "var(--color-brand-600)";
export const G500 = "var(--color-brand-500)";
export const GOLD = "var(--color-accent-500)";
export const GOLD_LIGHT = "var(--color-accent-300)";
export const GOLD_DEEP = "var(--color-accent-600)";

export const WOOD = { top: M.woodLight, left: M.wood, right: M.woodDark };
export const GREEN = { top: G600, left: G700, right: G800 };
export const DEEP = { top: G700, left: G800, right: G900 };
export const CREAM = { top: M.cream, left: M.creamShade, right: M.creamShade };
export const BRASS = { top: GOLD_LIGHT, left: GOLD, right: GOLD_DEEP };
export const CLAY = { top: M.clay, left: M.clay, right: M.clayShade };

/* Isometric projection shared by every filled scene. A room is 6 x 6 units on
   plan and 4.2 high, with its back corner at the origin. */
export function pt(x: number, y: number, z = 0): [number, number] {
    return [320 + (x - y) * 40, 226 + (x + y) * 23 - z * 46];
}
export const p = (x: number, y: number, z = 0) => pt(x, y, z).join(",");
export const poly = (...points: [number, number, number?][]) => points.map(([x, y, z]) => p(x, y, z)).join(" ");

type BoxProps = { x: number; y: number; z?: number; w: number; d: number; h: number; top: string; left: string; right: string };

/** An extruded block: top, the face toward the lower-left, the face toward the lower-right. */
export function Box({ x, y, z = 0, w, d, h, top, left, right }: BoxProps) {
    return (
        <g>
            <polygon points={poly([x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h])} fill={left} />
            <polygon points={poly([x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h])} fill={right} />
            <polygon points={poly([x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h])} fill={top} />
        </g>
    );
}

/** A soft contact shadow under a piece of furniture. */
export function Shadow({ x, y, w, d }: { x: number; y: number; w: number; d: number }) {
    return <polygon points={poly([x, y], [x + w, y], [x + w, y + d], [x, y + d])} fill={M.shadow} opacity={0.13} transform="translate(9 10)" />;
}

/** The drawing sheet for a scene, with the same accessibility contract as the line drawings. */
export function Scene({ title, className = "", children }: IllustrationProps & { children: React.ReactNode }) {
    return (
        <svg
            viewBox="0 0 640 540"
            xmlns="http://www.w3.org/2000/svg"
            className={`h-auto w-full ${className}`}
            role={title ? "img" : undefined}
            aria-hidden={title ? undefined : true}
        >
            {title && <title>{title}</title>}
            {children}
        </svg>
    );
}

/** Floor, two standing walls and skirting. `boards` draws floorboard joints. */
export function Shell({ floor = M.floor, line = M.floorLine, boards = true }: { floor?: string; line?: string; boards?: boolean }) {
    return (
        <g>
            <polygon points={poly([0, 0], [6, 0], [6, 6], [0, 6])} fill={floor} />
            {boards &&
                Array.from({ length: 11 }, (_, index) => (index + 1) * 0.5).map((y) => (
                    <line key={y} x1={pt(0, y)[0]} y1={pt(0, y)[1]} x2={pt(6, y)[0]} y2={pt(6, y)[1]} stroke={line} strokeWidth={1} opacity={0.4} />
                ))}
            <polygon points={poly([0, 0], [0, 6], [0, 6, 4.2], [0, 0, 4.2])} fill={M.wall} />
            <polygon points={poly([0, 0], [6, 0], [6, 0, 4.2], [0, 0, 4.2])} fill={M.wallShade} />
            <polygon points={poly([0, 0], [0, 6], [0, 6, 0.22], [0, 0, 0.22])} fill={M.cream} />
            <polygon points={poly([0, 0], [6, 0], [6, 0, 0.22], [0, 0, 0.22])} fill={M.creamShade} />
        </g>
    );
}

/** A window on the right-hand wall, with the daylight it throws across the floor. */
export function Daylight({ from = 1.6, to = 4.6, sill = 1.05, head = 3.55 }: { from?: number; to?: number; sill?: number; head?: number }) {
    const mid = (from + to) / 2;

    return (
        <g>
            <polygon points={poly([from, 0, sill], [to, 0, sill], [to, 0, head], [from, 0, head])} fill={M.sky} stroke={M.wood} strokeWidth={5} strokeLinejoin="round" />
            <polygon points={poly([from, 0, (sill + head) / 2], [mid, 0, (sill + head) / 2], [mid, 0, head], [from, 0, head])} fill={M.skyLight} opacity={0.7} />
            <path d={`M${p(mid, 0, sill)}L${p(mid, 0, head)}`} stroke={M.wood} strokeWidth={3} />
            <polygon points={poly([from, 0], [to, 0], [to + 1.3, 3.4], [from + 1.3, 3.4])} fill="white" opacity={0.3} />
        </g>
    );
}

/** A glowing pendant hung from above the frame. */
export function Pendant({ x, y, z, r = 10 }: { x: number; y: number; z: number; r?: number }) {
    const [cx, cy] = pt(x, y, z);

    return (
        <g>
            <line x1={cx} y1={0} x2={cx} y2={cy} stroke={M.woodDark} strokeWidth={1.5} />
            <circle cx={cx} cy={cy} r={r * 2.4} fill={GOLD_LIGHT} opacity={0.22} />
            <circle cx={cx} cy={cy} r={r} fill={GOLD} />
            <circle cx={cx - r * 0.3} cy={cy - r * 0.3} r={r * 0.3} fill="white" opacity={0.7} />
        </g>
    );
}

/** A potted plant. */
export function Plant({ x, y, h = 0.7 }: { x: number; y: number; h?: number }) {
    const [cx, cy] = pt(x + 0.25, y + 0.25, h + 0.85);

    return (
        <g>
            <Box x={x} y={y} w={0.5} d={0.5} h={h} {...CLAY} />
            {[-58, -24, 8, 40, 72].map((angle, index) => (
                <ellipse key={angle} cx={cx} cy={cy - 30} rx={11} ry={40} fill={index % 2 ? G500 : G600} transform={`rotate(${angle} ${cx} ${cy + 8})`} />
            ))}
        </g>
    );
}
