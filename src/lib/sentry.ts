// src/lib/sentry.ts
import * as Sentry from '@sentry/nextjs';

export function initSentry() {
    // Sentry is auto-initialized via sentry.*.config.ts files
    if (process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN) {
        console.log('[Sentry] Initialized');
    } else {
        console.warn('[Sentry] DSN not configured. Set SENTRY_DSN environment variable.');
    }
}

export const captureException = Sentry.captureException;
export const captureMessage = Sentry.captureMessage;
