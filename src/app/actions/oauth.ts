"use server";

import { redirect } from "next/navigation";
import { getApiUrl } from "@/lib/auth-session";

const API_URL = getApiUrl();

export async function signInWithGoogle(callbackUrl: string) {
  redirect(`${API_URL}/oauth/google?callbackURL=${encodeURIComponent(callbackUrl)}`);
}

export async function signInWithGithub(callbackUrl: string) {
  redirect(`${API_URL}/oauth/github?callbackURL=${encodeURIComponent(callbackUrl)}`);
}
