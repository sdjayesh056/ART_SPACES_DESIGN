import type { Metadata } from "next";
import { LayoutGrid } from "lucide-react";

import { CtaBand } from "@/components/sections/CtaBand";
import { FeatureSplit, IllustrationFrame } from "@/components/sections/FeatureSplit";
import { AsideGrid } from "@/components/sections/HeroAsides";
import { LinkCards } from "@/components/sections/LinkCards";
import { FloorPlan } from "@/components/illustrations";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Heading as SectionHeading, Tiles } from "@/components/sections/kit";
import { photo } from "@/data/photos";
import { SERVICES } from "@/data/services";
import { VERTICALS_FULL } from "@/data/verticals";

export const metadata: Metadata = {
  title: "Spaces We Design: Homes, Offices, Hotels",
  description:
    "Interior design in Mumbai for four kinds of space: residential, commercial, hospitality and retail. See how the studio approaches each, with recent work.",
  alternates: { canonical: "/spaces" },
};

export default function SpacesPage() {
  return (
    <>
      <PageHero
        eyebrow="Spaces"
        eyebrowIcon={LayoutGrid}
        image={photo("recent")}
        imageAlt="Contemporary home — reference photograph"
        stats
        aside={
          <AsideGrid
            title="Choose a space"
            items={VERTICALS_FULL.map((vertical) => ({ label: vertical.title, href: vertical.href, icon: vertical.icon }))}
          />
        }
        title="The spaces"
        highlight="we design"
        lede="Four kinds of project, each with its own rules. A home is judged by how it feels on an ordinary day; a store, by what it sells. We design for the difference."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Spaces" }]}
      >
        <CtaButton href="/consultation/booking">Book a free consultation</CtaButton>
      </PageHero>

      <Section surface="muted" background="aurora" labelledBy="spaces-list-heading">
        <Container>
          <SectionHeading
            id="spaces-list-heading"
            eyebrow="Four verticals"
            title="Choose the space"
            highlight="you are planning"
            className="mb-16"
          />
          <LinkCards
            columns={2}
            items={VERTICALS_FULL.map((vertical) => ({
              title: `${vertical.title} interior design`,
              description: vertical.description,
              href: vertical.href,
              meta: vertical.spaceTypes.slice(0, 2).join(" · "),
              image: vertical.image,
              imageAlt: `${vertical.title} interior — reference photograph`,
            }))}
          />
        </Container>
      </Section>

      <Section labelledBy="spaces-method-heading">
        <Container>
          <FeatureSplit
            headingId="spaces-method-heading"
            eyebrow="One method"
            title="Every space starts with the plan"
            reverse
            visual={
              <IllustrationFrame caption="Plan first, finishes second">
                <FloorPlan title="Annotated floor plan of a two-bedroom apartment with furniture and overall dimensions" />
              </IllustrationFrame>
            }
          >
            <p>
              Whatever the vertical, the first thing we draw is the layout. Circulation, storage,
              services and light are resolved on plan before a material is chosen, because a
              beautiful finish cannot rescue a room that does not work.
            </p>
            <CtaButton href="/consultation/process" variant="secondary" size="md">
              See the design process
            </CtaButton>
          </FeatureSplit>
        </Container>
      </Section>

      <Section surface="muted" labelledBy="spaces-services-heading">
        <Container>
          <SectionHeading
            id="spaces-services-heading"
            eyebrow="Services"
            title="What we bring"
            highlight="to each"
            className="mb-16"
          />
          <Tiles
            columns={3}
            items={SERVICES.map((service) => ({
              title: service.heading,
              description: service.summary,
              href: `/services/${service.slug}`,
              icon: service.icon,
            }))}
          />
        </Container>
      </Section>

      <CtaBand id="spaces-cta-heading" title="Planning a space that is" highlight="not on this list?" lede="Clinics, schools, clubhouses and show flats come through the studio too. Tell us what you are planning and we will say plainly whether we are the right fit." />
    </>
  );
}
