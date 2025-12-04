import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET(request: Request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Parse query parameters for filtering
        const { searchParams } = new URL(request.url);
        const rsvpStatus = searchParams.get('rsvpStatus');
        const guestRelationship = searchParams.get('guestRelationship');

        // Build where clause based on query params
        const whereClause: any = {};

        if (rsvpStatus && rsvpStatus !== 'all') {
            whereClause.rsvpStatus = rsvpStatus;
        }

        if (guestRelationship && guestRelationship !== 'all') {
            whereClause.guestRelationship = guestRelationship;
        }

        const guests = await prisma.guest.findMany({
            where: whereClause,
            include: { table: true },
            orderBy: { lastName: 'asc' }
        });
        return NextResponse.json(guests);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch guests' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await auth();
    // Allow public POST for RSVP, but we need a userId to associate the guest with.

    try {
        const body = await request.json();
        const { firstName, lastName, email, phone, address, city, state, zip, guestRelationship, partyId } = body;

        let userId = session?.user?.id;

        if (!userId) {
            // Fallback to the first user (Admin) for public RSVPs
            const defaultUser = await prisma.user.findFirst();
            if (defaultUser) {
                userId = defaultUser.id;
            } else {
                // Create a default admin user if none exists
                const newUser = await prisma.user.create({
                    data: {
                        email: 'admin@example.com',
                        name: 'Admin',
                        role: 'ADMIN'
                    }
                });
                userId = newUser.id;
            }
        }

        if (!userId) return NextResponse.json({ error: 'No user found to associate guest with' }, { status: 400 });

        // Note: All fields are present in the generated Prisma client.
        // If your IDE reports an error here, it may be due to a stale TypeScript server.
        const guest = await prisma.guest.create({
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
                partyId,
                userId
            }
        });
        return NextResponse.json(guest);
    } catch (error) {
        console.error('Error creating guest:', error);
        return NextResponse.json({
            error: 'Failed to create guest',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
