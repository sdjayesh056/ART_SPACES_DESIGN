"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { SHEET_LABEL, SheetHead, two } from "@/components/home/sheet";
import { Container } from "@/components/ui/Container";
import { photo } from "@/data/photos";
import { PROJECTS } from "@/data/projects";

/*
 * The openings the work is seen through, read left to right like the
 * elevation of a street: an arch, a wide bay, a tall slit, a chamfered bay.
 * Heights are a share of the row, so the frames keep one ground line.
 */
const OPENINGS = [
    { frame: "lg:h-full lg:w-[21rem] lg:rounded-t-full", focus: "object-center" },
    { frame: "lg:h-[66%] lg:w-[33rem]", focus: "object-[50%_30%]" },
    { frame: "lg:h-[86%] lg:w-[17rem]", focus: "object-[25%_50%]" },
    { frame: "lg:h-[74%] lg:w-[27rem] lg:rounded-tr-[9rem]", focus: "object-[75%_60%]" },
];

/*
 * ⚠️ PLACEHOLDER — there is no per-project photography yet, and the project
 * data shares two images between eight projects. Until real photographs
 * arrive, reference photographs stand in here, as they do in each case
 * study's gallery, so the reel does not show the same room four times.
 * `undefined` keeps the project's own image.
 */
const COVERS: (string | undefined)[] = [photo("recent"), undefined, undefined, photo("styles"), photo("retail"), photo("hospitality"), photo("commercial"), photo("awards")];

/**
 * Selected work as a reel. On a wide screen the section pins to the viewport
 * and turns the visitor's downward scroll into sideways travel along the
 * projects. Below `lg`, with reduced motion, or without JavaScript, it is an
 * ordinary strip you swipe.
 */
export function ProjectReel() {
    const section = useRef<HTMLElement>(null);
    const track = useRef<HTMLUListElement>(null);
    /* How far the strip has to travel. Zero means it is not pinned. */
    const [travel, setTravel] = useState(0);
    const reduced = useReducedMotion() ?? false;

    const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
    const x = useTransform(scrollYProgress, (progress) => -progress * travel);

    useEffect(() => {
        const strip = track.current;
        if (!strip) return;

        const measure = () => {
            const pinned = !reduced && window.matchMedia("(min-width: 1024px)").matches;
            setTravel(pinned ? Math.max(0, strip.scrollWidth - window.innerWidth) : 0);
        };
        /* A ResizeObserver reports once as soon as it starts observing, so this also takes the first measurement. */
        const observer = new ResizeObserver(measure);
        observer.observe(strip);
        window.addEventListener("resize", measure);
        return () => {
            observer.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [reduced]);

    const pinned = travel > 0;

    return (
        <section
            ref={section}
            id="portfolio"
            aria-labelledby="portfolio-heading"
            className="relative bg-brand-950 text-ink-inverse"
            /* One screen to hold the reel, plus exactly the distance it travels: scroll and strip move one for one. */
            style={pinned ? { height: `calc(100svh + ${travel}px)` } : undefined}
        >
            <div className={`flex flex-col ${pinned ? "sticky top-0 h-[100svh] overflow-clip" : "py-20 md:py-28"}`}>
                <Container size="wide" className={pinned ? "pt-28" : ""}>
                    <SheetHead id="portfolio-heading" tone="dark" code="A—04" label="Selected work" title="Design" accent="Innovation">
                        <Link href="/portfolio" className="inline-flex min-h-11 items-center gap-2 font-semibold text-accent-on-brand underline underline-offset-4">
                            All projects
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </SheetHead>
                </Container>

                <div className={`mt-10 min-h-0 flex-1 lg:mt-12 ${pinned ? "" : "no-scrollbar snap-x overflow-x-auto"}`}>
                    {/* Unpinned on a wide screen, the row still needs a height for the frames to take their share of. */}
                    <m.ul ref={track} style={{ x }} className={`flex w-max gap-5 px-6 lg:gap-8 lg:px-12 ${pinned ? "lg:h-full" : "lg:h-[36rem]"}`}>
                        {PROJECTS.map((project, index) => {
                            const opening = OPENINGS[index % OPENINGS.length];
                            return (
                                <li key={project.slug} className="shrink-0 snap-start lg:h-full">
                                    <Link href={`/portfolio/${project.slug}`} className="group grid lg:h-full lg:grid-rows-[minmax(0,1fr)_auto]">
                                        <span className="flex min-h-0 items-end">
                                            <span className={`relative block h-[24rem] w-[78vw] max-w-[26rem] overflow-clip bg-brand-900 lg:max-w-none ${opening.frame}`}>
                                                <Image
                                                    src={COVERS[index] ?? project.image}
                                                    alt=""
                                                    fill
                                                    sizes="(min-width: 1024px) 33rem, 78vw"
                                                    className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${opening.focus}`}
                                                />
                                                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-950/85 to-transparent" />
                                                <span className={`${SHEET_LABEL} absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 tracking-[0.16em]`}>
                                                    <span className="rounded-full bg-accent-500 px-3 py-1.5 font-semibold text-brand-950">{project.highlight}</span>
                                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/40 transition-colors group-hover:bg-accent-500 group-hover:text-brand-950">
                                                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                                                    </span>
                                                </span>
                                            </span>
                                        </span>
                                        <span className="mt-4 flex items-baseline gap-4 pb-1">
                                            <span className="font-mono text-xs text-accent-on-brand">{two(index + 1)}</span>
                                            <span>
                                                <h3 className="text-xl font-medium tracking-tight">{project.title}</h3>
                                                <span className={`${SHEET_LABEL} mt-1.5 block tracking-[0.16em] text-ink-inverse/60`}>
                                                    {[project.category, project.location, project.year].filter(Boolean).join(" · ")}
                                                </span>
                                            </span>
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                        <li className="flex shrink-0 snap-start items-center lg:h-full lg:pl-6">
                            <Link href="/portfolio" className="group flex h-52 w-52 flex-col items-center justify-center gap-3 rounded-full border border-white/30 text-center transition-colors hover:border-accent-500 hover:bg-accent-500 hover:text-brand-950 lg:h-64 lg:w-64">
                                <span className="text-2xl font-medium tracking-tight">See all projects</span>
                                <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </Link>
                        </li>
                    </m.ul>
                </div>

                {pinned && (
                    <Container size="wide" className="py-6">
                        <div aria-hidden="true" className="h-px bg-white/15">
                            <m.div style={{ scaleX: scrollYProgress }} className="h-px origin-left bg-accent-on-brand" />
                        </div>
                    </Container>
                )}
            </div>
        </section>
    );
}
