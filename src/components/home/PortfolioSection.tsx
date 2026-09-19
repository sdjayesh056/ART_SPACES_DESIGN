import React from "react";
import { Layers, ScanLine } from "lucide-react";

import { PortfolioGrid } from "@/components/home/PortfolioGrid";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Server Component; the category filter lives in <PortfolioGrid>.
 *
 * The stats dashboard that used to sit above the grid has been removed. It
 * declared a second `stats` array rendered on the same page as StatsSection
 * and contradicted it at three of four slots — 250+ vs 500+ projects, 100% vs
 * 98% satisfaction, 15+ vs 45+ awards — while the fourth reported
 * "SYSTEM_UPTIME 24/7". Company figures now come from one place:
 * src/data/company-stats.ts, rendered once by StatsSection.
 */
export function PortfolioSection() {
    return (
        <Section id="portfolio" background="aurora" tone="accent" labelledBy="portfolio-heading">
            <Container>
                <SectionHeading
                    id="portfolio-heading"
                    eyebrow="Selected Work"
                    eyebrowIcon={ScanLine}
                    title="Design"
                    highlight="Innovation"
                    lede="Selected works demonstrating the convergence of art, technology, and sustainable engineering."
                    className="mb-16"
                />

                <PortfolioGrid />

                <Reveal delay={0.15} className="mt-20 flex justify-center">
                    <CtaButton href="/portfolio" variant="secondary" icon={Layers}>
                        See all projects
                    </CtaButton>
                </Reveal>
            </Container>
        </Section>
    );
}
