import { Resend } from 'resend';
import { generateRsvpConfirmationEmail } from './email-templates/rsvp-confirmation';
import { generateRsvpDeclineEmail } from './email-templates/rsvp-decline';
import { generateUpdateEmail } from './email-templates/update-notification';
import { generateReminderEmail } from './email-templates/reminder';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.WEDDING_EMAIL_FROM || 'rsvp@sicalovestory.com';
const FROM_NAME = process.env.WEDDING_EMAIL_FROM_NAME || 'Simon & Catherine';

interface Guest {
    id: string;
    firstName: string;
    lastName: string;
    email: string | null;
    rsvpStatus: string;
    mealPreference?: string | null;
    dietaryNotes?: string | null;
}

interface EmailResult {
    success: boolean;
    messageId?: string;
    error?: string;
}

/**
 * Send RSVP confirmation email to a guest
 */
export async function sendRsvpConfirmation(
    guest: Guest,
    rsvpStatus: 'ACCEPTED' | 'DECLINED'
): Promise<EmailResult> {
    if (!guest.email) {
        return { success: false, error: 'Guest has no email address' };
    }

    try {
        let htmlContent: string;
        let subject: string;

        if (rsvpStatus === 'ACCEPTED') {
            subject = 'RSVP Confirmation - Simon & Catherine Wedding';
            htmlContent = generateRsvpConfirmationEmail({
                firstName: guest.firstName,
                lastName: guest.lastName,
                ceremonyPreference: guest.mealPreference || undefined,
                dietaryNotes: guest.dietaryNotes || undefined,
            });
        } else {
            subject = 'RSVP Received - Simon & Catherine Wedding';
            htmlContent = generateRsvpDeclineEmail({
                firstName: guest.firstName,
                lastName: guest.lastName,
            });
        }

        const { data, error } = await resend.emails.send({
            from: `${FROM_NAME} <${FROM_EMAIL}>`,
            to: guest.email,
            subject,
            html: htmlContent,
        });

        if (error) {
            console.error('Resend error:', error);
            return { success: false, error: error.message };
        }

        return { success: true, messageId: data?.id };
    } catch (error) {
        console.error('Error sending RSVP confirmation:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

/**
 * Send update/announcement email to multiple guests
 */
export async function sendUpdateEmail(
    guests: Guest[],
    subject: string,
    message: string
): Promise<{ successCount: number; failureCount: number; results: EmailResult[] }> {
    const results: EmailResult[] = [];
    let successCount = 0;
    let failureCount = 0;

    for (const guest of guests) {
        if (!guest.email) {
            results.push({ success: false, error: 'No email address' });
            failureCount++;
            continue;
        }

        try {
            const htmlContent = generateUpdateEmail({
                firstName: guest.firstName,
                lastName: guest.lastName,
                subject,
                message,
            });

            const { data, error } = await resend.emails.send({
                from: `${FROM_NAME} <${FROM_EMAIL}>`,
                to: guest.email,
                subject: `${subject} - Simon & Catherine Wedding`,
                html: htmlContent,
            });

            if (error) {
                console.error(`Error sending to ${guest.email}:`, error);
                results.push({ success: false, error: error.message });
                failureCount++;
            } else {
                results.push({ success: true, messageId: data?.id });
                successCount++;
            }

            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
            console.error(`Error sending to ${guest.email}:`, error);
            results.push({
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            });
            failureCount++;
        }
    }

    return { successCount, failureCount, results };
}

/**
 * Send reminder email to multiple guests
 */
export async function sendReminderEmail(
    guests: Guest[],
    reminderType: 'one_month' | 'two_weeks' | 'one_week' | 'custom',
    customMessage?: string
): Promise<{ successCount: number; failureCount: number; results: EmailResult[] }> {
    const results: EmailResult[] = [];
    let successCount = 0;
    let failureCount = 0;

    for (const guest of guests) {
        if (!guest.email) {
            results.push({ success: false, error: 'No email address' });
            failureCount++;
            continue;
        }

        try {
            const htmlContent = generateReminderEmail({
                firstName: guest.firstName,
                lastName: guest.lastName,
                reminderType,
                customMessage,
                rsvpStatus: guest.rsvpStatus,
            });

            const { data, error } = await resend.emails.send({
                from: `${FROM_NAME} <${FROM_EMAIL}>`,
                to: guest.email,
                subject: 'Wedding Reminder - Simon & Catherine',
                html: htmlContent,
            });

            if (error) {
                console.error(`Error sending to ${guest.email}:`, error);
                results.push({ success: false, error: error.message });
                failureCount++;
            } else {
                results.push({ success: true, messageId: data?.id });
                successCount++;
            }

            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
            console.error(`Error sending to ${guest.email}:`, error);
            results.push({
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            });
            failureCount++;
        }
    }

    return { successCount, failureCount, results };
}
