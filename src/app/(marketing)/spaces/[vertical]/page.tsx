import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { menuData } from "@/data/navigation";
import { PROJECTS } from "@/data/projects";
import { STUDIO } from "@/data/studio";
import { accentAt } from "@/lib/accents";

/**
 * One file for all four verticals. They differ only in copy and in which
 * projects they show, so four hand-written leaves would have been four places
 * to forget to update.
 */
const VERTICALS = menuData.spaces.items;

export function generateStaticParams() {
  return VERTICALS.map((item) => ({ vertical: item.id }));
}

function findVertical(slug: string) {
  return VERTICALS.find((item) => item.id === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ vertical: string }>;
}): Promise<Metadata> {
  const { vertical } = await params;
  const entry = findVertical(vertical);
  if (!entry) return { title: "Not found" };

  return {
    title: `${entry.title} Interior Design`,
    description: `${entry.description} ${entry.title} interior design by ArtSpaces Design, ${STUDIO.address.locality}.`,
  };
}

export default async function VerticalPage({
  params,
}: {
  params: Promise<{ vertical: string }>;
}) {
  const { vertical } = await params;
  const entry = findVertical(vertical);

  if (!entry) notFound();

  // `category` on a project matches the vertical's display title.
  const projects = PROJECTS.filter((project) => project.category === entry.title);

  return (
    <>
      <PageHero
        eyebrow="Spaces"
        eyebrowIcon={entry.icon}
        title={entry.title}
        highlight="Interior Design"
        lede={entry.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Spaces", href: "/spaces" },
          { label: entry.title },
        ]}
      >
        <CtaButton href="/contact">Discuss your {entry.title.toLowerCase()} project</CtaButton>
      </PageHero>

      <Section surface="muted" background="aurora" labelledBy="vertical-projects-heading">
        <Container>
          <SectionHeading
            id="vertical-projects-heading"
            eyebrow="Selected work"
            title={`${entry.title} projects`}
            lede={
              projects.length > 0
                ? `A selection of ${entry.title.toLowerCase()} work delivered across ${STUDIO.servedCities.slice(0, 3).join(", ")} and beyond.`
                : undefined
            }
            className="mb-16"
          />

          {projects.length > 0 ? (
            <ul className="grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <Reveal as="li" key={project.slug} delay={index * 0.08}>
                  <ProjectCard project={project} accent={accentAt(index)} />
                </Reveal>
              ))}
            </ul>
          ) : (
            /* Honest rather than an empty grid. Phase 4 adds real work here. */
            <p className="mx-auto max-w-xl text-center text-ink-muted">
              We are photographing our most recent {entry.title.toLowerCase()} work.
              In the meantime,{" "}
              <a href="/contact" className="font-semibold text-brand-900 underline">
                ask us for the portfolio directly
              </a>{" "}
              and we will send it over.
            </p>
          )}
        </Container>
      </Section>

      <Section labelledBy="vertical-cta-heading">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="vertical-cta-heading" className="text-section font-bold text-balance text-ink">
              Planning a {entry.title.toLowerCase()} project?
            </h2>
            <p className="mt-6 text-lg text-ink-muted">
              Book a free consultation. We will talk through the space, the timeline and
              a realistic budget before anything is drawn.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <CtaButton href="/consultation/booking">Book a consultation</CtaButton>
              <CtaButton href="/portfolio" variant="secondary">
                See all work
              </CtaButton>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
