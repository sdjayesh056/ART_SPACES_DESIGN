/**
 * Minimal in-memory sliding-window rate limiter.
 *
 * LIMITATION — read before relying on this: the window lives in the memory of
 * a single server instance. On serverless or multi-instance hosting each
 * instance keeps its own counter, so the effective limit is
 * `limit x instances`. That is enough to stop a naive script hammering one
 * endpoint, and it is not enough to stop a distributed flood. Move to a shared
 * store (Upstash Redis / Vercel KV) before this site carries real traffic.
 */

type Window = {
    hits: number[];
};

const windows = new Map<string, Window>();

/** Entries older than this are dropped on the next sweep. */
const SWEEP_AFTER_MS = 60 * 60 * 1000;
let lastSweep = 0;

export type RateLimitResult = {
    allowed: boolean;
    /** Seconds until the caller may retry. Zero when allowed. */
    retryAfterSeconds: number;
};

export function rateLimit(
    key: string,
    { limit, windowMs }: { limit: number; windowMs: number },
): RateLimitResult {
    const now = Date.now();
    sweep(now);

    const window = windows.get(key) ?? { hits: [] };
    const cutoff = now - windowMs;
    const hits = window.hits.filter((at) => at > cutoff);

    if (hits.length >= limit) {
        const oldest = hits[0] ?? now;
        const retryAfterSeconds = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000));
        windows.set(key, { hits });
        return { allowed: false, retryAfterSeconds };
    }

    hits.push(now);
    windows.set(key, { hits });
    return { allowed: true, retryAfterSeconds: 0 };
}

/** Drops keys that have seen no traffic for an hour, so the map cannot grow without bound. */
function sweep(now: number) {
    if (now - lastSweep < SWEEP_AFTER_MS) return;
    lastSweep = now;

    for (const [key, window] of windows) {
        const newest = window.hits[window.hits.length - 1];
        if (newest === undefined || now - newest > SWEEP_AFTER_MS) {
            windows.delete(key);
        }
    }
}
