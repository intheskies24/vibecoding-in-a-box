import Link from "next/link";
import { CheckSquare, Database, Shield, ArrowRight } from "lucide-react";

const TEMPLATES = [
  { name: "nano", desc: "Local personal tool", stack: "Vite + React + Zustand" },
  { name: "micro", desc: "Simple hosted web app", stack: "Next.js + Vercel" },
  { name: "standard", desc: "Full-stack web app", stack: "Next.js + Supabase", current: true },
  { name: "pro", desc: "AI-powered web app", stack: "Next.js + Supabase + Clerk + Claude" },
  { name: "mobile", desc: "Cross-platform mobile", stack: "Flutter + Supabase" },
  { name: "mobile-pro", desc: "AI-powered mobile", stack: "Flutter + Supabase + Claude" },
];

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-blue-700 via-indigo-700 to-indigo-800 px-8 py-14">
        <div className="max-w-3xl">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white border border-white/20 mb-4">
            standard template
          </span>
          <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
            You are set up with the <span className="bg-white/15 px-2 rounded">standard</span> template from vibecoding-in-a-box!
          </h1>
          <p className="text-indigo-200 text-base max-w-xl">
            A full-stack template with Supabase for your database and authentication. No third-party auth service needed — everything runs on your Supabase project.
          </p>
        </div>
      </div>

      <div className="px-8 py-8 max-w-3xl space-y-6">
        {/* Quick facts */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: <Shield size={18} className="text-indigo-500" />, label: "Auth", value: "Supabase Auth" },
            { icon: <Database size={18} className="text-emerald-500" />, label: "Database", value: "Supabase Postgres" },
            { icon: <CheckSquare size={18} className="text-blue-500" />, label: "Deploy Target", value: "Vercel" },
          ].map(({ icon, label, value }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-200 px-4 py-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                {icon}
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</span>
              </div>
              <p className="font-semibold text-gray-900 text-sm">{value}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-900">Ready to build?</p>
            <p className="text-sm text-gray-500 mt-0.5">Head to Tasks to see the example CRUD app, or open Configuration to connect your Supabase project.</p>
          </div>
          <div className="flex gap-2 ml-4 flex-shrink-0">
            <Link
              href="/configuration"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Configure
            </Link>
            <Link
              href="/tasks"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
            >
              Tasks <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Template table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 text-sm">Want to build something else?</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Template</th>
                <th className="text-left px-6 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Best for</th>
                <th className="text-left px-6 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Stack</th>
              </tr>
            </thead>
            <tbody>
              {TEMPLATES.map((t) => (
                <tr key={t.name} className={`border-b border-gray-50 last:border-0 ${t.current ? "bg-indigo-50/50" : ""}`}>
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-gray-800">
                    {t.name}
                    {t.current && (
                      <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-indigo-100 text-indigo-700">current</span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-gray-600">{t.desc}</td>
                  <td className="px-6 py-3 text-gray-400 font-mono text-xs">{t.stack}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
            <code className="text-xs text-gray-500">./scripts/scaffold.sh &lt;template&gt; &lt;project-name&gt;</code>
          </div>
        </div>
      </div>
    </div>
  );
}
