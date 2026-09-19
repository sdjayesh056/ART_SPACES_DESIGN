"use client";

import React, { useActionState, useId } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronDown, Loader2, Mail, MessageSquare, Smartphone, User } from "lucide-react";

import { submitLead } from "@/actions/lead";
import { SERVICE_OPTIONS } from "@/data/lead-services";
import { HONEYPOT_FIELD, initialLeadFormState, type LeadFormState } from "@/types/lead";

const INPUT_CLASS =
    "w-full bg-slate-200 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-slate-900 placeholder-slate-400 font-medium transition-all focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-400/50 focus:bg-white";

const LABEL_CLASS = "block text-sm font-medium text-slate-200 mb-2 ml-1";

const ICON_CLASS = "absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none";

export function LeadCaptureForm() {
    const [state, formAction, isPending] = useActionState(submitLead, initialLeadFormState);
    const fieldId = useId();

    if (state.status === "success") {
        return <SuccessPanel message={state.message} />;
    }

    const id = (field: string) => `${fieldId}-${field}`;
    const errorId = (field: string) => `${fieldId}-${field}-error`;

    return (
        <form action={formAction} className="space-y-5" noValidate>
            <div>
                <h3 className="text-2xl font-bold text-white mb-2">Get Your Free Quote</h3>
                <p className="text-slate-200 text-sm">
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>
            </div>

            {state.status === "error" && (
                <p
                    role="alert"
                    className="rounded-xl border border-danger-soft/40 bg-danger/25 px-4 py-3 text-sm font-medium text-danger-soft"
                >
                    {state.message}
                </p>
            )}

            {/* Honeypot — positioned off-screen rather than display:none, which some bots detect. */}
            <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
                <label htmlFor={id(HONEYPOT_FIELD)}>Company website</label>
                <input
                    id={id(HONEYPOT_FIELD)}
                    name={HONEYPOT_FIELD}
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                />
            </div>

            <Field
                id={id("name")}
                errorId={errorId("name")}
                label="Full Name"
                errors={state.fieldErrors?.name}
            >
                <User size={18} className={ICON_CLASS} aria-hidden="true" />
                <input
                    id={id("name")}
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Priya Sharma"
                    defaultValue={state.values?.name ?? ""}
                    aria-invalid={state.fieldErrors?.name ? true : undefined}
                    aria-describedby={state.fieldErrors?.name ? errorId("name") : undefined}
                    className={INPUT_CLASS}
                />
            </Field>

            <Field
                id={id("email")}
                errorId={errorId("email")}
                label="Email Address"
                errors={state.fieldErrors?.email}
            >
                <Mail size={18} className={ICON_CLASS} aria-hidden="true" />
                <input
                    id={id("email")}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    placeholder="priya@example.com"
                    defaultValue={state.values?.email ?? ""}
                    aria-invalid={state.fieldErrors?.email ? true : undefined}
                    aria-describedby={state.fieldErrors?.email ? errorId("email") : undefined}
                    className={INPUT_CLASS}
                />
            </Field>

            <Field
                id={id("phone")}
                errorId={errorId("phone")}
                label="Phone Number"
                errors={state.fieldErrors?.phone}
            >
                <Smartphone size={18} className={ICON_CLASS} aria-hidden="true" />
                <input
                    id={id("phone")}
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+91 98765 43210"
                    defaultValue={state.values?.phone ?? ""}
                    aria-invalid={state.fieldErrors?.phone ? true : undefined}
                    aria-describedby={state.fieldErrors?.phone ? errorId("phone") : undefined}
                    className={INPUT_CLASS}
                />
            </Field>

            <Field
                id={id("service")}
                errorId={errorId("service")}
                label="Service You Need"
                optional
                errors={state.fieldErrors?.service}
            >
                <ChevronDown size={18} className={ICON_CLASS} aria-hidden="true" />
                <select
                    id={id("service")}
                    name="service"
                    defaultValue={state.values?.service ?? ""}
                    aria-invalid={state.fieldErrors?.service ? true : undefined}
                    aria-describedby={state.fieldErrors?.service ? errorId("service") : undefined}
                    className={`${INPUT_CLASS} appearance-none cursor-pointer`}
                >
                    <option value="">Select a service</option>
                    {SERVICE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </Field>

            <Field
                id={id("message")}
                errorId={errorId("message")}
                label="Tell Us About Your Project"
                optional
                errors={state.fieldErrors?.message}
            >
                <MessageSquare size={18} className="absolute left-4 top-4 text-slate-500 pointer-events-none" aria-hidden="true" />
                <textarea
                    id={id("message")}
                    name="message"
                    rows={4}
                    maxLength={2000}
                    placeholder="Space type, approximate size, timeline, budget range…"
                    defaultValue={state.values?.message ?? ""}
                    aria-invalid={state.fieldErrors?.message ? true : undefined}
                    aria-describedby={state.fieldErrors?.message ? errorId("message") : undefined}
                    className={`${INPUT_CLASS} resize-y min-h-[112px]`}
                />
            </Field>

            <motion.button
                type="submit"
                disabled={isPending}
                whileHover={isPending ? undefined : { scale: 1.02 }}
                whileTap={isPending ? undefined : { scale: 0.98 }}
                className="w-full bg-gradient-to-r from-accent-400 to-accent-600 hover:from-accent-300 hover:to-accent-500 text-brand-950 font-bold py-4 rounded-xl shadow-lg shadow-accent-500/20 flex items-center justify-center gap-2 transition-all mt-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
                {isPending ? (
                    <>
                        <Loader2 size={20} className="animate-spin" aria-hidden="true" />
                        Sending…
                    </>
                ) : (
                    <>
                        Get Started Now
                        <ArrowRight size={20} aria-hidden="true" />
                    </>
                )}
            </motion.button>

            {/* Announces the pending state to screen readers without stealing focus. */}
            <p className="sr-only" role="status" aria-live="polite">
                {isPending ? "Sending your enquiry" : ""}
            </p>

            <p className="text-xs text-center text-slate-300/80 mt-4">
                By submitting, you agree to our privacy policy. Your data is secure.
            </p>
        </form>
    );
}

type FieldProps = {
    id: string;
    errorId: string;
    label: string;
    optional?: boolean;
    errors?: string[];
    children: React.ReactNode;
};

function Field({ id, errorId, label, optional, errors, children }: FieldProps) {
    return (
        <div>
            <label htmlFor={id} className={LABEL_CLASS}>
                {label}
                {optional && <span className="text-slate-300/70 font-normal"> (optional)</span>}
            </label>
            <div className="relative">{children}</div>
            {errors && errors.length > 0 && (
                <p id={errorId} className="mt-2 ml-1 text-sm font-medium text-accent-300">
                    {errors[0]}
                </p>
            )}
        </div>
    );
}

function SuccessPanel({ message }: { message: LeadFormState["message"] }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            role="status"
            aria-live="polite"
            className="flex flex-col items-center text-center py-8"
        >
            <div className="w-16 h-16 rounded-full bg-accent-400/20 border border-accent-300/40 flex items-center justify-center mb-6">
                <CheckCircle2 size={32} className="text-accent-300" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Enquiry received</h3>
            <p className="text-slate-100 leading-relaxed max-w-sm">{message}</p>
        </motion.div>
    );
}
