import type { Metadata } from "next";
import Link from "next/link";
import { Compass } from "lucide-react";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { menuData } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Page not found",
};

/**
 * Lives at the app root rather than inside (marketing), because Next renders
 * the root not-found for unmatched paths — so this file carries the chrome
 * itself. Previously there was no not-found at all and every miss rendered
 * Next's unstyled default with no way back.
 */
export default function NotFound() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main id="main-content">
        <section className="relative overflow-hidden bg-surface-muted pb-24 pt-40">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -left-24 -top-24 h-[min(28rem,65vw)] w-[min(28rem,65vw)] rounded-full bg-brand-100/60 blur-[120px]" />
            <div className="absolute -right-24 top-10 h-[min(24rem,60vw)] w-[min(24rem,60vw)] rounded-full bg-accent-100/50 blur-[120px]" />
          </div>

          <Container className="relative z-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-eyebrow uppercase text-ink-muted shadow-sm">
                <Compass className="h-3.5 w-3.5 text-accent-500" aria-hidden="true" />
                404
              </span>

              <h1 className="mt-6 text-display font-extrabold text-balance text-ink">
                That page has <span className="brand-gradient-text">moved on</span>
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-ink-muted">
                The link you followed does not lead anywhere. Start from one of the
                sections below, or tell us what you were looking for and we will point
                you at it.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <CtaButton href="/">Back to home</CtaButton>
                <CtaButton href="/contact" variant="secondary">
                  Contact the studio
                </CtaButton>
              </div>
            </div>

            {/* Every section the navigation offers, as a recovery path. */}
            <div className="mt-20 grid gap-8 border-t border-line pt-12 md:grid-cols-3">
              {Object.entries(menuData).map(([key, section]) => (
                <nav key={key} aria-label={section.title}>
                  <h2 className="mb-6 text-xs font-black uppercase tracking-widest text-ink">
                    {section.title}
                  </h2>
                  <ul className="list-none space-y-2 p-0">
                    {section.items.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          className="inline-block py-2 text-sm font-semibold text-ink-muted transition-colors hover:text-brand-900"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
