import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * Validate plus one token and return guest info
 */
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get('token');

        if (!token) {
            return NextResponse.json({ error: 'Token required' }, { status: 400 });
        }

        const guest = await prisma.guest.findUnique({
            where: { plusOneToken: token },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                hasPlusOne: true,
                plusOneConfirmed: true
            }
        });

        if (!guest || !guest.hasPlusOne) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 404 });
        }

        return NextResponse.json({
            firstName: guest.firstName,
            lastName: guest.lastName,
            alreadySubmitted: guest.plusOneConfirmed
        });

    } catch (error) {
        console.error('[PLUS ONE VALIDATE] Error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
