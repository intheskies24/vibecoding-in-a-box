# Deployment Guide

How to deploy each template config to production.

---

## `nano` — Local only

The `nano` template is not designed to be deployed. It runs in the browser on your machine. Data lives in `localStorage`.

If you want to share your nano tool with others, the simplest options are:
1. **Upgrade to `micro`** — hosted Next.js, no backend needed
2. **Host the Vite build on Vercel:** `npm run build` → drag the `dist/` folder to [vercel.com/new](https://vercel.com/new)

---

## `micro` — Vercel

### First deploy

```bash
npm run build       # verify it builds locally
npx vercel          # follow the prompts
```

Vercel auto-detects Next.js and configures everything. Your app is live at a `*.vercel.app` URL.

### Custom domain

In the Vercel dashboard → **Settings → Domains** → add your domain and follow the DNS instructions.

### Environment variables

`micro` has no required env vars. If you add API calls, add keys in **Vercel dashboard → Settings → Environment Variables**.

---

## `standard` — Vercel + Supabase

### Pre-deploy checklist

- [ ] Supabase project created and migrations run
- [ ] Clerk app created and redirect URLs configured for your production domain
- [ ] All `.env.example` values filled in

### Deploy

```bash
npx vercel
```

### Add environment variables

In Vercel dashboard → **Settings → Environment Variables**, add all values from `.env.example`:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL
NEXT_PUBLIC_CLERK_SIGN_UP_URL
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
```

### Update Clerk redirect URLs

In the Clerk dashboard → **Redirect URLs**, add your production domain:
- `https://yourdomain.com/sign-in`
- `https://yourdomain.com/sign-up`
- `https://yourdomain.com/tasks`

### Supabase: allowed origins

In Supabase → **Auth → URL Configuration**, add your production URL to **Allowed Redirect URLs**.

---

## `pro` — Vercel + Supabase + Anthropic

Same as `standard`, plus:

```
ANTHROPIC_API_KEY
```

> **Security:** `ANTHROPIC_API_KEY` must be a **server-side only** variable (no `NEXT_PUBLIC_` prefix). Never expose it to the browser.

In Vercel, set it without the `NEXT_PUBLIC_` prefix so it's only available in Server Components and API Routes.

### Rate limiting (recommended for production)

The `/api/chat` endpoint has no rate limiting by default. Before going public, add rate limiting using:
- [Upstash Rate Limit](https://upstash.com/docs/redis/sdks/ratelimit-ts/overview) (Redis-based, Vercel-native)
- Or check user credits in Supabase before each request

---

## `mobile` — App Stores

### iOS — App Store

**Prerequisites:**
- Apple Developer account ($99/year)
- Xcode installed (macOS only)
- Bundle ID registered in App Store Connect

```bash
# Build release IPA
flutter build ipa --release

# Open in Xcode to archive and upload
open ios/Runner.xcworkspace
```

Then in Xcode: **Product → Archive → Distribute App → App Store Connect**.

**First-time TestFlight** (internal testing, no App Store review):
- Upload the build as above
- In App Store Connect → TestFlight → add testers by email

### Android — Google Play

**Prerequisites:**
- Google Play Developer account ($25 one-time)
- Keystore for signing

```bash
# Create a keystore (first time only)
keytool -genkey -v -keystore upload-keystore.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias upload

# Build release bundle
flutter build appbundle --release
```

Upload `build/app/outputs/bundle/release/app-release.aab` to Google Play Console → **Production** (or **Internal Testing** for a quick review-free release).

### Updating environment variables in Flutter

Flutter's `.env` file is bundled at build time. To update credentials:
1. Edit `.env`
2. Rebuild: `flutter build ipa --release` or `flutter build appbundle --release`
3. Submit the new build

---

## Alternative: Railway (for `standard` / `pro`)

Use Railway when you need background jobs, WebSockets with persistent state, or more control over the server environment.

### Deploy to Railway

1. Push your project to GitHub
2. Go to [railway.app](https://railway.app) → **New Project → Deploy from GitHub repo**
3. Select your repo
4. Add environment variables in Railway dashboard
5. Railway auto-detects Next.js and deploys

Railway gives you a `*.up.railway.app` URL by default. Add a custom domain in **Settings → Domains**.

---

## CI/CD with GitHub Actions

The repo includes GitHub Actions in `.github/workflows/` that validate templates on every push (lint + build checks). To enable:

1. Fork the repo
2. Push — Actions run automatically
3. Required secrets: none (validation only; no deployment)

To add deployment automation:
- Vercel: use the [Vercel GitHub Integration](https://vercel.com/docs/deployments/git/vercel-for-github) (automatic deploys on push, no workflow needed)
- Railway: Railway also has native GitHub integration
