import type { Metadata } from "next";
import { Sparkles } from "lucide-react";

import { StatsSection } from "@/components/home/StatsSection";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { STUDIO } from "@/data/studio";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About the Studio",
  description:
    "ArtSpaces Design is an interior and architectural design studio in Mumbai working on residential, commercial, hospitality and retail spaces across India.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Studio"
        eyebrowIcon={Sparkles}
        title="A design studio in"
        highlight={STUDIO.address.locality}
        lede="We work on residential, commercial, hospitality and retail interiors — shaping them through structure, light and material rather than decoration."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      >
        <CtaButton href="/contact">Talk to the studio</CtaButton>
      </PageHero>

      <Section labelledBy="about-heading">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h2 id="about-heading" className="text-section font-bold text-balance text-ink">
              How we work
            </h2>

            <Reveal delay={0.05}>
              <p className="mt-8 text-lg leading-relaxed text-ink-muted">
                A forward-thinking design studio reimagining residential and commercial
                spaces through structure, light, and material innovation. Every project
                starts with the same question — how will this room actually be used, at
                what time of day, by whom — and the drawings follow from the answer.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-ink-muted">
                We work across {STUDIO.servedCities.join(", ")} and take on projects
                elsewhere when the brief is right.
              </p>
            </Reveal>

            {/*
              Placeholder. Phase 4 replaces this with the studio's real story:
              founding, people, philosophy, notable clients.
            */}
            <Reveal delay={0.15}>
              <p className="mt-6 text-ink-subtle">
                A fuller account of the studio — how it started, who is behind it and
                what we will not compromise on — is being written.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Reuses the home page stats block — one source, rendered twice. */}
      <StatsSection />

      <Section labelledBy="about-cta-heading">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="about-cta-heading" className="text-section font-bold text-balance text-ink">
              Let&apos;s design something together
            </h2>
            <p className="mt-6 text-lg text-ink-muted">
              The first consultation is free and carries no obligation.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <CtaButton href="/consultation/booking">Book a consultation</CtaButton>
              <CtaButton href="/portfolio" variant="secondary">
                See our work
              </CtaButton>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
