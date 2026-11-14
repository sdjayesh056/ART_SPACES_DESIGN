import type { Metadata } from "next";
import { Calendar, Users, Video } from "lucide-react";

import { FloorPlan } from "@/components/illustrations";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { IllustrationFrame } from "@/components/sections/FeatureSplit";
import { DarkBand, GlassCards, Heading, Tiles } from "@/components/sections/kit";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { FAQ_GROUPS } from "@/data/faq";
import { PHASES, PROCESS_PRINCIPLES } from "@/data/process";

export const metadata: Metadata = {
  title: "Our Interior Design Process, Step by Step",
  description:
    "The ArtSpaces Design process in seven phases, from first consultation to handover, with the deliverables and typical duration of each. Based in Mumbai.",
  alternates: { canonical: "/consultation/process" },
};

const NEXT = [
  { title: "Virtual tours", description: "Walk through your space in 3D before anything is built.", href: "/consultation/virtual-tours", icon: Video },
  { title: "The team", description: "Who is on a project, and how the team is put together.", href: "/consultation/team", icon: Users },
  { title: "Book a consultation", description: "Forty-five minutes with a designer, free of charge.", href: "/consultation/booking", icon: Calendar },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Design process"
        title={`${PHASES.length} phases,`}
        highlight="from first call to handover"
        lede="A project should never feel like a mystery. Here is exactly what happens, in what order, how long each phase takes and what you hold in your hands at the end of it."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Consultation", href: "/consultation" },
          { label: "Design process" },
        ]}
        visual={
          <IllustrationFrame caption="Every project starts on plan">
            <FloorPlan title="Annotated floor plan of a two-bedroom apartment with furniture and overall dimensions" />
          </IllustrationFrame>
        }
      >
        <CtaButton href="/consultation/booking">Start with a free consultation</CtaButton>
      </PageHero>

      <Section labelledBy="process-phases-heading">
        <Container size="wide">
          <Heading
            id="process-phases-heading"
            eyebrow="01 — The sequence"
            title="What happens,"
            highlight="and when"
            lede="Durations are typical for a three-bedroom home. Yours is set out in a dated programme before work begins."
            className="mb-14"
          />
          <ProcessTimeline phases={PHASES} showNav />
        </Container>
      </Section>

      <DarkBand labelledBy="process-principles-heading">
        <Container size="wide">
          <Heading id="process-principles-heading" tone="inverse" eyebrow="02 — Constants" title="Four things that" highlight="never change" className="mb-14" />
          <GlassCards items={PROCESS_PRINCIPLES} />
        </Container>
      </DarkBand>

      <Section labelledBy="process-next-heading">
        <Container size="wide">
          <Heading id="process-next-heading" eyebrow="03 — Keep reading" title="See the process" highlight="in practice" className="mb-14" />
          <Tiles columns={3} items={NEXT} />
        </Container>
      </Section>

      <FaqSection id="process-faq-heading" items={FAQ_GROUPS[2].items} surface="muted" />

      <CtaBand id="process-cta-heading" variant="brand" title="Ready for" highlight="phase one?" secondary={{ label: "See the work", href: "/portfolio" }} />
    </>
  );
}
