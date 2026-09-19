"use client";

import React, { useActionState, useId } from "react";
import { Loader2 } from "lucide-react";

import { subscribeNewsletter } from "@/actions/lead";
import { HONEYPOT_FIELD, initialNewsletterFormState } from "@/types/lead";

export function NewsletterForm() {
    const [state, formAction, isPending] = useActionState(
        subscribeNewsletter,
        initialNewsletterFormState,
    );
    const fieldId = useId();
    const emailId = `${fieldId}-email`;
    const statusId = `${fieldId}-status`;

    return (
        <div className="w-full md:w-auto">
            {/*
                noValidate so the server schema is the single source of truth and
                errors render in our own styled region, matching LeadCaptureForm —
                rather than a browser tooltip that bypasses the action entirely.
            */}
            <form
                action={formAction}
                noValidate
                className="flex w-full md:w-auto max-w-md bg-white rounded-full p-1.5 border border-slate-200 shadow-sm hover:shadow-md focus-within:border-brand-900 focus-within:ring-1 focus-within:ring-brand-900 transition-all duration-300"
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
                    className="flex-1 min-w-0 bg-transparent rounded-full px-4 md:px-5 text-slate-900 placeholder:text-slate-400 focus:outline-none text-sm font-medium"
                />

                <button
                    type="submit"
                    disabled={isPending}
                    className="shrink-0 inline-flex items-center gap-2 px-4 md:px-6 py-3 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-900 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {isPending && <Loader2 size={14} className="animate-spin" aria-hidden="true" />}
                    {isPending ? "Sending" : "Subscribe"}
                </button>
            </form>

            <p
                id={statusId}
                role="status"
                aria-live="polite"
                className={`mt-2 ml-1 text-sm font-medium ${
                    state.status === "error" ? "text-red-600" : "text-brand-900"
                }`}
            >
                {state.message}
            </p>
        </div>
    );
}
