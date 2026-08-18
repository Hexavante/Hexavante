import type { FeedActivity } from "@/lib/social";

export type FeedSort = "recent" | "popular";
export type FeedContentFilter = "all" | "discussions" | "achievements";

const ACHIEVEMENT_TYPES = new Set<FeedActivity["type"]>([
  "COURSE_COMPLETED",
  "SIMULADO_PASSED",
  "LEVEL_UP",
  "ACHIEVEMENT",
  "STREAK",
]);

export function filterFeedActivities(
  activities: FeedActivity[],
  options: {
    searchQuery?: string;
    contentFilter?: FeedContentFilter;
    tag?: string;
  },
): FeedActivity[] {
  const query = options.searchQuery?.trim().toLowerCase();
  const contentFilter = options.contentFilter ?? "all";

  return activities.filter((activity) => {
    if (options.tag && !activity.tags.includes(options.tag)) return false;

    if (contentFilter === "discussions" && activity.type !== "DISCUSSION") return false;
    if (contentFilter === "achievements" && !ACHIEVEMENT_TYPES.has(activity.type)) return false;

    if (!query) return true;

    const haystack = [
      activity.user.fullName,
      activity.user.username,
      activity.metadata.title,
      activity.metadata.body,
      activity.metadata.course,
      activity.metadata.simulado,
      activity.metadata.achievement,
      ...activity.tags,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}

export function sortFeedActivities(activities: FeedActivity[], sortBy: FeedSort): FeedActivity[] {
  const copy = [...activities];

  const byPinned = (a: FeedActivity, b: FeedActivity) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
    return 0;
  };

  if (sortBy === "popular") {
    copy.sort((a, b) => {
      const pinned = byPinned(a, b);
      if (pinned !== 0) return pinned;
      const scoreA = a.likes + a.comments * 2 + Object.values(a.reactions).reduce((s, n) => s + n, 0);
      const scoreB = b.likes + b.comments * 2 + Object.values(b.reactions).reduce((s, n) => s + n, 0);
      if (scoreB !== scoreA) return scoreB - scoreA;
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
    return copy;
  }

  copy.sort((a, b) => {
    const pinned = byPinned(a, b);
    if (pinned !== 0) return pinned;
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
  return copy;
}

export function countFeedByType(activities: FeedActivity[]) {
  return {
    all: activities.length,
    discussions: activities.filter((a) => a.type === "DISCUSSION").length,
    achievements: activities.filter((a) => ACHIEVEMENT_TYPES.has(a.type)).length,
  };
}
