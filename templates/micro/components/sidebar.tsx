"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Rocket, LayoutGrid, ChevronDown, ChevronRight, Box } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", icon: <Home size={16} />, label: "Welcome", section: "overview" },
  { href: "/getting-started", icon: <Rocket size={16} />, label: "Getting Started", section: "devtools" },
  { href: "/components-demo", icon: <LayoutGrid size={16} />, label: "UI Components", section: "devtools" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [devToolsOpen, setDevToolsOpen] = useState(true);

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col flex-shrink-0 h-screen">
      {/* Logo */}
      <div className="px-4 pt-5 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center flex-shrink-0">
            <Box size={14} className="text-white" />
          </div>
          <span className="text-white font-semibold text-sm">vibecoding-in-a-box</span>
        </div>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-sky-500/15 text-sky-400">
          micro
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="px-3 pb-1 text-xs font-semibold text-slate-600 uppercase tracking-wider">Overview</p>
        <Link
          href="/"
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            pathname === "/" ? "bg-indigo-500/15 text-indigo-400" : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
          }`}
        >
          <Home size={16} className={pathname === "/" ? "text-indigo-400" : "text-slate-500"} />
          Welcome
        </Link>

        <div className="pt-3">
          <button
            onClick={() => setDevToolsOpen(!devToolsOpen)}
            className="w-full flex items-center justify-between px-3 pb-1 text-xs font-semibold text-slate-600 uppercase tracking-wider hover:text-slate-400 transition-colors"
          >
            Developer Tools
            {devToolsOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </button>
          {devToolsOpen && (
            <div className="space-y-1 mt-1">
              {NAV_ITEMS.filter((i) => i.section === "devtools").map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      active ? "bg-indigo-500/15 text-indigo-400" : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                    }`}
                  >
                    <span className={active ? "text-indigo-400" : "text-slate-500"}>{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      <div className="px-4 py-3 border-t border-slate-800">
        <p className="text-xs text-slate-600">Scaffold a different template:</p>
        <p className="text-xs text-slate-500 font-mono mt-0.5 truncate">./scripts/scaffold.sh &lt;config&gt;</p>
      </div>
    </aside>
  );
}
