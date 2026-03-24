# pro template

**Stack:** Next.js 15 + Supabase + Clerk + Anthropic Claude SDK + Vercel AI SDK + Vercel
**Use case:** AI-powered full-stack web app with auth, database, and streaming LLM features

This template extends `standard` with a streaming AI chat powered by Claude. It includes:
- Everything in the `standard` template (task manager CRUD, Supabase, Clerk auth)
- A `/chat` route with a full streaming chat UI via Vercel AI SDK
- A `/api/chat` endpoint using Claude via `@ai-sdk/anthropic`

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase/migrations/001_tasks.sql` in the Supabase SQL editor
3. Copy your project URL and anon key

### 3. Set up Clerk

1. Create an app at [clerk.com](https://clerk.com)
2. Copy your publishable key and secret key

### 4. Get an Anthropic API key

1. Go to [console.anthropic.com](https://console.anthropic.com/settings/keys)
2. Create an API key

### 5. Configure environment variables

```bash
cp .env.example .env.local
# Fill in Supabase, Clerk, and Anthropic credentials
```

### 6. Run the dev server

```bash
npm run dev
```

---

## Deploy to Vercel

```bash
npx vercel
```

Add all environment variables from `.env.example` in the Vercel dashboard.

> **Important:** `ANTHROPIC_API_KEY` must be a server-side (non-public) env var. Never expose it to the client.

---

## Project Structure

```
app/
├── (auth)/
│   ├── sign-in/       # Clerk sign-in
│   └── sign-up/       # Clerk sign-up
├── (dashboard)/
│   ├── layout.tsx     # Protected layout with navbar
│   ├── tasks/         # Task manager CRUD (reference)
│   └── chat/          # AI chat page
├── api/
│   ├── tasks/         # Task REST API
│   └── chat/          # Streaming Claude endpoint
├── layout.tsx
└── page.tsx

components/
├── navbar.tsx          # Nav with Tasks + Chat links
├── chat.tsx            # Streaming chat UI (useChat hook)
├── task-form.tsx
└── task-list.tsx
```

---

## How the AI Chat Works

**Server** (`app/api/chat/route.ts`):
```ts
const result = streamText({
  model: anthropic("claude-opus-4-6"),
  system: "You are a helpful assistant.",
  messages,
});
return result.toDataStreamResponse();
```

**Client** (`components/chat.tsx`):
```ts
const { messages, input, handleInputChange, handleSubmit } = useChat({
  api: "/api/chat",
});
```

To customise the AI, edit the `system` prompt and swap the `model` in `app/api/chat/route.ts`.

---

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `next` | Framework |
| `@clerk/nextjs` | Authentication |
| `@supabase/ssr` + `@supabase/supabase-js` | Database + Storage |
| `@ai-sdk/anthropic` | Anthropic model provider for Vercel AI SDK |
| `ai` | Vercel AI SDK — streaming, `useChat` hook |
| `@anthropic-ai/sdk` | Direct Claude SDK (non-streaming use cases) |
| `tailwindcss` | Styling |
