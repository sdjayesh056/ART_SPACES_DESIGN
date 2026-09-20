import type { Metadata } from "next";
import { ScanLine } from "lucide-react";

import { PortfolioGrid } from "@/components/home/PortfolioGrid";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { STUDIO } from "@/data/studio";

export const metadata: Metadata = {
  alternates: { canonical: "/portfolio" },
  title: "Interior Design Portfolio",
  description:
    "Residential, commercial, hospitality and retail interiors delivered by ArtSpaces Design across India. Browse the full portfolio by category.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        eyebrowIcon={ScanLine}
        title="Interior design"
        highlight="portfolio"
        lede={`Completed residential, commercial, hospitality and retail interiors across ${STUDIO.servedCities.slice(0, 3).join(", ")} and beyond. Filter by the kind of space you are planning.`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Portfolio" }]}
      />

      <Section surface="muted" background="aurora" tone="accent" labelledBy="portfolio-grid-heading">
        <Container>
          <h2 id="portfolio-grid-heading" className="sr-only">
            All projects
          </h2>
          <PortfolioGrid />
        </Container>
      </Section>

      <Section labelledBy="portfolio-cta-heading">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="portfolio-cta-heading" className="text-section font-bold text-balance text-ink">
              Something here close to what you had in mind?
            </h2>
            <p className="mt-6 text-lg text-ink-muted">
              Tell us which project it was and what you would change. That is usually the
              fastest way to start a brief.
            </p>
            <div className="mt-10 flex justify-center">
              <CtaButton href="/contact">Start a conversation</CtaButton>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
