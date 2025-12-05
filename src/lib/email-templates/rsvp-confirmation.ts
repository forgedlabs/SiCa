import { EMAIL_LOGO_BASE64 } from './logo';

interface RsvpConfirmationData {
  firstName: string;
  lastName: string;
  ceremonyPreference?: string;
  dietaryNotes?: string;
}

export function generateRsvpConfirmationEmail(data: RsvpConfirmationData): string {
  const { firstName, lastName, ceremonyPreference, dietaryNotes } = data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RSVP Confirmation</title>
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
              <h1 style="margin: 0; font-family: Georgia, serif; font-size: 32px;font-weight: 400; color: #000000; letter-spacing: 0.1em; text-transform: uppercase;">Simon & Catherine</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 48px 40px;">
              <h2 style="margin: 0 0 32px 0; font-family: Georgia, serif; font-size: 24px; font-weight: 400; color: #000000; letter-spacing: 0.05em;">RSVP CONFIRMED</h2>
              
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.8; color: #000000;">Dear ${firstName} ${lastName},</p>
              
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.8; color: #000000;">Thank you for your RSVP!</p>
              
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.8; color: #000000;">We’re so excited that you’ll be celebrating with us. We’ve received your response, and we can’t wait to share our wedding day with you on 30 May 2026.</p>

              <p style="margin: 0 0 32px 0; font-size: 15px; line-height: 1.8; color: #000000;">Get ready for a day filled with love, joy, laughter, dancing, and memories we’ll cherish forever.</p>

              ${ceremonyPreference ? `
              <div style="margin: 0 0 24px 0; padding: 24px; background-color: #f5f5f5; border-left: 2px solid #000000;">
                <p style="margin: 0 0 8px 0; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #666666; font-weight: 500;">Ceremony Attendance</p>
                <p style="margin: 0; font-size: 15px; color: #000000;">${ceremonyPreference === 'both' ? 'Both Ceremonies' : ceremonyPreference === 'traditional' ? 'Traditional Ceremony Only' : 'Ceremonial Exchange & Reception Only'}</p>
              </div>
              ` : ''}

              ${dietaryNotes ? `
              <div style="margin: 0 0 32px 0; padding: 24px; background-color: #f5f5f5; border-left: 2px solid #000000;">
                <p style="margin: 0 0 8px 0; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #666666; font-weight: 500;">Dietary Notes</p>
                <p style="margin: 0; font-size: 15px; color: #000000;">${dietaryNotes}</p>
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

              <p style="margin: 40px 0 0 0; font-size: 15px; line-height: 1.8; color: #000000;">If you need to make any changes or have questions about the events, feel free to reach out anytime.</p>
              
              <p style="margin: 24px 0 0 0; font-size: 15px; color: #000000;">With love,<br>Simon & Catherine</p>
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

