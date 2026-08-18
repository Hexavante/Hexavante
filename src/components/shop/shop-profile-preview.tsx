"use client";

import { ProfileIconBadge } from "@/components/profile/profile-icon-badge";
import { Avatar } from "@/components/ui/avatar";

type PreviewCosmetics = {
  equippedTitle: string | null;
  avatarBorderClassName: string | null;
  profileIconId: string | null;
};

type Props = {
  fullName: string;
  username: string | null;
  avatarUrl: string | null;
  cosmetics: PreviewCosmetics;
};

export function ShopProfilePreview({ fullName, username, avatarUrl, cosmetics }: Props) {
  return (
    <section className="hx-panel !p-4">
      <p className="text-sm font-semibold hx-text-body">Prévia do perfil</p>
      <p className="mt-1 text-xs hx-text-muted">Veja como sua vitrine aparece para outros.</p>

      <div className="mt-4 flex items-start gap-3">
        <Avatar
          src={avatarUrl}
          alt={username ?? ""}
          size="md"
          borderClassName={cosmetics.avatarBorderClassName}
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <p className="truncate font-bold hx-text-title">{fullName}</p>
            {cosmetics.profileIconId && <ProfileIconBadge iconId={cosmetics.profileIconId} />}
          </div>
          <p className="text-sm hx-text-muted">@{username}</p>
          {cosmetics.equippedTitle && (
            <p className="mt-2 inline-flex rounded-full border border-[hsl(var(--sidebar-highlight)/0.28)] bg-[hsl(var(--sidebar-highlight)/0.1)] px-2.5 py-0.5 text-xs font-semibold hx-accent-text">
              {cosmetics.equippedTitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
