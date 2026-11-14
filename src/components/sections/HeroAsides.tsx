import React from "react";
import Link from "next/link";
import { ArrowUpRight, Quote, type LucideIcon } from "lucide-react";

/*
    Cards for the frosted panel beside an immersive hero headline. Each page
    gets a different one, so no two photo heroes read the same. All sit on
    dark glass: white type, gold labels.
*/
const TITLE = "font-mono text-xs font-medium uppercase tracking-[0.22em] text-accent-on-brand";

/** A numbered list of links — an index of what the page leads to. */
export function AsideLinks({ title, items }: { title: string; items: { label: string; href: string }[] }) {
    return (
        <>
            <p className={TITLE}>{title}</p>
            <ol className="mt-3 list-none divide-y divide-white/15 p-0">
                {items.map((item, index) => (
                    <li key={item.href}>
                        <Link href={item.href} className="group flex min-h-11 items-center gap-4 py-2 text-ink-inverse/90 transition-colors hover:text-accent-on-brand">
                            <span className="font-mono text-xs text-accent-on-brand">{String(index + 1).padStart(2, "0")}</span>
                            <span className="grow font-medium">{item.label}</span>
                            <ArrowUpRight className="h-4 w-4 shrink-0 opacity-60 transition-transform group-hover:rotate-45 group-hover:opacity-100" aria-hidden="true" />
                        </Link>
                    </li>
                ))}
            </ol>
        </>
    );
}

/** A two-by-two grid of icon tiles. */
export function AsideGrid({ title, items }: { title: string; items: { label: string; href: string; icon: LucideIcon }[] }) {
    return (
        <>
            <p className={TITLE}>{title}</p>
            <ul className="mt-4 grid list-none grid-cols-2 gap-3 p-0">
                {items.map((item) => (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            className="group flex h-full flex-col gap-6 rounded-tile border border-white/15 bg-white/5 p-4 transition-colors hover:border-accent-on-brand hover:bg-white/15"
                        >
                            <item.icon className="h-7 w-7 text-accent-on-brand" strokeWidth={1.25} aria-hidden="true" />
                            <span className="flex items-center justify-between gap-2 font-medium text-ink-inverse">
                                {item.label}
                                <ArrowUpRight className="h-4 w-4 opacity-60 transition-transform group-hover:rotate-45 group-hover:opacity-100" aria-hidden="true" />
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

/** A short vertical sequence joined by a rail. */
export function AsideSteps({ title, items }: { title: string; items: string[] }) {
    return (
        <>
            <p className={TITLE}>{title}</p>
            <ol className="relative mt-5 list-none space-y-5 p-0 before:absolute before:bottom-3 before:left-[0.9rem] before:top-3 before:w-px before:bg-white/25">
                {items.map((item, index) => (
                    <li key={item} className="relative flex items-center gap-4">
                        <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-on-brand font-mono text-xs font-medium text-brand-950">
                            {index + 1}
                        </span>
                        <span className="font-medium text-ink-inverse">{item}</span>
                    </li>
                ))}
            </ol>
        </>
    );
}

/** A cloud of labels. */
export function AsideChips({ title, items }: { title: string; items: string[] }) {
    return (
        <>
            <p className={TITLE}>{title}</p>
            <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
                {items.map((item) => (
                    <li key={item} className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-sm font-medium text-ink-inverse">
                        {item}
                    </li>
                ))}
            </ul>
        </>
    );
}

/** One sentence at reading size, attributed. */
export function AsideQuote({ quote, source }: { quote: string; source: string }) {
    return (
        <figure>
            <Quote className="h-8 w-8 text-accent-on-brand" strokeWidth={1.25} aria-hidden="true" />
            <blockquote className="mt-4 text-xl font-light leading-snug text-ink-inverse xl:text-2xl">
                <p>{quote}</p>
            </blockquote>
            <figcaption className={`${TITLE} mt-5`}>{source}</figcaption>
        </figure>
    );
}
