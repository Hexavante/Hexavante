"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getApiUrl } from "@/lib/auth-session";

const API_URL = getApiUrl();

const COOKIE_NAMES = [
  "hexavante.session_token",
  "__Secure-hexavante.session_token",
];

export async function signOutAction() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  // Try to delete session on API (best effort)
  try {
    await fetch(`${API_URL}/api/v1/auth/logout`, {
      method: "POST",
      headers: { cookie: cookieHeader },
    });
  } catch {
    // Ignore errors — we'll clear the cookie locally regardless
  }

  for (const name of COOKIE_NAMES) {
    cookieStore.delete(name);
  }

  redirect("/");
}
