import type { Metadata } from "next";

import { FloorPlan } from "@/components/illustrations";
import { CtaBand } from "@/components/sections/CtaBand";
import { CheckList } from "@/components/sections/FactList";
import { FaqSection } from "@/components/sections/FaqSection";
import { IllustrationFrame } from "@/components/sections/FeatureSplit";
import { AsideSteps } from "@/components/sections/HeroAsides";
import { Heading, Tiles, TypeIndex } from "@/components/sections/kit";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { BOOKING_FAQS } from "@/data/faq";
import { menuData } from "@/data/navigation";
import { photo } from "@/data/photos";
import { CONSULTATION_COVERS, NEXT_STEPS } from "@/data/process";

export const metadata: Metadata = {
  title: "Interior Design Consultation in Mumbai",
  description:
    "Book a free interior design consultation in Mumbai. See how ArtSpaces Design works: the design process, 3D virtual tours and the team behind your project.",
  alternates: { canonical: "/consultation" },
};

export default function ConsultationPage() {
  return (
    <>
      <PageHero
        image={photo("booking")}
        imageAlt="Designer's desk with plans and a laptop — reference photograph"
        eyebrow="Consultation"
        title="Start with a conversation,"
        highlight="not a contract"
        lede="Forty-five minutes with a designer, free. You leave knowing what your space needs, how long it should take and what it is likely to cost."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Consultation" }]}
        aside={<AsideSteps title="After you write" items={NEXT_STEPS.map((step) => step.title)} />}
      >
        <CtaButton href="/consultation/booking" variant="inverse">
          Book a free consultation
        </CtaButton>
      </PageHero>

      <Section surface="muted" labelledBy="consultation-ways-heading">
        <Container size="wide">
          <Heading id="consultation-ways-heading" eyebrow="01 — How we work" title="Everything you can know" highlight="before you commit" className="mb-14" />
          <Tiles
            items={menuData.consultation.items.map((item) => ({
              title: item.title,
              description: item.description,
              href: item.href,
              icon: item.icon,
            }))}
          />
        </Container>
      </Section>

      <Section labelledBy="consultation-covers-heading">
        <Container size="wide">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <Heading
                id="consultation-covers-heading"
                eyebrow="02 — The first meeting"
                title="What a consultation"
                highlight="actually covers"
                lede="It is a working session, not a sales pitch. Bring a floor plan and photographs if you have them."
              />
              <Reveal delay={0.1}>
                <CheckList items={CONSULTATION_COVERS} className="mt-8 text-lg" />
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <IllustrationFrame caption="We start from your plan">
                <FloorPlan title="Annotated floor plan of a two-bedroom apartment with furniture and overall dimensions" />
              </IllustrationFrame>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section surface="muted" labelledBy="consultation-next-heading">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
            <Heading
              id="consultation-next-heading"
              eyebrow="03 — After you write"
              title="What happens next"
              lede="From your first message to a written proposal, usually inside a fortnight."
              className="lg:sticky lg:top-28 lg:self-start"
            />
            <TypeIndex items={NEXT_STEPS} />
          </div>
        </Container>
      </Section>

      <FaqSection id="consultation-faq-heading" items={BOOKING_FAQS} />

      <CtaBand id="consultation-cta-heading" variant="brand" title="Tell us about" highlight="your space" secondary={{ label: "See the design process", href: "/consultation/process" }} />
    </>
  );
}
