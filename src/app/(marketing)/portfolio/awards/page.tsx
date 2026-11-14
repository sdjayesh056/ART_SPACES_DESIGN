import type { Metadata } from "next";
import Link from "next/link";
import { Award, Newspaper } from "lucide-react";

import { BentoGrid } from "@/components/sections/BentoGrid";
import { ProjectList } from "@/components/sections/Blocks";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Heading as SectionHeading } from "@/components/sections/kit";
import { COMPANY_STATS } from "@/data/company-stats";
import { findProject } from "@/data/projects";
import { AWARDS, JUDGING_CRITERIA, PRESS } from "@/data/recognition";

export const metadata: Metadata = {
  title: "Awards and Press for Our Interior Design",
  description:
    "Awards, shortlists and press coverage for ArtSpaces Design, the Mumbai interior design studio, with the residential, office and hotel projects behind them.",
  alternates: { canonical: "/portfolio/awards" },
};

export default function AwardsPage() {
  const awardsStat = COMPANY_STATS.find((stat) => stat.id === "awards");
  const awardedProjects = AWARDS.flatMap((entry) => (entry.project ? findProject(entry.project) ?? [] : [])).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Recognition"
        eyebrowIcon={Award}
        title="Awards"
        highlight="and press"
        lede="We do not design for juries. But when independent ones notice the work, it tells a new client something a studio cannot say about itself."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: "Awards" },
        ]}
      />

      <Section labelledBy="awards-list-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[20rem_1fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              {awardsStat && (
                <p className="text-[clamp(5rem,14vw,9rem)] font-extrabold leading-none tracking-tighter text-brand-900">
                  {awardsStat.value}
                  <span className="text-accent-500">{awardsStat.suffix}</span>
                </p>
              )}
              <h2 id="awards-list-heading" className="mt-4 text-3xl font-medium tracking-tight leading-tight text-ink">
                Design awards and shortlists
              </h2>
              <p className="mt-4 leading-relaxed text-ink-muted">
                A selection from recent years. Each links to the project it was given for.
              </p>
            </div>

            {/* The ledger: year in the margin, award in the body, like a studio's own record book. */}
            <ol className="list-none divide-y divide-line border-y border-line p-0">
              {AWARDS.map((entry, index) => {
                const project = entry.project ? findProject(entry.project) : undefined;

                return (
                  <Reveal as="li" key={entry.title} delay={Math.min(index * 0.05, 0.25)}>
                    <article className="grid gap-2 py-7 sm:grid-cols-[5rem_1fr] sm:gap-8">
                      <p className="font-mono text-sm font-bold text-accent-600">{entry.year}</p>
                      <div>
                        <h3 className="text-xl font-medium tracking-tight leading-tight text-ink">{entry.title}</h3>
                        <p className="mt-2 text-ink-muted">{entry.body}</p>
                        {project && (
                          <Link
                            href={`/portfolio/${project.slug}`}
                            className="mt-1 inline-flex min-h-11 items-center font-semibold text-brand-900 underline underline-offset-4"
                          >
                            {project.title}
                          </Link>
                        )}
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </Container>
      </Section>

      <Section surface="muted" background="aurora" labelledBy="awards-projects-heading">
        <Container>
          <SectionHeading
            id="awards-projects-heading"
            eyebrow="The work behind it"
            title="Recognised"
            highlight="projects"
            className="mb-16"
          />
          <ProjectList projects={awardedProjects} />
        </Container>
      </Section>

      <Section labelledBy="awards-press-heading">
        <Container>
          <SectionHeading
            id="awards-press-heading"
            eyebrow="In print"
            eyebrowIcon={Newspaper}
            title="Press and"
            highlight="features"
            className="mb-16"
          />
          <ul className="grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {PRESS.map((entry, index) => (
              <Reveal as="li" key={entry.title} delay={index * 0.06}>
                <article className="flex h-full flex-col rounded-panel border border-line bg-surface p-7 shadow-card">
                  <p className="text-eyebrow uppercase text-accent-600">
                    {entry.category} · {entry.year}
                  </p>
                  <h3 className="mt-4 grow text-xl font-medium tracking-tight leading-tight text-ink">{entry.title}</h3>
                  <p className="mt-6 border-t border-line pt-4 text-sm text-ink-subtle">{entry.body}</p>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section surface="muted" labelledBy="awards-criteria-heading">
        <Container>
          <SectionHeading
            id="awards-criteria-heading"
            eyebrow="Our own jury"
            title="What we judge"
            highlight="ourselves on"
            className="mb-16"
          />
          <BentoGrid
            items={[
              { title: "The only verdict that counts", body: "Awards are welcome. The measure we actually work to is whether a client would hand us their next project, and most of our work comes that way." },
              ...JUDGING_CRITERIA,
            ]}
          />
        </Container>
      </Section>

      <CtaBand id="awards-cta-heading" variant="brand" title="Let us make your project" highlight="the next one worth noticing" secondary={{ label: "Read client testimonials", href: "/portfolio/testimonials" }} />
    </>
  );
}
