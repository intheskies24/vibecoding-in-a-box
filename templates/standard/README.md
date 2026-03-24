# standard template

**Stack:** Next.js 15 + Supabase + Clerk + Vercel
**Use case:** Full-stack web app with auth and a database

This template includes a working **task manager** as a reference implementation. Replace it with your own feature.

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/migrations/001_tasks.sql`
3. Copy your project URL and anon key from **Settings → API**

### 3. Set up Clerk

1. Create an app at [clerk.com](https://clerk.com)
2. Copy your publishable key and secret key from the Clerk dashboard

### 4. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local` with your Supabase and Clerk credentials.

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy to Vercel

```bash
npx vercel
```

Add your environment variables in the Vercel dashboard under **Settings → Environment Variables**.

---

## Project Structure

```
app/
├── (auth)/
│   ├── sign-in/       # Clerk sign-in page
│   └── sign-up/       # Clerk sign-up page
├── (dashboard)/
│   └── tasks/         # Main feature: task manager
│       └── page.tsx
├── api/
│   └── tasks/         # REST API routes
│       ├── route.ts          # POST /api/tasks
│       └── [id]/route.ts     # PATCH/DELETE /api/tasks/:id
├── layout.tsx          # Root layout with ClerkProvider
└── page.tsx            # Home page (redirects to /tasks if signed in)

components/
├── navbar.tsx          # Top navigation with UserButton
├── task-form.tsx       # Create task form
└── task-list.tsx       # Task list with status controls

lib/
├── supabase/
│   ├── client.ts       # Browser Supabase client
│   └── server.ts       # Server Supabase client
├── types.ts            # TypeScript types (Task, TaskStatus)
└── utils.ts            # cn() utility for Tailwind

supabase/
└── migrations/
    └── 001_tasks.sql   # DB schema + RLS policies

middleware.ts           # Clerk auth — protects all routes except / and /sign-*
```

---

## Building Your Feature

To replace the task manager with your own feature:

1. **Database:** Add a new migration in `supabase/migrations/`
2. **Types:** Update `lib/types.ts`
3. **API routes:** Add routes in `app/api/`
4. **UI:** Add pages in `app/(dashboard)/` and components in `components/`

The auth (Clerk), layout, and Supabase wiring are already in place — just focus on your feature.

---

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `next` | Framework |
| `@clerk/nextjs` | Authentication |
| `@supabase/ssr` + `@supabase/supabase-js` | Database + Storage |
| `tailwindcss` | Styling |
| `lucide-react` | Icons |
| `clsx` + `tailwind-merge` | Conditional classnames |

Add shadcn/ui components as needed:
```bash
npx shadcn@latest add button input card badge
```
