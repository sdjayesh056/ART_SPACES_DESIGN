"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type AnimatedCounterProps = {
    value: number;
    suffix?: string;
    /** Seconds the count-up takes. */
    duration?: number;
    className?: string;
};

/**
 * Counts up to `value` when it scrolls into view.
 *
 * Two fixes over the previous inline version: the requestAnimationFrame loop
 * is cancelled on unmount rather than left rescheduling itself, and it honours
 * prefers-reduced-motion — a raw rAF loop is invisible to MotionConfig, so the
 * global guard cannot cover it.
 */
export function AnimatedCounter({
    value,
    suffix = "",
    duration = 2,
    className = "",
}: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement | null>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const reduceMotion = useReducedMotion();
    const [count, setCount] = useState(0);

    useEffect(() => {
        // With reduced motion the final value is derived below, so there is
        // nothing for the effect to do.
        if (!inView || reduceMotion) return;

        let frame = 0;
        const start = performance.now();
        const durationMs = duration * 1000;

        const tick = (now: number) => {
            const progress = Math.min((now - start) / durationMs, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(value * eased));
            if (progress < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [inView, value, duration, reduceMotion]);

    /* Reduced motion jumps straight to the final value once it is in view. */
    const displayed = reduceMotion && inView ? value : count;

    return (
        <span ref={ref} className={`tabular-nums ${className}`}>
            {displayed}
            {suffix}
        </span>
    );
}
