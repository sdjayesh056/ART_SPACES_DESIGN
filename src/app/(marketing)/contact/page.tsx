import type { Metadata } from "next";
import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";

import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { STUDIO } from "@/data/studio";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the ArtSpaces Design studio in Mumbai about a residential, commercial, hospitality or retail interior project. Free consultation, reply within 24 hours.",
};

const CHANNELS = [
  {
    icon: Phone,
    label: "Call the studio",
    value: STUDIO.phone.display,
    href: STUDIO.phone.href,
    note: "Mon–Sat, 10am–7pm IST",
  },
  {
    icon: Mail,
    label: "Email us",
    value: STUDIO.email.display,
    href: STUDIO.email.href,
    note: "We reply within one working day",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        eyebrowIcon={MessageSquare}
        title="Let's talk about"
        highlight="your space"
        lede="Tell us what you are planning — the space, roughly how large, and when you would like to start. We will come back within 24 hours with next steps and an honest view of scope."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <Section labelledBy="contact-heading">
        <Container>
          <h2 id="contact-heading" className="sr-only">
            Contact the studio
          </h2>

          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            {/* Direct channels */}
            <Reveal>
              <ul className="list-none space-y-6 p-0">
                {CHANNELS.map((channel) => (
                  <li key={channel.label}>
                    <a
                      href={channel.href}
                      className="group flex items-start gap-4 rounded-card border border-line bg-surface p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-900 hover:shadow-card-hover"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-tile bg-brand-50 text-brand-900">
                        <channel.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-xs font-bold uppercase tracking-wider text-ink-subtle">
                          {channel.label}
                        </span>
                        <span className="mt-1 block text-lg font-semibold text-ink group-hover:text-brand-900">
                          {channel.value}
                        </span>
                        <span className="mt-1 block text-sm text-ink-subtle">{channel.note}</span>
                      </span>
                    </a>
                  </li>
                ))}

                <li className="flex items-start gap-4 rounded-card border border-line bg-surface p-6 shadow-card">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-tile bg-brand-50 text-brand-900">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wider text-ink-subtle">
                      Studio
                    </span>
                    <address className="mt-1 not-italic text-lg font-semibold text-ink">
                      {STUDIO.address.locality}, {STUDIO.address.region}
                      <br />
                      {STUDIO.address.country}
                    </address>
                    <span className="mt-1 block text-sm text-ink-subtle">
                      Serving {STUDIO.servedCities.slice(0, 4).join(", ")} and beyond
                    </span>
                  </span>
                </li>
              </ul>
            </Reveal>

            {/* The enquiry form, on the brand surface it was designed for. */}
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
