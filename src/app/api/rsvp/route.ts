import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendRsvpConfirmation, sendPlusOneFollowup } from '@/lib/email';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { guestId, rsvpStatus, mealPreference, dietaryNotes, hasPlusOne } = body;

        if (!guestId || !rsvpStatus) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Generate unique token for plus one form if guest is bringing a plus one
        const plusOneToken = hasPlusOne && rsvpStatus === 'ACCEPTED'
            ? crypto.randomUUID()
            : undefined;

        const updatedGuest = await prisma.guest.update({
            where: { id: guestId },
            data: {
                rsvpStatus,
                mealPreference,
                dietaryNotes,
                hasPlusOne: hasPlusOne || false,
                plusOneToken,
                emailConfirmationSent: false, // Will be updated after email send
                lastEmailSentAt: new Date()
            }
        });

        // Send confirmation email
        if (updatedGuest.email) {
            try {
                const result = await sendRsvpConfirmation(updatedGuest, rsvpStatus as 'ACCEPTED' | 'DECLINED');
                if (result.success) {
                    // Update the guest record to mark email as sent
                    await prisma.guest.update({
                        where: { id: guestId },
                        data: { emailConfirmationSent: true }
                    });
                } else {
                    console.error(`Failed to send RSVP email to ${updatedGuest.email}:`, result.error);
                }

                // Send plus one follow-up if guest is bringing a plus one
                if (hasPlusOne && rsvpStatus === 'ACCEPTED' && plusOneToken) {
                    const plusOneResult = await sendPlusOneFollowup({
                        firstName: updatedGuest.firstName,
                        lastName: updatedGuest.lastName,
                        email: updatedGuest.email,
                        token: plusOneToken
                    });
                    if (!plusOneResult.success) {
                        console.error(`Failed to send plus one email to ${updatedGuest.email}:`, plusOneResult.error);
                    }
                }
            } catch (error) {
                console.error('Email send error:', error);
            }
        }

        return NextResponse.json(updatedGuest);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to submit RSVP' }, { status: 500 });
    }
}
