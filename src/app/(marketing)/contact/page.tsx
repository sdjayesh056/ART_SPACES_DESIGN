import type { Metadata } from "next";

import { EnquiryPanel } from "@/components/sections/Blocks";
import { ContactChannels, NextSteps, StudioFacts } from "@/components/sections/Enquiry";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Contact Our Interior Design Studio",
  description:
    "Talk to the ArtSpaces Design studio in Mumbai about a residential, commercial, hospitality or retail interior project. We reply within one working day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Let's talk about"
        highlight="your space"
        lede="Tell us what you are planning — the space, roughly how large, and when you would like to start. We will come back with next steps and an honest view of scope."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <Section labelledBy="contact-heading">
        <Container size="wide">
          <h2 id="contact-heading" className="sr-only">
            Contact the studio
          </h2>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <Reveal className="order-2 space-y-6 lg:order-1">
              <ContactChannels />
              <NextSteps />
              <StudioFacts />
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
