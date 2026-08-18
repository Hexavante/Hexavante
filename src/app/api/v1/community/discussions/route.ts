import { NextResponse } from "next/server";
import { ApiError, withApiErrorHandling } from "@/lib/api-error";
import { requireBearerAuth } from "@/lib/api-auth";
import { ContentPolicyError } from "@/lib/profanity-filter";
import { assertUserCanInteract } from "@/lib/moderation/status";
import { createDiscussionSchema } from "@/lib/validations/community";
import { createDiscussionPost } from "@/services/community.service";

export const POST = withApiErrorHandling(async (req) => {
  const userId = await requireBearerAuth(req);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    throw new ApiError(400, "Corpo da requisição inválido");
  }

  const parsed = createDiscussionSchema.safeParse(body);
  if (!parsed.success) {
    throw new ApiError(400, parsed.error.issues[0]?.message ?? "Dados inválidos");
  }

  try {
    await assertUserCanInteract(userId);
    const activity = await createDiscussionPost(userId, parsed.data);
    return NextResponse.json(
      {
        success: true,
        activity: {
          id: activity.id,
          type: activity.type,
          createdAt: activity.createdAt.toISOString(),
        },
      },
      { status: 201 },
    );
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
