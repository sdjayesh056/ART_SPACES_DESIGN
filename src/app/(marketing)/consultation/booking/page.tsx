import type { Metadata } from "next";
import Link from "next/link";

import { AsideCard, EnquiryPanel } from "@/components/sections/Blocks";
import { NextSteps, StudioFacts } from "@/components/sections/Enquiry";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { BOOKING_FAQS } from "@/data/faq";

export const metadata: Metadata = {
  title: "Book a Free Interior Design Consultation",
  description:
    "Book a free 45-minute interior design consultation with ArtSpaces Design, Mumbai. Tell us about your space and a designer replies within one working day.",
  alternates: { canonical: "/consultation/booking" },
};

export default function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Booking"
        title="Book a free"
        highlight="consultation"
        lede="No cost, no obligation. Tell us what you are planning and a designer will reply within one working day."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Consultation", href: "/consultation" },
          { label: "Booking" },
        ]}
      />

      <Section labelledBy="booking-heading">
        <Container size="wide">
          <h2 id="booking-heading" className="sr-only">
            Consultation request
          </h2>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <Reveal className="order-2 space-y-6 lg:order-1">
              <NextSteps />
              <StudioFacts />
              <AsideCard title="Before you ask">
                <FaqAccordion items={BOOKING_FAQS} level="h4" />
                <Link href="/faq" className="mt-4 inline-flex min-h-11 items-center font-semibold text-brand-900 underline underline-offset-4">
                  Read all frequently asked questions
                </Link>
              </AsideCard>
            </Reveal>
            <div className="order-1 lg:sticky lg:top-28 lg:order-2 lg:self-start">
              <EnquiryPanel />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
