import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendRsvpConfirmation } from '@/lib/email';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { guestId, rsvpStatus, mealPreference, dietaryNotes } = body;

        if (!guestId || !rsvpStatus) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const updatedGuest = await prisma.guest.update({
            where: { id: guestId },
            data: {
                rsvpStatus,
                mealPreference,
                dietaryNotes,
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
