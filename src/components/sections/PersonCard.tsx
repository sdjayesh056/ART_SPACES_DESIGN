import React from "react";
import type { LucideIcon } from "lucide-react";

type PersonCardProps = {
    /** A role, not a name: the studio has not supplied its real team yet. */
    role: string;
    discipline: string;
    body: string;
    icon: LucideIcon;
    /** Token reference from src/lib/accents.ts. */
    accent: string;
    level?: "h3" | "h4";
};

/** A role on the project team, with a discipline glyph where a portrait will go. */
export function PersonCard({ role, discipline, body, icon: Icon, accent, level: Heading = "h3" }: PersonCardProps) {
    return (
        <article className="flex h-full flex-col rounded-panel border border-line bg-surface p-8 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover">
            <span
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border"
                style={{
                    color: accent,
                    backgroundColor: `color-mix(in srgb, ${accent} 8%, transparent)`,
                    borderColor: `color-mix(in srgb, ${accent} 22%, transparent)`,
                }}
            >
                <Icon className="h-7 w-7" aria-hidden="true" />
            </span>
            <p className="text-eyebrow uppercase text-ink-subtle">{discipline}</p>
            <Heading className="mt-2 text-xl font-medium tracking-tight leading-tight text-ink">{role}</Heading>
            <p className="mt-3 leading-relaxed text-ink-muted">{body}</p>
        </article>
    );
}
