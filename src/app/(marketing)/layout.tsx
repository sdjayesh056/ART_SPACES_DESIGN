import React from "react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
