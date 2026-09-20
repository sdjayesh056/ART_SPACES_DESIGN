import type { Metadata } from "next";
import Link from "next/link";
import { Users } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  alternates: { canonical: "/careers" },
  title: "Careers",
  description: "Open roles and how to apply at ArtSpaces Design, Mumbai.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Studio"
        eyebrowIcon={Users}
        title="Build spaces"
        highlight="with us"
        lede="We hire designers, architects and project managers who care about how a room feels at seven in the evening."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
      />

      <Section labelledBy="pending-heading">
        <Container>
          <h2 id="pending-heading" className="sr-only">
            Careers
          </h2>

          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-lg leading-relaxed text-ink-muted">
              There are no formal openings listed right now, but we always read good portfolios.
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

      <Section labelledBy="careers-cta-heading">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="careers-cta-heading" className="text-section font-bold text-balance text-ink">
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
