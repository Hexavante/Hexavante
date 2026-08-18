import { prisma } from "@/lib/prisma";
import { writeModerationLog } from "@/services/moderation-admin.service";

export async function deleteCommunityPostByModerator(activityId: string, moderatorId: string) {
  const activity = await prisma.socialActivity.findUnique({
    where: { id: activityId },
    select: { id: true, userId: true, type: true, metadata: true },
  });

  if (!activity) {
    throw new Error("Publicação não encontrada.");
  }

  const metadata =
    activity.metadata && typeof activity.metadata === "object" && !Array.isArray(activity.metadata)
      ? (activity.metadata as { title?: string })
      : null;

  await prisma.socialActivity.delete({ where: { id: activityId } });

  await writeModerationLog({
    moderatorId,
    targetUserId: activity.userId,
    action: "OTHER",
    description: `Removeu publicação na comunidade (${activity.type})`,
    metadata: { activityId, title: metadata?.title ?? null },
  });
}

export async function deleteCourseByModerator(courseId: string, moderatorId: string) {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: {
      id: true,
      title: true,
      slug: true,
      instructors: { select: { userId: true }, take: 1 },
    },
  });

  if (!course) {
    throw new Error("Curso não encontrado.");
  }

  await prisma.course.delete({ where: { id: courseId } });

  await writeModerationLog({
    moderatorId,
    targetUserId: course.instructors[0]?.userId ?? null,
    action: "OTHER",
    description: `Removeu curso "${course.title}"`,
    metadata: { courseId, slug: course.slug },
  });
}

export async function deleteExamByModerator(examId: string, moderatorId: string) {
  const exam = await prisma.exam.findUnique({
    where: { id: examId },
    select: { id: true, title: true, slug: true },
  });

  if (!exam) {
    throw new Error("Simulado não encontrado.");
  }

  await prisma.exam.delete({ where: { id: examId } });

  await writeModerationLog({
    moderatorId,
    targetUserId: null,
    action: "OTHER",
    description: `Removeu simulado "${exam.title}"`,
    metadata: { examId, slug: exam.slug },
  });
}

export async function togglePinCommunityPost(activityId: string, moderatorId: string) {
  const activity = await prisma.socialActivity.findUnique({
    where: { id: activityId },
    select: { id: true, type: true, isPinned: true, userId: true, metadata: true },
  });

  if (!activity) {
    throw new Error("Publicação não encontrada.");
  }

  if (activity.type !== "DISCUSSION") {
    throw new Error("Apenas discussões podem ser fixadas.");
  }

  const nextPinned = !activity.isPinned;
  const metadata =
    activity.metadata && typeof activity.metadata === "object" && !Array.isArray(activity.metadata)
      ? (activity.metadata as { title?: string })
      : null;

  await prisma.socialActivity.update({
    where: { id: activityId },
    data: {
      isPinned: nextPinned,
      pinnedAt: nextPinned ? new Date() : null,
      pinnedById: nextPinned ? moderatorId : null,
    },
  });

  await writeModerationLog({
    moderatorId,
    targetUserId: activity.userId,
    action: "OTHER",
    description: nextPinned ? "Fixou publicação na comunidade" : "Desfixou publicação na comunidade",
    metadata: { activityId, title: metadata?.title ?? null, isPinned: nextPinned },
  });

  return { isPinned: nextPinned };
}
