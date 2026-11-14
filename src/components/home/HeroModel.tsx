"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Move3d } from "lucide-react";

import { buildRoom } from "@/components/illustrations/room-kit";
import { type Cam, Stage3D } from "@/components/illustrations/Stage3D";
import { FABRICS, FLOORS, PAINTS, STYLES } from "@/data/room-designer";

const QUARTER = Math.PI / 2;
/** The three drawings a project goes through, in the order the sheet cycles them. */
const VIEWS = ["Plan", "Model", "Evening"] as const;
const FINISH = { wall: PAINTS[0].wall, wallShade: PAINTS[0].shade, floor: FLOORS[0].base, floorLine: FLOORS[0].line, floorKind: FLOORS[0].kind };
const SCENE = buildRoom("living", { fabric: FABRICS[0].tone, timber: STYLES[0].timber, green: 1 });

/**
 * The drawing sheet pinned to the home hero: one living room that moves by
 * itself from measured plan to 3D model to evening lighting study, and can be
 * turned by dragging. It is the studio's method in a single object, and the
 * way in to the design studio. Desktop only — on a phone the hero is the
 * photograph and the headline.
 */
export function HeroModel() {
    /* Opens as the finished model, so the first paint is the room itself. */
    const [view, setView] = useState(1);
    const [cycling, setCycling] = useState(true);
    const [cam, setCam] = useState<Cam>({ yaw: 0, tilt: 0, lift: 1 });

    const stage = useRef<HTMLDivElement>(null);
    const camRef = useRef(cam);
    const motion = useRef({ yaw: 0, sway: true, time: 0 });
    const drag = useRef<{ x: number; yaw: number } | null>(null);
    const inView = useInView(stage, { margin: "80px" });
    const reduced = useReducedMotion() ?? false;

    useEffect(() => {
        if (!inView || reduced || !cycling) return;
        const timer = window.setInterval(() => setView((current) => (current + 1) % VIEWS.length), 4200);
        return () => window.clearInterval(timer);
    }, [inView, reduced, cycling]);

    /* Eases the camera toward the current view. Runs only while the sheet is on screen. */
    useEffect(() => {
        if (!inView) return;

        let frame = 0;
        let last = performance.now();
        const tick = (now: number) => {
            const dt = Math.min(now - last, 64) / 1000;
            last = now;

            const target = motion.current;
            const ease = reduced ? 1 : 1 - Math.exp(-dt * 4.5);
            const plan = view === 0;
            const swaying = target.sway && !reduced && !plan;
            if (swaying) target.time += dt * 0.45;

            const from = camRef.current;
            /* A plan sits square to the sheet; the model sways about the corner it was left at. */
            const yaw = plan ? Math.round(target.yaw / QUARTER) * QUARTER - QUARTER / 2 : target.yaw + (swaying ? Math.sin(target.time) * 0.34 : 0);
            const to = {
                yaw: drag.current ? from.yaw : from.yaw + (yaw - from.yaw) * ease,
                tilt: from.tilt + ((plan ? 1 : 0) - from.tilt) * ease,
                lift: 1,
            };

            if (Math.abs(to.yaw - from.yaw) + Math.abs(to.tilt - from.tilt) > 0.0004) {
                camRef.current = to;
                setCam(to);
            }
            frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [inView, reduced, view]);

    const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
        if (event.pointerType === "mouse" && event.button !== 0) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        drag.current = { x: event.clientX, yaw: camRef.current.yaw };
        motion.current.sway = false;
    };
    const moveDrag = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!drag.current) return;
        const yaw = drag.current.yaw - (event.clientX - drag.current.x) * 0.009;
        motion.current.yaw = yaw;
        camRef.current = { ...camRef.current, yaw };
        setCam(camRef.current);
    };
    const endDrag = () => {
        drag.current = null;
    };

    const dusk = view === 2 ? 0.9 : 0;

    return (
        <figure className="hidden overflow-clip rounded-card border border-white/20 bg-surface text-ink shadow-2xl lg:block">
            <div className="flex items-center justify-between gap-3 border-b border-line pl-4 pr-1">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-muted">Sheet A-01 · Live model</p>
                <div role="group" aria-label="Choose how the model is drawn" className="flex">
                    {VIEWS.map((label, index) => (
                        <button
                            key={label}
                            type="button"
                            aria-pressed={index === view}
                            onClick={() => {
                                setView(index);
                                setCycling(false);
                            }}
                            className={`min-h-11 px-3 text-xs font-semibold underline-offset-8 transition-colors ${
                                index === view ? "text-brand-900 underline decoration-accent-500 decoration-2" : "text-ink-subtle hover:text-ink"
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <div
                ref={stage}
                onPointerDown={startDrag}
                onPointerMove={moveDrag}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                className="relative cursor-grab touch-pan-y select-none bg-surface-sunken active:cursor-grabbing [&_svg[role=img]]:max-h-[38svh]"
            >
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,var(--color-brand-800),var(--color-brand-950)_75%)] transition-opacity duration-500"
                    style={{ opacity: dusk }}
                />
                <Stage3D scene={SCENE} finish={FINISH} cam={cam} wire={false} dusk={dusk} still={reduced} title={`${SCENE.title}, drawn as ${VIEWS[view].toLowerCase()}`} />
            </div>

            <figcaption className="flex items-center justify-between gap-3 border-t border-line px-4">
                <span className="flex items-center gap-2 text-xs text-ink-muted">
                    <Move3d className="h-4 w-4 text-brand-800" aria-hidden="true" />
                    Drag to turn it
                </span>
                <Link href="/consultation/virtual-tours" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-900 underline underline-offset-4">
                    Design your own room
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
            </figcaption>
        </figure>
    );
}
