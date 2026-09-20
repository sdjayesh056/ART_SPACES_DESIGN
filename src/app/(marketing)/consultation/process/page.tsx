import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  alternates: { canonical: "/consultation/process" },
  title: "Design Process",
  description: "The ArtSpaces Design process, from first consultation through concept, detailing, procurement and handover.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Consultation"
        eyebrowIcon={ClipboardList}
        title="Our design"
        highlight="process"
        lede="How a brief becomes a drawing, a drawing becomes a site, and a site becomes a space you live in."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Consultation", href: "/consultation" }, { label: "Design Process" }]}
      />

      <Section labelledBy="pending-heading">
        <Container>
          <h2 id="pending-heading" className="sr-only">
            Design Process
          </h2>

          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-lg leading-relaxed text-ink-muted">
              A full, stage-by-stage write-up of the process — discovery, concept, detailing, procurement, execution and handover — is being prepared.
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

      <Section labelledBy="consultation-process-cta-heading">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="consultation-process-cta-heading" className="text-section font-bold text-balance text-ink">
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
