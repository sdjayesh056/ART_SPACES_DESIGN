import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

import { Swatch } from "@/components/illustrations/Swatch";
import { Reveal } from "@/components/ui/Reveal";
import type { Material } from "@/data/vertical-boards";
import type { Feature } from "@/types/content";

/* The inner pages' type system: large, light and tight. */
export const KICKER = "font-mono text-xs font-medium uppercase tracking-[0.22em]";
export const H2 = "text-[clamp(2rem,4.2vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-balance";

type HeadingProps = {
    /** Must match the `labelledBy` of the surrounding section. */
    id: string;
    eyebrow?: string;
    eyebrowIcon?: LucideIcon;
    title: React.ReactNode;
    highlight?: string;
    lede?: string;
    align?: "center" | "left";
    tone?: "default" | "inverse";
    className?: string;
};

/**
 * Kicker, h2 and lede for the inner pages. Same props as the home page's
 * SectionHeading so the two are interchangeable at a call site, but set in
 * the lighter display style and left-aligned by default.
 */
export function Heading({ id, eyebrow, title, highlight, lede, align = "left", tone = "default", className = "" }: HeadingProps) {
    const inverse = tone === "inverse";

    return (
        <Reveal className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}>
            {eyebrow && (
                <p className={`${KICKER} mb-5 flex items-center gap-3 ${align === "center" ? "justify-center" : ""} ${inverse ? "text-accent-on-brand" : "text-accent-600"}`}>
                    <span aria-hidden="true" className={`h-px w-10 ${inverse ? "bg-accent-on-brand" : "bg-accent-500"}`} />
                    {eyebrow}
                </p>
            )}
            <h2 id={id} className={`${H2} ${inverse ? "text-ink-inverse" : "text-ink"}`}>
                {title}
                {highlight && (
                    <>
                        {" "}
                        <span className={inverse ? "text-accent-on-brand" : "brand-gradient-text"}>{highlight}</span>
                    </>
                )}
            </h2>
            {lede && (
                <p className={`mt-6 text-lg leading-relaxed text-pretty ${inverse ? "font-light text-ink-inverse/80" : "text-ink-muted"}`}>
                    {lede}
                </p>
            )}
        </Reveal>
    );
}

/** The deep-green room: a full-bleed dark section with soft green and gold light. */
export function DarkBand({ labelledBy, children, id }: { labelledBy: string; children: React.ReactNode; id?: string }) {
    return (
        <section id={id} aria-labelledby={labelledBy} className="relative overflow-clip bg-brand-950 py-20 text-ink-inverse md:py-32">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute -left-40 top-0 h-[34rem] w-[34rem] rounded-full bg-brand-700/40 blur-[160px]" />
                <div className="absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-accent-500/15 blur-[160px]" />
            </div>
            <div className="relative">{children}</div>
        </section>
    );
}

type IndexItem = string | { title: string; body?: string; href?: string };

/** A typographic index: numbered rows at display size, hairlines between. */
export function TypeIndex({ items }: { items: IndexItem[] }) {
    return (
        <ol className="list-none border-t border-line-strong p-0">
            {items.map((item, index) => {
                const entry = typeof item === "string" ? { title: item } : item;
                const row = (
                    <span className="group flex items-baseline gap-6 border-b border-line-strong py-6 transition-[padding] duration-500 hover:pl-4 md:py-8">
                        <span className="font-mono text-sm text-accent-600">{String(index + 1).padStart(2, "0")}</span>
                        <span className="grow">
                            <span className="block text-2xl font-medium tracking-tight text-ink transition-colors group-hover:text-brand-700 md:text-4xl">
                                {entry.title}
                            </span>
                            {entry.body && <span className="mt-3 block max-w-2xl leading-relaxed text-ink-muted">{entry.body}</span>}
                        </span>
                        {entry.href && <ArrowUpRight className="h-6 w-6 shrink-0 self-center text-ink-subtle transition-transform group-hover:rotate-45 group-hover:text-brand-700" aria-hidden="true" />}
                    </span>
                );

                return (
                    <Reveal as="li" key={entry.title} delay={Math.min(index * 0.05, 0.25)}>
                        {entry.href ? <Link href={entry.href}>{row}</Link> : row}
                    </Reveal>
                );
            })}
        </ol>
    );
}

/* Surfaces for the stacking cards, light to dark. Whole class strings. */
const STACK = [
    "bg-surface text-ink border-line",
    "bg-brand-50 text-ink border-brand-200",
    "bg-accent-100 text-ink border-accent-300",
    "bg-brand-950 text-ink-inverse border-brand-900",
];

type StackCardsProps = {
    items: Feature[];
    /** One visual per card: an image URL, or any node (an illustration). Cycles if shorter. */
    visuals: (string | React.ReactNode)[];
    altPrefix?: string;
    level?: "h3" | "h4";
};

/**
 * Large cards that pin and stack over one another as the page scrolls —
 * position: sticky with a stepped offset, so it costs no JavaScript.
 */
export function StackCards({ items, visuals, altPrefix = "Interior", level: Title = "h3" }: StackCardsProps) {
    return (
        <ol className="list-none space-y-6 p-0">
            {items.map((item, index) => {
                const visual = visuals[index % visuals.length];

                return (
                    <li key={item.title} className="lg:sticky" style={{ top: `${6.5 + index * 1.5}rem` }}>
                        <article className={`grid overflow-clip rounded-panel border shadow-card md:grid-cols-[1.2fr_1fr] ${STACK[index % STACK.length]}`}>
                            <div className="flex flex-col justify-between gap-10 p-8 md:p-12 lg:min-h-[24rem]">
                                <p className={`${KICKER} opacity-70`}>
                                    {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                                </p>
                                <div>
                                    <Title className="text-3xl font-medium leading-tight tracking-tight text-balance md:text-4xl">{item.title}</Title>
                                    <p className="mt-4 max-w-lg text-lg leading-relaxed opacity-80">{item.body}</p>
                                </div>
                            </div>
                            {typeof visual === "string" ? (
                                <div className="relative min-h-56">
                                    <Image
                                        src={visual}
                                        alt={`${item.title} — ${altPrefix}, reference photograph`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 560px"
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="flex items-center bg-surface p-6 md:p-10">{visual}</div>
                            )}
                        </article>
                    </li>
                );
            })}
        </ol>
    );
}

/** Round material samples with a soft sheen. For use on the dark band. */
export function MaterialDiscs({ materials, level: Title = "h3" }: { materials: Material[]; level?: "h3" | "h4" }) {
    return (
        <ul className="grid list-none grid-cols-2 gap-x-6 gap-y-12 p-0 sm:grid-cols-3 lg:grid-cols-5">
            {materials.map((material, index) => (
                <Reveal as="li" key={material.name} delay={Math.min(index * 0.07, 0.3)}>
                    <div className="group">
                        <div className="relative mx-auto aspect-square w-full max-w-52 overflow-clip rounded-full shadow-2xl ring-1 ring-white/20 transition-transform duration-700 group-hover:-translate-y-2 group-hover:rotate-6">
                            <Swatch kind={material.kind} base={material.base} line={material.line} className="h-full w-full" />
                            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-white/35 via-transparent to-scrim/30" />
                        </div>
                        <Title className="mt-6 text-center text-lg font-medium">{material.name}</Title>
                        <p className="mx-auto mt-2 max-w-52 text-center text-sm leading-relaxed text-ink-inverse/70">{material.note}</p>
                    </div>
                </Reveal>
            ))}
        </ul>
    );
}

export type Tile = { title: string; description: string; href: string; icon?: LucideIcon; meta?: string };

const TILE_COLUMNS = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3" } as const;

/** Large link tiles that turn deep green on hover. The arrow is visible at rest. */
export function Tiles({ items, columns = 2, level: Title = "h3" }: { items: Tile[]; columns?: 2 | 3; level?: "h3" | "h4" }) {
    return (
        <ul className={`grid list-none gap-5 p-0 ${TILE_COLUMNS[columns]}`}>
            {items.map((item, index) => (
                <Reveal as="li" key={item.href} delay={Math.min(index * 0.06, 0.24)}>
                    <Link
                        href={item.href}
                        className="group flex h-full flex-col justify-between gap-12 rounded-panel border border-line bg-surface-muted p-8 transition-all duration-500 hover:border-brand-900 hover:bg-brand-950 hover:text-ink-inverse md:p-10"
                    >
                        <span className="flex items-start justify-between gap-4">
                            {item.icon ? (
                                <item.icon className="h-10 w-10 text-brand-700 transition-colors group-hover:text-accent-on-brand" strokeWidth={1.25} aria-hidden="true" />
                            ) : (
                                <span className={`${KICKER} text-accent-600 group-hover:text-accent-on-brand`}>{item.meta}</span>
                            )}
                            <span
                                aria-hidden="true"
                                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line-strong transition-all duration-500 group-hover:rotate-45 group-hover:border-accent-on-brand group-hover:bg-accent-on-brand group-hover:text-brand-950"
                            >
                                <ArrowUpRight className="h-5 w-5" />
                            </span>
                        </span>
                        <span>
                            <Title className="text-2xl font-medium tracking-tight md:text-3xl">{item.title}</Title>
                            <span className="mt-3 block leading-relaxed text-ink-muted transition-colors group-hover:text-ink-inverse/75">
                                {item.description}
                            </span>
                        </span>
                    </Link>
                </Reveal>
            ))}
        </ul>
    );
}

/** Numbered frosted cards for the dark band. */
export function GlassCards({ items, level: Title = "h3" }: { items: Feature[]; level?: "h3" | "h4" }) {
    return (
        <ol className="grid list-none gap-5 p-0 md:grid-cols-2 lg:grid-cols-4">
            {items.map((item, index) => (
                <Reveal as="li" key={item.title} delay={Math.min(index * 0.07, 0.28)}>
                    <article className="h-full rounded-panel border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-colors duration-500 hover:border-accent-on-brand/50 hover:bg-white/10">
                        <p className="font-mono text-sm font-medium text-accent-on-brand">{String(index + 1).padStart(2, "0")}</p>
                        <Title className="mt-10 text-2xl font-medium leading-tight tracking-tight">{item.title}</Title>
                        <p className="mt-3 leading-relaxed text-ink-inverse/75">{item.body}</p>
                    </article>
                </Reveal>
            ))}
        </ol>
    );
}
