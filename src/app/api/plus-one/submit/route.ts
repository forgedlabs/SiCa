import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { isRateLimited } from '@/lib/rateLimiter';

/**
 * Submit plus one details via form
 */
export async function POST(request: Request) {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (isRateLimited(ip)) {
        return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }
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

        // Check if already submitted
        if (guest.plusOneConfirmed) {
            return NextResponse.json({
                error: 'Plus one details already submitted'
            }, { status: 400 });
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

        // Send confirmation email to main guest
        if (guest.email) {
            try {
                const { sendPlusOneConfirmation } = await import('@/lib/email');
                await sendPlusOneConfirmation(
                    {
                        firstName: guest.firstName,
                        lastName: guest.lastName,
                        email: guest.email
                    },
                    plusOneName.trim(),
                    ceremony,
                    dietary
                );
            } catch (emailError) {
                console.error('[PLUS ONE] Failed to send confirmation email:', emailError);
                // Don't fail the operation if email fails
            }
        }

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
