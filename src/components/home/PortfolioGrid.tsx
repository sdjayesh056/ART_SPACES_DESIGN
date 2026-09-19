"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ArrowRight } from "lucide-react";

import { PROJECTS, PROJECT_FILTERS } from "@/data/projects";
import { accentAt } from "@/lib/accents";
import type { Project } from "@/types/content";

/**
 * Client leaf: the category filter owns state, so only this part of the
 * portfolio section crosses the client boundary.
 */
export function PortfolioGrid() {
    const [activeFilter, setActiveFilter] = useState<string>("All");

    const visible =
        activeFilter === "All"
            ? PROJECTS
            : PROJECTS.filter((project) => project.category === activeFilter);

    return (
        <>
            {/*
                A horizontally scrollable strip below sm. There are six filters
                now that the list is derived from the data, which wrapped to
                three rows inside a rounded pill on a phone.
            */}
            <div
                role="tablist"
                aria-label="Filter projects by category"
                className="no-scrollbar -mx-6 mb-12 flex gap-2 overflow-x-auto px-6 sm:mx-0 sm:flex-wrap sm:justify-center sm:rounded-full sm:bg-surface-sunken sm:p-1.5 sm:px-1.5"
            >
                {PROJECT_FILTERS.map((filter) => {
                    const isActive = activeFilter === filter;

                    return (
                        <button
                            key={filter}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => setActiveFilter(filter)}
                            className={`shrink-0 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                                isActive
                                    ? "bg-brand-900 text-accent-on-brand shadow-md"
                                    : "text-ink-subtle hover:bg-surface-sunken hover:text-ink"
                            }`}
                        >
                            {filter}
                        </button>
                    );
                })}
            </div>

            <motion.ul layout className="grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                    {visible.map((project, index) => (
                        <motion.li
                            key={project.slug}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ProjectCard project={project} accent={accentAt(index)} />
                        </motion.li>
                    ))}
                </AnimatePresence>
            </motion.ul>

            <p role="status" aria-live="polite" className="sr-only">
                Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
                {activeFilter === "All" ? "" : ` in ${activeFilter}`}.
            </p>
        </>
    );
}

function ProjectCard({ project, accent }: { project: Project; accent: string }) {
    return (
        /*
            The whole card is one link. Previously the only affordance was a
            bare <button> with no onClick that read "[ INITIALIZE_VIEW ]" and
            appeared only on hover — so on a phone the card had no call to
            action at all, and on a desktop it did nothing when clicked.
        */
        <Link
            href={`/portfolio/${project.slug}`}
            className="group relative block h-[26rem] overflow-hidden rounded-panel border border-line bg-surface-sunken transition-all duration-500 hover:border-line-strong hover:shadow-card-hover"
        >
            <div className="absolute inset-0">
                <Image
                    src={project.image}
                    alt={`${project.title} — ${project.category} interior design by ArtSpaces`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />
            </div>

            <div className="relative flex h-full flex-col justify-between p-8">
                <span
                    className="self-start rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md"
                    style={{ color: "white" }}
                >
                    {project.category}
                </span>

                <div>
                    {/*
                        Always visible. Every project's differentiating metric
                        used to be hidden behind group-hover, which a
                        touchscreen never triggers.
                    */}
                    <span className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-white">
                        <Activity size={14} style={{ color: accent }} aria-hidden="true" />
                        {project.highlight}
                    </span>

                    <h3 className="mb-2 text-2xl font-bold leading-tight text-white">
                        {project.title}
                    </h3>

                    <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-white/85">
                        {project.description}
                    </p>

                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white transition-colors group-hover:text-accent-on-brand">
                        View project
                        <ArrowRight
                            size={14}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                            aria-hidden="true"
                        />
                    </span>
                </div>
            </div>
        </Link>
    );
}
