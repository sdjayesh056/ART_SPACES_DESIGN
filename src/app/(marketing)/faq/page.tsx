import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqAccordion, faqJsonLd } from "@/components/sections/FaqAccordion";
import { KICKER } from "@/components/sections/kit";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ALL_FAQS, FAQ_GROUPS } from "@/data/faq";

export const metadata: Metadata = {
  title: "Interior Design FAQs: Cost, Time, Process",
  description:
    "Answers to common interior design questions: consultation, fees and budgets, timelines, site execution and warranties, from ArtSpaces Design in Mumbai.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      {/* One FAQPage block for the whole page; the accordions below emit none. */}
      <JsonLd data={faqJsonLd(ALL_FAQS)} />

      <PageHero
        eyebrow="FAQ"
        title="Questions,"
        highlight="answered plainly"
        lede={`${ALL_FAQS.length} things clients ask before, during and after a project. If yours is not here, ask us directly.`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />

      <Section labelledBy="faq-topics-heading">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-20">
            <nav aria-labelledby="faq-topics-heading" className="lg:sticky lg:top-28 lg:self-start">
              <p id="faq-topics-heading" className={`${KICKER} text-accent-600`}>
                Topics
              </p>
              <ol className="mt-4 list-none space-y-1 p-0">
                {FAQ_GROUPS.map((group, index) => (
                  <li key={group.id}>
                    <a
                      href={`#${group.id}`}
                      className="flex min-h-11 items-center gap-3 rounded-tile px-2 font-medium text-ink-muted transition-colors hover:bg-brand-50 hover:text-brand-900"
                    >
                      <span className="font-mono text-xs text-accent-600">{String(index + 1).padStart(2, "0")}</span>
                      {group.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="space-y-16">
              {FAQ_GROUPS.map((group) => (
                <section key={group.id} id={group.id} aria-labelledby={`${group.id}-heading`} className="scroll-mt-28">
                  <h2 id={`${group.id}-heading`} className="mb-6 text-3xl font-medium tracking-tight text-ink md:text-4xl">
                    {group.title}
                  </h2>
                  <FaqAccordion items={group.items} jsonLd={false} />
                </section>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        id="faq-cta-heading"
        variant="brand"
        title="Still have"
        highlight="a question?"
        lede="Ask it at a free consultation. Forty-five minutes with a designer usually answers the ones a page cannot."
        secondary={{ label: "Contact the studio", href: "/contact" }}
      />
    </>
  );
}
