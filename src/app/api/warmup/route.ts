// src/app/api/warmup/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
    // Simple health check to keep edge functions warm
    return NextResponse.json({ status: 'ok' }, { status: 200 });
}
