# vibecoding-in-a-box

A rapid start kit for AI-assisted app development. Clone this repo, run the setup wizard, and go from zero to a working app skeleton in under 15 minutes.

Built for vibe coders — developers using AI tools (Claude Code, Cursor, Windsurf, Copilot) to build apps fast.

---

## Quick Start

### Option A — AI Wizard (Recommended)

Open this repo in your AI coding assistant. It will automatically ask you what you're building and scaffold the right stack for you.

- **Claude Code:** `claude` in this directory — the `CLAUDE.md` file runs the wizard automatically.
- **Cursor / Windsurf:** Open the project and paste the contents of `wizard/prompts/cursor.md` into the chat.
- **Other AI tools:** Use `wizard/prompts/generic.md`.

### Option B — CLI Wizard

```bash
git clone https://github.com/your-username/vibecoding-in-a-box.git
cd vibecoding-in-a-box
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### Option C — Direct Scaffolding

If you already know which config you want:

```bash
chmod +x scripts/scaffold.sh
./scripts/scaffold.sh <config> <project-name>

# Examples:
./scripts/scaffold.sh standard my-saas-app
./scripts/scaffold.sh nano my-local-tool
./scripts/scaffold.sh pro my-ai-app
```

---

## Stack Configurations

| Config | Best For | Stack |
|--------|----------|-------|
| `nano` | Local personal tool, no server needed | Vite + React + Zustand |
| `micro` | Simple hosted web app, no DB | Next.js + Vercel |
| `standard` | Full-stack web app with auth + DB | Next.js + Supabase + Clerk + Vercel |
| `pro` | AI-powered full-stack app | Next.js + Supabase + Clerk + Claude SDK + Vercel AI SDK |
| `mobile` | Cross-platform iOS/Android | Flutter + Supabase |
| `mobile-pro` | AI-powered mobile app | Flutter + Supabase + Claude SDK |

Each template includes a **working task manager app** as a reference implementation showing the full stack in action.

---

## What's in Each Template

Every template ships with:

- ✅ Working scaffold code (routing, layout, config)
- ✅ Reference CRUD app (task manager)
- ✅ `.env.example` with all required environment variables
- ✅ `README.md` with setup and deployment steps
- ✅ Proper `.gitignore`

---

## Technology Choices

### Web
- **Next.js 15** — Full-stack framework (App Router)
- **Vite + React** — Lightweight local tooling (`nano` only)
- **shadcn/ui** — Component library (Tailwind-based, AI-friendly)
- **Tailwind CSS** — Utility-first styling

### Mobile
- **Flutter** — Cross-platform iOS/Android (Dart-native)

### Backend & Data
- **Supabase** — Postgres DB + Auth + Storage + Realtime
- **Clerk** — User auth and management (web default)
- **Zustand** — Local state with localStorage persistence (`nano`)

### AI
- **Anthropic Claude SDK** — Default LLM integration
- **Vercel AI SDK** — Streaming UI for chat interfaces

### Deployment
- **Vercel** — Web apps (zero-config Next.js)
- **Railway** — Full-stack with more control
- **App Stores** — Flutter mobile

---

## Repo Structure

```
vibecoding-in-a-box/
├── CLAUDE.md                  # AI setup wizard (auto-loaded by Claude Code)
├── README.md                  # This file
├── PRD.md                     # Product requirements document
│
├── templates/
│   ├── nano/                  # Vite + React + Zustand
│   ├── micro/                 # Next.js (coming soon)
│   ├── standard/              # Next.js + Supabase + Clerk
│   ├── pro/                   # Next.js + Supabase + Clerk + Claude SDK (coming soon)
│   ├── mobile/                # Flutter + Supabase (coming soon)
│   └── mobile-pro/            # Flutter + Supabase + Claude SDK (coming soon)
│
├── wizard/
│   ├── questions.md           # Setup questions (AI-readable)
│   ├── decision-tree.md       # Config recommendation logic
│   └── prompts/
│       ├── claude.md          # Prompt for Claude Code
│       ├── cursor.md          # Prompt for Cursor / Windsurf
│       └── generic.md        # Prompt for any AI assistant
│
├── scripts/
│   ├── setup.sh               # Interactive CLI wizard
│   └── scaffold.sh            # Direct scaffolding by config name
│
└── docs/
    ├── stack-guide.md         # Why each technology was chosen
    └── deployment.md          # Deployment guides per config
```

---

## Contributing

See `docs/contributing.md` (coming soon). To contribute a new template or config, open an issue first to discuss the stack — we want to keep the decision logic clean.

---

## License

MIT
