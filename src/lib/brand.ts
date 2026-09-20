/**
 * Brand colours as literal values, for the few places that cannot reach a CSS
 * custom property:
 *
 * - `viewport.themeColor` — a browser API, not a stylesheet.
 * - `opengraph-image.tsx` — Satori renders the card without a browser and does
 *   not resolve `var(--color-*)`.
 *
 * ⚠️ These duplicate the `@theme` block in src/app/globals.css, which is the
 * real source of truth. If the palette is retuned there, update these too —
 * nothing enforces it. Keep the list as short as possible for that reason;
 * anything that CAN use a utility class should.
 */
export const BRAND = {
    green900: "#14532d",
    green800: "#166534",
    green500: "#22c55e",
    gold500: "#e29d08",
    gold400: "#fbbf24",
    white: "#ffffff",
} as const;
