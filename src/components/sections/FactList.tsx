import React from "react";
import { Check } from "lucide-react";

import type { Fact } from "@/types/content";

/** Label and value pairs as a real description list — the case-study facts rail. */
export function FactList({ facts, className = "" }: { facts: Fact[]; className?: string }) {
    return (
        <dl className={`divide-y divide-line ${className}`}>
            {facts.map((fact) => (
                <div key={fact.label} className="flex items-baseline justify-between gap-6 py-4">
                    <dt className="text-eyebrow uppercase text-ink-subtle">{fact.label}</dt>
                    <dd className="text-right font-semibold text-ink">{fact.value}</dd>
                </div>
            ))}
        </dl>
    );
}

type CheckListProps = {
    items: string[];
    tone?: "default" | "inverse";
    /** Two columns from sm up, for long lists. */
    columns?: boolean;
    className?: string;
};

/** A ticked list. The tick is gold on both surfaces; only the text colour changes. */
export function CheckList({ items, tone = "default", columns = false, className = "" }: CheckListProps) {
    return (
        <ul className={`list-none p-0 ${columns ? "grid gap-x-8 gap-y-3 sm:grid-cols-2" : "space-y-3"} ${className}`}>
            {items.map((item) => (
                <li
                    key={item}
                    className={`flex items-start gap-3 leading-relaxed ${tone === "inverse" ? "text-ink-inverse/90" : "text-ink-muted"}`}
                >
                    <span
                        aria-hidden="true"
                        className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${tone === "inverse" ? "bg-white/15 text-accent-on-brand" : "bg-brand-50 text-brand-900"}`}
                    >
                        <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {item}
                </li>
            ))}
        </ul>
    );
}
