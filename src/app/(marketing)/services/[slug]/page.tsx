import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { ProjectList } from "@/components/sections/Blocks";
import { CtaBand } from "@/components/sections/CtaBand";
import { CheckList } from "@/components/sections/FactList";
import { FaqSection } from "@/components/sections/FaqSection";
import { FeatureSplit, IllustrationFrame, PhotoFrame } from "@/components/sections/FeatureSplit";
import { LinkCards } from "@/components/sections/LinkCards";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Heading as SectionHeading, Tiles } from "@/components/sections/kit";
import { PROJECTS } from "@/data/projects";
import { findService, SERVICES } from "@/data/services";
import { VERTICALS_FULL } from "@/data/verticals";
import { serviceJsonLd } from "@/lib/seo";
import type { ProjectCategory } from "@/types/content";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return { title: "Not found" };

  return {
    title: `${service.heading} in Mumbai`,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  const verticals = VERTICALS_FULL.filter((vertical) => service.verticals.includes(vertical.name));
  const projects = PROJECTS.filter((project) =>
    (service.verticals as readonly ProjectCategory[]).includes(project.category),
  ).slice(0, 3);
  const others = SERVICES.filter((entry) => entry.slug !== service.slug);

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: service.heading,
          description: service.metaDescription,
          path: `/services/${service.slug}`,
        })}
      />

      <PageHero
        eyebrow="Services"
        eyebrowIcon={service.icon}
        visual={
          <IllustrationFrame caption={service.keywords.join(" · ")}>
            <service.illustration title={service.illustrationTitle} />
          </IllustrationFrame>
        }
        title={service.heading}
        highlight="in Mumbai"
        lede={service.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.heading },
        ]}
      >
        <div className="flex flex-wrap gap-4">
          <CtaButton href="/consultation/booking">Book a free consultation</CtaButton>
          <CtaButton href="/consultation/process" variant="secondary">
            See the process
          </CtaButton>
        </div>
      </PageHero>

      <Section labelledBy="service-overview-heading">
        <Container>
          <FeatureSplit
            headingId="service-overview-heading"
            eyebrow="Overview"
            title="How we approach it"
            visual={
              <PhotoFrame
                src={verticals[0]?.image ?? "/portfolio-1.png"}
                alt={`${service.heading} — reference photograph`}
                sizes="(max-width: 1024px) 100vw, 640px"
              />
            }
          >
            {service.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </FeatureSplit>
        </Container>
      </Section>

      <Section surface="muted" background="aurora" labelledBy="service-includes-heading">
        <Container>
          <SectionHeading
            id="service-includes-heading"
            eyebrow="Scope"
            title="What is"
            highlight="included"
            lede={`Everything that sits inside our ${service.heading.toLowerCase().replace("3d", "3D")} scope, with nothing left as an assumption.`}
            className="mb-16"
          />
          <BentoGrid items={service.includes} />
        </Container>
      </Section>

      <Section labelledBy="service-deliverables-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
            <Reveal>
              <div className="h-full rounded-panel bg-gradient-to-br from-brand-950 via-brand-900 to-brand-700 p-8 text-ink-inverse shadow-card md:p-10">
                <p className="text-eyebrow uppercase text-accent-on-brand">Deliverables</p>
                <h2 id="service-deliverables-heading" className="mt-4 text-3xl font-medium tracking-tight leading-tight">
                  What you receive
                </h2>
                <CheckList items={service.deliverables} tone="inverse" className="mt-8" />
              </div>
            </Reveal>
            <div>
              <h2 className="text-3xl font-medium tracking-tight leading-tight text-ink">Spaces we do this for</h2>
              <p className="mb-8 mt-4 text-lg leading-relaxed text-ink-muted">
                See how the service changes shape for each kind of project.
              </p>
              <LinkCards
                columns={2}
                items={verticals.map((vertical) => ({
                  title: `${vertical.title} interiors`,
                  description: vertical.description,
                  href: vertical.href,
                  icon: vertical.icon,
                }))}
              />
            </div>
          </div>
        </Container>
      </Section>

      {projects.length > 0 && (
        <Section surface="muted" labelledBy="service-projects-heading">
          <Container>
            <SectionHeading
              id="service-projects-heading"
              eyebrow="Selected work"
              title="Projects that used"
              highlight="this service"
              className="mb-16"
            />
            <ProjectList projects={projects} />
          </Container>
        </Section>
      )}

      <FaqSection id="service-faq-heading" items={service.faqs} />

      <Section surface="muted" background="aurora" tone="accent" labelledBy="service-others-heading">
        <Container>
          <SectionHeading
            id="service-others-heading"
            eyebrow="Also from the studio"
            title="Services that"
            highlight="work alongside"
            className="mb-16"
          />
          <Tiles
            columns={3}
            items={others.slice(0, 3).map((entry) => ({
              title: entry.heading,
              description: entry.summary,
              href: `/services/${entry.slug}`,
              icon: entry.icon,
            }))}
          />
        </Container>
      </Section>

      <CtaBand
        id="service-cta-heading"
        variant="brand"
        title="Ready to talk about"
        highlight="your space?"
        secondary={{ label: "How a project runs", href: "/consultation/process" }}
      />
    </>
  );
}
