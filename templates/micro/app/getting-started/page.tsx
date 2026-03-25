import { CheckCircle2, Terminal, Globe, Rocket } from "lucide-react";

const STEPS = [
  {
    icon: <CheckCircle2 size={20} className="text-emerald-500" />,
    title: "Install dependencies",
    description: "Install Node packages. Requires Node.js 18+.",
    code: "npm install",
  },
  {
    icon: <Terminal size={20} className="text-blue-500" />,
    title: "Run the dev server",
    description: "Start the Next.js development server with hot reload.",
    code: "npm run dev\n# Open http://localhost:3000",
  },
  {
    icon: <Globe size={20} className="text-violet-500" />,
    title: "Build your page",
    description: "Open app/page.tsx — this is your home page. Add new routes by creating files in the app/ directory.",
    code: "app/\n├── page.tsx          ← home page (start here)\n├── about/\n│   └── page.tsx      ← /about route\n└── api/\n    └── data/route.ts ← /api/data endpoint",
  },
  {
    icon: <Rocket size={20} className="text-amber-500" />,
    title: "Deploy to Vercel",
    description: "Deploy in one command. Zero config — Vercel auto-detects Next.js. Your app is live in under a minute.",
    code: "npx vercel\n# Follow the prompts\n# Your app is live at *.vercel.app",
  },
];

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 px-8 py-10">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold text-white mb-2">Getting Started</h1>
          <p className="text-slate-400">From scaffold to deployed in under 5 minutes.</p>
        </div>
      </div>

      <div className="px-8 py-8 max-w-2xl space-y-4">
        {STEPS.map((step, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="flex items-start gap-4 p-5">
              <div className="mt-0.5 flex-shrink-0 w-8 h-8 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                {step.icon}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-gray-400">STEP {i + 1}</span>
                <h3 className="font-semibold text-gray-900 text-sm mt-0.5 mb-1">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
            <div className="border-t border-gray-100">
              <pre className="bg-slate-950 text-slate-300 px-5 py-4 text-xs font-mono overflow-x-auto leading-relaxed">
                <code>{step.code}</code>
              </pre>
            </div>
          </div>
        ))}

        <div className="mt-4 bg-indigo-50 border border-indigo-200 rounded-xl p-5">
          <h3 className="font-semibold text-indigo-900 text-sm mb-1">Need a database or auth?</h3>
          <p className="text-indigo-700 text-sm mb-3">
            Upgrade to the <code className="font-mono text-xs">standard</code> template for Supabase + Clerk out of the box.
          </p>
          <code className="text-xs bg-indigo-100 text-indigo-800 px-3 py-1.5 rounded-lg font-mono">
            ./scripts/scaffold.sh standard my-app
          </code>
        </div>
      </div>
    </div>
  );
}
