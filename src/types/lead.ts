import { z } from "zod";

import { SERVICE_OPTIONS } from "@/data/lead-services";

/** Name of the honeypot input. Real visitors never see or fill it. */
export const HONEYPOT_FIELD = "company_website";

/**
 * Accepts international formats: digits with optional +, spaces, hyphens,
 * parentheses and dots. E.164 allows at most 15 digits; 8 is the shortest
 * plausible national number.
 */
const phoneSchema = z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .refine(
        (value) => /^[+()\d\s.-]+$/.test(value),
        "Use only digits, spaces and + - ( ) .",
    )
    .refine((value) => {
        const digits = value.replace(/\D/g, "").length;
        return digits >= 8 && digits <= 15;
    }, "Enter a valid phone number");

export const leadSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Please enter your full name")
        .max(100, "Name is too long"),

    email: z.email("Enter a valid email address").max(254),

    phone: phoneSchema,

    /**
     * Optional so the form still submits if the visitor skips the dropdown,
     * but constrained to the offered list so the studio's inbox stays tidy.
     */
    service: z
        .union([z.enum(SERVICE_OPTIONS), z.literal("")])
        .optional()
        .transform((value) => (value ? value : undefined)),

    message: z
        .string()
        .trim()
        .max(2000, "Please keep your message under 2000 characters")
        .optional()
        .transform((value) => (value ? value : undefined)),
});

export type Lead = z.infer<typeof leadSchema>;

/** A lead plus the request metadata the studio needs for follow-up. */
export type LeadSubmission = Lead & {
    submittedAt: string;
    sourcePath: string;
};

/** Shape returned by the server action and consumed by `useActionState`. */
export type LeadFormState = {
    status: "idle" | "success" | "error";
    message: string;
    /** Field-level validation messages, keyed by input name. */
    fieldErrors?: Partial<Record<keyof Lead, string[]>>;
    /** Echoed back so a failed submit does not wipe what the visitor typed. */
    values?: Partial<Record<keyof Lead, string>>;
};

export const initialLeadFormState: LeadFormState = {
    status: "idle",
    message: "",
};

/** Newsletter signup — a separate, much smaller contract. */
export const newsletterSchema = z.object({
    email: z.email("Enter a valid email address").max(254),
});

export type NewsletterFormState = {
    status: "idle" | "success" | "error";
    message: string;
};

export const initialNewsletterFormState: NewsletterFormState = {
    status: "idle",
    message: "",
};
