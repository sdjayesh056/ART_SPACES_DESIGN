"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

import { fadeUp, VIEWPORT } from "@/lib/motion";

type RevealProps = {
    children: React.ReactNode;
    /** Seconds to wait before this element animates. */
    delay?: number;
    /** Override the default rise-and-fade. */
    variants?: Variants;
    className?: string;
    as?: "div" | "section" | "article" | "li" | "span";
};

/**
 * The one client leaf for scroll reveals.
 *
 * Its whole purpose is to let the sections around it stay Server Components:
 * a section renders its static content on the server and wraps only the parts
 * that animate in a <Reveal>. Previously every section carried "use client"
 * solely to run whileInView, which shipped all of their content as hydration
 * JavaScript.
 *
 * Reduced motion is handled globally by MotionConfig reducedMotion="user" in
 * the root layout — there is no per-component check to forget.
 */
export function Reveal({
    children,
    delay = 0,
    variants,
    className,
    as = "div",
}: RevealProps) {
    const MotionTag = motion[as];

    return (
        <MotionTag
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={variants ?? fadeUp(delay)}
            className={className}
        >
            {children}
        </MotionTag>
    );
}
