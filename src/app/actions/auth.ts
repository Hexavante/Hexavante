"use server";

import { cookies } from "next/headers";
import { registerSchema, loginSchema } from "@/lib/validations/auth";
import type { ZodError } from "zod";
import { getApiUrl } from "@/lib/auth-session";

const WEB_ORIGIN =
  process.env.WEB_ORIGIN ||
  (process.env.NODE_ENV === "production"
    ? "https://app.hexavante.com.br"
    : "http://localhost:3000");

const ALLOWED_REDIRECT_HOSTS = [
  "hexavante.com.br",
  "app.hexavante.com.br",
  "www.hexavante.com.br",
  "localhost",
  "127.0.0.1",
];

function isSafeRedirect(url: string): boolean {
  if (!url.startsWith("http")) return true;
  try {
    return ALLOWED_REDIRECT_HOSTS.includes(new URL(url).hostname);
  } catch {
    return false;
  }
}

export type ActionResult = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
  redirectTo?: string;
};

function mapZodErrors(error: ZodError) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}

const API_URL = getApiUrl();

async function clearStaleSessionCookies() {
  const cookieStore = await cookies();
  const sessionCookieNames = [
    "hexavante.session_token",
    "__Secure-hexavante.session_token",
  ];
  for (const name of sessionCookieNames) {
    cookieStore.delete(name);
  }
}

async function setSessionCookie(name: string, value: string, maxAge: number) {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge,
    domain: ".hexavante.com.br",
  });
}

export async function registerAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const raw = {
    username: formData.get("username"),
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    birthDate: formData.get("birthDate"),
  };
  const callbackUrl = (formData.get("callbackUrl") as string) || "/";
  if (!isSafeRedirect(callbackUrl)) {
    return { success: false, error: "URL de redirecionamento inválida." };
  }

  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: "Corrija os campos destacados.",
      fieldErrors: mapZodErrors(parsed.error),
    };
  }

  try {
    const res = await fetch(`${API_URL}/api/auth/sign-up/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: WEB_ORIGIN,
      },
      body: JSON.stringify({
        name: parsed.data.fullName,
        email: parsed.data.email,
        password: parsed.data.password,
        username: parsed.data.username,
        birthDate: parsed.data.birthDate,
      }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      const message =
        (body as { message?: string }).message ||
        (body as { error?: string }).error ||
        "Erro ao cadastrar";
      if ((body as { fieldErrors?: Record<string, string> }).fieldErrors) {
        return {
          success: false,
          error: "Corrija os campos destacados.",
          fieldErrors: (body as { fieldErrors: Record<string, string> }).fieldErrors,
        };
      }
      return { success: false, error: message };
    }

    await clearStaleSessionCookies();

    // After registration, login to get the session cookie
    const loginRes = await fetch(`${API_URL}/api/v1/auth/login-with-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: WEB_ORIGIN,
      },
      body: JSON.stringify({
        email: parsed.data.email,
        password: parsed.data.password,
        rememberMe: true,
      }),
    });

    if (loginRes.ok) {
      const loginData = await loginRes.json() as {
        session?: { token: string; maxAge: number };
      };
      if (loginData.session) {
        await setSessionCookie("__Secure-hexavante.session_token", loginData.session.token, loginData.session.maxAge);
      }
    }

    return { success: true, redirectTo: callbackUrl };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro ao cadastrar",
    };
  }
}

export async function loginAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const email = formData.get("email");
  const password = formData.get("password");
  const rememberMe = formData.get("rememberMe") !== "false";
  const callbackUrl = (formData.get("callbackUrl") as string) || "/";
  if (!isSafeRedirect(callbackUrl)) {
    return { success: false, error: "URL de redirecionamento inválida." };
  }

  const parsed = loginSchema.safeParse({ email, password });
  if (!parsed.success) {
    return {
      success: false,
      error: "Corrija os campos destacados.",
      fieldErrors: mapZodErrors(parsed.error),
    };
  }

  await clearStaleSessionCookies();

  try {
    const res = await fetch(`${API_URL}/api/v1/auth/login-with-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: WEB_ORIGIN,
      },
      body: JSON.stringify({
        email: parsed.data.email,
        password: parsed.data.password,
        rememberMe,
      }),
    });

    if (!res.ok) {
      return { success: false, error: "E-mail ou senha incorretos." };
    }

    const data = await res.json() as {
      user: { id: string; name: string; email: string; username: string; roles: string[] };
      session?: { token: string; maxAge: number };
    };

    if (data.session) {
      await setSessionCookie("__Secure-hexavante.session_token", data.session.token, data.session.maxAge);
    }

    return { success: true, redirectTo: callbackUrl };
  } catch {
    return { success: false, error: "E-mail ou senha incorretos." };
  }
}
