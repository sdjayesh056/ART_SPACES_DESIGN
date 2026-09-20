import React from "react";

/**
 * Emits a JSON-LD block.
 *
 * The payload is built server-side from our own data modules — never from
 * anything a visitor supplied — so the only escaping needed is for `<`, which
 * would otherwise let a stray string close the script tag early.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(data).replace(/</g, "\\u003c"),
            }}
        />
    );
}
