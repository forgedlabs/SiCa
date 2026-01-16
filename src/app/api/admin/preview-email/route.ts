import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { generateEmailPreview } from '@/lib/email';

export async function POST(request: Request) {
    // Check authentication
    const session = await auth();
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { emailType, subject, message } = body;

        if (!emailType || !subject || !message) {
            return NextResponse.json(
                { error: 'Missing required fields: emailType, subject, message' },
                { status: 400 }
            );
        }

        if (emailType !== 'update' && emailType !== 'reminder') {
            return NextResponse.json(
                { error: 'Invalid emailType. Must be "update" or "reminder"' },
                { status: 400 }
            );
        }

        // Generate preview HTML
        const preview = generateEmailPreview({
            emailType,
            subject,
            message,
        });

        return NextResponse.json(preview);
    } catch (error) {
        console.error('Error generating email preview:', error);
        return NextResponse.json(
            { error: 'Failed to generate preview' },
            { status: 500 }
        );
    }
}
