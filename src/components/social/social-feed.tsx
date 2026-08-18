"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { FeedActivity } from "@/lib/social";
import {
  countFeedByType,
  filterFeedActivities,
  sortFeedActivities,
  type FeedContentFilter,
  type FeedSort,
} from "@/lib/community-feed";
import { ActivityCard } from "./activity-card";
import { CommunityGuidelinesNotice } from "./community-guidelines-notice";
import { CommunitySidebar } from "./community-sidebar";
import { DiscussionForm } from "./discussion-form";
import { cn } from "@/lib/cn";
import { themeUi } from "@/lib/theme-ui";

type TrendingTag = { tag: string; count: number };

type SuggestedUser = {
  id: string;
  username: string | null;
  fullName: string;
  avatarUrl: string | null;
  _count: { followers: number; socialActivities: number };
};

type Props = {
  exploreActivities: FeedActivity[];
  followingActivities: FeedActivity[];
  questionsActivities: FeedActivity[];
  trendingTags: TrendingTag[];
  suggestedUsers: SuggestedUser[];
  canInteract: boolean;
  canModerate?: boolean;
  viewerId?: string;
  initialTag?: string;
  highlightPostId?: string;
};

type Tab = "explore" | "following" | "questions";

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-semibold transition hx-filter-pill",
        active ? themeUi.filterActive : themeUi.filterInactive,
      )}
    >
      {label}
    </button>
  );
}

export function SocialFeed({
  exploreActivities,
  followingActivities,
  questionsActivities,
  trendingTags,
  suggestedUsers,
  canInteract,
  canModerate = false,
  viewerId,
  initialTag,
  highlightPostId,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<Tab>(highlightPostId ? "questions" : "explore");
  const [activeTag, setActiveTag] = useState<string | undefined>(initialTag);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<FeedSort>("recent");
  const [contentFilter, setContentFilter] = useState<FeedContentFilter>("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!highlightPostId) return;
    const element = document.getElementById(`post-${highlightPostId}`);
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [highlightPostId]);

  const rawActivities = useMemo(() => {
    if (tab === "following") return followingActivities;
    if (tab === "questions") return questionsActivities;
    return exploreActivities;
  }, [exploreActivities, followingActivities, questionsActivities, tab]);

  const typeCounts = useMemo(() => countFeedByType(rawActivities), [rawActivities]);

  const activities = useMemo(() => {
    const filtered = filterFeedActivities(rawActivities, {
      searchQuery,
      contentFilter,
      tag: activeTag,
    });
    return sortFeedActivities(filtered, sortBy);
  }, [activeTag, contentFilter, rawActivities, searchQuery, sortBy]);

  const hasActiveFilters =
    Boolean(activeTag) || Boolean(searchQuery.trim()) || contentFilter !== "all" || sortBy !== "recent";

  function handleTagSelect(tag: string | undefined) {
    setActiveTag(tag);
    const params = new URLSearchParams(searchParams.toString());
    if (tag) {
      params.set("tag", tag);
    } else {
      params.delete("tag");
    }
    const query = params.toString();
    router.replace(query ? `/social?${query}` : "/social", { scroll: false });
  }

  function clearAllFilters() {
    setSearchQuery("");
    setSortBy("recent");
    setContentFilter("all");
    handleTagSelect(undefined);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div>
        <CommunityGuidelinesNotice />

        <div className="mt-4">
          <DiscussionForm canPost={canInteract} />
        </div>

        <div className={`mt-4 flex flex-wrap gap-2 ${themeUi.tabNav}`}>
          {(
            [
              { value: "explore", label: "Explorar" },
              { value: "following", label: "Seguindo" },
              { value: "questions", label: "Perguntas" },
            ] as const
          ).map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setTab(value)}
              className={cn(
                "min-h-11 px-4 py-2.5 text-sm transition",
                tab === value ? themeUi.tabActive : themeUi.tabInactive,
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 hx-text-subtle" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Buscar por autor, título, tag ou conteúdo..."
                className="hx-input w-full min-h-11 pl-10 pr-3"
              />
            </label>
            <button
              type="button"
              onClick={() => setShowFilters((value) => !value)}
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-semibold transition hx-filter-pill",
                showFilters ? themeUi.filterActive : themeUi.filterInactive,
              )}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
            </button>
          </div>

          {(showFilters || hasActiveFilters) && (
            <div className="rounded-xl border border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-accent)/0.35)] p-3">
              <div className="flex flex-wrap gap-2">
                <FilterChip
                  active={contentFilter === "all"}
                  onClick={() => setContentFilter("all")}
                  label={`Tudo (${typeCounts.all})`}
                />
                <FilterChip
                  active={contentFilter === "discussions"}
                  onClick={() => setContentFilter("discussions")}
                  label={`Discussões (${typeCounts.discussions})`}
                />
                <FilterChip
                  active={contentFilter === "achievements"}
                  onClick={() => setContentFilter("achievements")}
                  label={`Conquistas (${typeCounts.achievements})`}
                />
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide hx-text-subtle">
                  Ordenar
                </span>
                <FilterChip
                  active={sortBy === "recent"}
                  onClick={() => setSortBy("recent")}
                  label="Mais recentes"
                />
                <FilterChip
                  active={sortBy === "popular"}
                  onClick={() => setSortBy("popular")}
                  label="Mais populares"
                />
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold hx-accent-link hover:underline"
                >
                  <X className="h-3.5 w-3.5" />
                  Limpar filtros
                </button>
              )}
            </div>
          )}

          {activeTag && (
            <p className="text-sm hx-text-muted">
              Tag: <span className="font-semibold hx-accent-text">{activeTag}</span>
            </p>
          )}
        </div>

        {!canInteract && (
          <p className="mt-4 rounded-lg border border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-accent)/0.35)] px-4 py-3 text-sm hx-text-muted">
            <Link
              href="/login?callbackUrl=/social"
              className="font-semibold hx-accent-link hover:underline"
            >
              Entre na sua conta
            </Link>{" "}
            para publicar, curtir, reagir e ver o feed de quem você segue.
          </p>
        )}

        <p className="mt-3 text-xs hx-text-subtle">
          {activities.length}{" "}
          {activities.length === 1 ? "publicação encontrada" : "publicações encontradas"}
        </p>

        <div className="mt-4 space-y-4">
          {activities.length === 0 ? (
            <div className="hx-empty mt-4 p-6 sm:p-10">
              <p className="font-semibold hx-text-body">
                {hasActiveFilters
                  ? "Nenhum resultado para os filtros atuais."
                  : tab === "following"
                    ? "Nenhuma atividade de quem você segue."
                    : tab === "questions"
                      ? "Nenhuma pergunta ainda."
                      : "Nenhuma atividade ainda."}
              </p>
              <p className="mt-1 text-sm hx-text-muted">
                {hasActiveFilters
                  ? "Tente outra busca ou limpe os filtros."
                  : tab === "following"
                    ? "Siga outros estudantes no ranking ou nos perfis."
                    : tab === "questions"
                      ? "Seja o primeiro a publicar uma dúvida ou dica."
                      : "Conclua cursos e simulados para aparecer aqui."}
              </p>
            </div>
          ) : (
            activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                canInteract={canInteract}
                canModerate={canModerate}
                viewerId={viewerId}
                highlight={highlightPostId === activity.id}
              />
            ))
          )}
        </div>
      </div>

      <CommunitySidebar
        trendingTags={trendingTags}
        suggestedUsers={suggestedUsers}
        activeTag={activeTag}
        onTagSelect={handleTagSelect}
        canFollow={canInteract}
      />
    </div>
  );
}
