# nano template

**Stack:** Vite + React + Zustand + Tailwind CSS
**Use case:** Local personal tool — no server, no accounts, no deployment required

When you first run this template you'll see a welcome screen explaining what nano is and linking to other templates. Start building from `src/App.tsx`.

Included in `src/store/` and `src/components/` are reference implementations of a task manager (Zustand store + task list/form) that you can use as a starting point or delete entirely.

---

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

That's it. No environment variables, no external services.

---

## Project Structure

```
src/
├── App.tsx                  # Root component and layout
├── main.tsx                 # Entry point
├── index.css                # Tailwind base styles + CSS variables
│
├── components/
│   ├── TaskForm.tsx         # Create task form
│   └── TaskList.tsx         # Task list with status controls
│
├── store/
│   └── tasks.ts             # Zustand store — persisted to localStorage
│
├── types/
│   └── index.ts             # TypeScript types (Task, TaskStatus)
│
└── lib/
    └── utils.ts             # cn() utility for Tailwind
```

---

## How Data Persistence Works

This template uses [Zustand](https://zustand.pmnd.rs/) with the `persist` middleware. All state is automatically saved to `localStorage` under the key `tasks-storage`.

```ts
// src/store/tasks.ts
export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({ ... }),
    { name: "tasks-storage" }  // localStorage key
  )
);
```

Data survives page refreshes and browser restarts. It is **local to the browser** — it does not sync across devices.

---

## Building Your Feature

To replace the task manager with your own feature:

1. **Define your data shape** in `src/types/index.ts`
2. **Create a store** in `src/store/` using Zustand + persist
3. **Build your UI** in `src/components/`
4. **Wire it up** in `src/App.tsx`

### Upgrading to a backend

When your tool outgrows localStorage (needs multiple devices, sharing, or a real database), upgrade to the `standard` template:

```bash
# From the vibecoding-in-a-box root:
./scripts/scaffold.sh standard my-upgraded-app
```

---

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `vite` | Build tool and dev server |
| `react` | UI framework |
| `zustand` | State management with localStorage persist |
| `tailwindcss` | Styling |
| `lucide-react` | Icons |
| `clsx` + `tailwind-merge` | Conditional classnames |

Add shadcn/ui components as needed:
```bash
npx shadcn@latest init
npx shadcn@latest add button input card badge
```
