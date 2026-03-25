# Claude Code — Setup Wizard Prompt

This file contains per-config next steps for Claude Code to follow after scaffolding.

---

## After Scaffolding: `nano`

Walk the user through:

1. `cd` into their new project directory
2. `npm install`
3. `npm run dev` — confirm it opens at `http://localhost:5173`
4. Show them the task manager running
5. Point to `src/store/tasks.ts` as the main place to add data
6. Point to `src/App.tsx` as the main entrypoint
7. Tell them: data is persisted to `localStorage` — it survives page refreshes

**Key files to highlight:**
- `src/store/tasks.ts` — Zustand store with localStorage persistence
- `src/components/TaskList.tsx` — main UI
- `src/components/TaskForm.tsx` — create/edit form

---

## After Scaffolding: `standard`

Walk the user through:

1. `cd` into their new project directory
2. `npm install`
3. Set up Supabase:
   - Create a project at supabase.com (free tier)
   - Go to **SQL Editor** and run `supabase/migrations/001_tasks.sql`
   - Copy your **Project URL** and **Anon Key** from Project Settings → API
4. Open `/configuration` in the running app and paste in the credentials — or manually copy `.env.example` to `.env.local` and fill in the values
5. `npm run dev`
6. Sign up at `/sign-up` — Supabase will send a confirmation email
7. After confirming, you'll land on `/welcome` and can explore the task manager

**Key files to highlight:**
- `app/(dashboard)/welcome/page.tsx` — starting page after login
- `app/(dashboard)/tasks/page.tsx` — main feature page
- `app/actions/auth.ts` — signIn / signUp / signOut server actions
- `lib/supabase/client.ts` and `lib/supabase/server.ts` — DB + Auth clients
- `middleware.ts` — session refresh + route protection
- `supabase/migrations/001_tasks.sql` — DB schema with RLS

**Environment variables needed:**
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## After Scaffolding: `pro`

Walk the user through:

1. `cd` into their new project directory
2. `npm install`
3. Set up Supabase (same as `standard` above)
4. Set up Clerk:
   - Create an app at clerk.com
   - Copy your publishable key and secret key
5. Get an Anthropic API key at console.anthropic.com
6. Copy `.env.example` to `.env.local` and fill in all values
7. `npm run dev`

**Key files to highlight:**
- `app/(dashboard)/welcome/page.tsx` — starting page after login
- `app/(dashboard)/chat/page.tsx` — AI chat page
- `app/api/chat/route.ts` — streaming Claude endpoint
- `components/chat.tsx` — chat UI using Vercel AI SDK `useChat` hook

**Environment variables needed:**
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
ANTHROPIC_API_KEY=
```

---

## After Scaffolding: `mobile`

Walk the user through:

1. Make sure Flutter is installed: `flutter doctor`
2. `cd` into their new project directory
3. Set up Supabase (same as standard)
4. Copy `.env.example` to `.env` and fill in values
5. `flutter pub get`
6. `flutter run` (select a device/simulator)

**Key files to highlight:**
- `lib/main.dart` — entrypoint and Supabase init
- `lib/screens/tasks_screen.dart` — main feature screen
- `lib/services/task_service.dart` — Supabase queries

---

## After Scaffolding: `mobile-pro`

Same as `mobile`, plus:

1. Get an Anthropic API key at console.anthropic.com
2. Add to `.env`:
   ```
   ANTHROPIC_API_KEY=
   ```
3. Point to `lib/services/ai_service.dart` — Claude API calls via HTTP
