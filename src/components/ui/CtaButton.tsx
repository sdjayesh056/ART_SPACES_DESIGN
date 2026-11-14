import React from "react";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

type CtaButtonProps = {
    href: string;
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "inverse" | "gradient";
    size?: "md" | "lg";
    icon?: LucideIcon | null;
    /**
     * Which side of the label the icon sits on. Defaults to `right`, which is
     * what every existing call site renders — the hero's "View Portfolio" is
     * the one control that leads with its glyph, because a play triangle reads
     * as "press this to watch", not as "and then".
     */
    iconPosition?: "left" | "right";
    className?: string;
};

const VARIANTS = {
    primary: "bg-brand-900 text-accent-on-brand hover:bg-brand-800 shadow-lg hover:shadow-xl",
    secondary: "border-2 border-brand-900 text-brand-900 bg-surface/70 hover:bg-brand-900 hover:text-accent-on-brand",
    inverse: "bg-surface text-brand-900 hover:bg-accent-500 shadow-xl hover:shadow-2xl",
    /*
        The hero's primary action, and the only place this is used.

        The endpoints are not a guess: the reference screenshot was sampled at
        both ends of the button and came back #016545 on the left and #00c651
        on the right, whose nearest palette entries are brand-800 (distance 27)
        and brand-500 (distance 31). The original hand-rolled version reached
        outside the palette for `from-emerald-800 to-green-500`, which the
        colour guardrail in eslint.config.mjs now blocks; these two tokens
        reproduce it inside the brand scale.

        Those sampled endpoints were then each moved one step darker
        (brand-900 → brand-700). White on brand-500 measured about 2.3:1, so
        the right-hand end of the sampled gradient failed AA for the label;
        white on brand-700 is about 5:1, and the button reads as the same
        deep-to-bright green sweep.
    */
    gradient: "bg-gradient-to-r from-brand-900 to-brand-700 text-ink-inverse shadow-xl hover:shadow-2xl",
} as const;

const SIZES = {
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
} as const;

/**
 * The page's call-to-action link.
 *
 * Ten variations of this were hand-rolled across the sections. Two of them
 * wrapped a <button> inside a <Link>, which is invalid HTML and gives keyboard
 * users two tab stops for one control — this renders a single element with a
 * single role.
 *
 * Hover and press feedback are CSS transforms rather than framer-motion
 * `whileHover`, so this needs no client boundary and can be rendered from a
 * Server Component.
 */
export function CtaButton({
    href,
    children,
    variant = "primary",
    size = "lg",
    icon: Icon = ArrowRight,
    iconPosition = "right",
    className = "",
}: CtaButtonProps) {
    /*
        Written out as two whole class strings rather than composed from a
        variable. Tailwind scans source text, so `group-hover:${dir}-1` would
        compile to nothing and the glyph would simply never move.
    */
    const glyph = Icon ? (
        <Icon
            className={`h-4 w-4 transition-transform duration-300 ${
                iconPosition === "left"
                    ? "group-hover:-translate-x-1"
                    : "group-hover:translate-x-1"
            }`}
            aria-hidden="true"
        />
    ) : null;

    return (
        <Link
            href={href}
            className={`
                group inline-flex items-center justify-center gap-2 rounded-full
                font-semibold tracking-wide transition-all duration-300
                hover:-translate-y-0.5 active:translate-y-0
                ${VARIANTS[variant]} ${SIZES[size]} ${className}
            `}
        >
            {iconPosition === "left" && glyph}
            {children}
            {iconPosition === "right" && glyph}
        </Link>
    );
}
