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
2. Set up Supabase:
   - Create a project at supabase.com
   - Copy the project URL and anon key
   - Run the migration: paste `supabase/migrations/001_tasks.sql` into the Supabase SQL editor
3. Set up Clerk:
   - Create an app at clerk.com
   - Copy the publishable key and secret key
4. Copy `.env.example` to `.env.local` and fill in the values
5. `npm install`
6. `npm run dev`
7. Show them the task manager with auth running

**Key files to highlight:**
- `app/(dashboard)/tasks/page.tsx` — main feature page
- `lib/supabase/client.ts` and `lib/supabase/server.ts` — DB access
- `middleware.ts` — Clerk auth protection
- `supabase/migrations/001_tasks.sql` — DB schema

**Environment variables needed:**
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

---

## After Scaffolding: `pro`

Same as `standard`, plus:

1. Get an Anthropic API key at console.anthropic.com
2. Add to `.env.local`:
   ```
   ANTHROPIC_API_KEY=
   ```
3. Point to `app/api/chat/route.ts` — streaming AI endpoint
4. Point to `components/chat.tsx` — chat UI using Vercel AI SDK

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
