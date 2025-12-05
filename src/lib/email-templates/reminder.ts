import { EMAIL_LOGO_BASE64 } from './logo';

interface ReminderData {
  firstName: string;
  lastName: string;
  reminderType: 'one_month' | 'two_weeks' | 'one_week' | 'custom';
  customMessage?: string;
  rsvpStatus?: string;
}

export function generateReminderEmail(data: ReminderData): string {
  const { firstName, lastName, reminderType, customMessage, rsvpStatus } = data;

  let mainMessage = '';
  let timeframeText = '';

  switch (reminderType) {
    case 'one_month':
      timeframeText = 'ONE MONTH';
      mainMessage = 'We can\'t believe it\'s only one month until our wedding day. We\'re so excited to celebrate with you.';
      break;
    case 'two_weeks':
      timeframeText = 'TWO WEEKS';
      mainMessage = 'Our wedding is just two weeks away. We hope you\'re as excited as we are to celebrate together.';
      break;
    case 'one_week':
      timeframeText = 'ONE WEEK';
      mainMessage = 'The big day is almost here – just one week to go. We can\'t wait to see you and celebrate this special moment together.';
      break;
    case 'custom':
      timeframeText = 'REMINDER';
      mainMessage = customMessage || 'We wanted to reach out with an important update about our wedding.';
      break;
  }

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wedding Reminder</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: #ffffff; color: #000000;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #ffffff;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff;">
          
          <!-- Logo & Header -->
          <tr>
            <td style="padding: 40px 40px 32px 40px; text-align: center; border-bottom: 1px solid #000000;">
              <img src="https://i.imgur.com/HIuEHCC.jpeg" alt="SICA" style="width: 120px; height: auto; margin-bottom: 24px;" />
              <p style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 36px; font-weight: 400; color: #000000; letter-spacing: 0.15em; text-transform: uppercase; line-height: 1.2;">SIMON</p>
              <p style="margin: 8px 0; font-family: Georgia, 'Times New Roman', serif; font-size: 32px; font-weight: 400; color: #000000; font-style: italic;">&amp;</p>
              <p style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 36px; font-weight: 400; color: #000000; letter-spacing: 0.15em; text-transform: uppercase; line-height: 1.2;">CATHERINE</p>
            </td>
          </tr>

          <!-- Countdown Badge -->
          <tr>
            <td style="padding: 40px 40px 0 40px; text-align: center;">
              <div style="display: inline-block; padding: 16px 40px; background-color: #000000;">
                <p style="margin: 0; font-size: 13px; letter-spacing: 0.15em; text-transform: uppercase; color: #ffffff; font-weight: 500;">${timeframeText} UNTIL THE WEDDING</p>
              </div>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 40px;">
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.8; color: #000000;">Dear ${firstName} ${lastName},</p>
              
              <p style="margin: 0 0 32px 0; font-size: 15px; line-height: 1.8; color: #000000;">${mainMessage}</p>

              ${rsvpStatus === 'PENDING' ? `
              <div style="margin: 0 0 32px 0; padding: 20px; background-color: #f5f5f5; border-left: 2px solid #000000;">
                <p style="margin: 0 0 8px 0; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #666666; font-weight: 500;">RSVP Reminder</p>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #000000;">We haven't received your RSVP yet. Please let us know if you'll be able to join us.</p>
              </div>
              ` : ''}

              <!-- Event Details -->
              <div style="margin: 32px 0; padding-top: 32px; border-top: 1px solid #e0e0e0;">
                <p style="margin: 0 0 20px 0; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #666666; font-weight: 500;">Event Details</p>
                
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                      <p style="margin: 0; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #666666;">Date</p>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; text-align: right;">
                      <p style="margin: 0; font-size: 14px; color: #000000;">May 30, 2026</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                      <p style="margin: 0; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #666666;">Location</p>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; text-align: right;">
                      <p style="margin: 0; font-size: 14px; color: #000000;">Amsterdam, NL</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0;">
                      <p style="margin: 0; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #666666;">Time</p>
                    </td>
                    <td style="padding: 12px 0; text-align: right;">
                      <p style="margin: 0; font-size: 14px; color: #000000;">See full schedule</p>
                    </td>
                  </tr>
                </table>
              </div>

              <p style="margin: 40px 0 0 0; font-size: 15px; color: #000000;">— Simon & Catherine</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px 40px; text-align: center; border-top: 1px solid #e0e0e0; background-color: #fafafa;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #666666;">Questions? Please reach out to us.</p>
              <p style="margin: 0; font-size: 11px; color: #999999; letter-spacing: 0.05em;">© 2026 SIMON & CATHERINE</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
