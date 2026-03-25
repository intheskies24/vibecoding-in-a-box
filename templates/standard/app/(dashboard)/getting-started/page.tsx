import { Database, Shield, Terminal, Rocket, ExternalLink, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <Database size={20} className="text-blue-400" />,
    title: "Set up Supabase",
    description: "Create a free project at supabase.com and run the migration.",
    items: [
      "Create a new project at supabase.com",
      "Go to SQL Editor and run supabase/migrations/001_tasks.sql",
      "Copy your project URL and anon key from Project Settings → API",
    ],
    code: "-- Run in Supabase SQL Editor\n-- File: supabase/migrations/001_tasks.sql",
  },
  {
    number: "02",
    icon: <Shield size={20} className="text-indigo-400" />,
    title: "Set up Clerk",
    description: "Create a free application at clerk.com for authentication.",
    items: [
      "Create a new application at clerk.com",
      "Enable Email and any social providers you want",
      "Copy your Publishable Key and Secret Key",
      "Add your Supabase JWT template in Clerk → JWT Templates",
    ],
    code: 'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...\nCLERK_SECRET_KEY=sk_test_...',
  },
  {
    number: "03",
    icon: <Terminal size={20} className="text-emerald-400" />,
    title: "Configure environment",
    description: "Copy .env.example to .env.local and fill in your keys.",
    items: [
      "cp .env.example .env.local",
      "Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY",
      "Fill in NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY",
      "npm install && npm run dev",
    ],
    code: "cp .env.example .env.local\nnpm install\nnpm run dev",
  },
  {
    number: "04",
    icon: <Rocket size={20} className="text-violet-400" />,
    title: "Deploy to Vercel",
    description: "Push to GitHub and deploy in one click.",
    items: [
      "Push your code to a GitHub repo",
      "Import the repo at vercel.com/new",
      "Add all environment variables in the Vercel dashboard",
      "Deploy — Vercel handles builds and previews automatically",
    ],
    code: "git push origin main\n# Then import at vercel.com/new",
  },
];

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 px-8 py-10">
        <div className="max-w-3xl">
          <h1 className="text-2xl font-bold text-white mb-2">Getting Started</h1>
          <p className="text-slate-400">
            Set up your full-stack app with Supabase and Clerk in four steps.
          </p>
        </div>
      </div>

      <div className="px-8 py-8 max-w-3xl space-y-4">
        {steps.map((step) => (
          <div key={step.number} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-6 py-5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                  {step.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-slate-400">{step.number}</span>
                    <h2 className="font-semibold text-gray-900">{step.title}</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <pre className="mt-4 bg-slate-950 text-slate-300 px-4 py-3 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
                    <code>{step.code}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Helpful links */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 text-sm">Helpful Links</h2>
          </div>
          <div className="px-6 py-4 grid grid-cols-2 gap-3">
            {[
              { label: "Supabase Docs", url: "https://supabase.com/docs" },
              { label: "Clerk Docs", url: "https://clerk.com/docs" },
              { label: "Next.js Docs", url: "https://nextjs.org/docs" },
              { label: "Vercel Docs", url: "https://vercel.com/docs" },
            ].map(({ label, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
              >
                <ExternalLink size={13} />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
