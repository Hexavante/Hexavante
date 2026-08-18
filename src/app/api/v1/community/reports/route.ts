import { NextResponse } from "next/server";
import { ApiError, withApiErrorHandling } from "@/lib/api-error";
import { requireBearerAuth } from "@/lib/api-auth";
import { assertUserCanInteract } from "@/lib/moderation/status";
import { reportCommunityPostSchema } from "@/lib/validations/community";
import { reportCommunityPost } from "@/services/community-report.service";

export const POST = withApiErrorHandling(async (req) => {
  const userId = await requireBearerAuth(req);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    throw new ApiError(400, "Corpo da requisição inválido");
  }

  const parsed = reportCommunityPostSchema.safeParse(body);
  if (!parsed.success) {
    throw new ApiError(400, parsed.error.issues[0]?.message ?? "Dados inválidos");
  }

  try {
    await assertUserCanInteract(userId);
    await reportCommunityPost(
      userId,
      parsed.data.activityId,
      parsed.data.reason,
      parsed.data.details,
    );
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (e) {
    if (e instanceof ApiError) throw e;
    if (e instanceof Error) {
      throw new ApiError(400, e.message);
    }
    throw e;
  }
});
