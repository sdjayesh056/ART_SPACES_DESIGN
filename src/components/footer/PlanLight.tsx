"use client";

import React, { useRef, useState } from "react";
import { useInView } from "framer-motion";

type PlanLightProps = {
    /** The room whose light comes on when the plan first scrolls into view. */
    initial: string;
    className?: string;
    children: React.ReactNode;
};

/**
 * The footer's one client leaf: it decides which room of the site plan is lit.
 *
 * Pointing at a room, or at its list in the schedule, lights both; so does
 * moving keyboard focus into the list. The last room chosen stays lit, so the
 * drawing never falls dark while the pointer crosses a wall. Everything
 * inside stays server-rendered — this only writes the room's name to
 * data-lit, and the rule in globals.css does the rest.
 *
 * Until the plan is on screen no room is lit, so the first light comes on as
 * the visitor arrives rather than before they could see it. "On screen" is
 * the block's top edge rising past the lower 40% of the viewport — a margin
 * rather than a share of the block, which is taller than a short viewport and
 * would never show enough of itself to count.
 */
export function PlanLight({ initial, className = "", children }: PlanLightProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "0px 0px -40% 0px" });
    const [chosen, setChosen] = useState<string | null>(null);

    const light = (event: React.SyntheticEvent) => {
        const room = (event.target as Element).closest("[data-room]")?.getAttribute("data-room");
        if (room) setChosen(room);
    };

    return (
        <div ref={ref} data-lit={chosen ?? (inView ? initial : undefined)} onPointerOver={light} onFocus={light} className={`site-plan ${className}`}>
            {children}
        </div>
    );
}
