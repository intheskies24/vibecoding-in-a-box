# PRD: vibecoding-in-a-box

**Status:** Draft
**Version:** 0.2
**Date:** 2026-03-24

---

## Overview

`vibecoding-in-a-box` is a public GitHub repo that acts as a rapid start kit for AI-assisted ("vibecoded") app development. It gives developers an opinionated, pre-configured foundation to start building immediately — without spending time on boilerplate, technology decisions, or scaffolding.

The repo is designed to be cloned once and used as the starting point for any future app, at any scale. Its core differentiator is an **AI-guided setup conversation** that asks the developer a short series of questions about what they are building, then recommends the right stack configuration and scaffolds it automatically.

---

## Problem Statement

Vibecoding moves fast — but every new project still wastes time on the same problems:

1. **Boilerplate fatigue.** Auth, routing, UI components, DB connections, and storage setup are rebuilt from scratch on every project.
2. **Technology paralysis.** There are hundreds of valid choices for every layer of the stack. Evaluating them slows down momentum.
3. **Scale mismatch.** Existing starter kits are scoped to a specific stack (e.g., `create-next-app`) and don't adapt to whether you're building a quick local tool or a production-grade hosted app.
4. **No AI-native workflow.** Current starter kits weren't designed for AI-assisted development. There's no CLAUDE.md, no setup wizard, no prompt scaffolding.
5. **Web/mobile gap.** There's no single starting point that covers both web and mobile targets.

---

## Goals

- Reduce time from `git clone` to a running, deployable app skeleton to **under 15 minutes**
- Support development across a range of scales: local scripts → hosted tools → full-stack apps → mobile apps
- Work well for developers of varying experience levels, including beginners using AI tools to code
- Be maintainable and extensible by a community of vibecoding contributors
- Be usable with any AI coding assistant (Claude Code, Cursor, Windsurf, Copilot, etc.)

---

## Non-Goals

- Not a framework — this is scaffolding, not runtime code
- Not opinionated about business logic, domain patterns, or application architecture
- Not a CI/CD solution (though starter configs may be included)
- Not a replacement for framework-specific docs or tutorials

---

## Users

**Primary:** Vibecoding developers — developers using AI tools (Claude Code, Cursor, etc.) to build apps quickly, ranging from experienced engineers to technical non-developers.

**Secondary:** The broader community of developers who want an opinionated, modern starting point for new projects.

---

## Core Feature: The Setup Wizard

When a developer clones this repo, the first thing they do is run the setup wizard. It is available in two modes:

- **AI mode** — open the repo in any AI coding assistant (Claude Code, Cursor, Windsurf, Copilot). The `CLAUDE.md` and equivalent prompt files instruct the AI to run the onboarding interview automatically before doing anything else.
- **CLI mode** — run `./scripts/setup.sh` in a terminal for an interactive, question-by-question wizard that works without any AI assistant.

### Setup Questions

The wizard asks:

1. **Platform** — Are you building a web app, a mobile app, or both?
2. **Hosting** — Is this local-only (runs on your machine), or does it need to be hosted/deployed?
3. **Backend** — Do you need server-side logic, an API, or data processing?
4. **Database** — Do you need to store and query structured data?
5. **Storage** — Do you need to store files, images, or media?
6. **Auth** — Do you need user accounts and authentication?
7. **AI integration** — Does the app itself need to call an LLM or AI API?
8. **UI style** — Functional/minimal, polished/product-quality, or highly custom?
9. **Scale** — Personal tool, small team, or public-facing product?

### Output

Based on the answers, the wizard recommends one of the pre-defined **stack configurations** (see below), explains the reasoning, and offers to scaffold the project by copying the matching template and running the setup script.

---

## Stack Configurations

Pre-defined, named combinations of technologies tuned for specific use cases.

| Config | Use Case | Stack |
|--------|----------|-------|
| `nano` | Local script or personal tool | Vite + React, no backend, SQLite (local) |
| `micro` | Simple hosted web app | Next.js, no DB, deployed to Vercel |
| `standard` | Full-stack web app | Next.js + Supabase + Clerk + Vercel |
| `pro` | AI-powered full-stack web app | Next.js + Supabase + Clerk + Claude SDK + Vercel AI SDK |
| `mobile` | Cross-platform mobile app | Flutter + Supabase |
| `mobile-pro` | AI-powered mobile app | Flutter + Supabase + Claude SDK |

Each config maps to a template directory in the repo containing:
- Working scaffold code (file structure, config files, routing)
- A reference CRUD example app (a task manager / todo app) demonstrating the full stack in action
- A `.env.example` file listing all required environment variables
- A `README.md` specific to that template with setup and deployment steps

---

## Technology Stack

### Web Frontend
| Technology | Role | Notes |
|-----------|------|-------|
| Next.js 14+ (App Router) | Full-stack web framework | Default for hosted/full-stack apps |
| Vite + React | Lightweight frontend | For local tools and `nano` config |
| shadcn/ui | Component library | Tailwind-based, copy-paste friendly, AI-codeable |
| Tailwind CSS | Styling | Default across all web configs |

### Mobile
| Technology | Role | Notes |
|-----------|------|-------|
| Flutter (Dart-only) | Cross-platform mobile | iOS + Android from a single codebase; Dart-native throughout — no JS bridge patterns |

### Backend
| Technology | Role | Notes |
|-----------|------|-------|
| Next.js API Routes | Server-side logic | Tightly coupled to web frontend |
| FastAPI (Python) | Standalone API | When heavy AI/data processing is needed |
| Express/Node | Lightweight REST API | Alternative to Next.js API routes |

### Database
| Technology | Role | Notes |
|-----------|------|-------|
| Supabase (Postgres) | Hosted relational DB + Realtime | Default for hosted apps |
| SQLite | Local database | For `nano` / local-only tools |
| Neon | Serverless Postgres | Hosted alternative to Supabase DB |

### Auth
| Technology | Role | Notes |
|-----------|------|-------|
| Clerk | User auth + management | Default — best DX for vibecoding |
| Supabase Auth | Auth when already using Supabase | Reduces vendor count |
| NextAuth.js | Open-source auth | When self-hosting auth is required |

### Storage
| Technology | Role | Notes |
|-----------|------|-------|
| Supabase Storage | File/media storage | Default when using Supabase |
| Cloudflare R2 | Scalable object storage | High-volume or cost-sensitive apps |
| Local filesystem | Local storage | For `nano` / local-only tools |

### AI Integration
| Technology | Role | Notes |
|-----------|------|-------|
| Anthropic Claude SDK | LLM API client | Default |
| OpenAI SDK | LLM API client | Alternative |
| Vercel AI SDK | Streaming UI + AI routing | For chat/streaming interfaces in Next.js |

### Deployment
| Technology | Role | Notes |
|-----------|------|-------|
| Vercel | Web deployment | Default for Next.js apps |
| Railway | Full-stack / backend deployment | When more control is needed |
| App stores (Apple / Google) | Mobile distribution | For Flutter apps |

---

## Repo Structure

```
vibecoding-in-a-box/
├── CLAUDE.md                  # AI setup wizard — read by Claude Code on project open
├── README.md                  # Human-readable guide and quick start
├── PRD.md                     # This document
│
├── templates/
│   ├── nano/                  # Local tool (Vite + React + SQLite)
│   ├── micro/                 # Hosted web app (Next.js + Vercel)
│   ├── standard/              # Full-stack (Next.js + Supabase + Clerk)
│   ├── pro/                   # AI full-stack (Next.js + Supabase + Clerk + Claude SDK)
│   ├── mobile/                # Mobile app (Flutter + Supabase)
│   └── mobile-pro/            # AI mobile app (Flutter + Supabase + Claude SDK)
│
├── wizard/
│   ├── questions.md           # The setup questions (AI-readable)
│   ├── decision-tree.md       # Logic for mapping answers → config recommendation
│   └── prompts/
│       ├── claude.md          # Wizard prompt for Claude Code
│       ├── cursor.md          # Wizard prompt for Cursor
│       └── generic.md        # Generic prompt for any AI assistant
│
├── scripts/
│   ├── setup.sh               # CLI wizard: asks questions interactively, scaffolds project
│   └── scaffold.sh            # Non-interactive: accepts config name as argument (e.g. ./scaffold.sh pro)
│
└── docs/
    ├── stack-guide.md         # Why each technology was chosen
    ├── deployment.md          # Deployment guide per config
    └── contributing.md        # How to contribute new templates or configs
```

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Time from clone to running app | < 15 minutes |
| Stack configs covering common use cases | 95%+ coverage |
| GitHub Stars (6 months post-launch) | 500+ |
| GitHub Forks | 100+ |
| Community-contributed templates | 3+ within 6 months |

---

## Phased Roadmap

### Phase 1 — Foundation (MVP)
- [ ] `CLAUDE.md` with AI setup wizard prompt
- [ ] `README.md` with project overview and quick start
- [ ] `wizard/` directory with questions and decision tree
- [ ] `standard` template (Next.js + Supabase + Clerk + Vercel) — includes task manager CRUD example
- [ ] `nano` template (Vite + React + SQLite) — includes task manager CRUD example
- [ ] `scripts/setup.sh` interactive CLI wizard
- [ ] `scripts/scaffold.sh` non-interactive scaffolding shortcut

### Phase 2 — Full Config Coverage
- [ ] `micro` template
- [ ] `pro` template (adds Claude SDK to `standard`)
- [ ] `mobile` template (Flutter + Supabase)
- [ ] `mobile-pro` template

### Phase 3 — Polish & Community
- [ ] Wizard prompts for Cursor, Windsurf, and Copilot
- [ ] `docs/stack-guide.md` and `docs/deployment.md`
- [ ] `CONTRIBUTING.md` for community submissions
- [ ] GitHub Actions for template validation (lint, build checks)
- [ ] Public launch (Product Hunt, X/Twitter, Hacker News)

---

## Decisions Log

| # | Question | Decision | Rationale |
|---|----------|----------|-----------|
| 1 | CLI wizard vs. AI-only wizard? | **Both** | CLI wizard (`setup.sh`) enables use without an AI assistant; AI wizard provides richer guidance and can directly scaffold code |
| 2 | Example CRUD or empty scaffolding? | **Include CRUD example** | A task manager app in each template demonstrates the full stack end-to-end and gives AI tools a working reference to build from |
| 3 | Web configurator (like `create-t3-app`) or git clone + wizard? | **Git clone + wizard** | Sufficient for MVP; avoids maintaining a separate web app |
| 4 | Flutter: Dart-only or JS bridge? | **Dart-only** | Idiomatic, simpler, better AI tool support, no meaningful benefit to JS bridge for greenfield apps |
