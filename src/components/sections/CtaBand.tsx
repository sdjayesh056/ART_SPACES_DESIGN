import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

type Action = { label: string; href: string };

type CtaBandProps = {
    /** Heading id; also names the section. Must be unique on the page. */
    id: string;
    title: string;
    highlight?: string;
    lede?: string;
    variant?: "light" | "brand";
    primary?: Action;
    secondary?: Action;
};

const BOOKING: Action = { label: "Book a free consultation", href: "/consultation/booking" };
const WORK: Action = { label: "See the work", href: "/portfolio" };

const REASSURANCE = ["Free 45-minute consultation", "Reply within one working day", "No obligation to proceed"];

/**
 * The closing call to action. Twelve pages each carried a hand-copied centred
 * block of this; they now share one, so the path to /consultation/booking is
 * identical everywhere and cannot drift.
 */
export function CtaBand({
    id,
    title,
    highlight,
    lede = "The first conversation is free. We talk through the space, the timeline and a realistic budget before anything is drawn.",
    variant = "light",
    primary = BOOKING,
    secondary = WORK,
}: CtaBandProps) {
    if (variant === "brand") {
        return (
            <Section labelledBy={id}>
                <Container>
                    <Reveal>
                        <div className="relative overflow-clip rounded-panel bg-gradient-to-br from-brand-950 via-brand-900 to-brand-700 p-8 text-ink-inverse shadow-2xl sm:p-12 lg:p-16">
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-accent-500/25 blur-[90px]"
                            />
                            <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
                                <div>
                                    <Eyebrow icon={Sparkles} tone="inverse" className="mb-6">
                                        Start your project
                                    </Eyebrow>
                                    <h2 id={id} className="text-[clamp(2rem,4.2vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-balance">
                                        {title}
                                        {highlight && <> <span className="text-accent-on-brand">{highlight}</span></>}
                                    </h2>
                                    <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-ink-inverse/85">
                                        {lede}
                                    </p>
                                </div>
                                <div>
                                    <ul className="mb-8 list-none space-y-2 p-0 text-sm text-ink-inverse/90">
                                        {REASSURANCE.map((line) => (
                                            <li key={line} className="flex items-center gap-3">
                                                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-on-brand" />
                                                {line}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                                        <CtaButton href={primary.href} variant="inverse">
                                            {primary.label}
                                        </CtaButton>
                                        <Link
                                            href={secondary.href}
                                            className="inline-flex min-h-11 items-center font-semibold text-ink-inverse underline decoration-accent-on-brand underline-offset-4 hover:text-accent-on-brand"
                                        >
                                            {secondary.label}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </Container>
            </Section>
        );
    }

    return (
        <Section labelledBy={id}>
            <Container>
                <Reveal>
                    <div className="relative overflow-clip rounded-panel border border-line bg-surface-muted px-6 py-14 text-center shadow-card sm:px-12 md:py-20">
                        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                            <div className="absolute -left-16 -top-20 h-64 w-64 rounded-full bg-brand-100/70 blur-[90px]" />
                            <div className="absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-accent-100/70 blur-[90px]" />
                        </div>
                        <div className="relative mx-auto max-w-2xl">
                            <h2 id={id} className="text-[clamp(2rem,4.2vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-balance text-ink">
                                {title}
                                {highlight && <> <span className="brand-gradient-text">{highlight}</span></>}
                            </h2>
                            <p className="mt-6 text-lg leading-relaxed text-pretty text-ink-muted">{lede}</p>
                            <div className="mt-10 flex flex-wrap justify-center gap-4">
                                <CtaButton href={primary.href}>{primary.label}</CtaButton>
                                <CtaButton href={secondary.href} variant="secondary">
                                    {secondary.label}
                                </CtaButton>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </Container>
        </Section>
    );
}
