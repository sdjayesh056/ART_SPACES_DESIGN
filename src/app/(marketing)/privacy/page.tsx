import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { STUDIO } from "@/data/studio";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How ArtSpaces Design handles the information you send through the website's enquiry and newsletter forms.",
  robots: { index: false },
};

/**
 * ⚠️ NOT A LEGAL DOCUMENT YET.
 *
 * The enquiry form's disclaimer says "you agree to our privacy policy", so
 * this page must exist and must not lie. It describes what the code actually
 * does today and says plainly that the formal policy is outstanding. Replace
 * with reviewed text before launch — noindex until then.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        eyebrowIcon={ShieldCheck}
        title="Privacy"
        highlight="policy"
        lede="What we collect, why, and who sees it."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />

      <Section labelledBy="privacy-heading">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h2 id="privacy-heading" className="sr-only">
              Privacy policy
            </h2>

            <Reveal>
              <div className="rounded-card border border-accent-300/60 bg-accent-100/40 p-6">
                <p className="font-semibold text-ink">
                  This policy is being finalised with our advisors.
                </p>
                <p className="mt-2 text-ink-muted">
                  What follows describes exactly what the website does today. It is
                  accurate, but it is not yet a formal legal document.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h3 className="mt-12 text-xl font-bold text-ink">What we collect</h3>
              <p className="mt-4 leading-relaxed text-ink-muted">
                Only what you type into a form: your name, email address, phone number,
                the service you selected and any message you write. The newsletter form
                collects an email address and nothing else. We do not run advertising
                trackers and we do not build a profile of you.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="mt-10 text-xl font-bold text-ink">Where it goes</h3>
              <p className="mt-4 leading-relaxed text-ink-muted">
                A submitted enquiry is emailed to the studio and recorded so it cannot be
                lost. It is used to reply to you and to plan the work you asked about. It
                is not sold, and it is not shared with anyone outside the studio except
                the email and storage providers that carry it.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <h3 className="mt-10 text-xl font-bold text-ink">Your choices</h3>
              <p className="mt-4 leading-relaxed text-ink-muted">
                Write to{" "}
                <a href={STUDIO.email.href} className="font-semibold text-brand-900 underline">
                  {STUDIO.email.display}
                </a>{" "}
                to ask what we hold about you, to correct it, or to have it deleted. We
                will action it and confirm when it is done.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
