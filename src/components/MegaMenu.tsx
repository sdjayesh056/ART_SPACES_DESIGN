"use client";

import React, { useState } from "react";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight } from "lucide-react";

import type { MenuItem } from "@/types/navigation";

interface MegaMenuProps {
    title: string;
    items: MenuItem[];
}

/*
    The stage is two thirds of a panel capped at max-w-5xl (1024px). The
    rendered images and the preloader share this string so both resolve to the
    same optimised file, and the preload is a guaranteed cache hit.
*/
const STAGE_SIZES = "(min-width: 1024px) 683px, 1px";

/*
    Cross-fade between stage images in CSS, as whole class strings. Showing
    fades and settles from 110%; hiding only fades, then snaps back to 110%
    once invisible so the next show can settle again. (Tailwind v4 scales with
    the `scale` property, so that is what transitions.)
*/
const STAGE_SHOWN = "opacity-100 scale-100 [transition:opacity_500ms_ease-out,scale_500ms_ease-out]";
const STAGE_HIDDEN = "opacity-0 scale-110 [transition:opacity_500ms_ease-out,scale_0s_linear_500ms]";

/**
 * Starts fetching the stage image for each item, so it is already in the HTTP
 * cache when a panel opens. Navbar calls this when a mouse first reaches the
 * bar, with the first item of every menu.
 */
export function preloadMenuStage(items: MenuItem[]) {
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    for (const item of items) {
        const { props } = getImageProps({ src: item.image, alt: "", fill: true, sizes: STAGE_SIZES });
        const image = new window.Image();
        image.decoding = "async";
        // `sizes` before `srcset`, so the browser picks the same candidate the panel will.
        if (props.sizes) image.sizes = props.sizes;
        if (props.srcSet) image.srcset = props.srcSet;
        image.src = props.src;
    }
}

export function MegaMenu({ title, items }: MegaMenuProps) {
    /*
        No reset effect needed: Navbar keys this panel's wrapper on the active
        menu, so switching sections remounts the subtree and this initialiser
        runs fresh. Previously the id lingered and no row read as active.
    */
    const [hoveredId, setHoveredId] = useState<string>(items[0]?.id ?? "");
    const [loaded, setLoaded] = useState<Record<string, boolean>>({});

    const activeItem = items.find((item) => item.id === hoveredId) ?? items[0];

    return (
        /*
            Deliberately NOT animated. Navbar's wrapper already fades, slides
            and scales the panel in; a second entrance here multiplied the two
            opacities, so the panel hung at a faint half-state before snapping
            to full.
        */
        <div className="w-full overflow-hidden shadow-2xl rounded-b-3xl border-t border-white/10 bg-surface-sunken">
            <div className="max-w-7xl mx-auto flex min-h-[450px]">
                {/* LEFT COLUMN: Navigation & List */}
                <div className="w-1/3 py-10 pl-8 pr-12 flex flex-col justify-between border-r border-line-strong relative z-10">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.3em] mb-8 text-ink-subtle">
                            {title}
                        </p>

                        <ul className="space-y-2">
                            {items.map((item) => {
                                const isActive = hoveredId === item.id;

                                return (
                                    <li key={item.id} onMouseEnter={() => setHoveredId(item.id)}>
                                        <Link
                                            href={item.href}
                                            // onFocus so tabbing through the panel updates the
                                            // visual stage exactly as hovering does.
                                            onFocus={() => setHoveredId(item.id)}
                                            className="group flex items-center justify-between py-3"
                                        >
                                            <div className="flex items-baseline gap-3">
                                                <span
                                                    className={`text-xl font-medium transition-all duration-300 ${
                                                        isActive
                                                            ? "text-accent-on-brand bg-brand-900 translate-x-2 py-2 px-6 rounded-2xl"
                                                            : "text-brand-900"
                                                    }`}
                                                >
                                                    {item.title}
                                                </span>
                                                {item.badge && (
                                                    <span className="px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-widest border border-line-strong rounded-full text-ink-muted">
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </div>

                                            <ArrowRight
                                                aria-hidden="true"
                                                className={`w-4 h-4 transition-all duration-300 ${
                                                    isActive
                                                        ? "opacity-100 translate-x-0"
                                                        : "opacity-0 -translate-x-4"
                                                }`}
                                            />
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Footer / Context */}
                    <div className="mt-8">
                        <p className="text-sm text-ink-muted max-w-[280px] leading-relaxed">
                            {activeItem?.description}
                        </p>
                        {activeItem && (
                            <Link
                                href={activeItem.href}
                                className="inline-flex items-center gap-2 mt-4 text-xs font-bold uppercase tracking-widest text-ink hover:text-brand-900 transition-colors"
                            >
                                View Details
                            </Link>
                        )}
                    </div>
                </div>

                {/*
                    RIGHT COLUMN: Visual Stage.

                    This was one CSS background per hovered row, pointing at the
                    raw 2700px source. A CSS background is decoded synchronously
                    on the frame that first paints it, and that decode froze the
                    panel's entrance for 150ms or more — it opened part-way,
                    stuck, then jumped to full.

                    Now every row's image is mounted with the panel as a resized
                    next/image: about a third of the pixels, decoded off the
                    animation's frame, and faded in only once it has loaded.
                    Hovering a row cross-fades between images already in place
                    instead of mounting and decoding a new one. The deep-green
                    ground keeps the caption readable until the image arrives.
                */}
                <div className="w-2/3 relative overflow-hidden bg-brand-950" aria-hidden="true">
                    {items.map((item) => (
                        <Image
                            key={item.id}
                            src={item.image}
                            alt=""
                            fill
                            sizes={STAGE_SIZES}
                            onLoad={() =>
                                setLoaded((current) => (current[item.id] ? current : { ...current, [item.id]: true }))
                            }
                            className={`object-cover ${
                                item.id === activeItem?.id && loaded[item.id] ? STAGE_SHOWN : STAGE_HIDDEN
                            }`}
                        />
                    ))}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                    <AnimatePresence>
                        {activeItem && (
                            <m.div
                                key={activeItem.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeOut" } }}
                                transition={{ delay: 0.2 }}
                                className="absolute bottom-8 left-8 right-8 text-white"
                            >
                                <h3 className="text-3xl font-light mb-2">{activeItem.title}</h3>
                                <div className="h-px w-24 bg-white/50 mb-4" />
                                <p className="text-white/90 text-sm max-w-md">
                                    {activeItem.description}
                                </p>
                            </m.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
