import React from "react";
import { Clock } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import type { Phase } from "@/types/content";

type ProcessTimelineProps = {
    phases: Phase[];
    /** Renders the jump rail above the list. Off when the timeline is a supporting block. */
    showNav?: boolean;
    level?: "h2" | "h3";
};

/**
 * Phases as an ordered list on a continuous rail. The jump rail is plain
 * anchor links, so the "interactive" part costs no JavaScript and every phase
 * stays in the document for search.
 */
export function ProcessTimeline({ phases, showNav = false, level: Heading = "h3" }: ProcessTimelineProps) {
    return (
        <div>
            {showNav && (
                <nav aria-label="Project phases" className="no-scrollbar -mx-6 mb-12 overflow-x-auto px-6 sm:mx-0 sm:px-0">
                    <ol className="flex w-max list-none gap-2 p-0 sm:w-auto sm:flex-wrap">
                        {phases.map((phase, index) => (
                            <li key={phase.id}>
                                <a
                                    href={`#phase-${phase.id}`}
                                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-semibold text-ink-muted shadow-sm transition-colors hover:border-brand-900 hover:text-brand-900"
                                >
                                    <span className="font-mono text-xs text-accent-600">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    {phase.title}
                                </a>
                            </li>
                        ))}
                    </ol>
                </nav>
            )}

            <ol className="relative list-none space-y-6 p-0 before:absolute before:bottom-8 before:left-6 before:top-8 before:w-px before:bg-line-strong md:before:left-10">
                {phases.map((phase, index) => (
                    <Reveal as="li" key={phase.id} delay={Math.min(index * 0.05, 0.2)}>
                        <article
                            id={`phase-${phase.id}`}
                            className="relative scroll-mt-28 pl-16 md:pl-28"
                        >
                            <span
                                aria-hidden="true"
                                className="absolute left-0 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-brand-900/15 bg-brand-900 font-mono text-sm font-bold text-accent-on-brand shadow-card md:h-20 md:w-20 md:text-2xl"
                            >
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <div className="grid gap-6 rounded-panel border border-line bg-surface p-6 shadow-card md:grid-cols-[1.3fr_1fr] md:gap-10 md:p-10">
                                <div>
                                    <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-900">
                                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                                        {phase.duration}
                                    </p>
                                    <Heading className="text-2xl font-medium tracking-tight leading-tight text-ink">{phase.title}</Heading>
                                    <p className="mt-3 leading-relaxed text-ink-muted">{phase.summary}</p>
                                </div>
                                <div className="border-t border-line pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0">
                                    <p className="text-eyebrow uppercase text-ink-subtle">You receive</p>
                                    <ul className="mt-4 list-none space-y-2 p-0 text-sm text-ink-muted">
                                        {phase.deliverables.map((item) => (
                                            <li key={item} className="flex gap-3">
                                                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </article>
                    </Reveal>
                ))}
            </ol>
        </div>
    );
}
