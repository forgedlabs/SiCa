import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * Submit plus one details via form
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { token, plusOneName, ceremony, dietary } = body;

        if (!token || !plusOneName || !ceremony) {
            return NextResponse.json({
                error: 'Missing required fields'
            }, { status: 400 });
        }

        // Find guest by token
        const guest = await prisma.guest.findUnique({
            where: { plusOneToken: token }
        });

        if (!guest || !guest.hasPlusOne) {
            return NextResponse.json({
                error: 'Invalid token'
            }, { status: 404 });
        }

        // Update guest with plus one details
        const updatedGuest = await prisma.guest.update({
            where: { id: guest.id },
            data: {
                plusOneName: plusOneName.trim(),
                plusOneConfirmed: true,
                // Append dietary notes for plus one
                dietaryNotes: dietary
                    ? (guest.dietaryNotes
                        ? `${guest.dietaryNotes} | Plus One: ${dietary.trim()}`
                        : `Plus One: ${dietary.trim()}`)
                    : guest.dietaryNotes
            }
        });

        console.log('[PLUS ONE SUBMIT] Success:', {
            guestId: guest.id,
            guestName: `${guest.firstName} ${guest.lastName}`,
            plusOneName: plusOneName.trim()
        });

        return NextResponse.json({
            success: true,
            message: 'Plus one details saved'
        });

    } catch (error) {
        console.error('[PLUS ONE SUBMIT] Error:', error);
        return NextResponse.json({
            error: 'Failed to save details',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
