import type { Metadata } from "next";

import { LegalPage } from "@/components/sections/LegalPage";
import { PRIVACY_SECTIONS } from "@/data/faq";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How ArtSpaces Design handles the information you send through the website's enquiry and newsletter forms: what is collected, why, and who sees it.",
  alternates: { canonical: "/privacy" },
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      highlight="policy"
      lede="What we collect, why, and who sees it."
      crumb="Privacy Policy"
      sections={PRIVACY_SECTIONS}
    />
  );
}
