import React from "react";
import type { LucideIcon } from "lucide-react";

import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
    /** Must match the `labelledBy` passed to the surrounding <Section>. */
    id: string;
    eyebrow?: string;
    eyebrowIcon?: LucideIcon;
    title: React.ReactNode;
    /** Rendered in the brand gradient, after the title. */
    highlight?: string;
    lede?: string;
    align?: "center" | "left";
    tone?: "default" | "inverse";
    className?: string;
};

/**
 * Eyebrow + h2 + lede, at one type scale.
 *
 * Every section built this block by hand at a different heading size
 * (text-4xl, text-3xl md:text-5xl, text-4xl sm:text-5xl md:text-6xl) with a
 * different eyebrow treatment. The h2 now uses the `text-section` token, which
 * is fluid, so it needs no responsive step at the call site.
 */
export function SectionHeading({
    id,
    eyebrow,
    eyebrowIcon,
    title,
    highlight,
    lede,
    align = "center",
    tone = "default",
    className = "",
}: SectionHeadingProps) {
    const alignment = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";
    const ledeTone = tone === "inverse" ? "text-ink-inverse/85" : "text-ink-muted";
    const titleTone = tone === "inverse" ? "text-ink-inverse" : "text-ink";

    return (
        <div className={`flex flex-col ${alignment} max-w-3xl ${className}`}>
            {eyebrow && (
                <Reveal className="mb-6">
                    <Eyebrow icon={eyebrowIcon} tone={tone}>
                        {eyebrow}
                    </Eyebrow>
                </Reveal>
            )}

            <Reveal delay={0.05}>
                <h2 id={id} className={`text-section font-bold text-balance ${titleTone}`}>
                    {title}
                    {highlight && <> <span className="brand-gradient-text">{highlight}</span></>}
                </h2>
            </Reveal>

            {lede && (
                <Reveal delay={0.1}>
                    <p className={`mt-6 text-lg leading-relaxed text-pretty ${ledeTone}`}>{lede}</p>
                </Reveal>
            )}
        </div>
    );
}
