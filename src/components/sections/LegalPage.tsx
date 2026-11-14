import React from "react";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { STUDIO } from "@/data/studio";
import type { LongFormSection } from "@/types/content";

import { LongForm } from "./Prose";

type LegalPageProps = {
    title: string;
    highlight: string;
    lede: string;
    crumb: string;
    sections: LongFormSection[];
};

/**
 * Shared layout for /privacy and /terms: compact masthead, sticky section
 * index, long-form text.
 *
 * ⚠️ The text is interim. It says so on the page, and both routes stay
 * noindex until reviewed copy replaces it.
 */
export function LegalPage({ title, highlight, lede, crumb, sections }: LegalPageProps) {
    return (
        <>
            <PageHero
                eyebrow="Legal"
                title={title}
                highlight={highlight}
                lede={lede}
                breadcrumbs={[{ label: "Home", href: "/" }, { label: crumb }]}
            />
            <Section labelledBy={sections[0].id}>
                <Container size="wide">
                    <LongForm
                        sections={sections}
                        notice={
                            <div className="max-w-2xl rounded-card border border-accent-300/60 bg-accent-100/40 p-6">
                                <p className="font-semibold text-ink">This text is being finalised with our advisors.</p>
                                <p className="mt-2 text-ink-muted">
                                    It describes accurately how the website works today, but it is not yet a
                                    formal legal document. Questions? Write to{" "}
                                    <a href={STUDIO.email.href} className="font-semibold text-brand-900 underline underline-offset-4">
                                        {STUDIO.email.display}
                                    </a>{" "}
                                    or use the <Link href="/contact" className="font-semibold text-brand-900 underline underline-offset-4">contact form</Link>.
                                </p>
                            </div>
                        }
                    />
                </Container>
            </Section>
        </>
    );
}
