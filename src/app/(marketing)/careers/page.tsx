import type { Metadata } from "next";

import { OfficeScene } from "@/components/illustrations";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { DarkBand, GlassCards, Heading, TypeIndex } from "@/components/sections/kit";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { APPLY_STEPS, CULTURE, DISCIPLINES_HIRED } from "@/data/studio-content";

export const metadata: Metadata = {
  title: "Interior Design Careers in Mumbai",
  description:
    "Careers at ArtSpaces Design, Mumbai. We hire interior designers, interior architects, 3D visualisers, site supervisors and project managers who love detail.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Design rooms"
        highlight="you will see built"
        lede="We are a studio where designers follow their drawings onto site. If you care about how a joint is resolved as much as how a room photographs, we would like to hear from you."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
        visual={
          <figure className="relative">
            <div aria-hidden="true" className="absolute inset-x-[12%] bottom-0 top-[20%] rounded-full bg-brand-200/60 blur-[90px]" />
            <OfficeScene className="relative" title="Isometric illustration of an open-plan design studio with desks, a meeting room and a lounge corner" />
          </figure>
        }
      >
        <CtaButton href="/contact">Write to us</CtaButton>
      </PageHero>

      <Section labelledBy="careers-culture-heading">
        <Container size="wide">
          <Heading id="careers-culture-heading" eyebrow="01 — Culture" title="What it is like" highlight="to work here" className="mb-14" />
          <BentoGrid items={CULTURE} />
        </Container>
      </Section>

      <Section surface="muted" labelledBy="careers-roles-heading">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
            <Heading
              id="careers-roles-heading"
              eyebrow="02 — Disciplines"
              title="Who we hire"
              lede="We do not always have an opening in every discipline, but we always read a good portfolio."
              className="lg:sticky lg:top-28 lg:self-start"
            />
            <TypeIndex items={DISCIPLINES_HIRED} />
          </div>
        </Container>
      </Section>

      <DarkBand labelledBy="careers-apply-heading">
        <Container size="wide">
          <Heading id="careers-apply-heading" tone="inverse" eyebrow="03 — Applying" title="How to" highlight="apply" className="mb-14" />
          <GlassCards items={APPLY_STEPS} />
        </Container>
      </DarkBand>

      <CtaBand
        id="careers-cta-heading"
        title="Think you would"
        highlight="fit in?"
        lede="Send a short note and a link to your portfolio through the contact form. Mention the discipline you are applying for."
        primary={{ label: "Apply through the contact form", href: "/contact" }}
        secondary={{ label: "Meet the team", href: "/consultation/team" }}
      />
    </>
  );
}
