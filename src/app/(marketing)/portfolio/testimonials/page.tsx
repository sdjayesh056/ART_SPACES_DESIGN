import type { Metadata } from "next";
import { MessageSquare, Quote, Star } from "lucide-react";

import { StatBand } from "@/components/sections/Blocks";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TESTIMONIALS } from "@/data/testimonials";
import { accentAt } from "@/lib/accents";

export const metadata: Metadata = {
  title: "Client Testimonials and Project Reviews",
  description:
    "What homeowners, founders and developers say about working with ArtSpaces Design, the Mumbai interior design studio, from first consultation to handover.",
  alternates: { canonical: "/portfolio/testimonials" },
};

function Stars({ rating }: { rating: number }) {
  return (
    <p className="flex items-center gap-1" role="img" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: rating }).map((_, star) => (
        <Star key={star} size={16} className="fill-accent-400 text-accent-400" aria-hidden="true" />
      ))}
    </p>
  );
}

/**
 * A static list rather than the home page's marquee: on a dedicated page the
 * reader wants to read, not watch things scroll past.
 *
 * ⚠️ The quotes in src/data/testimonials.ts are still fabricated. Do NOT add
 * Review or AggregateRating structured data here until they are real and
 * consented — self-serving review markup risks a manual action.
 */
export default function TestimonialsPage() {
  const [featured, ...rest] = TESTIMONIALS;

  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        eyebrowIcon={MessageSquare}
        title="What our clients"
        highlight="say"
        lede="Homeowners, founders and developers on what it was actually like to work with the studio."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: "Testimonials" },
        ]}
      />

      <Section labelledBy="testimonials-list-heading">
        <Container>
          <h2 id="testimonials-list-heading" className="sr-only">
            Client testimonials
          </h2>

          {/* The featured quote: one voice at display scale before the chorus. */}
          <Reveal>
            <figure className="relative overflow-clip rounded-panel bg-gradient-to-br from-brand-950 via-brand-900 to-brand-700 p-8 text-ink-inverse shadow-2xl sm:p-12 lg:p-20">
              <Quote
                aria-hidden="true"
                className="absolute -right-6 -top-6 h-48 w-48 text-white/10 lg:h-72 lg:w-72"
                strokeWidth={1}
              />
              <Stars rating={featured.rating} />
              <blockquote className="relative mt-6 max-w-4xl text-2xl font-medium leading-snug text-balance sm:text-3xl lg:text-4xl">
                <p>&ldquo;{featured.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="relative mt-10 flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent-on-brand text-xl font-medium tracking-tight text-brand-950"
                >
                  {featured.author.charAt(0)}
                </span>
                <span>
                  <cite className="block text-lg font-bold not-italic">{featured.author}</cite>
                  <span className="mt-0.5 block text-sm text-ink-inverse/85">
                    {featured.role} · {featured.location}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <ul className="mt-8 list-none columns-1 gap-8 p-0 md:columns-2 lg:columns-3">
            {rest.map((testimonial, index) => (
              <Reveal as="li" key={testimonial.id} delay={Math.min(index * 0.06, 0.3)} className="mb-8 break-inside-avoid">
                <figure className="rounded-panel border border-line bg-surface p-8 shadow-card">
                  <Stars rating={testimonial.rating} />
                  <blockquote className="mt-4 text-lg leading-relaxed text-ink-muted">
                    <p>&ldquo;{testimonial.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-ink-inverse"
                      style={{ backgroundColor: accentAt(index) }}
                      aria-hidden="true"
                    >
                      {testimonial.author.charAt(0)}
                    </span>
                    <span>
                      <cite className="block text-base font-bold not-italic text-ink">{testimonial.author}</cite>
                      <span className="mt-0.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                        {testimonial.role}
                      </span>
                      <span className="mt-1 block text-xs text-ink-subtle">{testimonial.location}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <StatBand id="testimonials-stats-heading" title="The studio in numbers" />

      <CtaBand id="testimonials-cta-heading" title="Ready to start" highlight="yours?" lede="The first consultation is free and carries no obligation." />
    </>
  );
}
