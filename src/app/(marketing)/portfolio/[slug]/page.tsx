import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Activity, ArrowRight } from "lucide-react";

import { JsonLd } from "@/components/JsonLd";
import { CtaBand } from "@/components/sections/CtaBand";
import { CheckList, FactList } from "@/components/sections/FactList";
import { LinkCards } from "@/components/sections/LinkCards";
import { Prose } from "@/components/sections/Prose";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Heading as SectionHeading } from "@/components/sections/kit";
import { findProject, galleryFor, nextProject, PROJECTS } from "@/data/projects";
import { SERVICES } from "@/data/services";
import { clampDescription, creativeWorkJsonLd } from "@/lib/seo";
import type { ProjectCategory } from "@/types/content";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return { title: "Not found" };

  const title = `${project.title} Case Study`;
  const description = clampDescription(
    `${project.category} interior design case study${project.location ? ` in ${project.location}` : ""}: ${project.description}`,
  );

  return {
    title,
    description,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/portfolio/${project.slug}`,
      // An openGraph object replaces the root one, so the image must be restated.
      images: [{ url: project.image, alt: `${project.title} by ArtSpaces Design` }],
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  const next = nextProject(project.slug);
  const gallery = galleryFor(project);
  const services = SERVICES.filter((service) =>
    (service.verticals as readonly ProjectCategory[]).includes(project.category),
  ).slice(0, 3);
  const relatedServices = services.length > 0 ? services : SERVICES.slice(0, 3);

  const facts = [
    { label: "Type", value: project.category },
    ...(project.location ? [{ label: "Location", value: project.location }] : []),
    ...(project.year ? [{ label: "Completed", value: project.year }] : []),
    ...(project.area ? [{ label: "Area", value: project.area }] : []),
  ];

  const chapters = [
    { heading: "The brief", body: project.brief },
    { heading: "Our approach", body: project.approach },
    { heading: "The outcome", body: project.outcome },
  ].filter((chapter): chapter is { heading: string; body: string } => Boolean(chapter.body));

  return (
    <>
      <JsonLd
        data={creativeWorkJsonLd({
          name: project.title,
          description: project.description,
          path: `/portfolio/${project.slug}`,
          image: project.image,
          genre: `${project.category} interior design`,
        })}
      />

      <PageHero
        eyebrow={`${project.category} case study`}
        image={project.image}
        imageAlt={`${project.title} — ${project.category} interior design by ArtSpaces`}
        aside={
          <dl className="divide-y divide-white/15">
            {facts.map((fact) => (
              <div key={fact.label} className="flex items-baseline justify-between gap-6 py-3">
                <dt className="text-sm text-ink-inverse/75">{fact.label}</dt>
                <dd className="text-right text-lg font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
        }
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

      <Section labelledBy="project-story-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-20">
            <article>
              <h2 id="project-story-heading" className="sr-only">
                The {project.title} story
              </h2>
              <Prose>
                {chapters.map((chapter) => (
                  <section key={chapter.heading}>
                    <h3>{chapter.heading}</h3>
                    <p>{chapter.body}</p>
                  </section>
                ))}
              </Prose>
            </article>

            {/* The facts rail: follows the reader down the story on desktop. */}
            <aside aria-label="Project facts" className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <div className="rounded-panel border border-line bg-surface p-8 shadow-card-hover">
                  <p className="text-eyebrow uppercase text-accent-600">Project facts</p>
                  <FactList facts={facts} className="mt-2" />
                  {project.scope && (
                    <>
                      <p className="mt-6 text-eyebrow uppercase text-ink-subtle">Scope</p>
                      <CheckList items={project.scope} className="mt-4 text-sm" />
                    </>
                  )}
                  <CtaButton href="/consultation/booking" size="md" className="mt-8 w-full">
                    Plan a project like this
                  </CtaButton>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </Section>

      <Section surface="muted" labelledBy="project-gallery-heading">
        <Container>
          <SectionHeading
            id="project-gallery-heading"
            eyebrow="Gallery"
            title="Inside"
            highlight="the project"
            className="mb-16"
          />
          <ul className="grid list-none gap-5 p-0 md:grid-cols-3 md:grid-rows-2">
            {gallery.map((frame, index) => (
              <Reveal
                as="li"
                key={frame.src}
                delay={index * 0.08}
                className={index === 0 ? "md:col-span-2 md:row-span-2" : ""}
              >
                <figure className={`relative h-full overflow-clip rounded-panel border border-line bg-surface-sunken shadow-card ${index === 0 ? "aspect-[4/3] md:aspect-auto md:min-h-[30rem]" : "aspect-[4/3]"}`}>
                  <Image
                    src={frame.src}
                    alt={frame.alt}
                    fill
                    sizes={index === 0 ? "(max-width: 768px) 100vw, 800px" : "(max-width: 768px) 100vw, 400px"}
                    className="object-cover"
                  />
                </figure>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section labelledBy="project-services-heading">
        <Container>
          <SectionHeading
            id="project-services-heading"
            eyebrow="Disciplines"
            title="Services behind"
            highlight="this project"
            className="mb-16"
          />
          <LinkCards
            items={relatedServices.map((service) => ({
              title: service.heading,
              description: service.summary,
              href: `/services/${service.slug}`,
              icon: service.icon,
            }))}
          />
        </Container>
      </Section>

      <Section surface="brand" labelledBy="project-next-heading">
        <Container>
          <Link href={`/portfolio/${next.slug}`} className="group grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <span>
              <span className="text-eyebrow uppercase text-accent-on-brand">Next project · {next.category}</span>
              <h2 id="project-next-heading" className="mt-4 text-[clamp(2.5rem,5.6vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.04em] text-balance text-ink-inverse">
                {next.title}
              </h2>
            </span>
            <span
              aria-hidden="true"
              className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-on-brand text-brand-950 transition-transform duration-300 group-hover:translate-x-2"
            >
              <ArrowRight className="h-6 w-6" />
            </span>
          </Link>
        </Container>
      </Section>

      <CtaBand id="project-cta-heading" title="Want something" highlight="like this?" secondary={{ label: "Back to the portfolio", href: "/portfolio" }} />
    </>
  );
}
