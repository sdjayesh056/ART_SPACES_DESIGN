import React from "react";

import { AuroraBackground } from "./AuroraBackground";

type SectionProps = {
    children: React.ReactNode;
    id?: string;
    /** Points aria-labelledby at the section's own heading id. */
    labelledBy?: string;
    className?: string;
    surface?: "default" | "muted" | "brand";
    /** Decorative mesh-grid and soft gradient wash. */
    background?: "none" | "aurora";
    tone?: "brand" | "accent";
};

const SURFACES: Record<NonNullable<SectionProps["surface"]>, string> = {
    default: "bg-surface",
    muted: "bg-surface-muted",
    brand: "bg-brand-900 text-ink-inverse",
};

/**
 * Vertical rhythm, surface and landmark semantics for a page section.
 *
 * Sections previously each invented their own padding (py-24, py-24 lg:py-32,
 * py-24 md:py-32) and five of six were unnamed <section> elements, so they
 * were not landmarks at all. Passing `labelledBy` names the region for
 * assistive tech using the heading it already renders.
 */
export function Section({
    children,
    id,
    labelledBy,
    className = "",
    surface = "default",
    background = "none",
    tone = "brand",
}: SectionProps) {
    return (
        <section
            id={id}
            aria-labelledby={labelledBy}
            className={`relative overflow-hidden py-20 md:py-28 ${SURFACES[surface]} ${className}`}
        >
            {background === "aurora" && <AuroraBackground tone={tone} />}
            <div className="relative z-10">{children}</div>
        </section>
    );
}
