import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Box, CheckSquare, Database, Shield, Sparkles } from "lucide-react";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/tasks");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-950 to-indigo-950 flex flex-col items-center justify-center p-8">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-14 h-14 bg-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-900/50">
            <Box size={28} className="text-white" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/15 text-violet-400 border border-violet-500/20">
            pro template
          </span>
          <h1 className="text-4xl font-bold text-white tracking-tight">My App</h1>
          <p className="text-slate-400 text-lg">
            Full-stack web app with auth, database, and AI-powered features.
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { icon: <Shield size={12} />, label: "Clerk Auth" },
            { icon: <Database size={12} />, label: "Supabase" },
            { icon: <Sparkles size={12} />, label: "Claude AI" },
            { icon: <CheckSquare size={12} />, label: "Task Manager" },
          ].map(({ icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-slate-400 border border-white/10"
            >
              {icon}
              {label}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex gap-3 justify-center">
          <a
            href="/sign-in"
            className="inline-flex items-center justify-center rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 transition-colors shadow-lg shadow-violet-900/30"
          >
            Sign In
          </a>
          <a
            href="/sign-up"
            className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/10 transition-colors"
          >
            Create Account
          </a>
        </div>

        <p className="text-xs text-slate-600">
          Built with vibecoding-in-a-box · Next.js + Supabase + Clerk + Claude
        </p>
      </div>
    </main>
  );
}
