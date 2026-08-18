import { NextResponse } from "next/server";
import { ApiError, withApiErrorHandling } from "@/lib/api-error";
import { requireBearerAuth } from "@/lib/api-auth";
import { assertUserCanInteract } from "@/lib/moderation/status";
import { reactionSchema } from "@/lib/validations/community";
import { toggleActivityReaction } from "@/services/community.service";

export const POST = withApiErrorHandling(async (req, ctx) => {
  const userId = await requireBearerAuth(req);
  const { id: activityId } = await ctx.params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    throw new ApiError(400, "Corpo da requisição inválido");
  }

  const parsed = reactionSchema.safeParse({ ...(body as object), activityId });
  if (!parsed.success) {
    throw new ApiError(400, parsed.error.issues[0]?.message ?? "Reação inválida");
  }

  try {
    await assertUserCanInteract(userId);
    const result = await toggleActivityReaction(
      parsed.data.activityId,
      userId,
      parsed.data.type,
    );
    return NextResponse.json({ success: true, active: result.active });
  } catch (e) {
    if (e instanceof ApiError) throw e;
    if (e instanceof Error) {
      throw new ApiError(400, e.message);
    }
    throw e;
  }
});
