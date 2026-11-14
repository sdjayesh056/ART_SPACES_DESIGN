import React from "react";

import { Reveal } from "@/components/ui/Reveal";
import type { Feature } from "@/types/content";

type BentoGridProps = {
    /** The first item becomes the dominant tile. */
    items: Feature[];
    /** Optional visual for the dominant tile, e.g. an illustration. */
    lead?: React.ReactNode;
    level?: "h3" | "h4";
};

/*
    The dominant tile takes 2 x 2 of a three-column grid, leaving room for two
    small tiles beside it. Whatever comes after those is widened so the last
    row always closes flush instead of leaving a hole. Whole class strings,
    because Tailwind cannot see a class assembled at runtime.
*/
function spanFor(index: number, count: number): string {
    if (index < 2) return "";
    if (count === 3) return "md:col-span-2 lg:col-span-3";
    if (count === 4 && index === 2) return "lg:col-span-2";
    return "";
}

/**
 * One large brand tile and a field of small ones. The scale contrast is the
 * point: a grid of equal cards reads as a template, a dominant tile reads as
 * an editorial decision.
 */
export function BentoGrid({ items, lead, level: Heading = "h3" }: BentoGridProps) {
    const [first, ...rest] = items;

    return (
        <ul className="grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2 lg:grid-cols-3">
            <Reveal as="li" className="md:col-span-2 lg:row-span-2">
                <article className="relative flex h-full flex-col justify-between overflow-clip rounded-panel bg-gradient-to-br from-brand-950 via-brand-900 to-brand-700 p-8 text-ink-inverse shadow-card md:p-10">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent-500/20 blur-[80px]"
                    />
                    {lead && <div className="relative mb-8 rounded-card bg-surface p-4 sm:p-6">{lead}</div>}
                    <div className="relative">
                        {first.icon && <first.icon className="mb-5 h-7 w-7 text-accent-on-brand" aria-hidden="true" />}
                        <Heading className="text-3xl font-medium tracking-tight leading-tight text-balance">{first.title}</Heading>
                        <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-inverse/85">{first.body}</p>
                    </div>
                </article>
            </Reveal>

            {rest.map((item, index) => (
                <Reveal
                    as="li"
                    key={item.title}
                    delay={Math.min((index + 1) * 0.06, 0.3)}
                    className={spanFor(index, rest.length)}
                >
                    <article className="h-full rounded-panel border border-line bg-surface p-8 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover">
                        {item.icon && (
                            <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-tile bg-brand-50 text-brand-900">
                                <item.icon className="h-6 w-6" aria-hidden="true" />
                            </span>
                        )}
                        <Heading className="text-xl font-medium tracking-tight leading-tight text-ink">{item.title}</Heading>
                        <p className="mt-3 leading-relaxed text-ink-muted">{item.body}</p>
                    </article>
                </Reveal>
            ))}
        </ul>
    );
}
