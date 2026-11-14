"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useInView, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Dices, Moon, Move3d, RotateCcw, RotateCw, Sun } from "lucide-react";

import { buildRoom } from "@/components/illustrations/room-kit";
import { type Cam, Stage3D } from "@/components/illustrations/Stage3D";
import { KICKER } from "@/components/sections/kit";
import { CtaButton } from "@/components/ui/CtaButton";
import { DESIGN_STEPS, FABRICS, FLOORS, GREENS, MOODS, PAINTS, ROOMS, STYLES } from "@/data/room-designer";
import { saveRoomBrief } from "@/lib/room-brief";

type Look = { room: number; style: number; paint: number; floor: number; fabric: number; mood: number; green: 0 | 1 | 2 };

const QUARTER = Math.PI / 2;
const TURN = Math.PI * 2;
const LAST = DESIGN_STEPS.length - 1;
const START: Look = { room: 0, style: 0, paint: STYLES[0].paint, floor: STYLES[0].floor, fabric: STYLES[0].fabric, mood: 0, green: 1 };

const CARD = "flex min-h-11 w-full rounded-tile border p-4 text-left transition-colors";
const CARD_ON = "border-brand-900 bg-brand-900 text-ink-inverse";
const CARD_OFF = "border-line bg-surface text-ink hover:border-brand-900";
const PILL = "flex h-11 items-center justify-center rounded-full bg-surface/90 text-ink shadow transition-colors hover:bg-surface";

const pick = (count: number) => Math.floor(Math.random() * count);
const two = (value: number) => String(value).padStart(2, "0");

type SwatchesProps = { label: string; options: { label: string; color: string }[]; selected: number; onPick: (index: number) => void };

function Swatches({ label, options, selected, onPick }: SwatchesProps) {
    return (
        <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <p className="text-sm text-ink-muted">
                <span className="font-semibold text-ink">{label}</span> · {options[selected].label}
            </p>
            <div role="group" aria-label={label} className="-ml-1.5 flex sm:ml-0">
                {options.map((option, index) => (
                    <button key={option.label} type="button" aria-label={option.label} aria-pressed={index === selected} onClick={() => onPick(index)} className="flex h-11 w-11 items-center justify-center">
                        <span
                            className={`h-8 w-8 rounded-full border border-line-strong transition-shadow ${index === selected ? "ring-2 ring-brand-900 ring-offset-2 ring-offset-surface" : ""}`}
                            style={{ backgroundColor: option.color }}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}

/**
 * The design studio: the visitor designs a room in five steps, each one a
 * service — plan it, style it, light it, plant it, see it — while the room
 * redraws live in 3D. What they chose travels with them to the enquiry form,
 * so the lead arrives with a brief attached.
 */
export function RoomDesigner() {
    const [step, setStep] = useState(0);
    const [look, setLook] = useState<Look>(START);
    const [wire, setWire] = useState(false);
    const [touched, setTouched] = useState(false);
    /* Opens as a plan, square to the page. */
    const [cam, setCam] = useState<Cam>({ yaw: -QUARTER / 2, tilt: 1, lift: 1 });

    const stage = useRef<HTMLDivElement>(null);
    const camRef = useRef(cam);
    const motion = useRef({ yaw: -QUARTER / 2, auto: true, phase: 0 });
    const drag = useRef<{ x: number; yaw: number } | null>(null);
    const inView = useInView(stage, { margin: "120px" });
    const reduced = useReducedMotion() ?? false;

    /* One loop eases the camera toward where it should be. It only runs while the stage is on screen. */
    useEffect(() => {
        if (!inView) return;

        let frame = 0;
        let last = performance.now();
        const tick = (now: number) => {
            const dt = Math.min(now - last, 64) / 1000;
            last = now;

            const target = motion.current;
            const ease = reduced ? 1 : 1 - Math.exp(-dt * 5);
            const free = target.auto && !reduced && step !== 0;
            /* The finished room is walked all the way round; before that it only sways. */
            if (free && step === LAST) target.yaw += dt * 0.3;
            else if (free) target.phase += dt * 0.5;

            const from = camRef.current;
            const yaw = target.yaw + (free && step !== LAST ? Math.sin(target.phase) * 0.32 : 0);
            const to = {
                yaw: drag.current ? from.yaw : from.yaw + (yaw - from.yaw) * ease,
                tilt: from.tilt + ((step === 0 ? 1 : 0) - from.tilt) * ease,
                lift: from.lift + (1 - from.lift) * ease,
            };

            if (Math.abs(to.yaw - from.yaw) + Math.abs(to.tilt - from.tilt) + Math.abs(to.lift - from.lift) > 0.0004) {
                camRef.current = to;
                setCam(to);
            }
            frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [inView, reduced, step]);

    /** A small jolt so a change lands with some weight: the room dips and settles. */
    const nudge = (cam: Partial<Cam>) => {
        if (!reduced) camRef.current = { ...camRef.current, ...cam };
    };

    const goTo = (next: number) => {
        const target = motion.current;
        /* A plan reads best square to the page; leaving it, swing back to the corner with the window. */
        if (next === 0 && step !== 0) target.yaw = Math.round((camRef.current.yaw + QUARTER / 2) / QUARTER) * QUARTER - QUARTER / 2;
        else if (next !== 0 && step === 0) target.yaw = Math.round(camRef.current.yaw / TURN) * TURN;
        if (next !== LAST) setWire(false);
        setStep(next);
    };

    const change = (patch: Partial<Look>) => {
        setLook((current) => ({ ...current, ...patch }));
        setTouched(true);
    };
    const chooseRoom = (room: number) => {
        change({ room });
        nudge(step === 0 ? { tilt: 0.8 } : { lift: 0 });
    };
    const chooseStyle = (style: number) => {
        change({ style, paint: STYLES[style].paint, floor: STYLES[style].floor, fabric: STYLES[style].fabric });
        nudge({ lift: 0.8 });
    };
    const chooseGreen = (green: 0 | 1 | 2) => {
        change({ green });
        nudge({ lift: 0.85 });
    };
    const shuffle = () => {
        change({ style: pick(STYLES.length), paint: pick(PAINTS.length), floor: pick(FLOORS.length), fabric: pick(FABRICS.length), green: pick(3) as 0 | 1 | 2 });
        nudge(step === 0 ? { tilt: 0.8 } : { lift: 0.75 });
    };

    const turn = (direction: 1 | -1) => {
        /* Quarter turns, from the nearest corner view — or from where the plan already sits. */
        const snapped = step === 0 ? motion.current.yaw : Math.round(camRef.current.yaw / QUARTER) * QUARTER;
        motion.current = { ...motion.current, auto: false, yaw: snapped + direction * QUARTER };
    };
    const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
        if (event.pointerType === "mouse" && event.button !== 0) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        drag.current = { x: event.clientX, yaw: camRef.current.yaw };
        motion.current.auto = false;
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

    const room = ROOMS[look.room];
    const style = STYLES[look.style];
    const paint = PAINTS[look.paint];
    const floor = FLOORS[look.floor];
    const fabric = FABRICS[look.fabric];
    const green = GREENS[look.green];
    const mood = look.mood < 34 ? MOODS[0] : look.mood < 67 ? MOODS[1] : MOODS[2];
    const current = DESIGN_STEPS[step];

    const scene = useMemo(() => buildRoom(room.id, { fabric: fabric.tone, timber: style.timber, green: look.green }), [room.id, fabric.tone, style.timber, look.green]);
    /* The plan is always read in daylight. */
    const dusk = step === 0 ? 0 : look.mood / 100;

    const brief = [
        "Room I designed in your virtual studio:",
        `Room: ${room.label}`,
        `Style: ${style.label}`,
        `Walls: ${paint.label} | Floor: ${floor.label} | Fabric: ${fabric.label}`,
        `Light: ${mood.label} | Planting: ${green.label}`,
    ].join("\n");
    const ready = touched || step === LAST;
    useEffect(() => {
        if (ready) saveRoomBrief(brief);
    }, [ready, brief]);

    return (
        <div className="overflow-clip rounded-panel border border-line bg-surface shadow-2xl lg:grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <figure className="relative flex flex-col bg-surface-sunken lg:min-h-[42rem]">
                {/* The sky behind the room: amber at sunset, then dark. */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,var(--color-accent-100),var(--color-accent-300)_85%)] transition-opacity duration-300"
                    style={{ opacity: wire ? 0 : Math.sin(Math.PI * dusk) }}
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,var(--color-brand-800),var(--color-brand-950)_75%)] transition-opacity duration-300"
                    style={{ opacity: wire ? 1 : Math.max(0, dusk * 2 - 1) }}
                />
                <p className="relative m-4 self-start rounded-full bg-surface/90 px-3.5 py-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-ink shadow">
                    {room.label} · {style.label}
                </p>

                <div ref={stage} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} className="relative my-auto cursor-grab touch-pan-y select-none active:cursor-grabbing">
                    <Stage3D
                        scene={scene}
                        finish={{ wall: paint.wall, wallShade: paint.shade, floor: floor.base, floorLine: floor.line, floorKind: floor.kind }}
                        cam={cam}
                        wire={wire}
                        dusk={dusk}
                        still={reduced}
                        title={`${scene.title}. ${style.label}: ${paint.label} walls, ${floor.label} floor, ${fabric.label} fabric, ${mood.label}.`}
                    />
                </div>

                <figcaption className="relative flex items-center justify-between gap-3 p-4">
                    <span className={`${PILL} pointer-events-none hidden gap-2 px-3.5 text-xs font-medium sm:flex`}>
                        <Move3d className="h-4 w-4 text-brand-800" aria-hidden="true" />
                        Drag to turn
                    </span>
                    <span className="ml-auto flex gap-2">
                        <button type="button" onClick={shuffle} className="flex h-11 items-center gap-2 rounded-full bg-accent-500 px-4 text-sm font-semibold text-brand-950 shadow transition-colors hover:bg-accent-400">
                            <Dices className="h-4 w-4" aria-hidden="true" />
                            Surprise me
                        </button>
                        <button type="button" onClick={() => turn(1)} aria-label="Turn the room to the left" className={`${PILL} w-11`}>
                            <RotateCcw className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button type="button" onClick={() => turn(-1)} aria-label="Turn the room to the right" className={`${PILL} w-11`}>
                            <RotateCw className="h-4 w-4" aria-hidden="true" />
                        </button>
                    </span>
                </figcaption>
            </figure>

            <div className="flex flex-col border-t border-line p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
                <ol aria-label="Steps" className="grid grid-cols-5 gap-1.5">
                    {DESIGN_STEPS.map((entry, index) => (
                        <li key={entry.slug}>
                            <button
                                type="button"
                                onClick={() => goTo(index)}
                                aria-current={index === step ? "step" : undefined}
                                aria-label={`Step ${index + 1}: ${entry.service}`}
                                className={`h-11 w-full rounded-tile font-mono text-xs font-semibold transition-colors ${
                                    index === step
                                        ? "bg-brand-900 text-accent-on-brand"
                                        : index < step
                                          ? "bg-brand-100 text-brand-900 hover:bg-brand-200"
                                          : "border border-line text-ink-subtle hover:border-brand-900 hover:text-brand-900"
                                }`}
                            >
                                {two(index + 1)}
                            </button>
                        </li>
                    ))}
                </ol>

                <div aria-live="polite" className="mt-7">
                    <p className={`${KICKER} text-brand-800`}>{current.service}</p>
                    <h3 className="mt-3 text-2xl font-medium tracking-tight text-ink md:text-[1.75rem] md:leading-tight">{current.question}</h3>
                    <p className="mt-3 leading-relaxed text-pretty text-ink-muted">{current.help}</p>
                </div>

                <div className="mt-6">
                    {step === 0 && (
                        <div role="group" aria-label="Room" className="grid grid-cols-2 gap-2.5">
                            {ROOMS.map((option, index) => {
                                const on = index === look.room;
                                return (
                                    <button key={option.id} type="button" aria-pressed={on} onClick={() => chooseRoom(index)} className={`${CARD} flex-col ${on ? CARD_ON : CARD_OFF}`}>
                                        <option.icon className={`h-6 w-6 ${on ? "text-accent-on-brand" : "text-brand-800"}`} aria-hidden="true" />
                                        <span className="mt-3 block font-semibold">{option.label}</span>
                                        <span className={`block text-xs ${on ? "text-ink-inverse/75" : "text-ink-subtle"}`}>{option.sector}</span>
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {step === 1 && (
                        <>
                            <div role="group" aria-label="Style" className="grid grid-cols-2 gap-2.5">
                                {STYLES.map((option, index) => (
                                    <button key={option.label} type="button" aria-pressed={index === look.style} onClick={() => chooseStyle(index)} className={`${CARD} flex-col ${index === look.style ? CARD_ON : CARD_OFF}`}>
                                        <span className="flex -space-x-1.5" aria-hidden="true">
                                            {[PAINTS[option.paint].wall, FLOORS[option.floor].base, FABRICS[option.fabric].tone.top].map((color, dot) => (
                                                <span key={dot} className="h-6 w-6 rounded-full border-2 border-surface" style={{ backgroundColor: color }} />
                                            ))}
                                        </span>
                                        <span className="mt-3 block font-semibold">{option.label}</span>
                                    </button>
                                ))}
                            </div>
                            <Swatches label="Walls" selected={look.paint} onPick={(index) => change({ paint: index })} options={PAINTS.map((option) => ({ label: option.label, color: option.wall }))} />
                            <Swatches label="Floor" selected={look.floor} onPick={(index) => change({ floor: index })} options={FLOORS.map((option) => ({ label: option.label, color: option.base }))} />
                            <Swatches label="Fabric" selected={look.fabric} onPick={(index) => change({ fabric: index })} options={FABRICS.map((option) => ({ label: option.label, color: option.tone.top }))} />
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="flex items-center gap-3 text-ink-subtle">
                                <Sun className="h-5 w-5 shrink-0" aria-hidden="true" />
                                <input
                                    type="range"
                                    min={0}
                                    max={100}
                                    value={look.mood}
                                    onChange={(event) => change({ mood: Number(event.target.value) })}
                                    aria-label="Time of day, from daylight to after dark"
                                    aria-valuetext={mood.label}
                                    className="h-11 w-full cursor-pointer [accent-color:var(--color-brand-900)]"
                                />
                                <Moon className="h-5 w-5 shrink-0" aria-hidden="true" />
                            </div>
                            <div role="group" aria-label="Mood" className="mt-3 grid grid-cols-3 gap-2">
                                {MOODS.map((option) => (
                                    <button
                                        key={option.label}
                                        type="button"
                                        aria-pressed={option === mood}
                                        onClick={() => change({ mood: option.value })}
                                        className={`min-h-11 rounded-tile border px-2 text-sm font-semibold leading-tight transition-colors ${option === mood ? CARD_ON : CARD_OFF}`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <div role="group" aria-label="Planting" className="grid gap-2.5">
                            {GREENS.map((option, index) => {
                                const on = index === look.green;
                                return (
                                    <button key={option.label} type="button" aria-pressed={on} onClick={() => chooseGreen(index as 0 | 1 | 2)} className={`${CARD} items-center gap-4 ${on ? CARD_ON : CARD_OFF}`}>
                                        <option.icon className={`h-6 w-6 shrink-0 ${on ? "text-accent-on-brand" : "text-brand-800"}`} aria-hidden="true" />
                                        <span>
                                            <span className="block font-semibold">{option.label}</span>
                                            <span className={`block text-sm ${on ? "text-ink-inverse/75" : "text-ink-muted"}`}>{option.blurb}</span>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {step === LAST && (
                        <>
                            <dl className="divide-y divide-line rounded-tile border border-line">
                                {[
                                    ["Room", room.label],
                                    ["Style", style.label],
                                    ["Finishes", `${paint.label}, ${floor.label}, ${fabric.label}`],
                                    ["Light", mood.label],
                                    ["Planting", green.label],
                                ].map(([term, value]) => (
                                    <div key={term} className="flex items-baseline justify-between gap-4 px-4 py-3">
                                        <dt className="text-sm text-ink-muted">{term}</dt>
                                        <dd className="text-right text-sm font-semibold text-ink">{value}</dd>
                                    </div>
                                ))}
                            </dl>
                            <button
                                type="button"
                                aria-pressed={wire}
                                onClick={() => setWire((value) => !value)}
                                className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-brand-900 underline underline-offset-4"
                            >
                                {wire ? "Show the finished room" : "See the wireframe underneath"}
                            </button>
                            <p className="mt-2 text-sm text-ink-muted">These choices are added to the enquiry form for you, so you do not have to describe the room again.</p>
                        </>
                    )}

                    {step !== LAST && (
                        <Link href={`/services/${current.slug}`} className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-brand-900 underline underline-offset-4">
                            How we approach {current.service.toLowerCase()}
                        </Link>
                    )}
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-8">
                    {step > 0 ? (
                        <button type="button" onClick={() => goTo(step - 1)} className="inline-flex min-h-11 items-center gap-2 rounded-full pr-4 text-sm font-semibold text-ink-muted transition-colors hover:text-brand-900">
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                            Back
                        </button>
                    ) : (
                        <span />
                    )}
                    {step < LAST ? (
                        <button
                            type="button"
                            onClick={() => goTo(step + 1)}
                            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-brand-900 px-6 text-sm font-semibold text-accent-on-brand shadow-lg transition-colors hover:bg-brand-800"
                        >
                            <span>
                                Next<span className="hidden sm:inline">: {DESIGN_STEPS[step + 1].service}</span>
                            </span>
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                    ) : (
                        <CtaButton href="/consultation/booking#lead-form">Get this room designed</CtaButton>
                    )}
                </div>
            </div>
        </div>
    );
}
