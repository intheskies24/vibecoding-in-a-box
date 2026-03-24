# micro template

**Stack:** Next.js 15 + Tailwind CSS + Vercel
**Use case:** Simple hosted web app — no database, no authentication

When you first run this template you'll see a welcome screen. Start building from `app/page.tsx`.

---

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

No environment variables required to get started.

---

## Deploy to Vercel

```bash
npx vercel
```

Zero config — Vercel auto-detects Next.js. Your app will be live in under a minute.

---

## Project Structure

```
app/
├── layout.tsx       # Root layout
├── page.tsx         # Home page — start here
└── globals.css      # Tailwind base styles + CSS variables

lib/
└── utils.ts         # cn() utility for Tailwind
```

---

## When to Upgrade

| Need | Upgrade to |
|------|-----------|
| User accounts / login | `standard` |
| A database | `standard` |
| AI/LLM features | `pro` |
| Mobile (iOS/Android) | `mobile` |

```bash
# From the vibecoding-in-a-box root:
./scripts/scaffold.sh standard my-upgraded-app
```

---

## Adding shadcn/ui Components

```bash
npx shadcn@latest init
npx shadcn@latest add button card input
```

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `next` | Framework + routing + SSR |
| `tailwindcss` | Styling |
| `lucide-react` | Icons |
| `clsx` + `tailwind-merge` | Conditional classnames |
