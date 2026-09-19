import React from "react";
import { Sparkles } from "lucide-react";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { COMPANY_STATS } from "@/data/company-stats";
import { STUDIO } from "@/data/studio";
import { accentAt } from "@/lib/accents";

/**
 * Server Component. Only the count-up needs the client, and that lives inside
 * <AnimatedCounter>; the cards, copy and layout render on the server.
 *
 * The previous version also carried a mouse-follow spotlight that never
 * worked — it read MotionValue.get() inside the style object during render,
 * and a MotionValue change does not trigger a re-render, so the gradient was
 * frozen at 0,0 for the life of the card. Removed rather than repaired.
 */
export function StatsSection() {
    return (
        <Section surface="muted" background="aurora" labelledBy="stats-heading">
            <Container>
                <SectionHeading
                    id="stats-heading"
                    eyebrow="Why Choose Art Spaces"
                    eyebrowIcon={Sparkles}
                    title="Delivering Results That"
                    highlight="Inspire"
                    lede="As a leading interior design firm in India, we transform spaces into timeless experiences. Our commitment to innovation and craftsmanship defines every project."
                    className="mb-16 md:mb-20"
                />

                <ul className="grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
                    {COMPANY_STATS.map((stat, index) => {
                        const accent = accentAt(index);

                        return (
                            <Reveal as="li" key={stat.id} delay={index * 0.1}>
                                <article className="group h-full rounded-card border border-line bg-surface p-8 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-line-strong hover:shadow-card-hover">
                                    <span
                                        className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-card border transition-transform duration-300 group-hover:scale-110"
                                        style={{
                                            color: accent,
                                            backgroundColor: `color-mix(in srgb, ${accent} 8%, transparent)`,
                                            borderColor: `color-mix(in srgb, ${accent} 22%, transparent)`,
                                        }}
                                    >
                                        <stat.icon size={28} aria-hidden="true" />
                                    </span>

                                    <p className="mb-4 text-5xl font-bold leading-none tracking-tight text-ink md:text-6xl">
                                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                    </p>

                                    <h3 className="mb-2 text-lg font-semibold text-ink">{stat.label}</h3>

                                    <p className="text-sm leading-relaxed text-ink-subtle">
                                        {stat.description}
                                    </p>
                                </article>
                            </Reveal>
                        );
                    })}
                </ul>

                <Reveal delay={0.3}>
                    <p className="mt-16 text-center text-sm text-ink-subtle md:mt-20">
                        Trusted by homeowners, architects, and real estate developers across{" "}
                        {STUDIO.servedCities.slice(0, 3).join(", ")}, and beyond.
                    </p>
                </Reveal>
            </Container>
        </Section>
    );
}
