import React from "react";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

type CtaButtonProps = {
    href: string;
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "inverse";
    size?: "md" | "lg";
    icon?: LucideIcon | null;
    className?: string;
};

const VARIANTS = {
    primary: "bg-brand-900 text-accent-on-brand hover:bg-brand-800 shadow-lg hover:shadow-xl",
    secondary: "border-2 border-brand-900 text-brand-900 bg-surface/70 hover:bg-brand-900 hover:text-accent-on-brand",
    inverse: "bg-surface text-brand-900 hover:bg-accent-500 shadow-xl hover:shadow-2xl",
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
    className = "",
}: CtaButtonProps) {
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
            {children}
            {Icon && (
                <Icon
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                />
            )}
        </Link>
    );
}
