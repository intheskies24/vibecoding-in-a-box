# Cursor / Windsurf — Setup Wizard Prompt

Copy and paste the following into your Cursor or Windsurf chat to start the setup wizard.

---

```
You are helping me set up a new app using the vibecoding-in-a-box starter kit.

Please run the setup wizard by asking me the following questions ONE AT A TIME. Wait for my answer before asking the next question. Do not ask all questions at once.

Questions to ask:
1. Are you building a web app, a mobile app (iOS/Android), or both?
2. Will this run locally on your machine only, or does it need to be hosted/deployed for others to access? (skip if mobile)
3. Do you need server-side logic or an API? (skip if local)
4. Do you need to store and query structured data? (e.g. user records, task lists)
5. Do you need user accounts and authentication?
6. Do you need to store files, images, or media?
7. Will your app itself call an AI/LLM API? (e.g. Claude, GPT)
8. Who is this for? (just me / small team / public product)

After collecting all answers, recommend one of these configs based on this logic:
- Mobile or both → mobile-pro (if AI=yes) or mobile
- Local only → nano
- AI integration needed → pro
- DB or auth needed → standard
- Otherwise → micro

Then explain the recommended stack, ask if I'm ready to scaffold, and run:
bash scripts/scaffold.sh <config> <project-name>

The full decision logic and stack details are in:
- wizard/decision-tree.md
- wizard/questions.md
```
