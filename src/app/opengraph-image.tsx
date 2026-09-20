import { ImageResponse } from "next/og";

import { STUDIO } from "@/data/studio";
import { BRAND } from "@/lib/brand";

/**
 * Default social card for every page — Next inherits this wherever a route
 * does not declare its own `openGraph.images`. Project pages override it with
 * their own photography.
 *
 * Generated rather than a committed PNG so it follows the brand tokens and
 * cannot go stale against them. It is rendered once at build time.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${STUDIO.name} — ${STUDIO.tagline}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: `linear-gradient(135deg, ${BRAND.green900} 0%, ${BRAND.green800} 55%, ${BRAND.green500} 100%)`,
          fontFamily: "sans-serif",
        }}
      >
        {/* Dot texture, matching the CTA section */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0)",
            backgroundSize: "40px 40px",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "999px",
              background: BRAND.gold500,
              display: "flex",
            }}
          />
          <div
            style={{
              color: BRAND.gold400,
              fontSize: "24px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            {STUDIO.address.locality}, {STUDIO.address.country}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: BRAND.white,
              fontSize: "76px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              display: "flex",
            }}
          >
            {STUDIO.name}
          </div>
          <div
            style={{
              marginTop: "24px",
              color: "rgba(255,255,255,0.92)",
              fontSize: "34px",
              fontWeight: 400,
              lineHeight: 1.3,
              maxWidth: "900px",
              display: "flex",
            }}
          >
            {STUDIO.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "14px",
            color: "rgba(255,255,255,0.85)",
            fontSize: "22px",
            fontWeight: 600,
          }}
        >
          <span>Residential</span>
          <span>·</span>
          <span>Commercial</span>
          <span>·</span>
          <span>Hospitality</span>
          <span>·</span>
          <span>Retail</span>
        </div>
      </div>
    ),
    size,
  );
}
