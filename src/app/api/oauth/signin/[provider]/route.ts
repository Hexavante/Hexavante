import { NextResponse } from "next/server";

const API_URL = process.env.AUTH_API_URL || (process.env.NODE_ENV === "production" ? "https://api.hexavante.com.br" : "http://localhost:3045");

export async function GET(
  req: Request,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params;
  const { searchParams } = new URL(req.url);
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const apiUrl = new URL(`/oauth/${provider}`, API_URL);
  apiUrl.searchParams.set("callbackURL", callbackUrl);
  return NextResponse.redirect(apiUrl.toString());
}
