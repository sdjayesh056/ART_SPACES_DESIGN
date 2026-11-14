"use client";

import React, { useState } from "react";
import { MoveHorizontal } from "lucide-react";

import { RoomScene, SCENE_LABELS, type SceneVariant } from "@/components/illustrations/boards";
import { Sheet } from "@/components/illustrations/frame";

type CompareSliderProps = {
    /** Which interior to show — match it to the page: a home, a workplace, a suite or a store. */
    scene?: SceneVariant;
    /** Adds a row of buttons so the visitor can change the interior themselves. */
    switchable?: boolean;
};

const SCENES = Object.keys(SCENE_LABELS) as SceneVariant[];

/**
 * The same interior as a construction wireframe and as a finished render,
 * with a draggable divider. A native range input laid over the frame does
 * the work, so it is keyboard-operable and needs no pointer maths.
 */
export function CompareSlider({ scene = "living", switchable = false }: CompareSliderProps) {
    const [split, setSplit] = useState(45);
    const [current, setCurrent] = useState<SceneVariant>(scene);
    const label = SCENE_LABELS[current];

    return (
        <figure>
            {switchable && (
                <div role="group" aria-label="Choose an interior" className="mb-4 flex flex-wrap gap-2">
                    {SCENES.map((option) => (
                        <button
                            key={option}
                            type="button"
                            aria-pressed={option === current}
                            onClick={() => setCurrent(option)}
                            className={`min-h-11 rounded-full border px-4 text-sm font-semibold capitalize transition-colors ${
                                option === current
                                    ? "border-brand-900 bg-brand-900 text-accent-on-brand"
                                    : "border-line bg-surface text-ink-muted hover:border-brand-900 hover:text-brand-900"
                            }`}
                        >
                            {SCENE_LABELS[option]}
                        </button>
                    ))}
                </div>
            )}

            <div className="relative overflow-clip rounded-panel border border-line bg-surface shadow-2xl has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-900">
                <Sheet title={`A ${label} shown as a construction wireframe and as a finished render`}>
                    <RoomScene mode="wire" variant={current} />
                </Sheet>
                <div aria-hidden="true" className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${split}%)` }}>
                    <Sheet>
                        <RoomScene mode="render" variant={current} />
                    </Sheet>
                </div>

                <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 bg-accent-500" style={{ left: `${split}%` }}>
                    <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-accent-500 bg-surface text-brand-900 shadow-xl">
                        <MoveHorizontal className="h-5 w-5" />
                    </span>
                </div>
                <span aria-hidden="true" className="pointer-events-none absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-ink shadow">
                    Wireframe
                </span>
                <span aria-hidden="true" className="pointer-events-none absolute right-4 top-4 rounded-full bg-brand-900 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-accent-on-brand shadow">
                    Render
                </span>

                <input
                    type="range"
                    min={0}
                    max={100}
                    value={split}
                    onChange={(event) => setSplit(Number(event.target.value))}
                    aria-label={`Drag to reveal the finished ${label}`}
                    className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
                />
            </div>
            <figcaption className="mt-4 flex items-center gap-2 text-sm opacity-70">
                <MoveHorizontal className="h-4 w-4" aria-hidden="true" />
                Drag across the {label} to turn the drawing into the finished space.
            </figcaption>
        </figure>
    );
}
