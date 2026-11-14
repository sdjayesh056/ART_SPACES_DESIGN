import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Palette } from "lucide-react";

import { MaterialBoard } from "@/components/illustrations";
import { CtaBand } from "@/components/sections/CtaBand";
import { FeatureSplit, IllustrationFrame } from "@/components/sections/FeatureSplit";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Heading as SectionHeading } from "@/components/sections/kit";
import { PROJECTS } from "@/data/projects";
import { STYLES } from "@/data/styles";

export const metadata: Metadata = {
  title: "Interior Design Styles: Find Your Look",
  description:
    "Seven interior design styles explained with their palettes and materials, from contemporary minimal and Japandi to Indian contemporary and modern luxury.",
  alternates: { canonical: "/portfolio/styles" },
};

export default function StylesPage() {
  return (
    <>
      <PageHero
        eyebrow="Style gallery"
        eyebrowIcon={Palette}
        visual={
          <IllustrationFrame>
            <MaterialBoard />
          </IllustrationFrame>
        }
        title="Interior styles,"
        highlight="by palette and material"
        lede="Most clients arrive knowing how they want a home to feel, not what the style is called. Start from the colours and materials you are drawn to and work backwards."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: "Styles" },
        ]}
      >
        {/* The explorer's index: each style is its own palette, and each chip jumps to it. */}
        <nav aria-label="Styles">
          <ul className="flex list-none flex-wrap gap-2 p-0">
            {STYLES.map((style) => (
              <li key={style.id}>
                <a
                  href={`#style-${style.id}`}
                  className="inline-flex min-h-11 items-center gap-3 rounded-full border border-line bg-surface py-1.5 pl-2 pr-4 text-sm font-semibold text-ink shadow-sm transition-colors hover:border-brand-900"
                >
                  <span aria-hidden="true" className="flex -space-x-1.5">
                    {style.palette.slice(0, 3).map((swatch) => (
                      <span
                        key={swatch.name}
                        className="h-6 w-6 rounded-full border-2 border-surface"
                        style={{ backgroundColor: swatch.hex }}
                      />
                    ))}
                  </span>
                  {style.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <Section surface="muted" background="aurora" labelledBy="styles-list-heading">
        <Container>
          <SectionHeading
            id="styles-list-heading"
            eyebrow="Seven directions"
            title="Read the palette,"
            highlight="then the name"
            className="mb-16"
          />
          <ul className="list-none space-y-8 p-0">
            {STYLES.map((style, index) => {
              const projects = PROJECTS.filter((project) => style.projects.includes(project.slug));

              return (
                <Reveal as="li" key={style.id} delay={0.05}>
                  <article
                    id={`style-${style.id}`}
                    className="grid scroll-mt-28 overflow-clip rounded-panel border border-line bg-surface shadow-card lg:grid-cols-[1fr_1.25fr]"
                  >
                    {/* The palette as architecture: proportional bands, largest first. */}
                    <div className={`flex min-h-64 flex-col ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                      {style.palette.map((swatch, position) => (
                        <div
                          key={swatch.name}
                          className={`flex items-end justify-between px-6 py-3 ${position === 0 ? "grow-[3]" : "grow"}`}
                          style={{ backgroundColor: swatch.hex }}
                        >
                          <span className="rounded-full bg-surface/90 px-3 py-1 text-xs font-semibold text-ink">
                            {swatch.name}
                          </span>
                          <span className="rounded-full bg-surface/90 px-3 py-1 font-mono text-xs text-ink-muted">
                            {swatch.hex}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="p-8 md:p-12">
                      <p className="text-eyebrow uppercase text-accent-600">
                        {String(index + 1).padStart(2, "0")} · {style.suits}
                      </p>
                      <h3 className="mt-4 text-3xl font-medium tracking-tight leading-tight text-ink">{style.name}</h3>
                      <p className="mt-3 text-lg font-medium text-ink">{style.summary}</p>
                      <p className="mt-4 leading-relaxed text-ink-muted">{style.description}</p>

                      <h4 className="mt-8 text-eyebrow uppercase text-ink-subtle">Signature materials</h4>
                      <ul className="mt-3 flex list-none flex-wrap gap-2 p-0 text-sm">
                        {style.materials.map((material) => (
                          <li key={material} className="rounded-full border border-line bg-surface-muted px-3 py-1.5 text-ink-muted">
                            {material}
                          </li>
                        ))}
                      </ul>

                      <h4 className="mt-8 text-eyebrow uppercase text-ink-subtle">Seen in</h4>
                      <ul className="mt-2 list-none p-0">
                        {projects.map((project) => (
                          <li key={project.slug}>
                            <Link
                              href={`/portfolio/${project.slug}`}
                              className="group inline-flex min-h-11 items-center gap-2 font-semibold text-brand-900"
                            >
                              {project.title}
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </Section>

      <Section labelledBy="styles-board-heading">
        <Container>
          <FeatureSplit
            headingId="styles-board-heading"
            eyebrow="How we use this"
            title="A style is a starting point, not a rulebook"
            visual={
              <IllustrationFrame caption="Every project gets its own board">
                <MaterialBoard title="Material board with oak veneer, marble, linen, aged brass, terrazzo and paint samples" />
              </IllustrationFrame>
            }
          >
            <p>
              Real homes are rarely one style. At the first design meeting we build a physical
              material board with you — stone, timber, fabric, metal and paint, side by side in
              daylight — and the direction usually settles somewhere between two of the names
              above.
            </p>
            <p>
              <Link href="/services/residential-interior-design" className="font-semibold text-brand-900 underline underline-offset-4">
                See how material selection fits into residential interior design
              </Link>
              .
            </p>
          </FeatureSplit>
        </Container>
      </Section>

      <CtaBand id="styles-cta-heading" variant="brand" title="Not sure which style" highlight="is yours?" lede="Bring photographs of rooms you like — and ones you do not. An hour with a designer is usually enough to find the direction." />
    </>
  );
}
