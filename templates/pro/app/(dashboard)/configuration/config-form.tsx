"use client";

import { useActionState, useState } from "react";
import {
  Database,
  Shield,
  Terminal,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import {
  saveSupabaseConfig,
  saveClerkConfig,
  saveAnthropicConfig,
  type SaveResult,
} from "@/app/actions/save-config";

const RESTART_NOTICE = (
  <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4">
    <RefreshCw size={15} className="text-amber-600 mt-0.5 flex-shrink-0" />
    <div>
      <p className="text-sm font-semibold text-amber-900">Restart required</p>
      <p className="text-sm text-amber-700 mt-0.5">
        Changes saved to{" "}
        <code className="font-mono text-xs bg-amber-100 px-1 rounded">.env.local</code>.
        Stop and restart your dev server:{" "}
        <code className="font-mono text-xs bg-amber-100 px-1 rounded">npm run dev</code>
      </p>
    </div>
  </div>
);

function StatusBadge({ ok }: { ok: boolean }) {
  return ok ? (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
      <CheckCircle2 size={11} /> Connected
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
      <AlertCircle size={11} /> Not configured
    </span>
  );
}

function SaveButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {pending ? "Saving…" : "Save to .env.local"}
    </button>
  );
}

function inputClass(value: string) {
  return `flex h-9 w-full rounded-md border ${
    value ? "border-emerald-300 bg-emerald-50/30" : "border-gray-300 bg-white"
  } px-3 py-2 text-sm font-mono placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all`;
}

function SupabaseSection({ supabaseUrl, supabaseAnonKey }: { supabaseUrl: string; supabaseAnonKey: string }) {
  const [state, action, isPending] = useActionState<SaveResult | null, FormData>(saveSupabaseConfig, null);
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
            <Database size={16} className="text-emerald-600" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 text-sm">Supabase</h2>
            <p className="text-gray-500 text-xs">Database and real-time backend</p>
          </div>
        </div>
        <StatusBadge ok={!!(supabaseUrl && supabaseAnonKey)} />
      </div>
      <div className="px-6 py-5 space-y-4">
        <div className="flex items-start gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
          <ExternalLink size={12} className="mt-0.5 flex-shrink-0" />
          <span>
            Get these from{" "}
            <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">supabase.com</a>
            {" "}→ your project → <strong>Project Settings → API</strong>
          </span>
        </div>
        <form action={action} className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Project URL</label>
            <input name="url" type="text" defaultValue={supabaseUrl} placeholder="https://xxxxxxxxxxxx.supabase.co" className={inputClass(supabaseUrl)} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Anon / Public Key</label>
            <input name="anonKey" type="text" defaultValue={supabaseAnonKey} placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." className={inputClass(supabaseAnonKey)} />
          </div>
          <SaveButton pending={isPending} />
          {state && !state.success && <p className="text-xs text-red-600">{state.error}</p>}
        </form>
        {state?.success && <div className="pt-1">{RESTART_NOTICE}</div>}
      </div>
    </div>
  );
}

function ClerkSection({ clerkPublishableKey, clerkSecretKeySet }: { clerkPublishableKey: string; clerkSecretKeySet: boolean }) {
  const [state, action, isPending] = useActionState<SaveResult | null, FormData>(saveClerkConfig, null);
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
            <Shield size={16} className="text-indigo-600" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 text-sm">Clerk</h2>
            <p className="text-gray-500 text-xs">Authentication and user accounts</p>
          </div>
        </div>
        <StatusBadge ok={!!(clerkPublishableKey && clerkSecretKeySet)} />
      </div>
      <div className="px-6 py-5 space-y-4">
        <div className="flex items-start gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
          <ExternalLink size={12} className="mt-0.5 flex-shrink-0" />
          <span>
            Get these from{" "}
            <a href="https://dashboard.clerk.com" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">clerk.com</a>
            {" "}→ your app → <strong>API Keys</strong>
          </span>
        </div>
        <form action={action} className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Publishable Key</label>
            <input name="publishableKey" type="text" defaultValue={clerkPublishableKey} placeholder="pk_test_..." className={inputClass(clerkPublishableKey)} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Secret Key</label>
            <input name="secretKey" type="password" placeholder={clerkSecretKeySet ? "Already set — leave blank to keep" : "sk_test_..."} className={inputClass(clerkSecretKeySet ? "set" : "")} />
            {clerkSecretKeySet && (
              <p className="text-xs text-emerald-600 flex items-center gap-1"><CheckCircle2 size={11} /> Secret key is configured</p>
            )}
          </div>
          <SaveButton pending={isPending} />
          {state && !state.success && <p className="text-xs text-red-600">{state.error}</p>}
        </form>
        {state?.success && <div className="pt-1">{RESTART_NOTICE}</div>}
      </div>
    </div>
  );
}

function AnthropicSection({ anthropicKeySet }: { anthropicKeySet: boolean }) {
  const [state, action, isPending] = useActionState<SaveResult | null, FormData>(saveAnthropicConfig, null);
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
            <Sparkles size={16} className="text-violet-600" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 text-sm">Anthropic / Claude</h2>
            <p className="text-gray-500 text-xs">AI chat and LLM features</p>
          </div>
        </div>
        <StatusBadge ok={anthropicKeySet} />
      </div>
      <div className="px-6 py-5 space-y-4">
        <div className="flex items-start gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
          <ExternalLink size={12} className="mt-0.5 flex-shrink-0" />
          <span>
            Get your key from{" "}
            <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">console.anthropic.com</a>
            {" "}→ <strong>Account Settings → API Keys</strong>
          </span>
        </div>
        <form action={action} className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">API Key</label>
            <input name="apiKey" type="password" placeholder={anthropicKeySet ? "Already set — leave blank to keep" : "sk-ant-..."} className={inputClass(anthropicKeySet ? "set" : "")} />
            {anthropicKeySet && (
              <p className="text-xs text-emerald-600 flex items-center gap-1"><CheckCircle2 size={11} /> API key is configured</p>
            )}
          </div>
          <SaveButton pending={isPending} />
          {state && !state.success && <p className="text-xs text-red-600">{state.error}</p>}
        </form>
        {state?.success && <div className="pt-1">{RESTART_NOTICE}</div>}
      </div>
    </div>
  );
}

function DatabaseSection({ migrationSql }: { migrationSql: string }) {
  const [copied, setCopied] = useState(false);
  async function handleCopy() {
    await navigator.clipboard.writeText(migrationSql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
            <Terminal size={16} className="text-slate-600" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 text-sm">Database Migration</h2>
            <p className="text-gray-500 text-xs">Run once in Supabase SQL Editor</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">Manual step</span>
      </div>
      <div className="px-6 py-5 space-y-4">
        <p className="text-sm text-gray-600">
          Creates the <code className="font-mono text-xs bg-gray-100 px-1 rounded">tasks</code> table with Row Level Security. Run once in your Supabase project&apos;s SQL Editor.
        </p>
        <div className="flex items-start gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
          <ExternalLink size={12} className="mt-0.5 flex-shrink-0" />
          <span>
            Open{" "}
            <a href="https://supabase.com/dashboard/project/_/sql" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">Supabase Dashboard → SQL Editor</a>
            , paste the SQL below, and click Run.
          </span>
        </div>
        <div className="relative">
          <pre className="bg-slate-950 text-slate-300 px-4 py-4 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed max-h-64">
            <code>{migrationSql}</code>
          </pre>
          <button onClick={handleCopy} className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors">
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ConfigForm({
  supabaseUrl,
  supabaseAnonKey,
  clerkPublishableKey,
  clerkSecretKeySet,
  anthropicKeySet,
  migrationSql,
}: {
  supabaseUrl: string;
  supabaseAnonKey: string;
  clerkPublishableKey: string;
  clerkSecretKeySet: boolean;
  anthropicKeySet: boolean;
  migrationSql: string;
}) {
  return (
    <div className="space-y-4">
      <SupabaseSection supabaseUrl={supabaseUrl} supabaseAnonKey={supabaseAnonKey} />
      <ClerkSection clerkPublishableKey={clerkPublishableKey} clerkSecretKeySet={clerkSecretKeySet} />
      <AnthropicSection anthropicKeySet={anthropicKeySet} />
      <DatabaseSection migrationSql={migrationSql} />
    </div>
  );
}
