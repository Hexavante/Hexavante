import { auth } from "@/auth";
import { isInstructor } from "@/lib/permissions";
import { rateLimitUpload, extractClientIp } from "@/lib/rate-limit";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

const MAX_VIDEO_BYTES = 500 * 1024 * 1024; // 500MB
const ALLOWED_TYPES = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime",
  "video/x-msvideo",
];

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id || !isInstructor(session.user.roles)) {
    return Response.json({ error: "Não autorizado." }, { status: 403 });
  }

  const ip = extractClientIp(
    request.headers.get("x-forwarded-for"),
    request.headers.get("x-real-ip"),
  );
  if (!rateLimitUpload(ip)) {
    return Response.json({ error: "Muitos uploads. Aguarde." }, { status: 429 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return Response.json({ error: "Nenhum arquivo enviado." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return Response.json(
      { error: "Formato não suportado. Use MP4, WebM ou OGG." },
      { status: 400 },
    );
  }

  if (file.size > MAX_VIDEO_BYTES) {
    return Response.json(
      { error: "Arquivo muito grande. Máximo 500MB." },
      { status: 400 },
    );
  }

  const ext = file.name.split(".").pop() ?? "mp4";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", "videos");
  await mkdir(uploadDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), buffer);

  return Response.json({
    url: `/uploads/videos/${filename}`,
    filename,
    size: file.size,
    type: file.type,
  });
}
