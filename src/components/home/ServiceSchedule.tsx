"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SERVICES } from "@/data/services";

const two = (value: number) => String(value).padStart(2, "0");

/**
 * The services set out like a drawing schedule: a numbered list on the right,
 * and on the left the drawing that belongs to whichever row is under the
 * pointer or has focus. Every row links to its service page.
 *
 * Below `lg` there is no room for the drawing, so each row carries its own
 * description instead.
 */
export function ServiceSchedule() {
    const [active, setActive] = useState(0);
    const current = SERVICES[active];

    return (
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <div className="hidden lg:block">
                <figure className="sticky top-28 rounded-card border border-line bg-surface p-6 shadow-card">
                    <current.illustration title={current.illustrationTitle} />
                    <figcaption className="mt-4 flex items-center justify-between gap-4 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                        <span>
                            Drawing {two(active + 1)} / {two(SERVICES.length)}
                        </span>
                        <span className="text-right text-brand-800">{current.title}</span>
                    </figcaption>
                </figure>
            </div>

            <ol className="border-b border-line">
                {SERVICES.map((service, index) => {
                    const on = index === active;
                    return (
                        <li key={service.slug} className="border-t border-line">
                            <Link
                                href={`/services/${service.slug}`}
                                onMouseEnter={() => setActive(index)}
                                onFocus={() => setActive(index)}
                                className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-x-5 py-6 md:py-7"
                            >
                                <span className={`font-mono text-xs transition-colors ${on ? "text-brand-800" : "text-ink-subtle"}`}>{two(index + 1)}</span>
                                <span>
                                    <h3 className={`text-2xl font-medium tracking-tight transition-colors md:text-[1.75rem] ${on ? "text-brand-900" : "text-ink"}`}>{service.title}</h3>
                                    <span className={`mt-2 block max-w-xl leading-relaxed text-ink-muted ${on ? "" : "lg:hidden"}`}>{service.description}</span>
                                </span>
                                <ArrowUpRight
                                    className={`h-5 w-5 self-center transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${on ? "text-brand-900" : "text-ink-subtle"}`}
                                    aria-hidden="true"
                                />
                            </Link>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}
