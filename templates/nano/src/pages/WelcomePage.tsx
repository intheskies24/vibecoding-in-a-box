const TEMPLATES = [
  { name: "nano", best: "Local personal tool", stack: "Vite + React + Zustand", active: true },
  { name: "micro", best: "Simple hosted web app", stack: "Next.js + Vercel" },
  { name: "standard", best: "Full-stack web app", stack: "Next.js + Supabase + Clerk" },
  { name: "pro", best: "AI-powered web app", stack: "Next.js + Supabase + Clerk + Claude SDK" },
  { name: "mobile", best: "Cross-platform mobile", stack: "Flutter + Supabase" },
  { name: "mobile-pro", best: "AI-powered mobile app", stack: "Flutter + Supabase + Claude SDK" },
];

export function WelcomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 px-8 py-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
            nano template
          </div>
          <h1 className="text-3xl font-bold text-white mb-3 leading-snug">
            You are set up with the{" "}
            <span className="font-mono bg-white/20 px-2 py-0.5 rounded">nano</span>{" "}
            template from vibecoding-in-a-box!
          </h1>
          <p className="text-white/80 text-base leading-relaxed">
            The most lightweight, ready-to-go template — designed for local scripts
            and personal tools with no server, no database, and no accounts required.
            Great starting points include a note-taking app, a to-do list, or a simple calculator.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8 max-w-3xl space-y-8">
        {/* Quick facts */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Server required", value: "None" },
            { label: "Database", value: "localStorage" },
            { label: "Deploy target", value: "Local only" },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">{item.label}</p>
              <p className="text-sm font-semibold text-gray-800">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Template comparison */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Want to build something else?
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  <th className="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Template</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Best for</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Stack</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {TEMPLATES.map((t) => (
                  <tr key={t.name} className={t.active ? "bg-emerald-50/50" : "hover:bg-gray-50/50 transition-colors"}>
                    <td className="px-5 py-3">
                      <span className={`font-mono font-semibold text-sm ${t.active ? "text-emerald-700" : "text-gray-700"}`}>
                        {t.name}
                      </span>
                      {t.active && (
                        <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 font-medium px-1.5 py-0.5 rounded-full">
                          current
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-sm">{t.best}</td>
                    <td className="px-5 py-3 text-gray-400 text-xs font-mono">{t.stack}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2 font-mono">
            ./scripts/scaffold.sh &lt;template&gt; &lt;project-name&gt;
          </p>
        </div>
      </div>
    </div>
  );
}
