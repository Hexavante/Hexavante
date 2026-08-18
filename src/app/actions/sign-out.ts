"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getApiUrl } from "@/lib/auth-session";

const API_URL = getApiUrl();

export async function signOutAction() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  await fetch(`${API_URL}/api/auth/sign-out`, {
    method: "POST",
    headers: { cookie: cookieHeader },
  });

  const sessionCookieNames = [
    "hexavante.session_token",
    "__Secure-hexavante.session_token",
  ];
  for (const name of sessionCookieNames) {
    cookieStore.delete(name);
  }

  redirect("/");
}
