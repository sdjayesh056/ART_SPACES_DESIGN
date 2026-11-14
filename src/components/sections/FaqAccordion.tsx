import React from "react";
import { Plus } from "lucide-react";

import { JsonLd } from "@/components/JsonLd";
import type { Faq } from "@/types/content";

type FaqAccordionProps = {
    items: Faq[];
    /**
     * Emits FAQPage structured data for exactly these questions. A page must
     * emit it once, so pass `false` on every accordion after the first — or on
     * all of them and emit one combined block yourself.
     */
    jsonLd?: boolean;
    level?: "h3" | "h4";
};

export function faqJsonLd(items: Faq[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
    };
}

/**
 * Native <details>, so it opens without JavaScript, is keyboard and
 * screen-reader operable for free, and its answers are in the HTML for search.
 */
export function FaqAccordion({ items, jsonLd = true, level: Heading = "h3" }: FaqAccordionProps) {
    return (
        <>
            {jsonLd && <JsonLd data={faqJsonLd(items)} />}
            <ul className="list-none space-y-3 p-0">
                {items.map((item) => (
                    <li key={item.question}>
                        <details className="group rounded-card border border-line bg-surface shadow-card transition-colors open:border-brand-900/30">
                            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 p-6 [&::-webkit-details-marker]:hidden">
                                <Heading className="text-lg font-semibold text-ink">{item.question}</Heading>
                                <span
                                    aria-hidden="true"
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-900 transition-transform duration-300 group-open:rotate-45"
                                >
                                    <Plus className="h-4 w-4" />
                                </span>
                            </summary>
                            <p className="px-6 pb-6 leading-relaxed text-ink-muted">{item.answer}</p>
                        </details>
                    </li>
                ))}
            </ul>
        </>
    );
}
