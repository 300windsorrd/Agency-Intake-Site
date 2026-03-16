# Project Summary

## Current Submission Architecture
- Contact form submissions are sent to `n8n` through [`src/app/api/lead/route.ts`](/C:/Users/jensy/Documents/Websites/agency-intake-site/src/app/api/lead/route.ts).
- Multi-step intake submissions are sent to `n8n` through [`src/app/api/intake/route.ts`](/C:/Users/jensy/Documents/Websites/agency-intake-site/src/app/api/intake/route.ts).
- Shared payload mapping lives in [`src/lib/webhooks.ts`](/C:/Users/jensy/Documents/Websites/agency-intake-site/src/lib/webhooks.ts).

## Environment Variables

Use one or both of these:

```env
N8N_CONTACT_WEBHOOK_URL=https://your-n8n-host/webhook/contact
N8N_INTAKE_WEBHOOK_URL=https://your-n8n-host/webhook/intake
```

Optional fallback:

```env
N8N_WEBHOOK_URL=https://your-n8n-host/webhook/shared
```

## Notes

- Both API routes require a Turnstile token in production.
- Each submission includes a generated `submissionId` so the frontend can show a stable reference even if the webhook response does not return one.
