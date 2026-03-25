"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import {
  Home,
  CheckSquare,
  MessageSquare,
  Rocket,
  LayoutGrid,
  Settings,
  ChevronDown,
  ChevronRight,
  Box,
} from "lucide-react";

const UserButton = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  ? dynamic(() => import("@clerk/nextjs").then((m) => ({ default: m.UserButton })), { ssr: false })
  : null;

export function AppSidebar() {
  const pathname = usePathname();
  const [devToolsOpen, setDevToolsOpen] = useState(true);

  const isActive = (href: string) => pathname === href;

  const navLink = (href: string, icon: React.ReactNode, label: string) => {
    const active = isActive(href);
    return (
      <Link
        key={href}
        href={href}
        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          active
            ? "bg-violet-500/15 text-violet-400"
            : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
        }`}
      >
        <span className={active ? "text-violet-400" : "text-slate-500"}>{icon}</span>
        {label}
      </Link>
    );
  };

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col flex-shrink-0 h-screen">
      {/* Logo */}
      <div className="px-4 pt-5 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-7 h-7 bg-violet-600 rounded-md flex items-center justify-center flex-shrink-0">
            <Box size={14} className="text-white" />
          </div>
          <span className="text-white font-semibold text-sm">vibecoding-in-a-box</span>
        </div>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-violet-500/15 text-violet-400">
          pro
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="px-3 pb-1 text-xs font-semibold text-slate-600 uppercase tracking-wider">App</p>
        {navLink("/welcome", <Home size={16} />, "Welcome")}
        {navLink("/tasks", <CheckSquare size={16} />, "Tasks")}
        {navLink("/chat", <MessageSquare size={16} />, "AI Chat")}
        {navLink("/configuration", <Settings size={16} />, "Configuration")}

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
              {navLink("/getting-started", <Rocket size={16} />, "Getting Started")}
              {navLink("/components-demo", <LayoutGrid size={16} />, "UI Components")}
            </div>
          )}
        </div>
      </nav>

      {/* User */}
      <div className="px-4 py-3 border-t border-slate-800 flex items-center gap-3">
        {UserButton ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Link
            href="/configuration"
            className="flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 transition-colors"
          >
            <Settings size={13} />
            Setup required
          </Link>
        )}
      </div>
    </aside>
  );
}
