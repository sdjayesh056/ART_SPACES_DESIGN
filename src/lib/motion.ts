import type { Variants } from "framer-motion";

/**
 * Shared motion vocabulary.
 *
 * The sections previously carried 41 inline initial/whileInView/transition
 * objects between them, using seven different y-offsets, seven durations and
 * two unnamed easing curves — with three reveals omitting `transition`
 * entirely, so they ran as springs while their visual siblings ran as tweens.
 *
 * Every animation in the app should come from here. Anything that needs a
 * one-off is a sign this module is missing a variant.
 */

export const EASE = {
    /** The house curve. Used for entrances and panel transitions. */
    brand: [0.22, 1, 0.36, 1],
    /** Sharper settle, for counters and cards. */
    outExpo: [0.16, 1, 0.3, 1],
} as const;

export const DURATION = {
    fast: 0.3,
    base: 0.6,
    slow: 0.8,
} as const;

/** Standard scroll-reveal viewport. Reveals fire once, slightly before entry. */
export const VIEWPORT = { once: true, margin: "-80px" } as const;

/** Rise and fade. The default reveal for almost everything. */
export function fadeUp(delay = 0, distance = 24): Variants {
    return {
        hidden: { opacity: 0, y: distance },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: DURATION.base, delay, ease: EASE.brand },
        },
    };
}

/** Fade with no movement, for backgrounds and overlays. */
export function fadeIn(delay = 0): Variants {
    return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: DURATION.base, delay, ease: EASE.brand } },
    };
}

/** Enter horizontally. Used by the two-column CTA and lead sections. */
export function slideIn(from: "left" | "right", delay = 0, distance = 40): Variants {
    return {
        hidden: { opacity: 0, x: from === "left" ? -distance : distance },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: DURATION.slow, delay, ease: EASE.brand },
        },
    };
}

/** Settle in from slightly small. For cards and badges. */
export function scaleIn(delay = 0): Variants {
    return {
        hidden: { opacity: 0, scale: 0.94 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: DURATION.base, delay, ease: EASE.outExpo },
        },
    };
}

/** Parent that staggers its children. Pair with `staggerItem`. */
export function staggerContainer(stagger = 0.08, delayChildren = 0): Variants {
    return {
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren } },
    };
}

export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE.brand } },
};
