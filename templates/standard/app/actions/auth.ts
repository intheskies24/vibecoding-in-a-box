"use server";

import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type AuthResult = { error: string } | { message: string } | null;

export async function signIn(
  _prev: AuthResult,
  formData: FormData
): Promise<AuthResult> {
  const supabase = await createServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: (formData.get("email") as string).trim(),
    password: formData.get("password") as string,
  });

  if (error) return { error: error.message };

  redirect("/welcome");
}

export async function signUp(
  _prev: AuthResult,
  formData: FormData
): Promise<AuthResult> {
  const supabase = await createServerClient();

  const { error } = await supabase.auth.signUp({
    email: (formData.get("email") as string).trim(),
    password: formData.get("password") as string,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/auth/callback`,
    },
  });

  if (error) return { error: error.message };
  return { message: "Check your email for a confirmation link to complete sign up." };
}

export async function signOut(): Promise<void> {
  const supabase = await createServerClient();
  await supabase.auth.signOut();
  redirect("/");
}
