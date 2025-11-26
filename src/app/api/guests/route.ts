import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/auth';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const guests = await prisma.guest.findMany({
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
        console.error(error);
        return NextResponse.json({ error: 'Failed to create guest' }, { status: 500 });
    }
}
