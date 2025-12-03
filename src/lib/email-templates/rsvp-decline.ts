import { EMAIL_LOGO_BASE64 } from './logo';

interface RsvpDeclineData {
  firstName: string;
  lastName: string;
}

export function generateRsvpDeclineEmail(data: RsvpDeclineData): string {
  const { firstName, lastName } = data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RSVP Received</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: #ffffff; color: #000000;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #ffffff;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff;">
          
          <!-- Logo & Header -->
          <tr>
            <td style="padding: 40px 40px 32px 40px; text-align: center; border-bottom: 1px solid #000000;">
              <img src="${EMAIL_LOGO_BASE64}" alt="SICA" style="width: 120px; height: auto; margin-bottom: 24px;" />
              <h1 style="margin: 0; font-family: Georgia, serif; font-size: 32px; font-weight: 400; color: #000000; letter-spacing: 0.1em; text-transform: uppercase;">Simon & Catherine</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 48px 40px;">
              <h2 style="margin: 0 0 32px 0; font-family: Georgia, serif; font-size: 24px; font-weight: 400; color: #000000; letter-spacing: 0.05em;">RSVP RECEIVED</h2>
              
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.8; color: #000000;">Dear ${firstName} ${lastName},</p>
              
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.8; color: #000000;">Thank you for taking the time to respond to our wedding invitation. While we are sorry you won't be able to join us on our special day, we truly appreciate you letting us know.</p>

              <p style="margin: 0 0 32px 0; font-size: 15px; line-height: 1.8; color: #000000;">You will be in our thoughts, and we hope to celebrate with you soon.</p>
              
              <p style="margin: 40px 0 0 0; font-size: 15px; color: #000000;">— Simon & Catherine</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px 40px; text-align: center; border-top: 1px solid #e0e0e0; background-color: #fafafa;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #666666;">If your plans change, please don't hesitate to reach out.</p>
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
