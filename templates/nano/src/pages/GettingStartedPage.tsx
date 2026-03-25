import { CheckCircle2, Terminal, FolderOpen, Zap, Trash2 } from "lucide-react";

const STEPS = [
  {
    icon: <CheckCircle2 size={20} className="text-emerald-500" />,
    title: "You're already running!",
    description: "The nano template has zero external dependencies. No API keys, no accounts, no services to configure.",
    code: null,
  },
  {
    icon: <FolderOpen size={20} className="text-blue-500" />,
    title: "Start building from App.tsx",
    description: "Open src/App.tsx — this is your entry point. Replace the page content with your own feature.",
    code: "src/App.tsx",
  },
  {
    icon: <Terminal size={20} className="text-violet-500" />,
    title: "Add your data model",
    description: "All state lives in Zustand and persists automatically to localStorage. Add new stores in src/store/.",
    code: `// src/store/myStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useMyStore = create(persist(
  (set) => ({
    items: [],
    addItem: (item) => set((s) => ({ items: [...s.items, item] })),
  }),
  { name: "my-store" } // localStorage key
));`,
  },
  {
    icon: <Zap size={20} className="text-amber-500" />,
    title: "Add shadcn/ui components",
    description: "Run the shadcn CLI to add production-ready UI components. See the UI Components page for previews.",
    code: `npx shadcn@latest init
npx shadcn@latest add button card input badge`,
  },
  {
    icon: <Trash2 size={20} className="text-gray-400" />,
    title: "Delete the example code",
    description: "Remove src/store/tasks.ts, src/components/TaskForm.tsx, and src/components/TaskList.tsx when you're ready to build your own feature.",
    code: null,
  },
];

export function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 px-8 py-10">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold text-white mb-2">Getting Started</h1>
          <p className="text-slate-400">Everything you need to go from scaffold to shipping.</p>
        </div>
      </div>

      <div className="px-8 py-8 max-w-2xl">
        <div className="space-y-4">
          {STEPS.map((step, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="flex items-start gap-4 p-5">
                <div className="mt-0.5 flex-shrink-0 w-8 h-8 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                  {step.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-400">STEP {i + 1}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
              {step.code && (
                <div className="border-t border-gray-100">
                  <pre className="bg-slate-950 text-slate-300 px-5 py-4 text-xs font-mono overflow-x-auto leading-relaxed">
                    <code>{step.code}</code>
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Upgrade callout */}
        <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-xl p-5">
          <h3 className="font-semibold text-indigo-900 text-sm mb-1">Ready for more?</h3>
          <p className="text-indigo-700 text-sm mb-3">
            When your tool needs a real database, user accounts, or AI features — upgrade to a bigger template.
          </p>
          <code className="text-xs bg-indigo-100 text-indigo-800 px-3 py-1.5 rounded-lg font-mono">
            ./scripts/scaffold.sh standard my-upgraded-app
          </code>
        </div>
      </div>
    </div>
  );
}
