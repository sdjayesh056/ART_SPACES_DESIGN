"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { PROJECTS, PROJECT_FILTERS } from "@/data/projects";
import { accentAt } from "@/lib/accents";
import { ProjectCard } from "@/components/ui/ProjectCard";

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

