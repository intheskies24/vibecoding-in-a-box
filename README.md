# vibecoding-in-a-box

A rapid start kit for building apps with AI. Clone this repo, run one command, and have a working app skeleton in under 15 minutes — complete with navigation, a database, authentication, and a reference feature you can build on top of.

Built for developers using AI coding tools (Claude Code, Cursor, Windsurf, Copilot) who want to skip the boilerplate and get straight to building.

---

## How it works

### Step 1 — Clone this repo to your computer

```bash
git clone https://github.com/intheskies24/vibecoding-in-a-box.git
cd vibecoding-in-a-box
```

---

### Step 2 — Decide what you want to build

Pick the template that matches your project:

| Template | What it gives you |
|----------|------------------|
| `nano` | A polished local tool — runs in your browser, no server, no accounts, no hosting needed |
| `micro` | A simple hosted web app — live on the internet, no database required |
| `standard` | A full web app — database, user accounts, hosted on Vercel |
| `pro` | Everything in standard, plus Clerk auth (social login, MFA) and AI API integration |
| `mobile` | A cross-platform iOS & Android app with a database and auth |
| `mobile-pro` | Mobile app with a database, auth, and AI API integration |

> **Not sure?** Open this repo in Claude Code and it will ask you a few questions and recommend the right template automatically.

---

### Step 3 — Run one command to scaffold your project

```bash
chmod +x scripts/scaffold.sh
./scripts/scaffold.sh <template> <your-project-name>
```

**Examples:**

```bash
# A quick local tool (no setup needed)
./scripts/scaffold.sh nano my-local-tool

# A simple hosted web app
./scripts/scaffold.sh micro my-website

# A full web app with a database and login
./scripts/scaffold.sh standard my-saas-app

# An AI-powered web app
./scripts/scaffold.sh pro my-ai-app

# A mobile app
./scripts/scaffold.sh mobile my-mobile-app

# An AI-powered mobile app
./scripts/scaffold.sh mobile-pro my-ai-mobile-app
```

> **Mobile templates** require Flutter to be installed first. If you don't have it, the scaffold script will show you exactly how to install it for your operating system.

---

### Step 4 — Open your new project

A new folder with your project name has been created. Go into it:

```bash
cd <your-project-name>
```

**For web templates (nano, micro, standard, pro):**
```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) (or port 5173 for nano).

**For mobile templates (mobile, mobile-pro):**
```bash
flutter pub get
flutter run -d macos    # run on your Mac desktop (no phone needed)
# or: open -a Simulator && flutter run   # iOS Simulator
```

---

### Step 5 — Configure your services (where needed)

When your app opens you'll see a **Welcome** screen and a **Configuration** page.

- **nano** — No configuration needed. Everything works offline, data is saved in your browser.
- **micro** — No configuration needed. Deploy to Vercel when you're ready.
- **standard / pro** — Open the **Configuration** tab in the app and paste in your Supabase (and Clerk for pro) credentials. The app walks you through exactly where to get them.
- **mobile / mobile-pro** — Fill in your credentials in the `.env` file in your project folder, then restart the app.

Each template includes a **Getting Started** guide inside the app itself that walks you through every step.

---

### Step 6 — Start building

Every template includes a working **task manager** as a reference implementation — it shows you how the full stack fits together (routing, database, auth, API calls). Replace it with your own feature when you're ready.

Your AI coding assistant is your best tool here. Open your new project folder in Claude Code, Cursor, or Windsurf and start describing what you want to build.

---

### Step 7 — Only your project folder matters now

Everything inside `vibecoding-in-a-box/` is just the scaffolding tool. Once your project is created you only need what's inside your new project folder.

You can:
- **Keep** this repo around to scaffold more projects later
- **Delete** the `vibecoding-in-a-box` folder if you don't need it anymore
- **Run the scaffold command again** any time to start a new project

---

## Template details

### `nano` — Local personal tool
**Stack:** Vite + React + Zustand
- Runs entirely in your browser — no server, no accounts, no hosting
- Data is saved to localStorage and survives page refreshes
- No environment variables or external services needed
- Perfect for: personal dashboards, note-taking tools, calculators, local utilities

### `micro` — Simple hosted web app
**Stack:** Next.js + Vercel
- A web app you can share with others via a URL
- No database, no user accounts — just a fast, deployable frontend
- Deploy with a single command: `npx vercel`
- Perfect for: landing pages, portfolios, simple tools, marketing sites

### `standard` — Full-stack web app
**Stack:** Next.js + Supabase Auth + Supabase + Vercel
- Full database (Postgres) + user accounts (email/password) + hosting
- Everything runs on free tiers — Supabase free + Vercel free
- One service (Supabase) handles both your database and authentication
- Perfect for: SaaS apps, internal tools, anything that needs users + data

### `pro` — AI-powered full-stack app
**Stack:** Next.js + Supabase + Clerk + Claude SDK + Vercel AI SDK + Vercel
- Everything in `standard` plus Clerk (social login, MFA, user management)
- Streaming AI chat via Claude — ready to customise out of the box
- Perfect for: AI-powered tools, apps that need social login, production SaaS

### `mobile` — Cross-platform mobile app
**Stack:** Flutter + Supabase
- One codebase for iOS and Android (and macOS desktop for development)
- Database + auth via Supabase
- Run on your Mac desktop while building — no phone needed
- **Requires Flutter + Xcode** — the scaffold script will guide you if you don't have them
- Perfect for: mobile utilities, task apps, anything you want on a phone

### `mobile-pro` — AI-powered mobile app
**Stack:** Flutter + Supabase + Claude SDK
- Everything in `mobile` plus a Claude AI chat screen
- Claude is called directly via HTTP from Dart
- Perfect for: AI assistants, smart mobile tools, on-device AI features

---

## Using an AI coding assistant

If you open this repo in **Claude Code**, the wizard runs automatically — Claude will ask what you're building and run the scaffold command for you.

For **Cursor or Windsurf**, paste the contents of `wizard/prompts/cursor.md` into the chat to run the interactive wizard.

For **any other AI tool**, use `wizard/prompts/generic.md`.

---

## Repo structure

```
vibecoding-in-a-box/
├── CLAUDE.md                  # AI setup wizard (auto-loaded by Claude Code)
├── README.md                  # This file
├── PRD.md                     # Product requirements document
│
├── templates/
│   ├── nano/                  # Vite + React + Zustand
│   ├── micro/                 # Next.js + Vercel
│   ├── standard/              # Next.js + Supabase Auth + Supabase + Vercel
│   ├── pro/                   # Next.js + Supabase + Clerk + Claude SDK + Vercel
│   ├── mobile/                # Flutter + Supabase
│   └── mobile-pro/            # Flutter + Supabase + Claude SDK
│
├── wizard/
│   ├── questions.md           # Setup questions (AI-readable)
│   ├── decision-tree.md       # Config recommendation logic
│   └── prompts/
│       ├── claude.md          # Prompt for Claude Code
│       ├── cursor.md          # Prompt for Cursor / Windsurf
│       └── generic.md         # Prompt for any AI assistant
│
├── scripts/
│   ├── setup.sh               # Interactive CLI wizard
│   └── scaffold.sh            # Direct scaffolding by config name
│
└── docs/
    ├── stack-guide.md         # Why each technology was chosen
    ├── deployment.md          # Deployment guides per config
    ├── flutter-setup.md       # Flutter install guide (macOS/Linux/Windows)
    └── contributing.md        # How to contribute
```

---

## Contributing

See `docs/contributing.md` for full guidelines.

The short version: bug fixes and doc improvements are always welcome via PR. For new templates or significant changes, open an issue first to discuss — we want to keep the decision logic clean and the template count manageable.

---

## License

MIT
