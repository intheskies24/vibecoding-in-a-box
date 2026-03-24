# Generic AI Assistant — Setup Wizard Prompt

Use this with any AI assistant (ChatGPT, Gemini, Claude.ai, etc.).

---

## Paste this into your AI chat:

```
I'm using the vibecoding-in-a-box starter kit to start a new project. Please help me pick the right stack by asking me these questions one at a time:

1. Am I building a web app, a mobile app, or both?
2. Will it be local-only or hosted/deployed? (skip if mobile)
3. Do I need server-side logic or an API? (skip if local)
4. Do I need a database?
5. Do I need user authentication?
6. Do I need file/image storage?
7. Will the app itself call an AI API (Claude, GPT, etc.)?
8. Who is this for — just me, a small team, or the public?

After I answer all questions, tell me which configuration to use:
- nano → local tool, Vite + React + Zustand
- micro → simple hosted web app, Next.js + Vercel
- standard → full-stack web app, Next.js + Supabase + Clerk + Vercel
- pro → AI web app, Next.js + Supabase + Clerk + Claude SDK + Vercel
- mobile → Flutter + Supabase
- mobile-pro → Flutter + Supabase + Claude SDK

Then tell me the setup steps for that config.
```

---

## Manual Setup (without AI)

If you prefer to set it up yourself:

1. Figure out your config from the table in `README.md`
2. Run `./scripts/scaffold.sh <config> <project-name>`
3. Follow the `README.md` inside the generated template directory
