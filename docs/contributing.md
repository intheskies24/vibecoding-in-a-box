# Contributing to vibecoding-in-a-box

Thank you for wanting to contribute! This repo is intentionally opinionated — the goal is a small number of well-maintained, reliable templates, not an exhaustive catalogue. Quality over quantity.

---

## What we welcome

### Bug fixes and dependency updates
Always welcome. If something is broken, throws an error on first run, or uses an outdated package — open a PR directly.

### Documentation improvements
Open a PR directly — no issue needed. This includes fixing typos, improving setup instructions, adding examples, or updating the Flutter/deployment guides.

### Template improvements
Improvements to existing templates (better UX, new pages, accessibility, performance) are welcome via PR. Test your changes by scaffolding and running the template before submitting.

### New wizard prompts
If you want to add a wizard prompt for a new AI tool (e.g. GitHub Copilot, Gemini), open a PR adding a file to `wizard/prompts/`.

### New templates
Open an **issue first** before writing code. Describe:
- What stack the template uses and why it's not covered by an existing config
- Who the target user is
- What services/accounts are required (we prefer free-tier-friendly stacks)

We'll discuss before you invest time building it.

---

## Development setup

```bash
git clone https://github.com/intheskies24/vibecoding-in-a-box.git
cd vibecoding-in-a-box
```

No dependencies at the repo root — templates have their own `package.json` or `pubspec.yaml`.

### Testing a web template

```bash
./scripts/scaffold.sh standard test-project
cd test-project
npm install && npm run dev
# Open http://localhost:3000
# Verify: welcome page loads, all nav tabs work, configuration page renders
```

### Testing a mobile template

```bash
./scripts/scaffold.sh mobile test-mobile
cd test-mobile
flutter pub get
flutter run -d macos
# Verify: app opens at iPhone dimensions, all 5 tabs navigate correctly
```

Clean up test scaffolds when done — they are gitignored via `test-tool-*/`:
```bash
rm -rf test-project test-mobile
```

---

## Template standards

All templates must meet these requirements before merging:

**Structure**
- [ ] `README.md` with setup instructions and project structure overview
- [ ] `.env.example` listing all required environment variables with comments linking to where to get each value
- [ ] `.gitignore` appropriate for the stack

**Quality**
- [ ] Opens without errors after following the README setup steps
- [ ] Runs gracefully without credentials (shows "not configured" state rather than crashing)
- [ ] All navigation tabs/pages are reachable without credentials

**Content (all templates must include)**
- [ ] **Welcome screen** — gradient header, template name/badge, fact cards, template comparison table
- [ ] **Getting Started screen** — numbered step-by-step setup guide with code snippets
- [ ] **Components screen** — UI component showcase (buttons, inputs, cards, badges)
- [ ] **Configuration screen** — credential status display + setup instructions
- [ ] **Reference CRUD feature** — working example (task manager) demonstrating the primary data layer

---

## Naming conventions

| Config | Stack | Platform |
|--------|-------|---------|
| `nano` | Vite + React + Zustand | Web (local only) |
| `micro` | Next.js + Vercel | Web (hosted) |
| `standard` | Next.js + Supabase Auth + Supabase + Vercel | Web (full-stack) |
| `pro` | Next.js + Supabase + Clerk + Claude SDK + Vercel | Web (AI + advanced auth) |
| `mobile` | Flutter + Supabase | iOS/Android/macOS |
| `mobile-pro` | Flutter + Supabase + Claude SDK | iOS/Android/macOS (AI) |

New configs should fit naturally into this naming scheme. If you're proposing a significantly different stack, explain why it warrants a new config vs. upgrading an existing one.

---

## Pull request guidelines

1. **One template or concern per PR** — don't mix template changes with script changes
2. **Test your changes** — scaffold the template and confirm it runs start to finish
3. **Update docs if needed:**
   - `wizard/decision-tree.md` if your change affects the recommendation logic
   - `README.md` config table if adding or removing a template
   - The template's own `README.md` if setup steps change
4. **Keep PRs small** — for new templates, open a draft PR early for feedback before finishing
5. **No co-author attributions** in commit messages

---

## Reporting issues

Use GitHub Issues for:
- Templates that crash or fail to install
- Outdated dependencies causing build errors
- Incorrect or missing documentation
- Wizard logic bugs (wrong template recommended)

Please include:
- Which template and which step failed
- Your OS and relevant tool versions (`node --version`, `flutter --version`, `xcode-select -p`, etc.)
- The exact error message

---

## Questions and ideas

Open a **GitHub Discussion** for questions, ideas, or general conversation. Issues are for bugs and concrete, actionable requests.
