import { NextResponse } from "next/server";

const API_URL = process.env.AUTH_API_URL || (process.env.NODE_ENV === "production" ? "https://api.hexavante.com.br" : "http://localhost:3045");
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || (process.env.NODE_ENV === "production" ? "https://app.hexavante.com.br" : "http://localhost:3000");

const ALLOWED_REDIRECT_HOSTS = [
  "hexavante.com.br",
  "app.hexavante.com.br",
  "www.hexavante.com.br",
  "localhost",
  "127.0.0.1",
];

export async function GET(
  req: Request,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params;
  const { searchParams } = new URL(req.url);
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  let callbackURL: string;
  if (callbackUrl.startsWith("http")) {
    const parsed = new URL(callbackUrl);
    if (!ALLOWED_REDIRECT_HOSTS.includes(parsed.hostname)) {
      return new Response("Domínio de redirecionamento não permitido", { status: 400 });
    }
    callbackURL = callbackUrl;
  } else {
    callbackURL = new URL(callbackUrl, APP_URL).toString();
  }

  const apiUrl = new URL(`/oauth/${provider}`, API_URL);
  apiUrl.searchParams.set("callbackURL", callbackURL);
  return NextResponse.redirect(apiUrl.toString());
}
