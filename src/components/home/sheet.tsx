import React from "react";

import { Container } from "@/components/ui/Container";

/*
 * The home page is set out like an architect's drawing set. These two pieces
 * carry that through every section: the structural grid ruled behind the
 * content, and a sheet heading with its drawing number. Plain components with
 * no client code, so both Server Components and the client islands use them.
 */

export const SHEET_LABEL = "font-mono text-[11px] uppercase tracking-[0.22em]";
export const two = (value: number) => String(value).padStart(2, "0");

/**
 * The column grid, ruled full height behind a section. The section must be
 * `relative`, and its content must be too — a positioned element paints over
 * unpositioned content whatever the source order.
 */
export function GridLines({ tone = "light" }: { tone?: "light" | "dark" }) {
    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <Container size="wide" className="h-full">
                <div className="grid h-full grid-cols-4 lg:grid-cols-6">
                    {Array.from({ length: 6 }, (_, index) => (
                        <span key={index} className={`border-l last:border-r ${tone === "dark" ? "border-white/[0.07]" : "border-line/70"} ${index > 3 ? "hidden lg:block" : ""}`} />
                    ))}
                </div>
            </Container>
        </div>
    );
}

type SheetHeadProps = {
    /** Must match the `aria-labelledby` of the surrounding section. */
    id: string;
    /** The drawing number, e.g. "A—02". */
    code: string;
    label: string;
    title: string;
    /** The second half of the heading, set in the accent. */
    accent?: string;
    tone?: "light" | "dark";
    /** A short note or link, set beside the heading on wide screens. */
    children?: React.ReactNode;
};

export function SheetHead({ id, code, label, title, accent, tone = "light", children }: SheetHeadProps) {
    const dark = tone === "dark";

    return (
        <header className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-8">
            <p className={`${SHEET_LABEL} lg:col-span-2 lg:whitespace-nowrap lg:pb-3 ${dark ? "text-ink-inverse/70" : "text-ink-muted"}`}>
                <span className={dark ? "text-accent-on-brand" : "text-accent-600"}>{code}</span>
                <span aria-hidden="true" className="mx-3 inline-block h-px w-6 bg-current align-middle" />
                {label}
            </p>
            <h2 id={id} className={`text-[clamp(2.5rem,6.2vw,5.75rem)] font-medium leading-[0.95] tracking-[-0.045em] text-balance lg:col-span-7 ${dark ? "text-ink-inverse" : "text-ink"}`}>
                {title}
                {accent && (
                    <>
                        {" "}
                        <span className={dark ? "text-accent-on-brand" : "brand-gradient-text"}>{accent}</span>
                    </>
                )}
            </h2>
            {children && <div className="lg:col-span-3 lg:pb-3">{children}</div>}
        </header>
    );
}
