"use client";

import React from "react";
import { MotionConfig } from "framer-motion";

/**
 * Thin client shim so the root layout can stay a Server Component.
 *
 * `reducedMotion="user"` makes every framer-motion animation in the tree
 * honour the OS preference. framer-motion 12 defaults to "never", so without
 * this the setting was ignored by all 41 reveals, the marquee and every
 * infinite loop — useReducedMotion was called once, in the navbar, and used
 * only to suppress its own entrance.
 *
 * CSS animations are covered separately by the prefers-reduced-motion block
 * in globals.css.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
