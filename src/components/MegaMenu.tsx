"use client";

import React, { useEffect, useState } from "react";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

import { MENU_KEYS, type MenuItem, type MenuKey, type MenuSection } from "@/types/navigation";

type MegaMenuProps = {
    menuKey: MenuKey;
    section: MenuSection;
    /** Called when a link is followed, so the bar can close the panel behind it. */
    onNavigate: () => void;
};

/*
    Any arch can become the wide one, so they all ask for the same file. The
    preloader shares this string: both resolve to the same optimised image, and
    the preload is a guaranteed cache hit when the panel opens.
*/
const ARCH_SIZES = "(min-width: 1280px) 420px, 34vw";

const LABEL = "font-mono uppercase tracking-[0.2em]";
/*
    No `outline-none` beside it: in Tailwind v4 that sets the outline STYLE to
    none, which `outline-2` then inherits, and the focus ring silently vanishes.
    Links only draw an outline on :focus-visible anyway.
*/
const FOCUS = "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent-on-brand";
/* The arcade re-proportions on one curve: the arch that opens and the one that closes move together. */
const SWING = "duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";
const ROVE: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
const two = (value: number) => String(value).padStart(2, "0");

/**
 * Starts fetching the arch image for each item, so it is already in the HTTP
 * cache when a panel opens. Navbar calls this once, when a mouse first reaches
 * the bar.
 */
export function preloadMenuImages(items: MenuItem[]) {
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    for (const item of items) {
        const { props } = getImageProps({ src: item.image, alt: "", fill: true, sizes: ARCH_SIZES });
        const image = new window.Image();
        image.decoding = "async";
        // `sizes` before `srcset`, so the browser picks the same candidate the panel will.
        if (props.sizes) image.sizes = props.sizes;
        if (props.srcSet) image.srcset = props.srcSet;
        image.src = props.src;
    }
}

/**
 * The mega menu, drawn as the elevation of a house at dusk.
 *
 * On the left is the schedule: a numbered list of the pages, which is the
 * real navigation and all a keyboard or a screen reader needs. On the right
 * is the house: an arcade of four openings, one room behind each. The rooms
 * are dark until one is chosen. Pointing at a row or an arch switches that
 * room's lights on — the arch opens wide, the room brightens, and light
 * falls across the threshold.
 *
 * The arcade repeats the schedule for the eye, so it is hidden from assistive
 * technology and its links are out of the tab order.
 *
 * Deliberately not animated in as a whole: Navbar's wrapper already fades and
 * settles the panel, and a second entrance here would multiply the two.
 */
export function MegaMenu({ menuKey, section, onNavigate }: MegaMenuProps) {
    const { title, items } = section;
    const pathname = usePathname();
    /* Navbar keys the panel on the open menu, so all of this starts fresh each time one opens. */
    const [active, setActive] = useState(0);
    /* The first room is lit a beat after the panel arrives, so the lights are seen coming on. */
    const [lit, setLit] = useState(false);
    const [loaded, setLoaded] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const timer = window.setTimeout(() => setLit(true), 160);
        return () => window.clearTimeout(timer);
    }, []);

    /* Arrow keys, Home and End walk the schedule; Tab still moves through it one link at a time. */
    const rove = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
        const links = Array.from(event.currentTarget.closest("ul")?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? []);
        const at = links.indexOf(event.currentTarget);
        const to = event.key === "Home" ? 0 : event.key === "End" ? links.length - 1 : event.key in ROVE && at >= 0 ? (at + ROVE[event.key] + links.length) % links.length : -1;
        if (to < 0) return;
        event.preventDefault();
        links[to].focus();
    };

    return (
        <div className="overflow-clip rounded-panel border border-white/10 bg-brand-950 text-ink-inverse shadow-2xl">
            {/* Scrolls inside itself on a short screen, so the last row is always reachable. */}
            <div className="grid max-h-[calc(100svh-7.5rem)] grid-cols-[minmax(0,24rem)_minmax(0,1fr)] overflow-y-auto xl:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
                {/* ===== The schedule: the navigation itself ===== */}
                <div className="flex flex-col border-r border-white/10 p-7 xl:p-8">
                    <p className={`${LABEL} flex items-center text-[11px] text-ink-inverse/65`}>
                        <span className="text-accent-on-brand">
                            {two(MENU_KEYS.indexOf(menuKey) + 1)} / {two(MENU_KEYS.length)}
                        </span>
                        <span aria-hidden="true" className="mx-3 h-px w-6 bg-current" />
                        {title}
                    </p>

                    <ul className="mt-5 border-b border-white/10">
                        {items.map((item, index) => {
                            const on = index === active;
                            const here = pathname === item.href;
                            return (
                                <li key={item.id} className="border-t border-white/10">
                                    <Link
                                        href={item.href}
                                        onClick={onNavigate}
                                        onMouseEnter={() => setActive(index)}
                                        // onFocus so tabbing through the schedule lights each room exactly as hovering does.
                                        onFocus={() => setActive(index)}
                                        onKeyDown={rove}
                                        aria-current={here ? "page" : undefined}
                                        className={`grid grid-cols-[1.75rem_minmax(0,1fr)_1rem] items-start gap-x-3 py-3 ${FOCUS}`}
                                    >
                                        <span className={`mt-[0.45rem] font-mono text-[11px] transition-colors duration-300 ${on ? "text-accent-on-brand" : "text-ink-inverse/60"}`}>{two(index + 1)}</span>
                                        <span className="min-w-0">
                                            <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                                                <span className={`text-xl font-medium tracking-tight transition-colors duration-300 ${on ? "text-accent-on-brand" : "text-ink-inverse"}`}>{item.title}</span>
                                                {item.badge && (
                                                    <span className={`${LABEL} rounded-full border border-accent-on-brand/45 px-2 py-0.5 text-[9px] font-semibold text-accent-on-brand`}>{item.badge}</span>
                                                )}
                                                {here && <span className={`${LABEL} text-[9px] text-ink-inverse/65`}>You are here</span>}
                                            </span>
                                            <span
                                                className={`mt-1 line-clamp-2 text-[13px] leading-snug transition-colors duration-300 [@media(max-height:700px)]:line-clamp-1 ${
                                                    on ? "text-ink-inverse/85" : "text-ink-inverse/60"
                                                }`}
                                            >
                                                {item.description}
                                            </span>
                                        </span>
                                        <ArrowUpRight
                                            aria-hidden="true"
                                            className={`mt-[0.4rem] h-4 w-4 text-accent-on-brand transition-[opacity,translate] duration-300 ${on ? "opacity-100" : "-translate-x-1 translate-y-1 opacity-0"}`}
                                        />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <Link
                        href={`/${menuKey}`}
                        onClick={onNavigate}
                        aria-current={pathname === `/${menuKey}` ? "page" : undefined}
                        className={`mt-auto inline-flex min-h-11 items-center gap-2 self-start pt-3 text-sm font-semibold text-ink-inverse/85 transition-colors hover:text-accent-on-brand ${FOCUS}`}
                    >
                        {title} overview
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                </div>

                {/* ===== The house: an arcade of four rooms, lit one at a time ===== */}
                <div aria-hidden="true" className="flex flex-col p-7 xl:p-8">
                    <div className="relative flex min-h-[19rem] flex-1">
                        <ul className="flex min-w-0 flex-1 gap-3">
                            {items.map((item, index) => {
                                const on = index === active;
                                const glow = on && lit;
                                return (
                                    <li key={item.id} className={`flex min-w-0 basis-0 flex-col transition-[flex-grow] ${SWING} ${on ? "[flex-grow:3.6]" : "[flex-grow:1]"}`}>
                                        <Link href={item.href} tabIndex={-1} onClick={onNavigate} onMouseEnter={() => setActive(index)} className="group flex min-h-0 flex-1 flex-col">
                                            {/* The grid bubble: the bay's number, on its centre line. */}
                                            <span className="flex flex-col items-center">
                                                <span
                                                    className={`flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[10px] transition-colors duration-500 ${
                                                        glow ? "border-accent-on-brand bg-accent-on-brand font-semibold text-brand-950" : "border-white/30 text-ink-inverse/70"
                                                    }`}
                                                >
                                                    {two(index + 1)}
                                                </span>
                                                <span className="h-3.5 border-l border-dashed border-white/30" />
                                            </span>

                                            <span className="relative block min-h-0 flex-1">
                                                {/* Light leaking round the opening. */}
                                                <span className={`absolute -inset-2 rounded-t-full bg-accent-400/35 blur-2xl transition-opacity duration-700 motion-reduce:transition-none ${glow ? "opacity-100" : "opacity-0"}`} />
                                                <span className="absolute inset-0 overflow-clip rounded-t-full bg-brand-900 ring-1 ring-white/15">
                                                    <Image
                                                        src={item.image}
                                                        alt=""
                                                        fill
                                                        sizes={ARCH_SIZES}
                                                        onLoad={() => setLoaded((current) => (current[item.id] ? current : { ...current, [item.id]: true }))}
                                                        className={`object-cover transition-[opacity,scale] duration-[900ms] ease-out motion-reduce:transition-none ${loaded[item.id] ? "opacity-100" : "opacity-0"} ${
                                                            glow ? "scale-100" : "scale-110"
                                                        }`}
                                                    />
                                                    {/* Lights off: the room as it is before anyone walks in. */}
                                                    <span className={`absolute inset-0 bg-brand-950/75 transition-opacity duration-500 motion-reduce:transition-none ${glow ? "opacity-0" : "opacity-100"}`} />
                                                    <span className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-brand-950/80 to-transparent" />
                                                    <span className={`absolute inset-x-4 bottom-3.5 flex items-end justify-between gap-3 transition-opacity duration-500 motion-reduce:transition-none ${glow ? "opacity-100 delay-200" : "opacity-0"}`}>
                                                        <span className={`${LABEL} whitespace-nowrap text-[10px] text-ink-inverse`}>{item.title}</span>
                                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/45 transition-colors group-hover:bg-accent-500 group-hover:text-brand-950">
                                                            <ArrowUpRight className="h-4 w-4" />
                                                        </span>
                                                    </span>
                                                </span>
                                            </span>

                                            {/* Light falling across the threshold. */}
                                            <span
                                                className={`h-7 bg-gradient-to-b from-accent-300/40 to-transparent transition-opacity duration-700 motion-reduce:transition-none [clip-path:polygon(7%_0,93%_0,100%_100%,0_100%)] ${
                                                    glow ? "opacity-100" : "opacity-0"
                                                }`}
                                            />
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                        {/* The ground line the arcade stands on. */}
                        <span className="pointer-events-none absolute inset-x-0 bottom-7 h-px bg-white/25" />
                    </div>

                    <p className={`${LABEL} mt-2 flex items-center justify-between gap-4 text-[10px] text-ink-inverse/55`}>
                        <span>Elevation · {two(items.length)} rooms</span>
                        <span className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent-on-brand" />
                            Point at a room to light it
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
