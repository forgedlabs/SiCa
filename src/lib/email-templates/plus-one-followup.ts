interface PlusOneFollowupData {
  firstName: string;
  lastName: string;
}

export function generatePlusOneFollowupEmail(data: PlusOneFollowupData): string {
  const { firstName, lastName } = data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Plus One Details</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Playfair Display', Georgia, 'Times New Roman', serif; background-color: #ffffff; color: #000000;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #ffffff;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff;">
          
          <!-- Logo & Header -->
          <tr>
            <td style="padding: 40px 40px 32px 40px; text-align: center; border-bottom: 1px solid #000000;">
              <img src="https://i.imgur.com/HIuEHCC.jpeg" alt="SICA" style="width: 120px; height: auto; margin-bottom: 24px;" />
              <p style="margin: 0; font-family: 'Playfair Display', Georgia, 'Times New Roman', serif; font-size: 36px; font-weight: 400; color: #000000; letter-spacing: 0.15em; text-transform: uppercase; line-height: 1.2;">SIMON</p>
              <p style="margin: 8px 0; font-family: 'Playfair Display', Georgia, 'Times New Roman', serif; font-size: 32px; font-weight: 400; color: #000000; font-style: italic;">&amp;</p>
              <p style="margin: 0; font-family: 'Playfair Display', Georgia, 'Times New Roman', serif; font-size: 36px; font-weight: 400; color: #000000; letter-spacing: 0.15em; text-transform: uppercase; line-height: 1.2;">CATHERINE</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 48px 40px;">
              <h2 style="margin: 0 0 32px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 24px; font-weight: 400; color: #000000; letter-spacing: 0.05em;">PLUS ONE DETAILS</h2>
              
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.8; color: #000000;">Dear ${firstName} ${lastName},</p>
              
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.8; color: #000000;">Thank you for your RSVP! We're excited that you'll be joining us and bringing a plus one.</p>
              
              <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.8; color: #000000;"><strong>Please reply to this email</strong> with your plus one's details using this exact format:</p>

              <div style="background-color: #f8f8f8; padding: 24px; margin: 24px 0; border-left: 4px solid #000000; font-family: 'Courier New', monospace;">
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #000000;">Name: [Full Name]</p>
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #000000;">Ceremony: [Both / Traditional Only / Reception Only]</p>
                <p style="margin: 0; font-size: 14px; color: #000000;">Dietary: [Any restrictions or None]</p>
              </div>

              <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.6; color: #666666; font-style: italic;">Example reply:<br>
              Name: Jane Smith<br>
              Ceremony: Both<br>
              Dietary: Vegetarian</p>

              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.8; color: #000000;">Our system will automatically process your reply and confirm the details.</p>

              <p style="margin: 40px 0 0 0; font-size: 15px; color: #000000;">With love,<br>Simon & Catherine</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px 40px; text-align: center; border-top: 1px solid #e0e0e0; background-color: #fafafa;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #666666;">May 30, 2026</p>
              <p style="margin: 0; font-size: 12px; color: #666666;">Amsterdam, Netherlands</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}
