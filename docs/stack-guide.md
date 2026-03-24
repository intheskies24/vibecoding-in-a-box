# Stack Guide

Why we chose each technology in vibecoding-in-a-box, and when you might swap it.

---

## Web Framework

### Next.js 15 (App Router)
**Used in:** `micro`, `standard`, `pro`

Next.js is the default for all hosted web configs because it handles both frontend and backend in one project. The App Router (introduced in Next.js 13, stabilised in 14–15) supports React Server Components, which means you can fetch data on the server without writing API routes for simple reads.

**Why not Remix / Nuxt / SvelteKit?**
Next.js has the largest AI training data corpus — every AI assistant produces better Next.js code with fewer hallucinations. For vibecoding specifically, this matters more than raw framework ergonomics.

### Vite + React
**Used in:** `nano`

For local-only tools that don't need a server, Vite + React is the fastest setup: one command, instant HMR, no build complexity. No SSR needed, no deployment to think about.

---

## Mobile Framework

### Flutter (Dart-native)
**Used in:** `mobile`, `mobile-pro`

Flutter produces native iOS and Android apps from a single Dart codebase. We chose Dart-only (no JS bridge) because:
- The Flutter/Dart ecosystem is self-contained and well-supported by AI tools
- Supabase has a first-class Flutter SDK written in Dart
- JS bridge patterns add complexity with no meaningful benefit for greenfield apps

**Why not React Native / Expo?**
React Native is a valid choice, especially if your team is JS-heavy. We chose Flutter because it produces more consistent UI across platforms and has better performance on complex screens. If you're already deep in the JS ecosystem, scaffold `standard` or `pro` and build a web app instead.

---

## Database

### Supabase (Postgres)
**Used in:** `standard`, `pro`, `mobile`, `mobile-pro`

Supabase bundles everything you need in one platform: Postgres, Auth, Storage, Realtime, and Edge Functions. For vibecoding, this eliminates the need to stitch together separate services.

**Key reasons:**
- Row Level Security (RLS) means you can query the DB directly from the client without a bespoke API layer
- The Supabase dashboard has a visual schema editor, making it AI-assistant-friendly
- Generous free tier — most personal projects never pay a cent

**When to swap:**
- Need MongoDB / document model → use MongoDB Atlas
- Serverless-first and want branching DBs → use Neon (Postgres, serverless)
- Prefer a full backend-as-a-service → use Firebase

### Zustand + localStorage
**Used in:** `nano`

For local-only tools, localStorage-persisted Zustand is all the "database" you need. No setup, no cost, no latency. Data lives in the browser and survives page refreshes.

**When to upgrade:** When you need data on multiple devices or to share with others, use the `standard` template.

---

## Authentication

### Clerk
**Used in:** `standard`, `pro`

Clerk is the fastest way to add production-quality auth to a Next.js app. It handles email/password, OAuth (Google, GitHub, etc.), magic links, MFA, and user management — all with zero backend code.

**Why not NextAuth / Auth.js?**
NextAuth requires more configuration and you manage the session logic. Clerk works out of the box with a few environment variables. For vibecoding, fewer decisions = faster building.

**Why not Supabase Auth?**
Supabase Auth is great (and used in the mobile templates). For web apps using Clerk, we keep Supabase as the database only and let Clerk own identity. The Clerk user ID (`userId`) is stored in Supabase rows to scope data per user.

### Supabase Auth
**Used in:** `mobile`, `mobile-pro`

For Flutter apps, Supabase Auth is the natural choice — it integrates directly with the Supabase Flutter SDK and works with RLS policies via `auth.uid()`.

---

## UI / Styling

### Tailwind CSS
**Used in:** all web templates

Utility-first CSS is the dominant paradigm for AI-assisted UI development. AI tools produce clean, readable Tailwind without needing to understand a custom design system.

### shadcn/ui
**Used in:** all web templates (via `components.json`)

shadcn/ui isn't a traditional component library — it's a set of copy-paste components built on Radix UI primitives and Tailwind. You own the code, so you can modify it freely. Crucially, AI tools know it extremely well.

To add components: `npx shadcn@latest add button card input`

### Flutter Material Design 3
**Used in:** `mobile`, `mobile-pro`

Flutter's Material 3 widgets are well-documented and AI tools produce correct Flutter widget code reliably. `ColorScheme.fromSeed` gives you a full, coherent colour system from a single seed colour.

---

## AI Integration

### Anthropic Claude SDK + Vercel AI SDK
**Used in:** `pro`

We use two packages together:
- `@ai-sdk/anthropic` — the Anthropic model provider for the Vercel AI SDK
- `ai` (Vercel AI SDK) — handles streaming, the `useChat` hook, and the `toDataStreamResponse()` helper

This combination gives you streaming chat responses in about 20 lines of code.

**Why Vercel AI SDK instead of the Anthropic SDK directly?**
The Vercel AI SDK abstracts streaming so you can switch models (Anthropic → OpenAI → Gemini) by changing one line. The `useChat` hook on the client handles the SSE stream automatically.

### Anthropic REST API via HTTP (Dart)
**Used in:** `mobile-pro`

There is no official Anthropic SDK for Dart/Flutter. We call the Claude REST API directly using the `http` package. See `lib/services/ai_service.dart` for the full implementation.

**Production note:** The API key must not ship inside the app binary for public apps. Proxy Claude calls through a Supabase Edge Function or your own backend.

---

## Deployment

### Vercel
**Used in:** `micro`, `standard`, `pro`

Vercel is the zero-config deployment platform for Next.js. Push to `main`, get a preview URL. One command (`npx vercel`) for first deploy.

### Railway
Alternative for `standard` / `pro` when you need more control (background jobs, custom Docker, persistent processes). See `docs/deployment.md`.

### App Stores
Flutter apps are submitted to the Apple App Store and Google Play. See `docs/deployment.md` for the build and submission flow.
