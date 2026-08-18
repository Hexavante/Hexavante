import { ProfileIconBadge } from "@/components/profile/profile-icon-badge";
import { ProfileShowcase } from "@/components/profile/profile-showcase";
import Link from "next/link";
import { Pencil, Settings, Store } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { FollowButton } from "@/components/social/follow-button";
import { ProfileTabs } from "./profile-tabs";
import type { getPublicProfile } from "@/services/public-profile.service";

type ProfileData = NonNullable<Awaited<ReturnType<typeof getPublicProfile>>>;

type Props = {
  profile: ProfileData;
  viewerId?: string;
  viewerUsername?: string | null;
};

export function PublicProfileView({ profile, viewerId, viewerUsername }: Props) {
  const {
    user,
    isOwner,
    isPrivate,
    xp,
    followCounts,
    isFollowing,
    completedCourses,
    cosmetics,
    enrollments,
    activities,
    achievements,
    showcase,
    certificates,
  } = profile;

  if (isPrivate) {
    const isLikelyOwner =
      viewerUsername != null &&
      user.username != null &&
      viewerUsername.toLowerCase() === user.username.toLowerCase();

    return (
      <div className="rounded-xl border border-[hsl(var(--sidebar-border))] bg-[var(--surface-strong)] p-10 text-center">
        <p className="text-lg font-semibold text-white">Este perfil é privado</p>
        <p className="mt-2 text-sm text-slate-400">
          @{user.username} restringiu a visualização do perfil.
        </p>
        {isLikelyOwner && (
          <Link
            href="/configuracoes/perfil"
            className="hx-btn-primary mt-6 inline-flex items-center gap-2"
          >
            <Pencil className="h-4 w-4" />
            Editar visibilidade do perfil
          </Link>
        )}
      </div>
    );
  }

  return (
    <>
      <section className="hx-profile-card">
        <div className="hx-profile-banner" />
        <div className="grid gap-6 p-6 lg:grid-cols-[180px_minmax(0,1fr)]">
          <div className="-mt-16 flex flex-col items-center gap-3 lg:items-start">
            <Avatar
              src={user.avatarUrl}
              alt={user.username ?? ""}
              size="lg"
              borderClassName={cosmetics?.avatarBorderClassName}
            />
          </div>

          <div className="min-w-0">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-3xl font-black tracking-tight text-white">{user.fullName}</h1>
                  {cosmetics?.profileIconId && (
                    <ProfileIconBadge iconId={cosmetics.profileIconId} />
                  )}
                </div>
                <p className="mt-1 text-slate-400">@{user.username}</p>
                {cosmetics?.equippedTitle && (
                  <p className="mt-2 text-sm font-semibold hx-accent-text">{cosmetics.equippedTitle}</p>
                )}
                {user.bio && (
                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">{user.bio}</p>
                )}
                {xp && (
                  <p className="mt-3 text-sm text-slate-400">
                    Nível {xp.level} · {xp.totalXp.toLocaleString("pt-BR")} XP total
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {isOwner ? (
                  <>
                    <Link
                      href="/configuracoes/perfil"
                      className="hx-btn-secondary inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Editar perfil
                    </Link>
                    <Link
                      href="/configuracoes"
                      className="hx-btn-secondary inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm"
                      aria-label="Configurações"
                    >
                      <Settings className="h-3.5 w-3.5" />
                    </Link>
                    <Link href="/shop" className="hx-header-stat">
                      <Store className="h-4 w-4 hx-header-stat-icon" />
                      Loja
                    </Link>
                  </>
                ) : viewerId ? (
                  <FollowButton userId={user.id} initialFollowing={isFollowing} />
                ) : (
                  <Link
                    href={`/login?callbackUrl=/perfil/${user.username}`}
                    className="hx-btn-primary"
                  >
                    Entrar para seguir
                  </Link>
                )}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-300">
              <span>
                <strong className="text-white">{followCounts.followers}</strong> seguidores
              </span>
              <span>
                <strong className="text-white">{followCounts.following}</strong> seguindo
              </span>
              <span>
                <strong className="text-white">{completedCourses}</strong> cursos concluídos
              </span>
              {showcase && showcase.certificatesCount > 0 && (
                <span>
                  <strong className="text-white">{showcase.certificatesCount}</strong> certificados
                </span>
              )}
            </div>

            {showcase && <ProfileShowcase showcase={showcase} />}
          </div>
        </div>
      </section>

      <ProfileTabs
        activities={activities}
        enrollments={enrollments}
        canInteract={Boolean(viewerId)}
        achievements={achievements}
        certificates={certificates}
      />
    </>
  );
}
