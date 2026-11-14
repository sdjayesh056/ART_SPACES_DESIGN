import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { HeroModel } from "@/components/home/HeroModel";
import { KICKER } from "@/components/sections/kit";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { COMPANY_STATS } from "@/data/company-stats";
import { photo } from "@/data/photos";
import { STUDIO } from "@/data/studio";

/**
 * The home hero, composed like an architect's drawing sheet: a full-bleed
 * photograph under a drafting grid, the headline, a live model pinned to the
 * right, and the studio's figures set along the bottom as a title block.
 *
 * Exactly one screen tall. A Server Component and unanimated — the headline
 * and the photograph are the largest paint, so they are in the HTML as it
 * arrives. Only <HeroModel> crosses the client boundary.
 */
export function HomeHero() {
    return (
        <section aria-labelledby="hero-heading" className="bg-brand-950 text-ink-inverse">
            <div className="relative flex min-h-[100svh] flex-col overflow-clip">
                <Image src={photo("recent")} alt="A contemporary house at dusk, its living spaces lit from within" fill priority sizes="100vw" className="object-cover" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/70 to-brand-950/5" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/10 to-brand-950/45" />
                {/* On a phone the text runs across the whole photograph, so it needs an even veil. */}
                <div aria-hidden="true" className="absolute inset-0 bg-brand-950/50 lg:hidden" />
                {/* Drafting grid, fading out toward the photograph. */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,var(--color-ink-inverse)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-ink-inverse)_1px,transparent_1px)] [background-size:5rem_5rem] [mask-image:linear-gradient(to_right,black_25%,transparent_80%)]"
                />

                <Container size="wide" className="relative mt-auto grid items-end gap-10 pt-28 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-16">
                    <div>
                        <p className={`${KICKER} flex flex-wrap items-center gap-x-4 gap-y-2 text-accent-on-brand`}>
                            Interior architecture
                            <span aria-hidden="true" className="h-px w-10 bg-accent-on-brand/60" />
                            <span className="text-ink-inverse/70">{STUDIO.address.locality} · 19.07° N, 72.87° E</span>
                        </p>
                        <h1 id="hero-heading" className="mt-6 text-[clamp(2.6rem,min(6.6vw,11svh),6rem)] font-medium leading-[0.98] tracking-[-0.04em] text-balance">
                            Interiors drawn with intent, <span className="text-accent-on-brand">built for living.</span>
                        </h1>
                        <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-ink-inverse/80">
                            A Mumbai studio for homes, workplaces and hospitality. Every room is planned to the millimetre, modelled in 3D and approved by you
                            before anything is built.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <CtaButton href="#lead-form" variant="inverse" size="lg">
                                Book a free consultation
                            </CtaButton>
                            <Link
                                href="/portfolio"
                                className="inline-flex min-h-14 items-center gap-2 rounded-full border border-white/35 px-7 font-semibold text-ink-inverse transition-colors hover:bg-white/10"
                            >
                                See the work
                                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        </div>
                    </div>

                    <HeroModel />
                </Container>

                {/* The title block: the studio's figures, ruled like the corner of a drawing. */}
                <Container size="wide" className="relative">
                    <dl className="mt-10 grid grid-cols-2 border-t border-white/15 lg:mt-12 lg:grid-cols-4">
                        {COMPANY_STATS.map((stat) => (
                            <div
                                key={stat.id}
                                className="flex flex-col-reverse border-white/15 py-4 lg:py-5 [&:nth-child(even)]:border-l [&:nth-child(even)]:pl-5 [&:nth-child(n+3)]:border-t lg:[&:nth-child(n+3)]:border-t-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:pl-6"
                            >
                                <dt className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-inverse/65">{stat.label}</dt>
                                <dd className="text-3xl font-medium tracking-tight md:text-4xl">
                                    {stat.value}
                                    {stat.suffix}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </Container>
            </div>
        </section>
    );
}
