export default function Home() {
  return (
    <div className="min-h-screen bg-background flex items-start justify-center pt-20 px-4">
      <div className="max-w-2xl w-full space-y-8">

        <div className="space-y-3">
          <h1 className="text-2xl font-bold tracking-tight">
            You are set up with the <span className="font-mono">micro</span> template from vibecoding-in-a-box!
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            This template is designed for simple hosted web apps — no database, no user accounts.
            It runs on Next.js and deploys to Vercel in one command. Great for landing pages,
            marketing sites, dashboards pulling from external APIs, or any web tool that doesn't
            need its own backend data layer.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Want to build something else?
          </h2>
          <div className="rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left px-4 py-2.5 font-medium">Template</th>
                  <th className="text-left px-4 py-2.5 font-medium">Best for</th>
                  <th className="text-left px-4 py-2.5 font-medium">Stack</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-2.5 font-mono">nano</td>
                  <td className="px-4 py-2.5 text-muted-foreground">Local personal tool</td>
                  <td className="px-4 py-2.5 text-muted-foreground">Vite + React + Zustand</td>
                </tr>
                <tr className="bg-primary/5">
                  <td className="px-4 py-2.5 font-mono font-semibold">micro</td>
                  <td className="px-4 py-2.5 text-muted-foreground">Simple hosted web app</td>
                  <td className="px-4 py-2.5 text-muted-foreground">Next.js + Vercel</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-mono">standard</td>
                  <td className="px-4 py-2.5 text-muted-foreground">Full-stack web app</td>
                  <td className="px-4 py-2.5 text-muted-foreground">Next.js + Supabase + Clerk</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-mono">pro</td>
                  <td className="px-4 py-2.5 text-muted-foreground">AI-powered web app</td>
                  <td className="px-4 py-2.5 text-muted-foreground">Next.js + Supabase + Clerk + Claude SDK</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-mono">mobile</td>
                  <td className="px-4 py-2.5 text-muted-foreground">Cross-platform mobile</td>
                  <td className="px-4 py-2.5 text-muted-foreground">Flutter + Supabase</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-mono">mobile-pro</td>
                  <td className="px-4 py-2.5 text-muted-foreground">AI-powered mobile app</td>
                  <td className="px-4 py-2.5 text-muted-foreground">Flutter + Supabase + Claude SDK</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">
            Run <span className="font-mono">./scripts/scaffold.sh &lt;template&gt; &lt;project-name&gt;</span> from the vibecoding-in-a-box root to switch.
          </p>
        </div>

      </div>
    </div>
  );
}
