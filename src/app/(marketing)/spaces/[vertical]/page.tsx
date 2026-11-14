import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowRight } from "lucide-react";

import type { SceneVariant } from "@/components/illustrations/boards";
import { Swatch } from "@/components/illustrations/Swatch";
import { CompareSlider } from "@/components/sections/CompareSlider";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { DarkBand, H2, Heading, KICKER, MaterialDiscs, StackCards, Tiles, TypeIndex } from "@/components/sections/kit";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { photo, type PhotoId } from "@/data/photos";
import { PROJECTS } from "@/data/projects";
import { SERVICES } from "@/data/services";
import { BOARDS } from "@/data/vertical-boards";
import { getVertical, VERTICAL_CONTENT } from "@/data/verticals";
import { accentAt } from "@/lib/accents";

type Params = { params: Promise<{ vertical: string }> };

export const dynamicParams = false;

/* Per-vertical art direction. ⚠️ PLACEHOLDER imagery (stock). */
const ART: Record<string, { tagline: string; photos: [PhotoId, PhotoId] }> = {
  residential: { tagline: "around the way you live", photos: ["awards", "styles"] },
  commercial: { tagline: "for the way your team works", photos: ["team", "booking"] },
  hospitality: { tagline: "that guests remember", photos: ["recent", "awards"] },
  retail: { tagline: "that turn visitors into buyers", photos: ["styles", "awards"] },
};

/* The interior the wireframe-to-render slider shows on each vertical. */
const SLIDER_SCENE: Record<string, SceneVariant> = { residential: "living", commercial: "office", hospitality: "suite", retail: "store" };

/* Where the four callouts sit around the scene. Whole class strings. */
const CALLOUT_SPOTS = ["left-[38%] top-[4%]", "right-0 top-[30%]", "left-0 top-[58%]", "bottom-[6%] right-[8%]"];

export function generateStaticParams() {
  return VERTICAL_CONTENT.map((entry) => ({ vertical: entry.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { vertical } = await params;
  const entry = getVertical(vertical);
  if (!entry) return { title: "Not found" };

  const title = `${entry.title} Interior Designers in Mumbai`;

  return {
    title,
    description: entry.metaDescription,
    alternates: { canonical: entry.href },
    openGraph: {
      title,
      description: entry.metaDescription,
      url: entry.href,
      // An openGraph object replaces the root one, so the image must be restated.
      images: [{ url: entry.image, alt: `${entry.title} interior design by ArtSpaces` }],
    },
  };
}

export default async function VerticalPage({ params }: Params) {
  const { vertical } = await params;
  const entry = getVertical(vertical);
  if (!entry) notFound();

  const art = ART[entry.id];
  const board = BOARDS[entry.id];
  const lower = entry.title.toLowerCase();
  const projects = PROJECTS.filter((project) => project.category === entry.name);
  const services = entry.services.flatMap((slug) => SERVICES.find((service) => service.slug === slug) ?? []);

  return (
    <>
      <PageHero
        image={entry.image}
        imageAlt={`${entry.title} interior designed by ArtSpaces — reference photograph`}
        eyebrow={`${entry.title} interior design · Mumbai`}
        title={`${entry.title} interiors, designed`}
        highlight={art.tagline}
        lede={entry.description}
        stats
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Spaces", href: "/spaces" }, { label: entry.title }]}
        aside={
          <>
            <p className={`${KICKER} text-accent-on-brand`}>Signature palette</p>
            <ul aria-hidden="true" className="mt-5 flex list-none -space-x-5 p-0">
              {board.materials.slice(0, 4).map((material) => (
                <li key={material.name} className="h-20 w-20 overflow-clip rounded-full shadow-xl ring-2 ring-white/50 xl:h-24 xl:w-24">
                  <Swatch kind={material.kind} base={material.base} line={material.line} className="h-full w-full" />
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-ink-inverse/85">
              {board.materials.slice(0, 4).map((material) => material.name).join(" · ")}
            </p>
            <ul className="mt-5 flex list-none flex-wrap gap-x-4 gap-y-2 border-t border-white/15 p-0 pt-5 text-xs text-ink-inverse/80">
              {board.palette.map((colour) => (
                <li key={colour.name} className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-4 w-4 rounded-full ring-1 ring-white/50" style={{ backgroundColor: colour.hex }} />
                  {colour.name}
                </li>
              ))}
            </ul>
          </>
        }
      >
        <div className="flex flex-wrap gap-3">
          <CtaButton href="/consultation/booking" variant="inverse">
            Book a free consultation
          </CtaButton>
          <Link
            href="#vertical-projects"
            className="inline-flex min-h-14 items-center gap-2 rounded-full border border-white/35 bg-white/10 px-8 font-semibold tracking-wide text-ink-inverse backdrop-blur-md transition-colors hover:bg-white/20"
          >
            See {lower} projects
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </PageHero>

      {/* The space, drawn, with what we design in it called out. */}
      <Section surface="muted" labelledBy="vertical-intro-heading">
        <Container size="wide">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            <div>
              <Heading
                id="vertical-intro-heading"
                eyebrow="01 — Why us"
                title={`${entry.title} design that starts with`}
                highlight="how the space is used"
              />
              <Reveal delay={0.1}>
                <div className="mt-8 space-y-5 text-lg leading-relaxed text-pretty text-ink-muted">
                  {entry.intro.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <Link href="/consultation/process" className="group mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-brand-900">
                  See how a project runs
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <figure className="relative">
                <div aria-hidden="true" className="absolute inset-x-[12%] bottom-0 top-[20%] rounded-full bg-brand-200/60 blur-[90px]" />
                <div className="relative">
                  <board.drawing title={`Isometric illustration of a furnished ${lower} interior`} />
                  <ul aria-label="What we design in the space" className="list-none p-0">
                    {board.callouts.map((label, index) => (
                      <li
                        key={label}
                        className={`absolute hidden items-center gap-2 rounded-full border border-line bg-surface/95 px-4 py-2 text-sm font-medium text-ink shadow-card backdrop-blur-md sm:flex ${CALLOUT_SPOTS[index]}`}
                      >
                        <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-900 font-mono text-[10px] text-accent-on-brand">
                          {index + 1}
                        </span>
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>
              </figure>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section labelledBy="vertical-types-heading">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
            <Heading
              id="vertical-types-heading"
              eyebrow="02 — Scope"
              title="What we design"
              lede="From a single room to a complete property, on one accountable team."
              className="lg:sticky lg:top-28 lg:self-start"
            />
            <TypeIndex items={entry.spaceTypes} />
          </div>
        </Container>
      </Section>

      <Section surface="muted" labelledBy="vertical-approach-heading">
        <Container size="wide">
          <Heading
            id="vertical-approach-heading"
            eyebrow="03 — Approach"
            title={`How we approach ${lower}`}
            highlight="interiors"
            className="mb-14"
          />
          <StackCards
            items={entry.approach}
            altPrefix={`${lower} interior`}
            visuals={[photo(art.photos[0]), photo(art.photos[1]), "/portfolio-1.png", "/portfolio-2.png"]}
          />
        </Container>
      </Section>

      <DarkBand labelledBy="vertical-materials-heading">
        <Container size="wide">
          <Heading
            id="vertical-materials-heading"
            tone="inverse"
            eyebrow="04 — Material palette"
            title="The materials behind"
            highlight={`${lower} interiors`}
            lede="Chosen for how they age in a humid coastal climate, not only for how they photograph. You approve a physical sample of every one."
            className="mb-14"
          />
          <MaterialDiscs materials={board.materials} />

          <div className="mt-24 grid items-center gap-12 border-t border-white/15 pt-20 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
            <Reveal>
              <p className={`${KICKER} text-accent-on-brand`}>05 — 3D walkthrough</p>
              <h2 className={`${H2} mt-5`}>
                See it <span className="text-accent-on-brand">before it is built</span>
              </h2>
              <p className="mt-6 text-lg font-light leading-relaxed text-ink-inverse/80">
                Every project is modelled in three dimensions as we design it. You walk through the
                finished space on screen, change your mind while it costs an afternoon, and approve
                exactly what will be built.
              </p>
              <Link href="/consultation/virtual-tours" className="group mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-accent-on-brand">
                How virtual tours work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Reveal>
            <Reveal delay={0.1} className="text-ink">
              <CompareSlider scene={SLIDER_SCENE[entry.id]} />
            </Reveal>
          </div>
        </Container>
      </DarkBand>

      <Section labelledBy="vertical-services-heading">
        <Container size="wide">
          <Heading id="vertical-services-heading" eyebrow="06 — Services" title={`Services for ${lower}`} highlight="spaces" className="mb-14" />
          <Tiles
            items={services.map((service) => ({
              title: service.heading,
              description: service.summary,
              href: `/services/${service.slug}`,
              icon: service.icon,
            }))}
          />
        </Container>
      </Section>

      <Section id="vertical-projects" surface="muted" labelledBy="vertical-projects-heading" className="scroll-mt-20">
        <Container size="wide">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <Heading id="vertical-projects-heading" eyebrow="07 — Selected work" title={entry.title} highlight="projects" />
            <CtaButton href="/portfolio" variant="secondary" size="md">
              View the full portfolio
            </CtaButton>
          </div>
          {projects.length > 0 ? (
            <ul className="grid list-none gap-8 p-0 md:grid-cols-2">
              {projects.map((project, index) => (
                <Reveal as="li" key={project.slug} delay={index * 0.08}>
                  <ProjectCard project={project} accent={accentAt(index)} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <p className="max-w-xl text-lg text-ink-muted">
              We are photographing our most recent {lower} work. Ask for the portfolio when you book
              and we will bring it to the consultation.
            </p>
          )}
        </Container>
      </Section>

      <FaqSection id="vertical-faq-heading" items={entry.faqs} title={`${entry.title} interiors:`} highlight="your questions" />

      <CtaBand
        id="vertical-cta-heading"
        variant="brand"
        title={`Planning a ${lower}`}
        highlight="project?"
        secondary={{ label: "How a project runs", href: "/consultation/process" }}
      />
    </>
  );
}
