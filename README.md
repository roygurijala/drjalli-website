This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Chat Analytics Admin Access

The analytics routes are protected by middleware and require authentication:

- Dashboard: `/chat-analytics`
- API JSON: `/api/chat/analytics?days=30`
- API CSV: `/api/chat/analytics?days=7&format=csv`

### Required Environment Variables

Set these in local `.env.local` and in your hosting provider environment settings:

```bash
CHAT_ADMIN_USERNAME=admin
CHAT_ADMIN_PASSWORD=change-this-to-a-strong-password
```

Optional token for scripts/curl (in addition to Basic Auth):

```bash
CHAT_ANALYTICS_TOKEN=replace-with-a-long-random-token
```

### Local Development

1. Start the app:

```bash
npm run dev
```

2. Open:
   - `http://localhost:3000/chat-analytics`
3. Browser will prompt for username/password (HTTP Basic Auth).

If `CHAT_ADMIN_USERNAME` / `CHAT_ADMIN_PASSWORD` are missing, protected routes return `503` by design (fail-closed).

### API Access Examples

Basic Auth:

```bash
curl -u admin:your-password "http://localhost:3000/api/chat/analytics?days=30"
```

Bearer token:

```bash
curl -H "Authorization: Bearer your-token" "http://localhost:3000/api/chat/analytics?days=30"
```

Weekly CSV export:

```bash
curl -u admin:your-password "http://localhost:3000/api/chat/analytics?days=7&format=csv" -o chat-analytics-7d.csv
```

### Vercel / Hosting-Level Protection (Recommended)

In addition to app-level auth, use hosting-level protection so requests are blocked before they reach your app runtime:

- Restrict preview deployments to your team/accounts.
- Add edge/network access rules where available (IP allowlist, firewall/WAF policies).
- Keep environment variables only in hosting secrets (never commit them).

Best practice is to keep both layers enabled:

1. Hosting-level protection (outer layer)
2. App-level middleware auth (inner layer)
