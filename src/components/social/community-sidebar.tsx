"use client";

import Link from "next/link";
import { Hash, Users } from "lucide-react";
import { FollowButton } from "@/components/social/follow-button";
import { Avatar } from "@/components/ui/avatar";
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
  trendingTags: TrendingTag[];
  suggestedUsers: SuggestedUser[];
  activeTag?: string;
  onTagSelect?: (tag: string | undefined) => void;
  canFollow: boolean;
};

export function CommunitySidebar({
  trendingTags,
  suggestedUsers,
  activeTag,
  onTagSelect,
  canFollow,
}: Props) {
  return (
    <aside className="space-y-4">
      <section className="hx-panel !p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
          <Hash className="h-4 w-4 hx-accent-text" />
          Tags em alta
        </div>

        {trendingTags.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">Nenhuma tag ainda.</p>
        ) : (
          <div className="mt-3 flex flex-wrap gap-2">
            {trendingTags.map(({ tag, count }) => {
              const active = activeTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onTagSelect?.(active ? undefined : tag)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-semibold transition hx-filter-pill",
                    active ? themeUi.filterActive : themeUi.filterInactive,
                  )}
                >
                  {tag}
                  <span className="ml-1 text-slate-500">({count})</span>
                </button>
              );
            })}
          </div>
        )}

        {activeTag && onTagSelect && (
          <button
            type="button"
            onClick={() => onTagSelect(undefined)}
            className="mt-3 text-xs font-medium hx-accent-link hover:underline"
          >
            Limpar filtro
          </button>
        )}
      </section>

      <section className="hx-panel !p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
          <Users className="h-4 w-4 hx-accent-text" />
          Estudantes ativos
        </div>

        {suggestedUsers.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">Nenhuma sugestão no momento.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {suggestedUsers.map((user) => (
              <li key={user.id} className="flex items-center gap-3">
                <Link href={`/perfil/${user.username}`} className="shrink-0">
                  <Avatar src={user.avatarUrl} alt={user.username ?? ""} size="sm" />
                </Link>

                <div className="min-w-0 flex-1">
                  <Link
                    href={`/perfil/${user.username}`}
                    className="block truncate text-sm font-semibold text-white hover:underline"
                  >
                    {user.fullName}
                  </Link>
                  <p className="truncate text-xs text-slate-500">
                    @{user.username} · {user._count.followers} seguidores
                  </p>
                </div>

                {canFollow && (
                  <FollowButton userId={user.id} initialFollowing={false} className="shrink-0 px-3 py-1 text-xs" />
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </aside>
  );
}
