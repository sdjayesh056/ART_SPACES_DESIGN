"use client";

import React from "react";
import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";

/**
 * Thin client shim so the root layout can stay a Server Component.
 *
 * `LazyMotion` with `domAnimation` loads roughly 18 KB of feature code instead
 * of the ~34 KB full `motion` bundle. That saving applies to every route,
 * because the navbar and footer live in the shared layout.
 *
 * `domAnimation` excludes layout and drag. Nothing here needs them: the
 * navbar's shared-layout pill is now a CSS background transition and the
 * portfolio grid's `layout` prop is gone, the fade-and-scale being enough for
 * a filter change.
 *
 * `strict` makes a stray `motion.div` throw instead of silently pulling the
 * full bundle back in — components must import `m`.
 *
 * `reducedMotion="user"` makes every animation in the tree honour the OS
 * preference; framer-motion 12 defaults to "never". CSS animations are covered
 * separately by the prefers-reduced-motion block in globals.css.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
    return (
        <LazyMotion features={domAnimation} strict>
            <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </LazyMotion>
    );
}
