import type { CommunityReportReason } from "@prisma/client";

export const COMMUNITY_REPORT_REASON_LABELS: Record<CommunityReportReason, string> = {
  SPAM: "Spam ou propaganda",
  HARASSMENT: "Assédio ou bullying",
  INAPPROPRIATE: "Conteúdo inadequado",
  MISINFORMATION: "Informação falsa",
  OTHER: "Outro motivo",
};
