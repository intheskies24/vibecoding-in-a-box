import { redirect } from "next/navigation";
import { Box, CheckSquare, Database, Shield } from "lucide-react";

export default async function Home() {
  const isConfigured = !!(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL
  );

  if (!isConfigured) {
    redirect("/configuration");
  }

  // Clerk is configured — check auth
  const { auth } = await import("@clerk/nextjs/server");
  const { userId } = await auth();
  if (userId) redirect("/tasks");

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex flex-col items-center justify-center p-8">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-900/50">
            <Box size={28} className="text-white" />
          </div>
        </div>
        <div className="space-y-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/20">
            standard template
          </span>
          <h1 className="text-4xl font-bold text-white tracking-tight">My App</h1>
          <p className="text-slate-400 text-lg">
            Full-stack web app with auth, database, and real-time data.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { icon: <Shield size={12} />, label: "Clerk Auth" },
            { icon: <Database size={12} />, label: "Supabase" },
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
        <div className="flex gap-3 justify-center">
          <a
            href="/sign-in"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-900/30"
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
          Built with vibecoding-in-a-box · Next.js + Supabase + Clerk
        </p>
      </div>
    </main>
  );
}
