import React from "react";
import Link from "next/link";
import { HelpCircle } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading as SectionHeading } from "@/components/sections/kit";
import type { Faq } from "@/types/content";

import { FaqAccordion } from "./FaqAccordion";

type FaqSectionProps = {
    id: string;
    items: Faq[];
    title?: string;
    highlight?: string;
    lede?: string;
    surface?: "default" | "muted";
    /** Hide the pointer to /faq — for use on /faq itself. */
    showAllLink?: boolean;
};

/**
 * Heading on the left, answers on the right. Emits FAQPage structured data
 * for the questions it shows, so use it at most once per page.
 */
export function FaqSection({
    id,
    items,
    title = "Questions,",
    highlight = "answered",
    lede = "The things clients ask us most before they start.",
    surface = "default",
    showAllLink = true,
}: FaqSectionProps) {
    return (
        <Section labelledBy={id} surface={surface}>
            <Container>
                <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
                    <div className="lg:sticky lg:top-28 lg:self-start">
                        <SectionHeading
                            id={id}
                            eyebrow="FAQ"
                            eyebrowIcon={HelpCircle}
                            title={title}
                            highlight={highlight}
                            lede={lede}
                            align="left"
                        />
                        {showAllLink && (
                            <Link
                                href="/faq"
                                className="mt-8 inline-flex min-h-11 items-center font-semibold text-brand-900 underline underline-offset-4"
                            >
                                Read all frequently asked questions
                            </Link>
                        )}
                    </div>
                    <FaqAccordion items={items} />
                </div>
            </Container>
        </Section>
    );
}
