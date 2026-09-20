import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Activity } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROJECTS } from "@/data/projects";
import { accentAt } from "@/lib/accents";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((entry) => entry.slug === slug);
  if (!project) return { title: "Not found" };

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((entry) => entry.slug === slug);

  if (!project) notFound();

  const related = PROJECTS.filter(
    (entry) => entry.category === project.category && entry.slug !== project.slug,
  ).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={project.category}
        title={project.title}
        lede={project.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: project.title },
        ]}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink shadow-sm">
          <Activity size={16} className="text-brand-900" aria-hidden="true" />
          {project.highlight}
        </span>
      </PageHero>

      <Section labelledBy="project-visual-heading">
        <Container>
          <h2 id="project-visual-heading" className="sr-only">
            Project imagery
          </h2>
          <Reveal>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-panel border border-line bg-surface-sunken shadow-card">
              <Image
                src={project.image}
                alt={`${project.title} — ${project.category} interior design by ArtSpaces`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/*
            Placeholder set. Phase 4 replaces this with a real case study:
            brief, constraints, materials, outcome, and per-project photography.
          */}
          <Reveal delay={0.1} className="mx-auto mt-12 max-w-2xl">
            <p className="text-lg leading-relaxed text-ink-muted">{project.description}</p>
            <p className="mt-6 text-ink-subtle">
              A full case study for this project — brief, constraints, materials and
              outcome — is being written.{" "}
              <a href="/contact" className="font-semibold text-brand-900 underline">
                Ask us about it
              </a>{" "}
              and we will walk you through it directly.
            </p>
          </Reveal>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section surface="muted" background="aurora" labelledBy="related-heading">
          <Container>
            <SectionHeading
              id="related-heading"
              eyebrow="More like this"
              title="Other"
              highlight={`${project.category.toLowerCase()} work`}
              className="mb-16"
            />
            <ul className="grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-2 lg:grid-cols-3">
              {related.map((entry, index) => (
                <Reveal as="li" key={entry.slug} delay={index * 0.08}>
                  <ProjectCard project={entry} accent={accentAt(index)} />
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <Section labelledBy="project-cta-heading">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="project-cta-heading" className="text-section font-bold text-balance text-ink">
              Want something like this?
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <CtaButton href="/contact">Start a conversation</CtaButton>
              <CtaButton href="/portfolio" variant="secondary">
                Back to portfolio
              </CtaButton>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
