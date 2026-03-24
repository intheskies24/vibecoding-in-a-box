# Contributing to vibecoding-in-a-box

Thank you for wanting to contribute! This repo is kept intentionally opinionated — the goal is a small number of well-maintained, reliable templates, not an exhaustive catalogue.

---

## Types of Contributions

### Bug fixes and improvements
Always welcome. If something in a template is broken or outdated, open a PR.

### New templates
Open an **issue first** before writing code. Describe:
- What stack the template uses
- Why it's not covered by an existing config
- Who the target user is

We'll discuss before you invest time building it.

### Documentation improvements
Open a PR directly — no issue needed.

### New wizard prompts (for AI tools)
If you want to add a wizard prompt for a new AI assistant (e.g. GitHub Copilot, Gemini), open a PR adding a file to `wizard/prompts/`.

---

## Development Setup

```bash
git clone https://github.com/your-username/vibecoding-in-a-box.git
cd vibecoding-in-a-box
```

No dependencies at the repo root — templates have their own `package.json` or `pubspec.yaml`.

To test a template locally:

```bash
./scripts/scaffold.sh nano test-project
cd test-project
npm install && npm run dev
```

---

## Template Standards

All templates must:

- [ ] Have a `README.md` with setup instructions and a project structure overview
- [ ] Have a `.env.example` listing all required environment variables with comments linking to where to get each value
- [ ] Have a `.gitignore` appropriate for the stack
- [ ] Open without errors after following the README setup steps
- [ ] Show a welcome screen that includes the template table (consistent with existing templates)
- [ ] Include reference CRUD code demonstrating the primary data layer

### Naming conventions

| Config name | Must use | Platform |
|-------------|---------|---------|
| `nano` | Vite + React | Web |
| `micro` | Next.js | Web |
| `standard` | Next.js + Supabase + Clerk | Web |
| `pro` | Next.js + Supabase + Clerk + AI SDK | Web |
| `mobile` | Flutter + Supabase | Mobile |
| `mobile-pro` | Flutter + Supabase + AI | Mobile |

New configs should fit naturally into this naming scheme or propose a clear extension.

---

## Pull Request Guidelines

1. **One template or feature per PR** — don't mix template changes with script changes
2. **Test your changes** — scaffold the template and confirm it runs
3. **Update the decision tree** if your template changes the wizard recommendation logic (`wizard/decision-tree.md`)
4. **Update the README** if your template changes the config table
5. **Keep PRs small** — if you're building a new template, it's fine to open a draft PR early for feedback

---

## Reporting Issues

Use GitHub Issues for:
- Broken templates (can't install / run)
- Outdated dependencies
- Incorrect documentation
- Wizard decision logic bugs

Please include:
- Which template / config
- Your OS and relevant tool versions (`node --version`, `flutter --version`, etc.)
- The exact error message

---

## Questions

Open a GitHub Discussion for questions, ideas, or general conversation. Issues are for bugs and concrete feature requests.
