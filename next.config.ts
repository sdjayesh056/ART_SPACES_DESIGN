import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Absolute, otherwise Next warns on every build and resolves it itself.
  turbopack: {
    root: path.resolve(__dirname),
  },

  images: {
    // AVIF first, WebP as the fallback. The source art is oversized PNG; the
    // optimizer is what keeps delivered bytes sane until the assets are
    // re-exported (see the image task in the project README).
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31_536_000,
    // The mega menu renders these as CSS backgrounds today, so no config is
    // strictly required — declared so that moving them to next/image later
    // does not fail at runtime.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },

  async redirects() {
    return [
      // Earlier drafts linked these; keep them resolving rather than 404ing.
      { source: "/projects", destination: "/portfolio", permanent: true },
      { source: "/portfolio/recent", destination: "/portfolio", permanent: true },
      { source: "/signup", destination: "/consultation/booking", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
