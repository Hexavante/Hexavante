import { headers } from "next/headers";

export async function GET() {
  const h = await headers();
  const pick = (k: string) => h.get(k);
  return Response.json({
    "user-agent": pick("user-agent")?.slice(0, 80) ?? null,
    "x-forwarded-for": pick("x-forwarded-for"),
    "x-real-ip": pick("x-real-ip"),
    host: pick("host"),
  });
}
