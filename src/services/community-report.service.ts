import type { CommunityReportReason } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { COMMUNITY_REPORT_REASON_LABELS } from "@/lib/community-reports";

export { COMMUNITY_REPORT_REASON_LABELS };

export async function reportCommunityPost(
  reporterId: string,
  activityId: string,
  reason: CommunityReportReason,
  details?: string,
) {
  const activity = await prisma.socialActivity.findUnique({
    where: { id: activityId },
    select: { id: true, userId: true },
  });

  if (!activity) {
    throw new Error("Publicação não encontrada.");
  }

  if (activity.userId === reporterId) {
    throw new Error("Você não pode denunciar sua própria publicação.");
  }

  const existing = await prisma.communityReport.findUnique({
    where: {
      activityId_reporterId: { activityId, reporterId },
    },
  });

  if (existing) {
    throw new Error("Você já denunciou esta publicação.");
  }

  return prisma.communityReport.create({
    data: {
      activityId,
      reporterId,
      reason,
      details: details?.trim() || null,
    },
  });
}

export async function listPendingCommunityReports(limit = 12) {
  return prisma.communityReport.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      reporter: { select: { username: true, fullName: true } },
      activity: {
        select: {
          id: true,
          type: true,
          metadata: true,
          user: { select: { username: true, fullName: true } },
        },
      },
    },
  });
}

export async function countPendingCommunityReports() {
  return prisma.communityReport.count({ where: { status: "PENDING" } });
}
