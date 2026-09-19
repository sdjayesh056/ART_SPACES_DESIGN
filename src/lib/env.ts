import { z } from "zod";

/**
 * Server-only environment contract for lead delivery.
 *
 * Parsed lazily rather than at module scope: a server action's module graph is
 * evaluated during `next build`, so throwing at import time would make the
 * build fail on any machine that has not configured delivery yet. Instead the
 * contract is enforced at the point of use — see `deliverLead` in
 * src/lib/lead-delivery.ts, which treats an unconfigured production
 * environment as a hard failure and never reports an undelivered lead as sent.
 */

const leadEnvSchema = z.object({
    /** Resend API key. Required for the email channel. */
    RESEND_API_KEY: z.string().trim().min(1).optional(),

    /** Studio inbox that receives new enquiries. */
    LEAD_NOTIFY_TO: z.email().optional(),

    /**
     * From address. Not validated as a bare email because the display-name
     * form — `ArtSpaces Design <hello@artspaces.design>` — is also valid.
     */
    LEAD_NOTIFY_FROM: z.string().trim().min(1).optional(),

    /** Endpoint that receives a JSON POST per lead. */
    LEAD_WEBHOOK_URL: z.url().optional(),

    /** Optional shared secret sent as `X-ArtSpaces-Signature`. */
    LEAD_WEBHOOK_SECRET: z.string().trim().min(1).optional(),

    /** Canonical origin, no trailing slash. Used by metadata and sitemap. */
    NEXT_PUBLIC_SITE_URL: z.url().optional(),
});

export type LeadEnv = z.infer<typeof leadEnvSchema>;

export type DeliveryChannels = {
    email: boolean;
    webhook: boolean;
};

export class EnvError extends Error {
    constructor(public readonly issues: string[]) {
        super(`Invalid environment configuration:\n  - ${issues.join("\n  - ")}`);
        this.name = "EnvError";
    }
}

let cached: LeadEnv | undefined;

/**
 * Reads and validates the lead-delivery environment. Empty strings are treated
 * as "not set" so that a scaffolded `.env.local` with blank values behaves the
 * same as no file at all.
 *
 * @throws {EnvError} if a variable is present but malformed.
 */
export function getLeadEnv(): LeadEnv {
    if (cached) return cached;

    const raw = {
        RESEND_API_KEY: emptyToUndefined(process.env.RESEND_API_KEY),
        LEAD_NOTIFY_TO: emptyToUndefined(process.env.LEAD_NOTIFY_TO),
        LEAD_NOTIFY_FROM: emptyToUndefined(process.env.LEAD_NOTIFY_FROM),
        LEAD_WEBHOOK_URL: emptyToUndefined(process.env.LEAD_WEBHOOK_URL),
        LEAD_WEBHOOK_SECRET: emptyToUndefined(process.env.LEAD_WEBHOOK_SECRET),
        NEXT_PUBLIC_SITE_URL: emptyToUndefined(process.env.NEXT_PUBLIC_SITE_URL),
    };

    const parsed = leadEnvSchema.safeParse(raw);

    if (!parsed.success) {
        const { fieldErrors } = z.flattenError(parsed.error);
        const issues = Object.entries(fieldErrors).map(
            ([key, messages]) => `${key}: ${messages?.join(", ") ?? "invalid"}`,
        );
        throw new EnvError(issues);
    }

    cached = parsed.data;
    return cached;
}

/**
 * Which delivery channels are fully configured. A channel is only active when
 * every variable it needs is present — a half-configured channel is reported
 * as off rather than failing at send time.
 */
export function getDeliveryChannels(env: LeadEnv = getLeadEnv()): DeliveryChannels {
    return {
        email: Boolean(env.RESEND_API_KEY && env.LEAD_NOTIFY_TO && env.LEAD_NOTIFY_FROM),
        webhook: Boolean(env.LEAD_WEBHOOK_URL),
    };
}

function emptyToUndefined(value: string | undefined): string | undefined {
    const trimmed = value?.trim();
    return trimmed ? trimmed : undefined;
}
