import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/auth';

const prisma = new PrismaClient();

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;
        const body = await request.json();

        // Extract allowed fields to prevent arbitrary updates
        const {
            firstName,
            lastName,
            email,
            phone,
            address,
            city,
            state,
            zip,
            guestRelationship,
            rsvpStatus,
            mealPreference,
            dietaryNotes,
            tableId
        } = body;

        const updatedGuest = await prisma.guest.update({
            where: { id },
            data: {
                firstName,
                lastName,
                email,
                phone,
                address,
                city,
                state,
                zip,
                guestRelationship,
                rsvpStatus,
                mealPreference,
                dietaryNotes,
                tableId
            }
        });

        return NextResponse.json(updatedGuest);
    } catch (error) {
        console.error('Error updating guest:', error);
        return NextResponse.json(
            { error: 'Failed to update guest' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;
        await prisma.guest.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting guest:', error);
        return NextResponse.json(
            { error: 'Failed to delete guest' },
            { status: 500 }
        );
    }
}
