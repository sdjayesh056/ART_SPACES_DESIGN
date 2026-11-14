import type { Metadata } from "next";
import { Briefcase, ClipboardList, Users } from "lucide-react";

import { RoomIllustration } from "@/components/illustrations";
import { StatBand } from "@/components/sections/Blocks";
import { CtaBand } from "@/components/sections/CtaBand";
import { AsideQuote } from "@/components/sections/HeroAsides";
import { DarkBand, GlassCards, Heading, Tiles, TypeIndex } from "@/components/sections/kit";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { HERO_PHOTO } from "@/data/photos";
import { STUDIO } from "@/data/studio";
import { STORY, VALUES } from "@/data/studio-content";

export const metadata: Metadata = {
  title: "About Our Mumbai Interior Design Studio",
  description:
    "ArtSpaces Design is a Mumbai interior design studio that designs and builds homes, workplaces, hotels and stores, with one team from first sketch to handover.",
  alternates: { canonical: "/about" },
};

const MORE = [
  { title: "Meet the team", description: "The roles behind every project, and how a team is formed.", href: "/consultation/team", icon: Users },
  { title: "How we work", description: "Seven phases, from the first consultation to handover.", href: "/consultation/process", icon: ClipboardList },
  { title: "Careers", description: "Join a studio where designers see their drawings built.", href: "/careers", icon: Briefcase },
];

export default function AboutPage() {
  const [lead, ...rest] = STORY;

  return (
    <>
      <PageHero
        image={HERO_PHOTO}
        imageAlt="A contemporary living space designed by ArtSpaces, with layered lighting and natural materials"
        eyebrow="About the studio"
        title="One studio, from"
        highlight="first sketch to handover"
        lede={STUDIO.tagline}
        stats
        aside={<AsideQuote quote="The designer who draws your home is in the room when the carpenter builds it." source="How every project runs" />}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      >
        <CtaButton href="/consultation/booking" variant="inverse">
          Book a free consultation
        </CtaButton>
      </PageHero>

      <Section surface="muted" labelledBy="about-story-heading">
        <Container size="wide">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <Heading id="about-story-heading" eyebrow="01 — Our story" title="We design the room," highlight="then we build it" />
              <Reveal delay={0.1}>
                <p className="mt-8 text-2xl font-medium leading-snug tracking-tight text-pretty text-ink">{lead}</p>
                <div className="mt-6 space-y-5 text-lg leading-relaxed text-pretty text-ink-muted">
                  {rest.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <figure className="relative">
                <div aria-hidden="true" className="absolute inset-x-[12%] bottom-0 top-[20%] rounded-full bg-brand-200/60 blur-[90px]" />
                <RoomIllustration className="relative" title="Isometric illustration of a furnished living room with sofa, rug, window, pendants and planting" />
              </figure>
            </Reveal>
          </div>
        </Container>
      </Section>

      <DarkBand labelledBy="about-values-heading">
        <Container size="wide">
          <Heading
            id="about-values-heading"
            tone="inverse"
            eyebrow="02 — Philosophy"
            title="Four things"
            highlight="we will not compromise on"
            className="mb-14"
          />
          <GlassCards items={VALUES} />
        </Container>
      </DarkBand>

      <StatBand id="about-stats-heading" title="The studio in numbers" />

      <Section labelledBy="about-cities-heading">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
            <Heading
              id="about-cities-heading"
              eyebrow="03 — Where we work"
              title="Based in Mumbai,"
              highlight="working across India"
              lede="Our studio and workshops are in Mumbai. For projects elsewhere we travel for the key stages and keep a supervisor on site."
              className="lg:sticky lg:top-28 lg:self-start"
            />
            <TypeIndex items={[...STUDIO.servedCities]} />
          </div>
        </Container>
      </Section>

      <Section surface="muted" labelledBy="about-more-heading">
        <Container size="wide">
          <Heading id="about-more-heading" eyebrow="04 — The studio" title="People" highlight="and practice" className="mb-14" />
          <Tiles columns={3} items={MORE} />
        </Container>
      </Section>

      <CtaBand id="about-cta-heading" variant="brand" title="Let us design" highlight="your next space" />
    </>
  );
}
