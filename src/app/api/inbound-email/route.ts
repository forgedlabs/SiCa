import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';

interface InboundEmail {
    from: string;
    to: string;
    subject: string;
    html: string;
    text: string;
}

/**
 * Webhook endpoint for Resend inbound emails
 * Handles plus one detail submissions via email replies
 */
export async function POST(request: Request) {
    try {
        // Verify webhook signature (recommended for production)
        const headersList = await headers();
        const signature = headersList.get('resend-signature');

        // TODO: Verify signature with Resend webhook secret
        // const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
        // if (!verifySignature(signature, webhookSecret)) {
        //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        // }

        const payload: InboundEmail = await request.json();

        console.log('[INBOUND EMAIL] Received:', {
            from: payload.from,
            to: payload.to,
            subject: payload.subject
        });

        // Extract email address from "Name <email@domain.com>" format
        const emailMatch = payload.from.match(/<(.+?)>/) || [null, payload.from];
        const senderEmail = emailMatch[1]?.toLowerCase().trim();

        if (!senderEmail) {
            console.error('[INBOUND EMAIL] Could not extract sender email');
            return NextResponse.json({ error: 'Invalid sender' }, { status: 400 });
        }

        // Find guest by email
        const guest = await prisma.guest.findFirst({
            where: { email: senderEmail }
        });

        if (!guest) {
            console.log('[INBOUND EMAIL] Guest not found:', senderEmail);
            return NextResponse.json({ error: 'Guest not found' }, { status: 404 });
        }

        // Parse email content for plus one details
        const emailBody = payload.text || payload.html;
        const parsedDetails = parsePlusOneDetails(emailBody);

        if (!parsedDetails.name) {
            console.log('[INBOUND EMAIL] Could not parse plus one name from email');
            return NextResponse.json({ error: 'Could not parse details' }, { status: 400 });
        }

        // Update guest record with plus one details
        await prisma.guest.update({
            where: { id: guest.id },
            data: {
                plusOneName: parsedDetails.name,
                plusOneConfirmed: true,
                // Optionally update other fields if provided
                ...(parsedDetails.ceremony && { mealPreference: parsedDetails.ceremony }),
                ...(parsedDetails.dietary && {
                    dietaryNotes: guest.dietaryNotes
                        ? `${guest.dietaryNotes} | Plus One: ${parsedDetails.dietary}`
                        : `Plus One: ${parsedDetails.dietary}`
                })
            }
        });

        console.log('[INBOUND EMAIL] Successfully updated guest:', {
            guestId: guest.id,
            plusOneName: parsedDetails.name
        });

        return NextResponse.json({
            success: true,
            message: 'Plus one details updated',
            guestId: guest.id
        });

    } catch (error) {
        console.error('[INBOUND EMAIL] Error processing email:', error);
        return NextResponse.json({
            error: 'Failed to process email',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}

/**
 * Parse plus one details from email body
 * Expected format:
 * Name: John Doe
 * Ceremony: Both / Traditional Only / Reception Only
 * Dietary: Vegetarian
 */
function parsePlusOneDetails(emailBody: string): {
    name?: string;
    ceremony?: string;
    dietary?: string;
} {
    const details: { name?: string; ceremony?: string; dietary?: string } = {};

    // Extract Name
    const nameMatch = emailBody.match(/Name:\s*(.+?)(?:\n|$)/i);
    if (nameMatch) {
        details.name = nameMatch[1].trim();
    }

    // Extract Ceremony preference
    const ceremonyMatch = emailBody.match(/Ceremony:\s*(.+?)(?:\n|$)/i);
    if (ceremonyMatch) {
        const ceremony = ceremonyMatch[1].trim().toLowerCase();
        if (ceremony.includes('both')) {
            details.ceremony = 'both';
        } else if (ceremony.includes('traditional')) {
            details.ceremony = 'traditional';
        } else if (ceremony.includes('reception') || ceremony.includes('ceremonial')) {
            details.ceremony = 'ceremonial';
        }
    }

    // Extract Dietary notes
    const dietaryMatch = emailBody.match(/Dietary:\s*(.+?)(?:\n|$)/i);
    if (dietaryMatch) {
        details.dietary = dietaryMatch[1].trim();
    }

    return details;
}
