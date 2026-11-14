import type { Metadata } from "next";
import { Layers } from "lucide-react";

import { CtaBand } from "@/components/sections/CtaBand";
import { FeatureSplit, IllustrationFrame } from "@/components/sections/FeatureSplit";
import { AsideLinks } from "@/components/sections/HeroAsides";
import { LinkCards } from "@/components/sections/LinkCards";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Heading as SectionHeading } from "@/components/sections/kit";
import { photo } from "@/data/photos";
import { SERVICES } from "@/data/services";
import { VERTICALS_FULL } from "@/data/verticals";

export const metadata: Metadata = {
  title: "Interior Design Services in Mumbai",
  description:
    "Interior design services in Mumbai from one studio: residential and office interiors, space planning, lighting, landscape design and 3D visualisation.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        eyebrowIcon={Layers}
        image={photo("styles")}
        imageAlt="Furnished living room interior — reference photograph"
        stats
        aside={
          <AsideLinks
            title="Six disciplines"
            items={SERVICES.map((service) => ({ label: service.heading, href: `/services/${service.slug}` }))}
          />
        }
        title="Interior design services,"
        highlight="start to finish"
        lede="Six disciplines under one roof, so the layout, the light, the materials and the build are designed together and delivered by one accountable team."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      >
        <div className="flex flex-wrap gap-4">
          <CtaButton href="/consultation/booking">Book a free consultation</CtaButton>
          <CtaButton href="/consultation/process" variant="secondary">
            How we work
          </CtaButton>
        </div>
      </PageHero>

      <Section labelledBy="services-list-heading">
        <Container>
          <SectionHeading
            id="services-list-heading"
            eyebrow="What we do"
            title="Six disciplines,"
            highlight="one studio"
            lede="Each is available on its own. Together they are how a complete interior gets made."
            className="mb-20"
          />
          <div className="space-y-24 md:space-y-32">
            {SERVICES.map((service, index) => (
              <FeatureSplit
                key={service.slug}
                level="h3"
                eyebrow={`0${index + 1} · ${service.keywords[0]}`}
                title={service.heading}
                reverse={index % 2 === 1}
                visual={
                  <IllustrationFrame>
                    <service.illustration title={service.illustrationTitle} />
                  </IllustrationFrame>
                }
              >
                <p>{service.summary}</p>
                <CtaButton href={`/services/${service.slug}`} variant="secondary" size="md">
                  Explore {service.heading}
                </CtaButton>
              </FeatureSplit>
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="muted" background="aurora" labelledBy="services-spaces-heading">
        <Container>
          <SectionHeading
            id="services-spaces-heading"
            eyebrow="Where we work"
            title="Designed for"
            highlight="four kinds of space"
            lede="The same disciplines, applied differently for a home, a workplace, a hotel or a store."
            className="mb-16"
          />
          <LinkCards
            columns={4}
            items={VERTICALS_FULL.map((vertical) => ({
              title: `${vertical.title} interiors`,
              description: vertical.description,
              href: vertical.href,
              icon: vertical.icon,
            }))}
          />
        </Container>
      </Section>

      <CtaBand id="services-cta-heading" variant="brand" title="Not sure which service" highlight="you need?" lede="Most projects use several. Tell us about the space and we will tell you honestly what it needs — and what it does not." />
    </>
  );
}
