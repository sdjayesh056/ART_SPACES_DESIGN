import type { Metadata } from "next";
import { Calendar, CheckCircle } from "lucide-react";

import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Book a Free Consultation",
  description:
    "Book a free interior design consultation with ArtSpaces Design, Mumbai. Tell us about your space and we will reply within 24 hours.",
};

const WHAT_HAPPENS = [
  "We read your brief and come back within one working day",
  "A 45-minute call or studio visit, at no cost",
  "An honest view of scope, timeline and budget range",
  "A written proposal only if it is a good fit both ways",
];

export default function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Booking"
        eyebrowIcon={Calendar}
        title="Book a free"
        highlight="consultation"
        lede="No cost, no obligation. Tell us what you are planning and we will come back within 24 hours."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Consultation", href: "/consultation" },
          { label: "Booking" },
        ]}
      />

      <Section labelledBy="booking-heading">
        <Container>
          <h2 id="booking-heading" className="sr-only">
            Consultation request
          </h2>

          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <Reveal>
              <h3 className="text-2xl font-bold text-ink">What happens next</h3>
              <ul className="mt-8 list-none space-y-5 p-0">
                {WHAT_HAPPENS.map((step) => (
                  <li key={step} className="flex items-start gap-3 text-ink-muted">
                    <span className="mt-0.5 rounded-full bg-brand-50 p-1 text-brand-900">
                      <CheckCircle size={16} aria-hidden="true" />
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <div
                id="lead-form"
                className="rounded-panel bg-gradient-to-br from-brand-900 via-brand-800 to-brand-500 p-8 shadow-2xl md:p-10"
              >
                <LeadCaptureForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
