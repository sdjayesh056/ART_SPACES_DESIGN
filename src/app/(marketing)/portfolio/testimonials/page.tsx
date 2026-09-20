import type { Metadata } from "next";
import { MessageSquare, Star } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TESTIMONIALS } from "@/data/testimonials";
import { accentAt } from "@/lib/accents";

export const metadata: Metadata = {
  alternates: { canonical: "/portfolio/testimonials" },
  title: "Client Testimonials",
  description:
    "What homeowners, founders and developers say about working with ArtSpaces Design on their interiors.",
};

/**
 * A static list rather than the home page's marquee: on a dedicated page the
 * reader wants to read, not watch things scroll past.
 *
 * ⚠️ The quotes in src/data/testimonials.ts are still fabricated. Do NOT add
 * Review or AggregateRating structured data here until they are real and
 * consented — self-serving review markup risks a manual action.
 */
export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
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

      <Section surface="muted" background="aurora" labelledBy="testimonials-list-heading">
        <Container>
          <h2 id="testimonials-list-heading" className="sr-only">
            Client testimonials
          </h2>

          <ul className="grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-2">
            {TESTIMONIALS.map((testimonial, index) => (
              <Reveal as="li" key={testimonial.id} delay={index * 0.06}>
                <article className="flex h-full flex-col rounded-panel border border-line bg-surface p-8 shadow-card">
                  <p
                    className="mb-4 flex items-center gap-1"
                    role="img"
                    aria-label={`Rated ${testimonial.rating} out of 5`}
                  >
                    {Array.from({ length: testimonial.rating }).map((_, star) => (
                      <Star
                        key={star}
                        size={16}
                        className="fill-accent-400 text-accent-400"
                        aria-hidden="true"
                      />
                    ))}
                  </p>

                  <blockquote className="grow text-lg font-medium italic leading-relaxed text-ink-muted">
                    <p>&ldquo;{testimonial.quote}&rdquo;</p>
                  </blockquote>

                  <footer className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-ink-inverse"
                      style={{ backgroundColor: accentAt(index) }}
                      aria-hidden="true"
                    >
                      {testimonial.author.charAt(0)}
                    </span>
                    <span>
                      <cite className="block text-base font-bold not-italic text-ink">
                        {testimonial.author}
                      </cite>
                      <span className="mt-0.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                        {testimonial.role}
                      </span>
                      <span className="mt-1 block text-xs text-ink-subtle">
                        {testimonial.location}
                      </span>
                    </span>
                  </footer>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section labelledBy="testimonials-cta-heading">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="testimonials-cta-heading"
              className="text-section font-bold text-balance text-ink"
            >
              Ready to start yours?
            </h2>
            <p className="mt-6 text-lg text-ink-muted">
              The first consultation is free and carries no obligation.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <CtaButton href="/consultation/booking">Book a consultation</CtaButton>
              <CtaButton href="/portfolio" variant="secondary">
                See the work
              </CtaButton>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
