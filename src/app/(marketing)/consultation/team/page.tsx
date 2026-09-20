import type { Metadata } from "next";
import Link from "next/link";
import { Users } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  alternates: { canonical: "/consultation/team" },
  title: "Our Team",
  description: "Meet the designers and architects at ArtSpaces Design, Mumbai.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Consultation"
        eyebrowIcon={Users}
        title="The people behind"
        highlight="the work"
        lede="Designers, architects and project leads who will be on your project from brief to handover."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Consultation", href: "/consultation" }, { label: "Our Team" }]}
      />

      <Section labelledBy="pending-heading">
        <Container>
          <h2 id="pending-heading" className="sr-only">
            Our Team
          </h2>

          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-lg leading-relaxed text-ink-muted">
              Team profiles and photography are being finalised.
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

      <Section labelledBy="consultation-team-cta-heading">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="consultation-team-cta-heading" className="text-section font-bold text-balance text-ink">
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
