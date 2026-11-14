import React from "react";
import type { LucideIcon } from "lucide-react";

type EyebrowProps = {
    children: React.ReactNode;
    icon?: LucideIcon;
    /** `inverse` for use on brand-900 and other dark surfaces. */
    tone?: "default" | "inverse";
    /**
     * `label` is the spaced-capitals section marker every route renders.
     * `badge` is the hero's own: sentence case, a touch larger, on a frosted
     * white chip. It exists as a variant rather than as markup hand-rolled
     * back into HeroSection, because hand-rolling this eight different ways is
     * exactly what this component was created to stop.
     */
    variant?: "label" | "badge";
    className?: string;
};

/**
 * The small pill above a section heading. Hand-rolled eight times across the
 * page, no two identical — different padding, radii, borders and type sizes.
 */
export function Eyebrow({
    children,
    icon: Icon,
    tone = "default",
    variant = "label",
    className = "",
}: EyebrowProps) {
    const skin =
        tone === "inverse"
            ? "bg-white/15 border-white/25 text-ink-inverse"
            : variant === "badge"
              ? "bg-surface/80 backdrop-blur-xl border-brand-900/10 text-brand-900 shadow-lg"
              : "bg-surface border-line text-ink-muted shadow-sm";

    /*
        The label variant's size, weight and tracking all come from the
        --text-eyebrow token, so `uppercase` is the only casing rule needed.
        The badge sets its own, and must NOT inherit the 0.18em tracking.
    */
    const type =
        variant === "badge"
            ? "px-5 py-2.5 text-sm font-semibold"
            : "px-4 py-2 text-eyebrow uppercase";

    /* The label variant's glyph size is unchanged — 32 routes render it. */
    const glyph = variant === "badge" ? "h-4 w-4" : "h-3.5 w-3.5";

    return (
        <span className={`inline-flex items-center gap-2 rounded-full border ${type} ${skin} ${className}`}>
            {Icon && <Icon className={`${glyph} text-accent-500`} aria-hidden="true" />}
            {children}
        </span>
    );
}
