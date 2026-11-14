import React from "react";

import type { LongFormSection } from "@/types/content";

/**
 * Long-form typography for legal text and journal articles. Styles descend
 * from this wrapper so the content can stay plain semantic HTML.
 */
export function Prose({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div
            className={`max-w-2xl text-lg leading-relaxed text-ink-muted [&_a]:font-semibold [&_a]:text-brand-900 [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-14 [&_h2]:scroll-mt-28 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-ink [&_h2:first-child]:mt-0 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink [&_li]:mt-2 [&_p]:mt-5 [&_strong]:text-ink [&_ul]:mt-5 [&_ul]:list-disc [&_ul]:pl-6 ${className}`}
        >
            {children}
        </div>
    );
}

type LongFormProps = {
    sections: LongFormSection[];
    /** Label for the section index, e.g. "On this page". */
    indexLabel?: string;
    /** Rendered above the first section, e.g. an interim-text notice. */
    notice?: React.ReactNode;
    /** Rendered under the index, e.g. article facts. */
    aside?: React.ReactNode;
};

/** Sectioned long-form copy with a sticky index that follows the reader on desktop. */
export function LongForm({ sections, indexLabel = "On this page", notice, aside }: LongFormProps) {
    return (
        <div className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
                <nav aria-label={indexLabel} className="rounded-card border border-line bg-surface p-6 shadow-card">
                    <p className="text-eyebrow uppercase text-ink-subtle">{indexLabel}</p>
                    <ol className="mt-4 list-none space-y-1 p-0">
                        {sections.map((section, index) => (
                            <li key={section.id}>
                                <a
                                    href={`#${section.id}`}
                                    className="flex min-h-11 items-center gap-3 rounded-tile px-2 text-sm font-medium text-ink-muted transition-colors hover:bg-brand-50 hover:text-brand-900"
                                >
                                    <span className="font-mono text-xs text-accent-600">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    {section.heading}
                                </a>
                            </li>
                        ))}
                    </ol>
                </nav>
                {aside}
            </div>

            <div>
                {notice}
                <Prose className={notice ? "mt-10" : ""}>
                    {sections.map((section) => (
                        <React.Fragment key={section.id}>
                            <h2 id={section.id}>{section.heading}</h2>
                            {section.paragraphs.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </React.Fragment>
                    ))}
                </Prose>
            </div>
        </div>
    );
}
