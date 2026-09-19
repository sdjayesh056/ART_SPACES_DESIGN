"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { deliverLead, deliverNewsletterSignup } from "@/lib/lead-delivery";
import { rateLimit } from "@/lib/rate-limit";
import {
    HONEYPOT_FIELD,
    leadSchema,
    newsletterSchema,
    type LeadFormState,
    type NewsletterFormState,
} from "@/types/lead";

const GENERIC_ERROR =
    "Something went wrong on our side and your enquiry was not sent. Please call us on the number in the footer, or email hello@artspaces.design.";

/**
 * Handles the main enquiry form. Signature matches React's `useActionState`:
 * `(previousState, formData) => nextState`.
 */
export async function submitLead(
    _previous: LeadFormState,
    formData: FormData,
): Promise<LeadFormState> {
    const values = {
        name: readField(formData, "name"),
        email: readField(formData, "email"),
        phone: readField(formData, "phone"),
        service: readField(formData, "service"),
        message: readField(formData, "message"),
    };

    // Honeypot: a real visitor never sees this input. Report success so the bot
    // stops retrying, but deliver nothing.
    if (readField(formData, HONEYPOT_FIELD)) {
        console.warn("[lead] honeypot triggered, submission dropped");
        return { status: "success", message: successMessage() };
    }

    const limit = await enforceRateLimit("lead", { limit: 5, windowMs: 10 * 60 * 1000 });
    if (limit) {
        return { status: "error", message: limit, values };
    }

    const parsed = leadSchema.safeParse(values);
    if (!parsed.success) {
        const { fieldErrors } = z.flattenError(parsed.error);
        return {
            status: "error",
            message: "Please check the highlighted fields and try again.",
            fieldErrors,
            values,
        };
    }

    try {
        await deliverLead({
            ...parsed.data,
            submittedAt: new Date().toISOString(),
            sourcePath: await readSourcePath(),
        });
    } catch (error) {
        // Log the full reason server-side; never leak configuration detail to
        // the visitor, and never report an undelivered lead as sent.
        console.error("[lead] delivery failed", error);
        return { status: "error", message: GENERIC_ERROR, values };
    }

    return { status: "success", message: successMessage() };
}

/** Handles the footer newsletter strip. */
export async function subscribeNewsletter(
    _previous: NewsletterFormState,
    formData: FormData,
): Promise<NewsletterFormState> {
    if (readField(formData, HONEYPOT_FIELD)) {
        console.warn("[newsletter] honeypot triggered, submission dropped");
        return { status: "success", message: "Thanks — you're on the list." };
    }

    const limit = await enforceRateLimit("newsletter", { limit: 3, windowMs: 10 * 60 * 1000 });
    if (limit) {
        return { status: "error", message: limit };
    }

    const parsed = newsletterSchema.safeParse({ email: readField(formData, "email") });
    if (!parsed.success) {
        const { fieldErrors } = z.flattenError(parsed.error);
        return {
            status: "error",
            message: fieldErrors.email?.[0] ?? "Enter a valid email address.",
        };
    }

    try {
        await deliverNewsletterSignup({
            email: parsed.data.email,
            submittedAt: new Date().toISOString(),
            sourcePath: await readSourcePath(),
        });
    } catch (error) {
        console.error("[newsletter] delivery failed", error);
        return {
            status: "error",
            message: "We couldn't sign you up just now. Please try again shortly.",
        };
    }

    return { status: "success", message: "Thanks — you're on the list." };
}

function successMessage(): string {
    return "Thank you — your enquiry is with our team. We'll be in touch within 24 hours.";
}

function readField(formData: FormData, name: string): string {
    const value = formData.get(name);
    return typeof value === "string" ? value.trim() : "";
}

/**
 * Best-effort client identifier for rate limiting. Behind a proxy or CDN the
 * real address is the first entry of `x-forwarded-for`.
 */
async function clientKey(scope: string): Promise<string> {
    const headerList = await headers();
    const forwarded = headerList.get("x-forwarded-for")?.split(",")[0]?.trim();
    const ip = forwarded || headerList.get("x-real-ip") || "unknown";
    return `${scope}:${ip}`;
}

/** Returns a visitor-facing message when the caller is over the limit, else null. */
async function enforceRateLimit(
    scope: string,
    options: { limit: number; windowMs: number },
): Promise<string | null> {
    const { allowed, retryAfterSeconds } = rateLimit(await clientKey(scope), options);
    if (allowed) return null;

    const minutes = Math.ceil(retryAfterSeconds / 60);
    return `Too many submissions. Please try again in ${minutes} minute${minutes === 1 ? "" : "s"}.`;
}

async function readSourcePath(): Promise<string> {
    const headerList = await headers();
    const referer = headerList.get("referer");
    if (!referer) return "/";

    try {
        return new URL(referer).pathname;
    } catch {
        return "/";
    }
}
