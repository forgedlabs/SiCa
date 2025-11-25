import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
                dietaryNotes
            }
        });

        return NextResponse.json(updatedGuest);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to submit RSVP' }, { status: 500 });
    }
}
