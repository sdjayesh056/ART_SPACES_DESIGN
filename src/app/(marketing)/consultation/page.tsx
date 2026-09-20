import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardList } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { menuData } from "@/data/navigation";
import { accentAt } from "@/lib/accents";

export const metadata: Metadata = {
  alternates: { canonical: "/consultation" },
  title: "Consultation",
  description:
    "How working with ArtSpaces Design starts: our process, virtual walkthroughs, booking a free consultation, and the team you will work with.",
};

export default function ConsultationPage() {
  return (
    <>
      <PageHero
        eyebrow="Consultation"
        eyebrowIcon={ClipboardList}
        title="How working with us"
        highlight="starts"
        lede="Every project begins the same way: a conversation about the space, the timeline and a realistic budget — before anything is drawn."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Consultation" }]}
      />

      <Section surface="muted" background="aurora" labelledBy="consultation-heading">
        <Container>
          <SectionHeading
            id="consultation-heading"
            eyebrow="Before you commit"
            title="What to expect from"
            highlight="the first meeting"
            className="mb-16"
          />

          <ul className="grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-2">
            {menuData.consultation.items.map((item, index) => (
              <Reveal as="li" key={item.id} delay={index * 0.08}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col rounded-panel border border-line bg-surface p-8 shadow-card transition-all hover:-translate-y-1 hover:border-brand-900 hover:shadow-card-hover"
                >
                  <span
                    className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-tile border"
                    style={{
                      color: accentAt(index),
                      backgroundColor: `color-mix(in srgb, ${accentAt(index)} 8%, transparent)`,
                      borderColor: `color-mix(in srgb, ${accentAt(index)} 20%, transparent)`,
                    }}
                  >
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mb-3 text-2xl font-bold text-ink">{item.title}</h3>
                  <p className="mb-6 grow text-ink-muted">{item.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-900">
                    Explore
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section labelledBy="consultation-cta-heading">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="consultation-cta-heading" className="text-section font-bold text-balance text-ink">
              Ready when you are
            </h2>
            <p className="mt-6 text-lg text-ink-muted">The first consultation is free and carries no obligation.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <CtaButton href="/consultation/booking">Book a consultation</CtaButton>
              <CtaButton href="/contact" variant="secondary">Contact the studio</CtaButton>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
