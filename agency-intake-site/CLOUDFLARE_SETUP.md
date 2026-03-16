# Cloudflare Pages Setup

## Required Environment Variables

Set these in Cloudflare Pages for your production and preview environments:

```env
N8N_CONTACT_WEBHOOK_URL=https://your-n8n-host/webhook/contact
N8N_INTAKE_WEBHOOK_URL=https://your-n8n-host/webhook/intake
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key
TURNSTILE_SECRET_KEY=your_secret_key
```

Optional shared fallback:

```env
N8N_WEBHOOK_URL=https://your-n8n-host/webhook/shared
```

## Runtime

The API routes already use the Edge runtime, which is required for Cloudflare Pages:

```ts
export const runtime = 'edge'
```

## Local Development

Create `.env.local` with the same values, then run:

```bash
npm install
npm run dev
```

## Deployment Checks

- Confirm the webhook URLs are valid and reachable from Cloudflare.
- Confirm the `n8n` workflow returns a `2xx` response.
- Confirm Turnstile is configured if production submissions require captcha.
