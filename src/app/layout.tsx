import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { STUDIO } from "@/data/studio";
import { BRAND } from "@/lib/brand";
import { SITE_URL } from "@/lib/seo";

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

const DESCRIPTION =
  "ArtSpaces Design is a Mumbai-based interior and architectural design studio creating residential, commercial, hospitality and retail spaces across India. Book a free consultation.";

export const metadata: Metadata = {
  // Makes every relative canonical, OG and icon URL in the tree absolute.
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${STUDIO.name} | Luxury Interior Design Studio in Mumbai`,
    // Every route below only sets its own `title`; this appends the brand.
    template: `%s | ${STUDIO.name}`,
  },
  description: DESCRIPTION,

  alternates: { canonical: "/" },

  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: STUDIO.name,
    url: "/",
    title: `${STUDIO.name} | Luxury Interior Design Studio in Mumbai`,
    description: DESCRIPTION,
    // Images come from src/app/opengraph-image.tsx unless a route overrides them.
  },

  twitter: {
    card: "summary_large_image",
    title: `${STUDIO.name} | Luxury Interior Design Studio in Mumbai`,
    description: DESCRIPTION,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },

  // TODO: ProfessionalService / LocalBusiness JSON-LD is deliberately NOT
  // emitted — see the note in src/lib/seo.ts. It needs a real street address,
  // postal code, geo and phone, all still placeholders in src/data/studio.ts.
};

export const viewport: Viewport = {
  themeColor: BRAND.green900,
  colorScheme: "light",
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
