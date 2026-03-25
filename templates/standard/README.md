# standard template

**Stack:** Next.js 15 + Supabase Auth + Supabase + Vercel
**Use case:** Full-stack web app with auth and a database

This template includes a working **task manager** as a reference implementation. Replace it with your own feature.

Auth is handled by **Supabase Auth** — no Clerk account needed. One free Supabase project covers your database and authentication.

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com) (free tier)
2. Go to **SQL Editor** and run the contents of `supabase/migrations/001_tasks.sql`
3. Copy your **Project URL** and **Anon Key** from **Settings → API**

### 3. Configure environment variables

**Option A — via the in-app Configuration page (easiest):**

```bash
npm run dev
```

Open [http://localhost:3000/configuration](http://localhost:3000/configuration) and paste in your Supabase credentials. Click **Save** — values are written to `.env.local` automatically. Then restart the dev server.

**Option B — manually:**

```bash
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev
```

### 4. Sign up

Open [http://localhost:3000/sign-up](http://localhost:3000/sign-up), create an account, and confirm your email. You'll land on `/welcome`.

---

## Deploy to Vercel

```bash
npx vercel
```

Add environment variables in **Vercel dashboard → Settings → Environment Variables**:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_SITE_URL    # your production URL, e.g. https://myapp.vercel.app
```

In **Supabase → Auth → URL Configuration**, set your production URL as the Site URL and add it to Allowed Redirect URLs.

---

## Project Structure

```
app/
├── (auth)/
│   ├── sign-in/            # Email/password sign-in form
│   └── sign-up/            # Sign-up form (sends confirmation email)
├── (dashboard)/
│   ├── welcome/            # Home page after login
│   ├── tasks/              # Main feature: task manager CRUD
│   ├── configuration/      # Paste Supabase credentials, copy migration SQL
│   ├── getting-started/    # Setup guide
│   └── components-demo/    # UI component examples
├── actions/
│   ├── auth.ts             # signIn / signUp / signOut server actions
│   └── save-config.ts      # Writes credentials to .env.local
├── api/
│   └── tasks/              # REST API: POST, PATCH, DELETE tasks
├── auth/
│   └── callback/route.ts   # Handles Supabase email confirmation redirect
├── layout.tsx
└── page.tsx                # Root: redirects to /welcome or /configuration

components/
├── app-sidebar.tsx         # Dark sidebar with nav + user email + sign out
├── navbar.tsx              # Top navigation bar
├── task-form.tsx           # Create task form
└── task-list.tsx           # Task list with status controls

lib/
├── supabase/
│   ├── client.ts           # Browser Supabase client (returns null if unconfigured)
│   └── server.ts           # Server Supabase client
├── types.ts                # TypeScript types (Task, TaskStatus)
└── utils.ts                # cn() utility for Tailwind

supabase/
└── migrations/
    └── 001_tasks.sql       # tasks table + RLS policies using auth.uid()

middleware.ts               # Session refresh + protects /tasks and /api/tasks
```

---

## Building Your Feature

To replace the task manager with your own feature:

1. **Database:** Add a new migration in `supabase/migrations/`
2. **Types:** Update `lib/types.ts`
3. **API routes:** Add routes in `app/api/`
4. **UI:** Add pages in `app/(dashboard)/` and components in `components/`

The auth (Supabase), layout, and Supabase wiring are already in place — just focus on your feature.

---

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `next` | Framework |
| `@supabase/ssr` | Cookie-based Supabase sessions for Next.js |
| `@supabase/supabase-js` | Supabase client |
| `tailwindcss` | Styling |
| `lucide-react` | Icons |
| `clsx` + `tailwind-merge` | Conditional classnames |

Add shadcn/ui components as needed:
```bash
npx shadcn@latest add button input card badge
```
