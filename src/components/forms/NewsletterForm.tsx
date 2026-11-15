"use client";

import React, { useActionState, useId } from "react";
import { Loader2 } from "lucide-react";

import { subscribeNewsletter } from "@/actions/lead";
import { HONEYPOT_FIELD, initialNewsletterFormState } from "@/types/lead";

/** The newsletter field. Styled for the footer's dark ground, its only home. */
export function NewsletterForm() {
    const [state, formAction, isPending] = useActionState(
        subscribeNewsletter,
        initialNewsletterFormState,
    );
    const fieldId = useId();
    const emailId = `${fieldId}-email`;
    const statusId = `${fieldId}-status`;

    return (
        <div className="mt-4 w-full">
            {/*
                noValidate so the server schema is the single source of truth and
                errors render in our own styled region, matching LeadCaptureForm —
                rather than a browser tooltip that bypasses the action entirely.
            */}
            <form
                action={formAction}
                noValidate
                className="relative flex w-full rounded-full border border-white/25 bg-white/[0.06] p-1 transition-colors duration-300 focus-within:border-accent-400"
            >
                <label htmlFor={emailId} className="sr-only">
                    Email address for the design newsletter
                </label>

                {/* Honeypot — off-screen rather than display:none, which some bots detect. */}
                <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
                    <label htmlFor={`${fieldId}-hp`}>Company website</label>
                    <input
                        id={`${fieldId}-hp`}
                        name={HONEYPOT_FIELD}
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                    />
                </div>

                <input
                    id={emailId}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    placeholder="Email address"
                    aria-invalid={state.status === "error" ? true : undefined}
                    aria-describedby={state.message ? statusId : undefined}
                    className="min-h-11 min-w-0 flex-1 rounded-full bg-transparent pl-4 pr-2 text-[0.9375rem] text-ink-inverse placeholder:text-ink-inverse/60"
                />

                <button
                    type="submit"
                    disabled={isPending}
                    className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-surface px-5 text-sm font-semibold text-brand-950 transition-colors duration-300 hover:bg-accent-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {isPending && <Loader2 size={14} className="animate-spin" aria-hidden="true" />}
                    {isPending ? "Sending" : "Subscribe"}
                </button>
            </form>

            {/* Always in the DOM so a message is announced when it arrives; it takes no room while empty. */}
            <p
                id={statusId}
                role="status"
                aria-live="polite"
                className={`ml-4 mt-2 text-sm font-medium empty:mt-0 ${
                    state.status === "error" ? "text-danger-soft" : "text-accent-on-brand"
                }`}
            >
                {state.message}
            </p>
        </div>
    );
}
