import { NextResponse } from "next/server";

const API_URL = process.env.AUTH_API_URL || (process.env.NODE_ENV === "production" ? "https://api.hexavante.com.br" : "http://localhost:3045");
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || (process.env.NODE_ENV === "production" ? "https://app.hexavante.com.br" : "http://localhost:3000");

export async function GET(
  req: Request,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params;
  const { searchParams } = new URL(req.url);
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const callbackURL = callbackUrl.startsWith("http")
    ? callbackUrl
    : new URL(callbackUrl, APP_URL).toString();
  const apiUrl = new URL(`/oauth/${provider}`, API_URL);
  apiUrl.searchParams.set("callbackURL", callbackURL);
  return NextResponse.redirect(apiUrl.toString());
}
