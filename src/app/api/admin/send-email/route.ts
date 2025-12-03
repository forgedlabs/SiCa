import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/auth';
import { sendUpdateEmail, sendReminderEmail } from '@/lib/email';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    // Require authentication
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { emailType, subject, message, recipientFilter, reminderType } = body;

        if (!emailType) {
            return NextResponse.json({ error: 'Email type is required' }, { status: 400 });
        }

        // Build query based on recipient filter
        let whereClause: any = {};

        if (recipientFilter) {
            if (recipientFilter.rsvpStatus && recipientFilter.rsvpStatus !== 'all') {
                whereClause.rsvpStatus = recipientFilter.rsvpStatus;
            }
            if (recipientFilter.guestRelationship && recipientFilter.guestRelationship !== 'all') {
                whereClause.guestRelationship = recipientFilter.guestRelationship;
            }
        }

        // Fetch matching guests
        const guests = await prisma.guest.findMany({
            where: whereClause,
        });

        // Filter out guests without email addresses
        const guestsWithEmail = guests.filter(g => g.email);

        if (guestsWithEmail.length === 0) {
            return NextResponse.json({
                error: 'No guests with email addresses match the selected filters'
            }, { status: 400 });
        }

        let result;

        // Send appropriate email type
        if (emailType === 'update') {
            if (!subject || !message) {
                return NextResponse.json({
                    error: 'Subject and message are required for update emails'
                }, { status: 400 });
            }

            result = await sendUpdateEmail(guestsWithEmail, subject, message);
        } else if (emailType === 'reminder') {
            const reminderTypeValue = reminderType || 'custom';
            result = await sendReminderEmail(guestsWithEmail, reminderTypeValue, message);
        } else {
            return NextResponse.json({ error: 'Invalid email type' }, { status: 400 });
        }

        // Update lastEmailSentAt for successfully sent emails
        const successfulGuestIds = guestsWithEmail
            .filter((_, index) => result.results[index]?.success)
            .map(g => g.id);

        if (successfulGuestIds.length > 0) {
            await prisma.guest.updateMany({
                where: { id: { in: successfulGuestIds } },
                data: { lastEmailSentAt: new Date() }
            });
        }

        return NextResponse.json({
            success: true,
            totalRecipients: guestsWithEmail.length,
            successCount: result.successCount,
            failureCount: result.failureCount,
            details: result.results
        });
    } catch (error) {
        console.error('Error sending emails:', error);
        return NextResponse.json({
            error: 'Failed to send emails',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
