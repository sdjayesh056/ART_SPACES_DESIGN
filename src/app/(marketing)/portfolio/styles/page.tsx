import type { Metadata } from "next";
import Link from "next/link";
import { Palette } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  alternates: { canonical: "/portfolio/styles" },
  title: "Style Gallery",
  description: "Interior design styles by ArtSpaces Design — modern, minimal, rustic, industrial and heritage.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        eyebrowIcon={Palette}
        title="Browse by"
        highlight="style"
        lede="Modern, minimal, rustic, industrial, heritage — the same space can go many ways."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Portfolio", href: "/portfolio" }, { label: "Style Gallery" }]}
      />

      <Section labelledBy="pending-heading">
        <Container>
          <h2 id="pending-heading" className="sr-only">
            Style Gallery
          </h2>

          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-lg leading-relaxed text-ink-muted">
              Style tagging across the portfolio is in progress. For now the main portfolio filters by the type of space instead.
            </p>
            <p className="mt-6 text-ink-subtle">
              In the meantime the studio will answer directly —{" "}
              <Link href="/contact" className="font-semibold text-brand-900 underline">
                get in touch
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section labelledBy="portfolio-styles-cta-heading">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="portfolio-styles-cta-heading" className="text-section font-bold text-balance text-ink">
              Let&apos;s talk about your project
            </h2>
            <p className="mt-6 text-lg text-ink-muted">The first consultation is free and carries no obligation.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <CtaButton href="/consultation/booking">Book a consultation</CtaButton>
              <CtaButton href="/contact" variant="secondary">Contact the studio</CtaButton>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
