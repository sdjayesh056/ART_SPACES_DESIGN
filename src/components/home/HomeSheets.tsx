import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { GridLines, SHEET_LABEL, SheetHead, two } from "@/components/home/sheet";
import { EnquiryPanel } from "@/components/sections/Blocks";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { NEXT_STEPS, PHASES } from "@/data/process";

/*
 * The two home sections set out as sheets of a drawing set: a sheet number,
 * a very large heading and the ruled column grid behind. ProjectReel is the
 * third; the rest of the page uses the inner pages' section kit.
 */

const TEXT_LINK = "inline-flex min-h-11 items-center gap-2 font-semibold text-brand-900 underline underline-offset-4";
/** How far each step of the method stair rises above the one before it. */
const RISE = 2.5;

/** A—05: the seven phases as a flight of stairs, each tread one phase higher. */
export function MethodSection() {
    return (
        <Section surface="muted" labelledBy="method-heading">
            <GridLines />
            <Container size="wide" className="relative">
                <SheetHead id="method-heading" code="A—05" label="Method" title="From first sketch" accent="to handover.">
                    <p className="text-sm leading-relaxed text-ink-muted">Seven phases, each with a date and a sign-off. Nothing reaches site until you have approved the drawing and the sample.</p>
                </SheetHead>

                <ol className="mt-14 grid gap-y-8 lg:mt-16 lg:grid-cols-7 lg:items-start">
                    {PHASES.map((phase, index) => (
                        <li
                            key={phase.id}
                            style={{ "--rise": `${(PHASES.length - 1 - index) * RISE}rem` } as React.CSSProperties}
                            className="relative border-t-2 border-brand-900 pt-4 lg:mt-[var(--rise)] lg:min-h-44 lg:bg-gradient-to-b lg:from-brand-900/[0.07] lg:to-transparent lg:px-4"
                        >
                            {/* The riser down to the tread before. */}
                            {index > 0 && <span aria-hidden="true" className="absolute left-0 top-0 hidden h-10 w-0.5 bg-brand-900 lg:block" />}
                            <p className={`${SHEET_LABEL} flex items-baseline justify-between gap-2 text-ink-muted lg:block`}>
                                <span className="text-2xl font-medium tracking-tight text-brand-900">{two(index + 1)}</span>
                                <span className="lg:mt-3 lg:block">{phase.duration}</span>
                            </p>
                            <h3 className="mt-3 text-lg font-medium leading-snug tracking-tight text-ink">{phase.title}</h3>
                            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted lg:hidden">{phase.summary}</p>
                        </li>
                    ))}
                </ol>

                <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
                    <Link href="/consultation/process" className={TEXT_LINK}>
                        The full process, phase by phase
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <Link
                        href="/consultation/virtual-tours"
                        className="group inline-flex min-h-14 items-center gap-4 rounded-full bg-brand-900 py-2 pl-7 pr-2 font-semibold text-ink-inverse transition-colors hover:bg-brand-800"
                    >
                        Design a room yourself, in five moves
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-500 text-brand-950 transition-transform group-hover:rotate-45">
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </span>
                    </Link>
                </div>
            </Container>
        </Section>
    );
}

/** A—08: the enquiry form. Owns the #lead-form anchor every consultation call to action on the page scrolls to. */
export function EnquirySection() {
    return (
        <section aria-labelledby="enquiry-heading" className="relative overflow-clip bg-brand-950 py-20 text-ink-inverse md:py-28">
            <GridLines tone="dark" />
            <Container size="wide" className="relative">
                <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-6">
                        <p className={`${SHEET_LABEL} mb-8 text-ink-inverse/70`}>
                            <span className="text-accent-on-brand">A—08</span>
                            <span aria-hidden="true" className="mx-3 inline-block h-px w-6 bg-current align-middle" />
                            Start a project
                        </p>
                        <h2 id="enquiry-heading" className="text-[clamp(3rem,8vw,7.5rem)] font-medium leading-[0.9] tracking-[-0.05em]">
                            <span className="block">Let’s draw</span>
                            <span className="block text-transparent [-webkit-text-stroke:1.5px_var(--color-accent-on-brand)]">your space.</span>
                        </h2>
                        <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-inverse/80">No cost, no obligation. Tell us what you are planning and a designer will reply within one working day.</p>

                        <ol className="mt-12 grid gap-x-8 gap-y-8 border-t border-white/15 pt-8 sm:grid-cols-2">
                            {NEXT_STEPS.map((step, index) => (
                                <li key={step.title}>
                                    <p className="font-mono text-xs text-accent-on-brand">{two(index + 1)}</p>
                                    <p className="mt-2 font-semibold">{step.title}</p>
                                    <p className="mt-1 text-sm leading-relaxed text-ink-inverse/70">{step.body}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div className="lg:col-span-5 lg:col-start-8">
                        <EnquiryPanel />
                    </div>
                </div>
            </Container>
        </section>
    );
}
