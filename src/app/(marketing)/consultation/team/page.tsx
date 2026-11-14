import type { Metadata } from "next";
import { Briefcase, ClipboardList } from "lucide-react";

import { Elevation, FloorPlan, LightingLayers, MaterialBoard } from "@/components/illustrations";
import { StatBand } from "@/components/sections/Blocks";
import { CtaBand } from "@/components/sections/CtaBand";
import { AsideChips } from "@/components/sections/HeroAsides";
import { Heading, StackCards, Tiles } from "@/components/sections/kit";
import { PersonCard } from "@/components/sections/PersonCard";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { photo } from "@/data/photos";
import { TEAM_FORMATION, TEAM_ROLES } from "@/data/studio-content";
import { accentAt } from "@/lib/accents";

export const metadata: Metadata = {
  title: "Our Interior Design Team in Mumbai",
  description:
    "Meet the roles behind every ArtSpaces Design project in Mumbai: designers, interior architects, visualisers, lighting specialists and site supervisors.",
  alternates: { canonical: "/consultation/team" },
};

const MORE = [
  { title: "How a project runs", description: "The seven phases every project moves through, with what you receive at each.", href: "/consultation/process", icon: ClipboardList },
  { title: "Work with us", description: "We hire designers, architects, visualisers and site supervisors.", href: "/careers", icon: Briefcase },
];

export default function TeamPage() {
  return (
    <>
      <PageHero
        image={photo("team")}
        imageAlt="A design team working together at a shared table — reference photograph"
        eyebrow="The team"
        title="The people"
        highlight="behind the drawings"
        lede="Designers, architects, visualisers and site supervisors under one roof. The people who draw your project are the people who build it."
        stats
        aside={<AsideChips title="On every project team" items={TEAM_ROLES.map((role) => role.role)} />}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Consultation", href: "/consultation" },
          { label: "Team" },
        ]}
      >
        <CtaButton href="/consultation/booking" variant="inverse">
          Meet us at a consultation
        </CtaButton>
      </PageHero>

      <Section surface="muted" labelledBy="team-roles-heading">
        <Container size="wide">
          <Heading
            id="team-roles-heading"
            eyebrow="01 — Roles"
            title="Who is"
            highlight="on your project"
            lede="Eight disciplines, one studio. Which of them join your project depends on its size and scope."
            className="mb-14"
          />
          <ul className="grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM_ROLES.map((role, index) => (
              <Reveal as="li" key={role.role} delay={Math.min(index * 0.05, 0.3)}>
                <PersonCard {...role} accent={accentAt(index)} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section labelledBy="team-formation-heading">
        <Container size="wide">
          <Heading id="team-formation-heading" eyebrow="02 — Formation" title="How a project team" highlight="is put together" className="mb-14" />
          <StackCards
            items={TEAM_FORMATION}
            visuals={[
              <FloorPlan key="plan" />,
              <Elevation key="elevation" />,
              <LightingLayers key="lighting" />,
              <MaterialBoard key="materials" />,
            ]}
          />
        </Container>
      </Section>

      <StatBand id="team-stats-heading" title="The studio in numbers" />

      <Section labelledBy="team-more-heading">
        <Container size="wide">
          <Heading id="team-more-heading" eyebrow="03 — Next" title="Keep" highlight="exploring" className="mb-14" />
          <Tiles items={MORE} />
        </Container>
      </Section>

      <CtaBand id="team-cta-heading" variant="brand" title="Put the team" highlight="to work on your space" />
    </>
  );
}
