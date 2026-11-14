import type { Metadata } from "next";

import { LegalPage } from "@/components/sections/LegalPage";
import { TERMS_SECTIONS } from "@/data/faq";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms for using the ArtSpaces Design website: how its content may be used, and what an enquiry, an estimate and a proposal do and do not commit to.",
  alternates: { canonical: "/terms" },
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of"
      highlight="service"
      lede="The plain-language terms for using this website."
      crumb="Terms of Service"
      sections={TERMS_SECTIONS}
    />
  );
}
