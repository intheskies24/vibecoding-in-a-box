"use server";

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

export type SaveResult = { success: true } | { success: false; error: string };

function readEnvFile(): Record<string, string> {
  const envPath = join(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return {};
  const result: Record<string, string> = {};
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx < 0) continue;
    result[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1);
  }
  return result;
}

function mergeAndWrite(updates: Record<string, string>): void {
  const current = readEnvFile();
  const merged = { ...current };
  for (const [key, value] of Object.entries(updates)) {
    if (value.trim()) merged[key] = value.trim();
  }
  const lines = Object.entries(merged).map(([k, v]) => `${k}=${v}`);
  writeFileSync(join(process.cwd(), ".env.local"), lines.join("\n") + "\n");
}

export async function saveSupabaseConfig(
  _prev: SaveResult | null,
  formData: FormData
): Promise<SaveResult> {
  try {
    mergeAndWrite({
      NEXT_PUBLIC_SUPABASE_URL: (formData.get("url") as string) ?? "",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: (formData.get("anonKey") as string) ?? "",
    });
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

export async function saveClerkConfig(
  _prev: SaveResult | null,
  formData: FormData
): Promise<SaveResult> {
  try {
    const updates: Record<string, string> = {
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: (formData.get("publishableKey") as string) ?? "",
    };
    const secretKey = ((formData.get("secretKey") as string) ?? "").trim();
    if (secretKey) updates.CLERK_SECRET_KEY = secretKey;
    mergeAndWrite(updates);
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

export async function saveAnthropicConfig(
  _prev: SaveResult | null,
  formData: FormData
): Promise<SaveResult> {
  try {
    const apiKey = ((formData.get("apiKey") as string) ?? "").trim();
    if (apiKey) mergeAndWrite({ ANTHROPIC_API_KEY: apiKey });
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}
