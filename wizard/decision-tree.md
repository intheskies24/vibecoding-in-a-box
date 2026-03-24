# Setup Wizard — Decision Tree

This file defines the logic for mapping user answers to a recommended stack configuration.

---

## Decision Logic

Evaluate in order. Use the first rule that matches.

```
Q1 (platform) == "mobile" OR "both"
  Q7 (AI) == "yes"  →  mobile-pro
  else               →  mobile

Q2 (hosting) == "local"
  →  nano

Q7 (AI) == "yes"
  →  pro

Q5 (auth) == "yes" OR Q4 (database) == "yes"
  →  standard

→  micro  (default: hosted web, no DB, no auth, no AI)
```

---

## Config Descriptions

### `nano`
**Trigger:** Local-only tool (Q2 = local)
**Stack:** Vite + React + Zustand (localStorage persist)
**Why:** No server, no deployment, no accounts. Pure frontend with local state persistence. Zero infrastructure to set up or pay for.

### `micro`
**Trigger:** Hosted web app, no DB, no auth, no AI
**Stack:** Next.js + Tailwind + shadcn/ui, deployed to Vercel
**Why:** Needs to be publicly accessible but has no persistent data or user accounts. Next.js gives SSR/static generation; Vercel gives zero-config deploy.

### `standard`
**Trigger:** Hosted web app with DB and/or auth, no AI
**Stack:** Next.js + Supabase + Clerk + Vercel
**Why:** Most common full-stack vibecoding setup. Supabase handles Postgres + Storage + Realtime. Clerk handles auth with zero backend code. Vercel handles deployment.

### `pro`
**Trigger:** Hosted web app that calls an AI/LLM API
**Stack:** Next.js + Supabase + Clerk + Anthropic Claude SDK + Vercel AI SDK + Vercel
**Why:** Everything in `standard` plus streaming AI responses via Vercel AI SDK. Claude SDK for LLM calls. Vercel AI SDK for building chat/streaming UIs easily.

### `mobile`
**Trigger:** Mobile app (iOS/Android), no AI
**Stack:** Flutter + Supabase
**Why:** Flutter gives a single Dart codebase for iOS + Android. Supabase's Flutter SDK (Dart-native) handles auth, DB, and storage. No JS bridge — pure Dart throughout.

### `mobile-pro`
**Trigger:** Mobile app (iOS/Android) that calls an AI/LLM API
**Stack:** Flutter + Supabase + Anthropic Claude SDK (via HTTP)
**Why:** Flutter + Supabase as the base. Claude API called via HTTP from Dart (no official Flutter SDK — use `http` or `dio` package with Claude's REST API).

---

## Edge Cases

| Scenario | Recommendation | Notes |
|----------|----------------|-------|
| Local + AI | `nano` | Add Claude SDK calls directly from Vite; no server needed for API calls if using client-side API key (not for production) |
| Both web + mobile | `mobile` or `mobile-pro` | Recommend building the backend with Supabase first, then the web frontend separately using `standard` or `pro` |
| Storage only (no DB, no auth) | `micro` | Supabase Storage can be added to micro if needed |
| Database only (no auth) | `standard` | Supabase works fine without Clerk — skip Clerk setup in that template |
