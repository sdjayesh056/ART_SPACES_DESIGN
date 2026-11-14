import React from "react";

import type { IllustrationProps } from "@/types/content";

/*
    One pen set for every drawing in the library, all token references, so the
    illustrations retune with the palette. Three weights only: 3 for cut walls,
    1.5 for objects, 1 for annotation.
*/
export const INK = "var(--color-brand-900)";
export const MID = "var(--color-brand-700)";
export const SOFT = "var(--color-brand-50)";
export const TINT = "var(--color-brand-100)";
export const GOLD = "var(--color-accent-500)";
export const GOLD_LIGHT = "var(--color-accent-300)";
export const GOLD_SOFT = "var(--color-accent-100)";
export const RULE = "var(--color-line-strong)";
export const PAPER = "var(--color-surface)";
export const GROUND = "var(--color-surface-sunken)";
export const NOTE = "var(--color-ink-subtle)";

type SheetProps = IllustrationProps & {
    children: React.ReactNode;
    viewBox?: string;
};

/** The drawing sheet: sizing, default pen and the accessibility contract. */
export function Sheet({ title, className = "", children, viewBox = "0 0 480 360" }: SheetProps) {
    return (
        <svg
            viewBox={viewBox}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke={INK}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-auto w-full ${className}`}
            role={title ? "img" : undefined}
            aria-hidden={title ? undefined : true}
        >
            {title && <title>{title}</title>}
            {children}
        </svg>
    );
}

type LabelProps = {
    x: number;
    y: number;
    children: React.ReactNode;
    anchor?: "start" | "middle" | "end";
    strong?: boolean;
    rotate?: number;
};

/** Drafting-style caption: small, spaced capitals in the mono face. */
export function Label({ x, y, children, anchor = "middle", strong = false, rotate }: LabelProps) {
    return (
        <text
            x={x}
            y={y}
            textAnchor={anchor}
            fontSize={10}
            letterSpacing={1.2}
            fontFamily="var(--font-mono)"
            fontWeight={strong ? 700 : 500}
            stroke="none"
            fill={strong ? INK : NOTE}
            transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
        >
            {children}
        </text>
    );
}

type DimProps = { from: number; to: number; at: number; label: string; vertical?: boolean };

/** A dimension line with end ticks. Horizontal by default; `at` is the fixed axis. */
export function Dim({ from, to, at, label, vertical = false }: DimProps) {
    const mid = (from + to) / 2;

    return vertical ? (
        <g stroke={GOLD} strokeWidth={1}>
            <path d={`M${at} ${from}V${to}M${at - 4} ${from}h8M${at - 4} ${to}h8`} />
            <Label x={at + 12} y={mid} rotate={90}>
                {label}
            </Label>
        </g>
    ) : (
        <g stroke={GOLD} strokeWidth={1}>
            <path d={`M${from} ${at}H${to}M${from} ${at - 4}v8M${to} ${at - 4}v8`} />
            <Label x={mid} y={at + 14}>
                {label}
            </Label>
        </g>
    );
}

/** A door leaf and its swing, hinged at the origin. */
export function Door({ x, y, size = 28, rotate = 0 }: { x: number; y: number; size?: number; rotate?: number }) {
    return (
        <path
            transform={`translate(${x} ${y}) rotate(${rotate})`}
            d={`M0 0H${size}M${size} 0A${size} ${size} 0 0 1 0 ${size}`}
            strokeWidth={1}
        />
    );
}

/** A leader line ending in a gold dot, for material and fixture callouts. */
export function Callout({ x, y, toX, toY, label, anchor = "start" }: { x: number; y: number; toX: number; toY: number; label: string; anchor?: "start" | "end" }) {
    return (
        <g>
            <path d={`M${x} ${y}L${toX} ${toY}`} stroke={GOLD} strokeWidth={1} />
            <circle cx={x} cy={y} r={3} fill={GOLD} stroke="none" />
            <Label x={toX + (anchor === "start" ? 5 : -5)} y={toY + 3} anchor={anchor}>
                {label}
            </Label>
        </g>
    );
}
