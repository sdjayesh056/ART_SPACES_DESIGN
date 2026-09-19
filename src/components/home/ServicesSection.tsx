import React from "react";
import { ArrowRight, Zap } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES } from "@/data/services";
import { accentAt } from "@/lib/accents";
import type { Service } from "@/types/content";

/**
 * Server Component — nothing here needs a client boundary now that the
 * reveals live in <Reveal> and the hover states are CSS.
 *
 * ⚠️ COPY: the heading and lede are still in the sci-fi register flagged for
 * rewrite in Phase 4 ("NEXT GEN DESIGN ARCHITECTURES", "neural-aesthetic
 * principles"). Structure is fixed here; wording is a content decision.
 * The per-card SKU pills (RES-INT-01 …) are gone — they read as developer
 * tooling to someone commissioning a fit-out.
 */
export function ServicesSection() {
    return (
        <Section id="services" surface="muted" background="aurora" labelledBy="services-heading">
            <Container>
                <SectionHeading
                    id="services-heading"
                    eyebrow="What We Do"
                    eyebrowIcon={Zap}
                    title={
                        <>
                            NEXT GEN <span className="brand-gradient-text">DESIGN</span>{" "}
                            <span className="font-light text-ink-subtle">ARCHITECTURES</span>
                        </>
                    }
                    lede="Deploying advanced spatial algorithms and neural-aesthetic principles to construct the environments of tomorrow."
                    className="mb-20"
                />

                <ul className="grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-2 lg:grid-cols-3">
                    {SERVICES.map((service, index) => (
                        <Reveal as="li" key={service.slug} delay={index * 0.08}>
                            <ServiceCard service={service} accent={accentAt(index)} />
                        </Reveal>
                    ))}
                </ul>

                <Reveal delay={0.2} className="mt-20 flex justify-center">
                    <CtaButton href="#lead-form">Start Your Transformation</CtaButton>
                </Reveal>
            </Container>
        </Section>
    );
}

function ServiceCard({ service, accent }: { service: Service; accent: string }) {
    return (
        <article className="group relative h-full overflow-hidden rounded-panel border border-line bg-surface/80 p-8 shadow-card backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover">
            {/* Top accent strip, revealed on hover — decorative only. */}
            <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
            />

            <div className="flex h-full flex-col">
                <span
                    className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-tile border transition-transform duration-500 group-hover:rotate-6"
                    style={{
                        color: accent,
                        backgroundColor: `color-mix(in srgb, ${accent} 8%, transparent)`,
                        borderColor: `color-mix(in srgb, ${accent} 20%, transparent)`,
                    }}
                >
                    <service.icon className="h-6 w-6" aria-hidden="true" />
                </span>

                <h3 className="mb-4 text-2xl font-bold leading-tight text-ink">{service.title}</h3>

                {/*
                    Full opacity at rest. This was `opacity-80` lifted only on
                    hover, which measured about 3.25:1 against the card — below
                    AA — and never lifted at all on a touchscreen.
                */}
                <p className="mb-8 grow text-sm leading-relaxed text-ink-muted">
                    {service.description}
                </p>

                <div className="mt-auto flex items-end justify-between border-t border-line pt-6">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-ink-subtle">
                            Capabilities
                        </span>
                        <ul className="flex list-none flex-wrap gap-1 p-0">
                            {service.keywords.slice(0, 2).map((keyword) => (
                                <li
                                    key={keyword}
                                    className="rounded border border-line bg-surface-muted px-1.5 py-0.5 text-[10px] text-ink-muted"
                                >
                                    {keyword}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <span
                        aria-hidden="true"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface-muted transition-all duration-300 group-hover:-rotate-45 group-hover:border-brand-900 group-hover:bg-brand-900 group-hover:text-accent-on-brand"
                    >
                        <ArrowRight size={16} />
                    </span>
                </div>
            </div>
        </article>
    );
}
