// load-test.js
// K6 load test script for surge preparation validation
// Install k6: brew install k6 (macOS) or see https://k6.io/docs/getting-started/installation
// Run: k6 run load-test.js

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 50 },   // Ramp up to 50 users
        { duration: '1m', target: 100 },   // Ramp up to 100 users
        { duration: '2m', target: 500 },   // Surge to 500 concurrent users
        { duration: '1m', target: 100 },   // Ramp down
        { duration: '30s', target: 0 },    // Cool down
    ],
    thresholds: {
        http_req_duration: ['p(99)<500'], // 99% of requests must complete below 500ms
        http_req_failed: ['rate<0.02'],   // Error rate must be below 2%
    },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
    // Test landing page
    const landingRes = http.get(`${BASE_URL}/`);
    check(landingRes, {
        'landing page status 200': (r) => r.status === 200,
        'landing page duration < 500ms': (r) => r.timings.duration < 500,
    });

    sleep(1);

    // Test RSVP page
    const rsvpRes = http.get(`${BASE_URL}/rsvp`);
    check(rsvpRes, {
        'RSVP page status 200': (r) => r.status === 200,
    });

    sleep(1);

    // Test warmup endpoint
    const warmupRes = http.get(`${BASE_URL}/api/warmup`);
    check(warmupRes, {
        'warmup endpoint status 200': (r) => r.status === 200,
    });

    sleep(2);
}
