# Email Template Logo Configuration

All email templates now include the SICA logo with a flat, minimalist design matching your wedding website.

## Current Logo URL (Placeholder)

The templates currently use a placeholder URL:
```
https://raw.githubusercontent.com/yourusername/yourrepo/main/public/hero-logo.png
```

## How to Update the Logo URL

You have 3 options to make the logo work in emails:

### Option 1: Upload Logo to Your Deployment (Recommended)

Once your website is deployed (e.g., on Vercel, Netlify), use the production URL:

1. Deploy your website
2. Find the logo files in your email templates:
   - `src/lib/email-templates/rsvp-confirmation.ts`
   - `src/lib/email-templates/rsvp-decline.ts`
   - `src/lib/email-templates/update-notification.ts`
   - `src/lib/email-templates/reminder.ts`

3. Replace the placeholder URL with your deployed URL:
   ```
   https://yourdomain.com/hero-logo.png
   ```

### Option 2: Use a CDN or Image Hosting Service

Upload `public/hero-logo.png` to:
- Cloudinary
- ImgIX  
- AWS S3
- Any CDN service

Then update the URLs in all template files.

### Option 3: Base64 Encode the Logo (Quick but Not Recommended)

Convert the logo to base64 and embed it directly:

```bash
# On Mac/Linux
base64 -i public/hero-logo.png | pbcopy
```

Then replace the `<img>` tag with:
```html
<img src="data:image/png;base64,YOUR_BASE64_STRING_HERE" alt="SICA" style="width: 80px; height: 80px; margin-bottom: 24px;" />
```

**Note**: This makes email file sizes larger and some email clients may not support it.

## Quick Find & Replace

Once you have your logo URL, use this find-and-replace:

**Find:**
```
https://raw.githubusercontent.com/yourusername/yourrepo/main/public/hero-logo.png
```

**Replace with:**
```
https://YOUR_ACTUAL_URL_HERE/hero-logo.png
```

## Design Changes Made

All email templates now feature:
- ✅ Flat, minimalist black & white design
- ✅ SICA logo at the top (80x80px)
- ✅ Clean typography with Georgia serif for headers
- ✅ Simple horizontal dividers (1px black/gray)
- ✅ Minimal padding and spacing
- ✅ Light gray (#f5f5f5) for information boxes
- ✅ Black text on white background
- ✅ Uppercase letter-spaced labels
- ✅ Mobile-responsive layout

This matches your website's aesthetic with its clean, minimalist black and white theme.
