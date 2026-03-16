# Agency Intake Site

Marketing site and intake flow for a web design agency, built with Next.js 15, React, TypeScript, Tailwind CSS, React Hook Form, and Zod.

## Form Delivery

Form submissions now go to `n8n` webhooks through Next.js API routes:

- `POST /api/lead` for the contact form
- `POST /api/intake` for the multi-step project intake

## Required Environment Variables

Create `.env.local` and set the webhook URLs you want to use:

```env
N8N_CONTACT_WEBHOOK_URL=https://your-n8n-host/webhook/contact
N8N_INTAKE_WEBHOOK_URL=https://your-n8n-host/webhook/intake

# Optional shared fallback
N8N_WEBHOOK_URL=

# Optional captcha
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

`N8N_WEBHOOK_URL` is supported as a fallback for both forms, but separate URLs are preferred.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Project Structure

```text
src/
  app/
    api/
      intake/        # n8n-backed intake endpoint
      lead/          # n8n-backed contact endpoint
  components/
    IntakeForm.tsx
    SimpleIntakeForm.tsx
  lib/
    schema.ts
    webhooks.ts
```

## n8n Payloads

`/api/lead` posts:

```json
{
  "submissionId": "uuid",
  "formType": "contact",
  "submittedAt": "ISO-8601 timestamp",
  "lead": {
    "name": "Jane Doe",
    "company": "Acme Health",
    "role": "Owner",
    "email": "jane@acme.com",
    "phone": "(555) 123-4567",
    "urgency": "Soon",
    "turnstileToken": "token"
  }
}
```

`/api/intake` posts:

```json
{
  "submissionId": "uuid",
  "formType": "intake",
  "submittedAt": "ISO-8601 timestamp",
  "intake": {
    "...": "normalized intake payload"
  }
}
```

## Testing

```bash
npm test
npm run type-check
```
