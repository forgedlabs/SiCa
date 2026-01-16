// src/lib/rateLimiter.ts
/**
 * Simple in-memory rate limiter.
 * Allows `maxRequests` per `windowMs` per IP address.
 * This is sufficient for a quick surge-protection measure.
 */
interface RateInfo {
    count: number;
    firstRequestTs: number;
}

const maxRequests = 10; // per window
const windowMs = 60 * 1000; // 1 minute

const ipMap = new Map<string, RateInfo>();

export function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const info = ipMap.get(ip);
    if (!info) {
        ipMap.set(ip, { count: 1, firstRequestTs: now });
        return false;
    }
    // Reset window if elapsed
    if (now - info.firstRequestTs > windowMs) {
        ipMap.set(ip, { count: 1, firstRequestTs: now });
        return false;
    }
    // Increment count
    info.count += 1;
    if (info.count > maxRequests) {
        return true;
    }
    return false;
}
