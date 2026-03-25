# vibecoding-in-a-box

Welcome! This repo is a rapid start kit for AI-assisted app development.

## 🚀 First Time Here? Run the Setup Wizard

**Before writing any code**, run the setup wizard. It will ask you a few questions about what you're building and recommend the right stack configuration, then scaffold the project for you.

---

## Setup Wizard Instructions

When a user opens this repo for the first time (or asks to start a new project), run the following wizard. Ask each question one at a time, wait for the answer, then proceed. Do not ask all questions at once.

---

### Wizard Questions

Ask the user these questions in order:

**Q1 — Platform**
> "Are you building a **web app**, a **mobile app** (iOS/Android), or **both**?"
- web
- mobile
- both

**Q2 — Hosting** *(skip if mobile-only)*
> "Will this run **locally on your machine only**, or does it need to be **hosted/deployed** for others to access?"
- local
- hosted

**Q3 — Backend** *(skip if local)*
> "Do you need **server-side logic or an API**? (e.g. processing data, calling external services, scheduled jobs)"
- yes
- no

**Q4 — Database**
> "Do you need to **store and query structured data**? (e.g. users, records, history)"
- yes
- no

**Q5 — Auth**
> "Do you need **user accounts and authentication**? (sign-up, login, sessions)"
- yes
- no

**Q6 — Storage**
> "Do you need to **store files, images, or media**?"
- yes
- no

**Q7 — AI Integration**
> "Will your app itself **call an AI/LLM API**? (e.g. Claude, GPT, generating content, chat features)"
- yes
- no

**Q8 — Scale**
> "Who is this for?"
- Just me / personal tool
- Small team (internal tool)
- Public-facing product

---

### Recommendation Logic

After collecting answers, recommend a config using this logic:

```
if platform == mobile or both:
  if AI == yes → recommend: mobile-pro
  else         → recommend: mobile

if hosting == local:
  → recommend: nano

if AI == yes:
  → recommend: pro

if database == yes or auth == yes:
  → recommend: standard

→ recommend: micro
```

---

### Stack Configurations

| Config | Best For | Stack |
|--------|----------|-------|
| `nano` | Local personal tool | Vite + React + Zustand (localStorage persist) |
| `micro` | Simple hosted web app | Next.js + Vercel, no DB |
| `standard` | Full-stack web app | Next.js + Supabase Auth + Supabase + Vercel |
| `pro` | AI-powered full-stack | Next.js + Supabase + Clerk + Claude SDK + Vercel AI SDK |
| `mobile` | Cross-platform mobile | Flutter + Supabase |
| `mobile-pro` | AI-powered mobile app | Flutter + Supabase + Claude SDK |

---

### After Recommending

1. Explain **why** you are recommending this config based on their answers.
2. List the key technologies and what role each plays.
3. Ask: *"Ready to scaffold? I'll set up your project from the `{config}` template."*
4. If yes, run: `bash scripts/scaffold.sh {config} {project-name}`
   - If the scripts directory is not executable, run: `chmod +x scripts/scaffold.sh && bash scripts/scaffold.sh {config} {project-name}`
5. After scaffolding, walk the user through the next steps specific to their config (see `wizard/prompts/claude.md` for per-config next steps).

---

## Quick Reference

- Templates live in `templates/{config}/`
- Each template has its own `README.md` with setup instructions
- Wizard logic is documented in `wizard/decision-tree.md`
- Stack rationale is in `docs/stack-guide.md`
