import React from "react";

import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

/**
 * Site chrome for every public marketing page.
 *
 * Owns the banner landmark, the skip link and <main>, so no page has to repeat
 * them — and so a route outside this group can render without them.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Site-wide entities. Page-level BreadcrumbList is emitted by PageHero. */}
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={organizationJsonLd()} />

      {/* First focusable element, so keyboard users can skip the navbar. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-900 focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-accent-on-brand"
      >
        Skip to main content
      </a>

      <header>
        <Navbar />
      </header>

      <main id="main-content">{children}</main>

      <Footer />
    </>
  );
}
