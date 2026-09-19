import React from "react";
import Image from "next/image";
import { Play, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { STUDIO } from "@/data/studio";

/**
 * Server Component, and deliberately unanimated.
 *
 * Every element here previously entered from `initial={{ opacity: 0 }}`, which
 * is baked into the prerendered HTML — so the largest element on the page was
 * invisible until hydration finished, putting a floor under LCP that no amount
 * of image optimisation could lift. Above-the-fold content should simply be
 * there when the HTML arrives.
 */
export function HeroSection() {
    return (
        <section className="relative min-h-[100svh] overflow-hidden bg-surface-muted" aria-labelledby="hero-heading">
            {/* Ambient wash. Constrained so it cannot force horizontal overflow. */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute -left-24 -top-24 h-[min(31rem,70vw)] w-[min(31rem,70vw)] rounded-full bg-brand-700/20 blur-[120px]" />
                <div className="absolute -right-24 top-20 h-[min(31rem,70vw)] w-[min(31rem,70vw)] rounded-full bg-accent-500/20 blur-[140px]" />
            </div>

            <Container className="relative z-10 grid grid-cols-1 items-center gap-16 pb-20 pt-32 lg:grid-cols-2">
                {/* ================= LEFT ================= */}
                <div>
                    <Eyebrow icon={Sparkles} className="mb-8">
                        {STUDIO.tagline}
                    </Eyebrow>

                    <h1
                        id="hero-heading"
                        className="text-display font-extrabold text-balance text-ink"
                    >
                        Design Spaces That{" "}
                        <span className="brand-gradient-text">Inspire Modern Living</span>
                    </h1>

                    <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-ink-muted">
                        We craft timeless, functional and elegant interiors using modern design
                        principles, sustainable materials and human-centric planning.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">
                        {/*
                            One element per control. These were <Link> wrapping
                            <motion.button>, which is invalid HTML and gave
                            keyboard users two tab stops for one action.
                        */}
                        <CtaButton href="#lead-form">Get Free Consultation</CtaButton>
                        <CtaButton href="#portfolio" variant="secondary" icon={Play}>
                            View Portfolio
                        </CtaButton>
                    </div>

                    {/* Social proof */}
                    <div className="mt-12 flex items-center gap-6 text-sm text-ink-muted">
                        <div className="flex -space-x-3" aria-hidden="true">
                            {["A", "B", "C", "D"].map((initial) => (
                                <span
                                    key={initial}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-surface bg-gradient-to-br from-brand-700 to-brand-500 font-bold text-ink-inverse"
                                >
                                    {initial}
                                </span>
                            ))}
                        </div>
                        <p>
                            Trusted by <strong className="text-ink">500+</strong> clients worldwide
                        </p>
                    </div>
                </div>

                {/* ================= RIGHT ================= */}
                <div className="relative flex items-center justify-center">
                    <div className="relative aspect-square w-full max-w-lg overflow-hidden rounded-panel border border-white/40 bg-white/40 shadow-2xl backdrop-blur-2xl">
                        {/*
                            The LCP element, so it carries `priority`. That used
                            to sit on the 40px navbar logo — preloading a 3.3MB
                            asset that could never be the largest paint.
                        */}
                        <Image
                            src="/Logos/Home_Right_Visuals.png"
                            alt="A contemporary living space designed by ArtSpaces, with layered lighting and natural materials"
                            fill
                            priority
                            sizes="(max-width: 1024px) 90vw, 512px"
                            className="object-cover"
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
}
