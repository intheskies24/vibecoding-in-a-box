"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Box, AlertCircle, CheckCircle2 } from "lucide-react";
import { signUp } from "@/app/actions/auth";

export default function SignUpPage() {
  const [state, action, isPending] = useActionState(signUp, null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex items-center justify-center p-8">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <Box size={20} className="text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Create account</h1>
          <p className="text-slate-400 text-sm">Get started for free</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6 space-y-4">
          {state && "error" in state && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              <AlertCircle size={14} />
              {state.error}
            </div>
          )}

          {state && "message" in state ? (
            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-emerald-900">Check your email</p>
                <p className="text-sm text-emerald-700 mt-0.5">{state.message}</p>
              </div>
            </div>
          ) : (
            <form action={action} className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  placeholder="Min. 6 characters"
                  className="flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-1"
              >
                {isPending ? "Creating account…" : "Create Account"}
              </button>
            </form>
          )}

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-indigo-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
