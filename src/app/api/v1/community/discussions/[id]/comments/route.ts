import { NextResponse } from "next/server";
import { ApiError, withApiErrorHandling } from "@/lib/api-error";
import { getOptionalBearerAuth, requireBearerAuth } from "@/lib/api-auth";
import { ContentPolicyError } from "@/lib/profanity-filter";
import { assertUserCanInteract } from "@/lib/moderation/status";
import { addCommentSchema } from "@/lib/validations/community";
import { addActivityComment, getActivityComments } from "@/services/community.service";

export const GET = withApiErrorHandling(async (req, ctx) => {
  const { id: activityId } = await ctx.params;
  const viewerId = await getOptionalBearerAuth(req);
  const comments = await getActivityComments(activityId, viewerId ?? undefined);
  return NextResponse.json({ comments });
});

export const POST = withApiErrorHandling(async (req, ctx) => {
  const userId = await requireBearerAuth(req);
  const { id: activityId } = await ctx.params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    throw new ApiError(400, "Corpo da requisição inválido");
  }

  const parsed = addCommentSchema.safeParse({ ...(body as object), activityId });
  if (!parsed.success) {
    throw new ApiError(400, parsed.error.issues[0]?.message ?? "Comentário inválido");
  }

  try {
    await assertUserCanInteract(userId);
    await addActivityComment(parsed.data.activityId, userId, parsed.data.content);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (e) {
    if (e instanceof ContentPolicyError) {
      throw new ApiError(422, e.message);
    }
    if (e instanceof ApiError) throw e;
    if (e instanceof Error) {
      throw new ApiError(400, e.message);
    }
    throw e;
  }
});
