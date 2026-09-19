/**
 * Per-item accent rotation.
 *
 * Card lists previously carried a hardcoded hex per item, drawn from unrelated
 * palettes (pink, violet, fuchsia, cyan, teal, orange) — twenty-eight values
 * across three sections, none of them the brand's. The result read as several
 * stitched-together templates rather than one studio.
 *
 * These are token references rather than literals, so the rotation follows the
 * brand automatically if the palette is ever retuned. Referenced from inline
 * `style` because the index is dynamic and Tailwind cannot compile a class
 * name built at runtime.
 */
export const ACCENT_ROTATION = [
    "var(--color-brand-900)",
    "var(--color-brand-500)",
    "var(--color-accent-500)",
    "var(--color-brand-700)",
] as const;

/** The accent for an item at `index`, cycling through the rotation. */
export function accentAt(index: number): string {
    return ACCENT_ROTATION[index % ACCENT_ROTATION.length];
}
