import React from "react";

type AuroraBackgroundProps = {
    tone?: "brand" | "accent";
};

/**
 * Decorative mesh grid plus two soft colour washes.
 *
 * Deliberately static. The seven hand-rolled versions of this layer animated
 * scale and rotate on 500-800px elements sitting under `filter: blur(64px)` —
 * the single most expensive thing that can be asked of a compositor, running
 * forever, with no viewport gating and no reduced-motion guard. At this blur
 * radius the motion is barely perceptible anyway.
 *
 * No "use client": this is pure markup, so it renders on the server.
 */
export function AuroraBackground({ tone = "brand" }: AuroraBackgroundProps) {
    const washes =
        tone === "accent"
            ? ["bg-accent-100/50", "bg-brand-100/40"]
            : ["bg-brand-100/50", "bg-accent-100/40"];

    return (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage:
                        "linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
                    backgroundSize: "36px 36px",
                    maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
                }}
            />
            {/*
                Constrained with max-w/max-h so these cannot exceed the
                viewport — the previous fixed 500-800px blobs at negative
                offsets were the reason body needs overflow-x: hidden.
            */}
            <div
                className={`absolute -top-24 -left-24 h-[min(34rem,70vw)] w-[min(34rem,70vw)] rounded-full blur-[120px] ${washes[0]}`}
            />
            <div
                className={`absolute -bottom-24 -right-24 h-[min(30rem,65vw)] w-[min(30rem,65vw)] rounded-full blur-[120px] ${washes[1]}`}
            />
        </div>
    );
}
