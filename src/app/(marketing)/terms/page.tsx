import type { Metadata } from "next";
import { ScrollText } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { STUDIO } from "@/data/studio";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms covering use of the ArtSpaces Design website. Project work is governed by a separate signed agreement.",
  robots: { index: false },
};

/**
 * ⚠️ NOT A LEGAL DOCUMENT YET — same footing as /privacy. The footer links
 * here, so it must exist and must not overstate what it is. noindex until
 * reviewed text replaces this.
 */
export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        eyebrowIcon={ScrollText}
        title="Terms of"
        highlight="service"
        lede="What these pages are, and what they are not."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
      />

      <Section labelledBy="terms-heading">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h2 id="terms-heading" className="sr-only">
              Terms of service
            </h2>

            <Reveal>
              <div className="rounded-card border border-accent-300/60 bg-accent-100/40 p-6">
                <p className="font-semibold text-ink">
                  These terms are being finalised with our advisors.
                </p>
                <p className="mt-2 text-ink-muted">
                  The summary below is accurate but is not yet a formal agreement.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h3 className="mt-12 text-xl font-bold text-ink">This website</h3>
              <p className="mt-4 leading-relaxed text-ink-muted">
                These pages describe the studio&apos;s work and let you start a
                conversation. Images, drawings and written material on the site belong to{" "}
                {STUDIO.name} or to the clients who commissioned the work, and may not be
                reproduced without permission.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="mt-10 text-xl font-bold text-ink">Enquiries are not contracts</h3>
              <p className="mt-4 leading-relaxed text-ink-muted">
                Submitting a form starts a conversation. It does not commit either side to
                anything. Project work — scope, fees, timelines, liability — is governed
                by a separate agreement signed before work begins.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <h3 className="mt-10 text-xl font-bold text-ink">Accuracy</h3>
              <p className="mt-4 leading-relaxed text-ink-muted">
                We keep this site current, but figures and imagery are indicative.
                Anything you intend to rely on, ask us to confirm in writing at{" "}
                <a href={STUDIO.email.href} className="font-semibold text-brand-900 underline">
                  {STUDIO.email.display}
                </a>
                .
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
