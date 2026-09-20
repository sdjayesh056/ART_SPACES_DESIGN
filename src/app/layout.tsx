import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
  // TODO(seo): metadataBase, openGraph, twitter, canonical, sitemap.ts,
  // robots.ts and ProfessionalService JSON-LD still outstanding — the last
  // needs the real NAP, which is still a placeholder in src/data/studio.ts.
  title: {
    default: "ArtSpaces Design | Luxury Interior Design Studio in Mumbai",
    template: "%s | ArtSpaces Design",
  },
  description:
    "ArtSpaces Design is a Mumbai-based interior and architectural design studio creating residential, commercial, hospitality and retail spaces across India. Book a free consultation.",
};

/**
 * Root layout owns only the document and app-wide providers. The site chrome
 * (navbar, main, footer) belongs to the (marketing) route group, so a future
 * route outside it — an auth or admin screen — can opt out of it entirely.
 */
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
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
