import type { Metadata } from "next";
import Link from "next/link";

import { LightingLayers } from "@/components/illustrations";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { CompareSlider } from "@/components/sections/CompareSlider";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { IllustrationFrame } from "@/components/sections/FeatureSplit";
import { DarkBand, GlassCards, Heading } from "@/components/sections/kit";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TOUR_FACTS, TOUR_RECEIVES, TOUR_STEPS } from "@/data/process";
import { findService } from "@/data/services";

export const metadata: Metadata = {
  title: "3D Virtual Tours of Your Interior Design",
  description:
    "Walk through your interior in 3D before it is built. Guided virtual tours, photoreal views and lighting studies from ArtSpaces Design, Mumbai.",
  alternates: { canonical: "/consultation/virtual-tours" },
};

export default function VirtualToursPage() {
  const faqs = findService("3d-visualisation")?.faqs ?? [];

  return (
    <>
      <PageHero
        eyebrow="Virtual tours"
        title="Walk through your space"
        highlight="before it is built"
        lede="A virtual tour is a guided walk through a three-dimensional model of your finished interior. You see every room at eye level, in the real materials and the real light, while changes are still free."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Consultation", href: "/consultation" },
          { label: "Virtual tours" },
        ]}
        visual={<CompareSlider switchable />}
      >
        <CtaButton href="/consultation/booking">Book a free consultation</CtaButton>
      </PageHero>

      <Section labelledBy="tours-receive-heading">
        <Container size="wide">
          <Heading id="tours-receive-heading" eyebrow="01 — What you receive" title="More than" highlight="a pretty picture" className="mb-14" />
          <BentoGrid items={TOUR_RECEIVES} />
        </Container>
      </Section>

      <DarkBand labelledBy="tours-steps-heading">
        <Container size="wide">
          <Heading id="tours-steps-heading" tone="inverse" eyebrow="02 — How it runs" title="From model" highlight="to sign-off" className="mb-14" />
          <GlassCards items={TOUR_STEPS} />
          <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/15 pt-12 lg:grid-cols-4">
            {TOUR_FACTS.map((fact) => (
              <div key={fact.label} className="flex flex-col-reverse">
                <dt className="mt-2 text-sm text-ink-inverse/70">{fact.label}</dt>
                <dd className="text-2xl font-medium tracking-tight text-accent-on-brand md:text-3xl">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </DarkBand>

      <Section surface="muted" labelledBy="tours-why-heading">
        <Container size="wide">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <Reveal>
              <IllustrationFrame caption="Lighting is approved by seeing it">
                <LightingLayers title="Room section showing ambient cove light, a task pendant over a table and an accent spotlight on artwork" />
              </IllustrationFrame>
            </Reveal>
            <div>
              <Heading id="tours-why-heading" eyebrow="03 — Why it matters" title="Fewer changes on site," highlight="and no surprises" />
              <Reveal delay={0.1}>
                <div className="mt-8 space-y-5 text-lg leading-relaxed text-pretty text-ink-muted">
                  <p>
                    Most site changes come from one thing: a client seeing a room for the first
                    time and realising it is not what they pictured. A change at that point means
                    undoing finished work.
                  </p>
                  <p>
                    The walkthrough moves that moment to the design stage, where moving a wall
                    costs an afternoon. Clients who have walked the model rarely ask for changes
                    once the carpenters arrive.
                  </p>
                  <p>
                    <Link href="/services/3d-visualisation" className="font-semibold text-brand-900 underline underline-offset-4">
                      Read about our 3D visualisation service
                    </Link>
                    .
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <FaqSection id="tours-faq-heading" items={faqs} />

      <CtaBand id="tours-cta-heading" variant="brand" title="See your own space" highlight="in three dimensions" secondary={{ label: "See the design process", href: "/consultation/process" }} />
    </>
  );
}
