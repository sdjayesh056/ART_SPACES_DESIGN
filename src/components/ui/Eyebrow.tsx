import React from "react";
import type { LucideIcon } from "lucide-react";

type EyebrowProps = {
    children: React.ReactNode;
    icon?: LucideIcon;
    /** `inverse` for use on brand-900 and other dark surfaces. */
    tone?: "default" | "inverse";
    className?: string;
};

/**
 * The small pill above a section heading. Hand-rolled eight times across the
 * page, no two identical — different padding, radii, borders and type sizes.
 */
export function Eyebrow({ children, icon: Icon, tone = "default", className = "" }: EyebrowProps) {
    const skin =
        tone === "inverse"
            ? "bg-white/15 border-white/25 text-ink-inverse"
            : "bg-surface border-line text-ink-muted shadow-sm";

    return (
        <span
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-eyebrow uppercase ${skin} ${className}`}
        >
            {Icon && <Icon className="h-3.5 w-3.5 text-accent-500" aria-hidden="true" />}
            {children}
        </span>
    );
}
