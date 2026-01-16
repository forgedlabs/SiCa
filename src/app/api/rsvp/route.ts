import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendRsvpConfirmation, sendPlusOneFollowup } from '@/lib/email';
import { isRateLimited } from '@/lib/rateLimiter';

export async function POST(request: Request) {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (isRateLimited(ip)) {
        return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    try {
        const body = await request.json();
        const { guestId, rsvpStatus, mealPreference, dietaryNotes, hasPlusOne } = body;

        if (!guestId || !rsvpStatus) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Generate token if plus one
        const plusOneToken = hasPlusOne && rsvpStatus === 'ACCEPTED' ? crypto.randomUUID() : undefined;

        // @ts-ignore - plusOneToken may not be in Prisma type yet
        const updatedGuest = await prisma.guest.update({
            where: { id: guestId },
            data: {
                rsvpStatus,
                mealPreference,
                dietaryNotes,
                hasPlusOne: hasPlusOne || false,
                plusOneToken,
                emailConfirmationSent: false,
                lastEmailSentAt: new Date(),
            },
        });

        // Send emails
        if (updatedGuest.email) {
            const result = await sendRsvpConfirmation(updatedGuest, rsvpStatus as 'ACCEPTED' | 'DECLINED');
            if (result.success) {
                await prisma.guest.update({ where: { id: guestId }, data: { emailConfirmationSent: true } });
            } else {
                console.error(`Failed to send RSVP email to ${updatedGuest.email}:`, result.error);
            }

            if (hasPlusOne && rsvpStatus === 'ACCEPTED' && plusOneToken) {
                const plusOneResult = await sendPlusOneFollowup({
                    firstName: updatedGuest.firstName,
                    lastName: updatedGuest.lastName,
                    email: updatedGuest.email,
                    token: plusOneToken,
                });
                if (!plusOneResult.success) {
                    console.error(`Failed to send plus one email to ${updatedGuest.email}:`, plusOneResult.error);
                }
            }
        }

        return NextResponse.json(updatedGuest);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to submit RSVP' }, { status: 500 });
    }
}
