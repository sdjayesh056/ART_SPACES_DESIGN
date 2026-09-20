import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Activity, ArrowRight } from "lucide-react";

import type { Project } from "@/types/content";

type ProjectCardProps = {
    project: Project;
    /** Token reference from src/lib/accents.ts. */
    accent: string;
};

/**
 * Server Component, shared by the home portfolio grid, /portfolio and the
 * /spaces/[vertical] pages.
 *
 * The whole card is one link. Its earlier form had no working affordance at
 * all: a bare <button> with no onClick, revealed only on hover.
 */
export function ProjectCard({ project, accent }: ProjectCardProps) {
    return (
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
                <div className="absolute inset-0 bg-gradient-to-t from-scrim/90 via-scrim/35 to-transparent" />
            </div>

            <div className="relative flex h-full flex-col justify-between p-8">
                <span className="self-start rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                    {project.category}
                </span>

                <div>
                    {/* Visible at rest — this was gated behind group-hover, which
                        a touchscreen never triggers. */}
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
