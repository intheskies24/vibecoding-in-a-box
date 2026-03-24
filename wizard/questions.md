# Setup Wizard — Questions

This file defines the canonical setup questions used by both the AI wizard and the CLI wizard (`scripts/setup.sh`). Questions are asked in order. Some questions are conditional (see notes).

---

## Q1 — Platform

**Prompt:** Are you building a web app, a mobile app (iOS/Android), or both?

**Options:**
- `web` — Browser-based application
- `mobile` — Native iOS/Android app via Flutter
- `both` — Web + mobile (same backend, different frontends)

**Notes:** Always asked first. If `mobile` or `both`, skip Q2.

---

## Q2 — Hosting

**Prompt:** Will this run locally on your machine only, or does it need to be hosted/deployed for others to access?

**Options:**
- `local` — Runs only on your machine, not deployed anywhere
- `hosted` — Deployed to a server, accessible via URL

**Notes:** Only asked if Q1 = `web`. If `local`, skip Q3.

---

## Q3 — Backend

**Prompt:** Do you need server-side logic or an API? (e.g. processing data, calling external services, scheduled jobs)

**Options:**
- `yes` — Need a backend API or server-side processing
- `no` — Frontend-only is fine

**Notes:** Only asked if Q2 = `hosted`.

---

## Q4 — Database

**Prompt:** Do you need to store and query structured data? (e.g. user records, task lists, history)

**Options:**
- `yes` — Need persistent, queryable data storage
- `no` — No database needed

**Notes:** Always asked (for all platforms and hosting types).

---

## Q5 — Auth

**Prompt:** Do you need user accounts and authentication? (sign-up, login, sessions)

**Options:**
- `yes` — Need user registration, login, session management
- `no` — No user accounts needed

**Notes:** Always asked.

---

## Q6 — Storage

**Prompt:** Do you need to store files, images, or media?

**Options:**
- `yes` — Need to upload/download files, images, documents
- `no` — No file storage needed

**Notes:** Always asked. Influences stack even if not the primary deciding factor.

---

## Q7 — AI Integration

**Prompt:** Will your app itself call an AI/LLM API? (e.g. Claude, GPT — generating content, chat features, embeddings)

**Options:**
- `yes` — App will call an AI API as a feature
- `no` — No AI features in the app itself

**Notes:** Always asked. Distinguishes `standard` from `pro` and `mobile` from `mobile-pro`.

---

## Q8 — Scale

**Prompt:** Who is this for?

**Options:**
- `personal` — Just me / personal tool
- `team` — Small team, internal tool
- `public` — Public-facing product with real users

**Notes:** Informs setup advice and deployment recommendations but does not change the core stack config.
