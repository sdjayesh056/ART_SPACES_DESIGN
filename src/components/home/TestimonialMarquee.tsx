"use client";

import React, { useState } from "react";
import { Pause, Play, Quote, Star } from "lucide-react";

import { TESTIMONIALS } from "@/data/testimonials";
import { accentAt } from "@/lib/accents";
import type { Testimonial } from "@/types/content";

/**
 * Continuously scrolling testimonial strip.
 *
 * The track is duplicated so the loop is seamless; the second copy is
 * aria-hidden so each quote is announced once rather than twice, and the
 * twelve author names no longer appear as twelve headings (six of them
 * duplicates) in the screen-reader rotor.
 *
 * Motion is CSS, so the pause control genuinely pauses it. A visible control
 * is required by WCAG 2.2.2 regardless of the OS reduced-motion setting —
 * hover alone is not a mechanism a keyboard or touch user can reach.
 */
export function TestimonialMarquee() {
    const [paused, setPaused] = useState(false);

    return (
        <div className="relative">
            <div className="relative w-full overflow-hidden">
                {/* Edge fades. */}
                <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-8 bg-gradient-to-r from-surface to-transparent md:w-32" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-8 bg-gradient-to-l from-surface to-transparent md:w-32" />

                <ul
                    className="flex w-max list-none gap-6 p-0 py-10 animate-marquee"
                    style={{ animationPlayState: paused ? "paused" : "running" }}
                >
                    {TESTIMONIALS.map((testimonial, index) => (
                        <li key={testimonial.id}>
                            <TestimonialCard testimonial={testimonial} accent={accentAt(index)} />
                        </li>
                    ))}
                    {/* Duplicate track for the seamless loop — announced once. */}
                    {TESTIMONIALS.map((testimonial, index) => (
                        <li key={`clone-${testimonial.id}`} aria-hidden="true">
                            <TestimonialCard testimonial={testimonial} accent={accentAt(index)} />
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex justify-center">
                <button
                    type="button"
                    onClick={() => setPaused((value) => !value)}
                    aria-pressed={paused}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-xs font-bold uppercase tracking-wider text-ink-muted shadow-sm transition-colors hover:border-brand-900 hover:text-brand-900"
                >
                    {paused ? (
                        <Play className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                        <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    {paused ? "Resume" : "Pause"} testimonials
                </button>
            </div>
        </div>
    );
}

function TestimonialCard({ testimonial, accent }: { testimonial: Testimonial; accent: string }) {
    return (
        <article className="flex h-[24rem] w-[85vw] max-w-[22rem] shrink-0 flex-col rounded-panel border border-line bg-surface/70 p-8 shadow-card backdrop-blur-md md:w-[25rem] md:max-w-none">
            <span
                className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-card text-ink-inverse shadow-md"
                style={{ backgroundColor: accent }}
            >
                <Quote className="h-6 w-6 fill-current" aria-hidden="true" />
            </span>

            <div className="grow">
                {/* The stars were decorative only — invisible to assistive tech and crawlers. */}
                <p className="mb-4 flex items-center gap-1" aria-label={`Rated ${testimonial.rating} out of 5`}>
                    {Array.from({ length: testimonial.rating }).map((_, index) => (
                        <Star
                            key={index}
                            size={16}
                            className="fill-accent-400 text-accent-400"
                            aria-hidden="true"
                        />
                    ))}
                </p>

                <blockquote className="line-clamp-5 text-lg font-medium italic leading-relaxed text-ink-muted">
                    <p>&ldquo;{testimonial.quote}&rdquo;</p>
                </blockquote>
            </div>

            <footer className="mt-auto flex items-center gap-4 border-t border-line pt-6">
                <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-ink-inverse shadow-md"
                    style={{ backgroundColor: accent }}
                    aria-hidden="true"
                >
                    {testimonial.author.charAt(0)}
                </span>
                <span className="min-w-0">
                    {/* Not a heading: this is attribution, not document structure. */}
                    <cite className="block text-base font-bold not-italic leading-tight text-ink">
                        {testimonial.author}
                    </cite>
                    <span className="mt-0.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                        {testimonial.role}
                    </span>
                    <span className="mt-1 block text-xs text-ink-subtle">{testimonial.location}</span>
                </span>
            </footer>
        </article>
    );
}
