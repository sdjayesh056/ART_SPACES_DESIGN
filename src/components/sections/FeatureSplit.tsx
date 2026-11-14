import React from "react";
import Image from "next/image";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { slideIn } from "@/lib/motion";

type FeatureSplitProps = {
    eyebrow?: string;
    title: string;
    /** Set when this heading names the surrounding <Section>. */
    headingId?: string;
    level?: "h2" | "h3";
    visual: React.ReactNode;
    /** Puts the visual on the right from lg up. */
    reverse?: boolean;
    children: React.ReactNode;
};

/**
 * Text beside a visual, deliberately off-centre: the copy column is narrower
 * than the visual so the pair reads as a composed spread, not two equal boxes.
 */
export function FeatureSplit({
    eyebrow,
    title,
    headingId,
    level: Heading = "h2",
    visual,
    reverse = false,
    children,
}: FeatureSplitProps) {
    return (
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
            <Reveal variants={slideIn(reverse ? "right" : "left")} className={reverse ? "lg:order-2" : ""}>
                {visual}
            </Reveal>
            <Reveal delay={0.1}>
                {eyebrow && <Eyebrow className="mb-6">{eyebrow}</Eyebrow>}
                <Heading
                    id={headingId}
                    className={`font-bold text-balance text-ink ${Heading === "h2" ? "text-section" : "text-3xl leading-tight"}`}
                >
                    {title}
                </Heading>
                <div className="mt-6 space-y-5 text-lg leading-relaxed text-pretty text-ink-muted">{children}</div>
            </Reveal>
        </div>
    );
}

type IllustrationFrameProps = {
    children: React.ReactNode;
    caption?: string;
    className?: string;
};

/**
 * A drawing mounted like a sheet on a board: a white card over an offset
 * tinted layer, with an optional caption tab overlapping the bottom edge.
 */
export function IllustrationFrame({ children, caption, className = "" }: IllustrationFrameProps) {
    return (
        <figure className={`relative isolate ${className}`}>
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 translate-x-3 translate-y-3 rounded-panel bg-brand-100/70 sm:translate-x-5 sm:translate-y-5"
            />
            <div className="rounded-panel border border-line bg-surface p-4 shadow-card sm:p-8">{children}</div>
            {caption && (
                <figcaption className="absolute -bottom-4 left-6 rounded-full border border-line bg-surface px-4 py-2 text-xs font-semibold text-ink-muted shadow-card">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}

type PhotoFrameProps = {
    src: string;
    alt: string;
    sizes: string;
    priority?: boolean;
    /** A complete aspect utility, e.g. "aspect-[4/3]" — reserves the space so nothing shifts. */
    aspect?: string;
    className?: string;
    children?: React.ReactNode;
};

/** A photograph in the house panel shape, with room for an overlapping card. */
export function PhotoFrame({
    src,
    alt,
    sizes,
    priority = false,
    aspect = "aspect-[4/3]",
    className = "",
    children,
}: PhotoFrameProps) {
    return (
        <div className={`relative ${className}`}>
            <div className={`relative overflow-clip rounded-panel border border-line bg-surface-sunken shadow-card ${aspect}`}>
                <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
            </div>
            {children}
        </div>
    );
}
