import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, FolderOpen, MessageSquare, Palette } from "lucide-react";

import { PortfolioGrid } from "@/components/home/PortfolioGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { FactList } from "@/components/sections/FactList";
import { LinkCards } from "@/components/sections/LinkCards";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Heading as SectionHeading } from "@/components/sections/kit";
import { FEATURED_PROJECT, PROJECTS } from "@/data/projects";

export const metadata: Metadata = {
  title: "Interior Design Portfolio: Recent Projects",
  description:
    "Browse the ArtSpaces Design portfolio: homes, offices, hotels and retail interiors in Mumbai and across India, each with the brief, approach and outcome.",
  alternates: { canonical: "/portfolio" },
};

const EXPLORE = [
  { title: "Browse by style", description: "Seven interior styles, with the palette and materials behind each.", href: "/portfolio/styles", icon: Palette },
  { title: "Awards and press", description: "Where the work has been recognised, and what it was recognised for.", href: "/portfolio/awards", icon: Award },
  { title: "Client testimonials", description: "What it was like to work with the studio, in our clients' words.", href: "/portfolio/testimonials", icon: MessageSquare },
];

export default function PortfolioPage() {
  const featured = FEATURED_PROJECT;

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        eyebrowIcon={FolderOpen}
        title="Recent work,"
        highlight="room by room"
        lede={`${PROJECTS.length} projects across homes, workplaces, hospitality and retail. Each one opens into a short case study: the brief we were given, what we did, and how it turned out.`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Portfolio" }]}
      />

      <Section labelledBy="portfolio-featured-heading">
        <Container>
          <Reveal>
            <article className="grid overflow-clip rounded-panel border border-line bg-surface shadow-card lg:grid-cols-[1.35fr_1fr]">
              <div className="relative aspect-[4/3] bg-surface-sunken lg:aspect-auto lg:min-h-[32rem]">
                <Image
                  src={featured.image}
                  alt={`${featured.title} — ${featured.category} interior design by ArtSpaces`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 720px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="text-eyebrow uppercase text-accent-600">Featured project</p>
                <h2 id="portfolio-featured-heading" className="mt-4 text-[clamp(2rem,4.2vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-balance text-ink">
                  {featured.title}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-ink-muted">{featured.brief}</p>
                <FactList
                  className="mt-6"
                  facts={[
                    { label: "Location", value: featured.location ?? "India" },
                    { label: "Area", value: featured.area ?? "On request" },
                    { label: "Outcome", value: featured.highlight },
                  ]}
                />
                <Link
                  href={`/portfolio/${featured.slug}`}
                  className="group mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-brand-900"
                >
                  Read the {featured.title} case study
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </article>
          </Reveal>
        </Container>
      </Section>

      <Section surface="muted" background="aurora" labelledBy="portfolio-grid-heading">
        <Container>
          <SectionHeading
            id="portfolio-grid-heading"
            eyebrow="All projects"
            title="Filter by"
            highlight="type of space"
            className="mb-12"
          />
          <PortfolioGrid />
        </Container>
      </Section>

      <Section labelledBy="portfolio-explore-heading">
        <Container>
          <SectionHeading
            id="portfolio-explore-heading"
            eyebrow="Keep exploring"
            title="More ways"
            highlight="into the work"
            className="mb-16"
          />
          <LinkCards items={EXPLORE} />
        </Container>
      </Section>

      <CtaBand id="portfolio-cta-heading" variant="brand" title="Seen something close to" highlight="what you have in mind?" secondary={{ label: "How a project runs", href: "/consultation/process" }} />
    </>
  );
}
