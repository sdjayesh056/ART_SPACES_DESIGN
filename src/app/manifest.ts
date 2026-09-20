import type { MetadataRoute } from "next";

import { STUDIO } from "@/data/studio";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${STUDIO.name} — ${STUDIO.tagline}`,
    short_name: "ArtSpaces",
    description:
      "Residential, commercial, hospitality and retail interior design from a Mumbai studio.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#14532d",
    lang: "en-IN",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
