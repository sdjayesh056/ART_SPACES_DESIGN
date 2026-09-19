import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/providers/MotionProvider";

/*
  `subsets` is required for next/font to emit the preload link — without it
  both faces were fetched but never preloaded. `display: "swap"` keeps text
  visible while they load.
*/
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // TODO(phase-5): full SEO pass — metadataBase, openGraph, twitter,
  // canonical, sitemap.ts, robots.ts and ProfessionalService JSON-LD.
  // The previous copy here was unreplaced scaffold from the project's
  // art-marketplace origin and described a different product entirely.
  title: {
    default: "ArtSpaces Design | Luxury Interior Design Studio in Mumbai",
    template: "%s | ArtSpaces Design",
  },
  description:
    "ArtSpaces Design is a Mumbai-based interior and architectural design studio creating residential, commercial, hospitality and retail spaces across India. Book a free consultation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MotionProvider>
          {/* First focusable element, so keyboard users can skip the navbar. */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-900 focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-accent-on-brand"
          >
            Skip to main content
          </a>

          {/* The nav had no <header>, so the document carried no banner landmark. */}
          <header>
            <Navbar />
          </header>

          <main id="main-content">{children}</main>

          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
