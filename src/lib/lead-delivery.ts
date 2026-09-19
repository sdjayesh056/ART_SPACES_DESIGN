import { Resend } from "resend";

import { getDeliveryChannels, getLeadEnv, type LeadEnv } from "@/lib/env";
import type { LeadSubmission } from "@/types/lead";

/**
 * Delivers an enquiry to every configured channel.
 *
 * The governing rule: a submission is only reported to the visitor as sent if
 * it actually reached somewhere durable. If no channel is configured in
 * production, or every configured channel fails, this throws — the caller
 * surfaces an error and the visitor is told to phone instead. Silently
 * swallowing a failure here is the one behaviour this module must never have.
 */

export type DeliveryChannel = "email" | "webhook" | "console";

export class LeadDeliveryError extends Error {
    constructor(
        message: string,
        public readonly failures: string[] = [],
    ) {
        super(message);
        this.name = "LeadDeliveryError";
    }
}

export type DeliveryResult = {
    delivered: DeliveryChannel[];
    /** Channels that were configured but failed. Non-empty means partial delivery. */
    failed: string[];
};

/** Everything the channels need, independent of what kind of submission it is. */
type Notification = {
    kind: "lead" | "newsletter";
    subject: string;
    replyTo?: string;
    text: string;
    html: string;
    /** Raw JSON body posted to the webhook. */
    payload: Record<string, unknown>;
    /** Lines shown in the development console fallback. */
    consoleLines: string[];
};

export async function deliverLead(submission: LeadSubmission): Promise<DeliveryResult> {
    return dispatch({
        kind: "lead",
        subject: `New enquiry — ${submission.name}${submission.service ? ` · ${submission.service}` : ""}`,
        replyTo: submission.email,
        text: renderLeadText(submission),
        html: renderLeadHtml(submission),
        payload: { type: "lead", ...submission },
        consoleLines: [
            `Name:    ${submission.name}`,
            `Email:   ${submission.email}`,
            `Phone:   ${submission.phone}`,
            `Service: ${submission.service ?? "—"}`,
            `Message: ${submission.message ?? "—"}`,
            `Page:    ${submission.sourcePath}`,
        ],
    });
}

export async function deliverNewsletterSignup(signup: {
    email: string;
    submittedAt: string;
    sourcePath: string;
}): Promise<DeliveryResult> {
    return dispatch({
        kind: "newsletter",
        subject: `Newsletter signup — ${signup.email}`,
        replyTo: signup.email,
        text: [
            "New newsletter signup on the ArtSpaces Design website",
            "",
            `Email:     ${signup.email}`,
            `Submitted: ${signup.submittedAt}`,
            `Page:      ${signup.sourcePath}`,
        ].join("\n"),
        html: `
<div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;background:#f8fafc;padding:32px;">
    <div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:16px;border:1px solid #e2e8f0;padding:28px 32px;">
        <p style="margin:0;color:#14532d;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">ArtSpaces Design</p>
        <h1 style="margin:6px 0 16px;color:#0f172a;font-size:18px;font-weight:700;">New newsletter signup</h1>
        <p style="margin:0;color:#0f172a;font-size:16px;font-weight:600;">${escapeHtml(signup.email)}</p>
        <p style="margin:16px 0 0;color:#94a3b8;font-size:12px;">${escapeHtml(signup.submittedAt)} · ${escapeHtml(signup.sourcePath)}</p>
    </div>
</div>`,
        payload: { type: "newsletter", ...signup },
        consoleLines: [`Email: ${signup.email}`, `Page:  ${signup.sourcePath}`],
    });
}

async function dispatch(notification: Notification): Promise<DeliveryResult> {
    const env = getLeadEnv();
    const channels = getDeliveryChannels(env);

    if (!channels.email && !channels.webhook) {
        if (process.env.NODE_ENV === "production") {
            throw new LeadDeliveryError(
                "No delivery channel is configured. Set RESEND_API_KEY + LEAD_NOTIFY_TO + LEAD_NOTIFY_FROM, or LEAD_WEBHOOK_URL.",
            );
        }

        logToConsole(notification);
        return { delivered: ["console"], failed: [] };
    }

    const attempts = await Promise.allSettled([
        channels.email ? sendEmail(env, notification) : Promise.resolve(null),
        channels.webhook ? postWebhook(env, notification) : Promise.resolve(null),
    ]);

    const delivered: DeliveryChannel[] = [];
    const failed: string[] = [];

    for (const attempt of attempts) {
        if (attempt.status === "fulfilled") {
            if (attempt.value) delivered.push(attempt.value);
        } else {
            const reason = attempt.reason;
            failed.push(reason instanceof Error ? reason.message : String(reason));
        }
    }

    if (delivered.length === 0) {
        throw new LeadDeliveryError("Every configured delivery channel failed.", failed);
    }

    if (failed.length > 0) {
        // Partial delivery: the submission is safe, but the studio should know
        // a channel is broken before it becomes the only one.
        console.error(`[${notification.kind}] partial delivery`, { delivered, failed });
    }

    return { delivered, failed };
}

async function sendEmail(env: LeadEnv, notification: Notification): Promise<DeliveryChannel> {
    const resend = new Resend(env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
        from: env.LEAD_NOTIFY_FROM!,
        to: env.LEAD_NOTIFY_TO!,
        replyTo: notification.replyTo,
        subject: notification.subject,
        text: notification.text,
        html: notification.html,
    });

    if (error) {
        throw new Error(`Resend: ${error.message}`);
    }

    return "email";
}

async function postWebhook(env: LeadEnv, notification: Notification): Promise<DeliveryChannel> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (env.LEAD_WEBHOOK_SECRET) {
            headers["X-ArtSpaces-Signature"] = env.LEAD_WEBHOOK_SECRET;
        }

        const response = await fetch(env.LEAD_WEBHOOK_URL!, {
            method: "POST",
            headers,
            body: JSON.stringify(notification.payload),
            signal: controller.signal,
        });

        if (!response.ok) {
            throw new Error(`Webhook responded ${response.status} ${response.statusText}`);
        }

        return "webhook";
    } finally {
        clearTimeout(timeout);
    }
}

function renderLeadText(lead: LeadSubmission): string {
    return [
        "New enquiry from the ArtSpaces Design website",
        "",
        `Name:     ${lead.name}`,
        `Email:    ${lead.email}`,
        `Phone:    ${lead.phone}`,
        `Service:  ${lead.service ?? "—"}`,
        "",
        "Message:",
        lead.message ?? "—",
        "",
        `Submitted: ${lead.submittedAt}`,
        `Page:      ${lead.sourcePath}`,
    ].join("\n");
}

function renderLeadHtml(lead: LeadSubmission): string {
    const row = (label: string, value: string) => `
        <tr>
            <td style="padding:8px 16px 8px 0;color:#64748b;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
            <td style="padding:8px 0;color:#0f172a;font-size:15px;font-weight:600;">${escapeHtml(value)}</td>
        </tr>`;

    return `
<div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;background:#f8fafc;padding:32px;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
        <div style="background:#14532d;padding:24px 32px;">
            <p style="margin:0;color:#e29d08;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">ArtSpaces Design</p>
            <h1 style="margin:6px 0 0;color:#ffffff;font-size:20px;font-weight:700;">New website enquiry</h1>
        </div>
        <div style="padding:28px 32px;">
            <table style="width:100%;border-collapse:collapse;">
                ${row("Name", lead.name)}
                ${row("Email", lead.email)}
                ${row("Phone", lead.phone)}
                ${row("Service", lead.service ?? "—")}
            </table>
            ${
                lead.message
                    ? `<div style="margin-top:20px;padding-top:20px;border-top:1px solid #e2e8f0;">
                <p style="margin:0 0 8px;color:#64748b;font-size:13px;">Message</p>
                <p style="margin:0;color:#0f172a;font-size:15px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(lead.message)}</p>
            </div>`
                    : ""
            }
            <p style="margin:24px 0 0;padding-top:16px;border-top:1px solid #e2e8f0;color:#94a3b8;font-size:12px;">
                Submitted ${escapeHtml(lead.submittedAt)} from ${escapeHtml(lead.sourcePath)}.
                Reply directly to this email to reach ${escapeHtml(lead.name)}.
            </p>
        </div>
    </div>
</div>`;
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function logToConsole(notification: Notification) {
    console.warn(
        [
            "",
            "┌─────────────────────────────────────────────────────────────",
            `│ ${notification.kind.toUpperCase()} RECEIVED — development only, nothing was sent.`,
            "│ Set RESEND_API_KEY / LEAD_WEBHOOK_URL in .env.local to deliver.",
            "├─────────────────────────────────────────────────────────────",
            ...notification.consoleLines.map((line) => `│ ${line}`),
            "└─────────────────────────────────────────────────────────────",
            "",
        ].join("\n"),
    );
}
