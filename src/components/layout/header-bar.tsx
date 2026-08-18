import Link from "next/link";
import { Suspense } from "react";
import { HexavanteLogo } from "@/components/brand/hexavante-logo";
import { HeaderGamificationHud } from "@/components/gamification/header-gamification-hud";
import { HeaderGamificationHudSkeleton } from "@/components/gamification/header-gamification-hud-skeleton";
import { NotificationBell } from "@/components/notifications/notification-bell";
import { Avatar } from "@/components/ui/avatar";
import type { NavSession } from "@/lib/nav-session";
import { HeaderAuthActions } from "./header-auth-actions";
import { HeaderSignOut } from "./header-sign-out";
import { SearchBar } from "./search-bar";
import { SidebarToggleButton } from "./sidebar-toggle-button";

type Props = {
  session: NavSession;
};

export function HeaderBar({ session }: Props) {
  return (
    <header className="hx-header-bar sticky top-0 z-20">
      <div className="flex w-full items-center gap-2 px-3 py-3 sm:gap-3 sm:px-4">
        <SidebarToggleButton />

        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="hx-header-brand group shrink-0"
            aria-label="Hexavante - Página inicial"
          >
            <HexavanteLogo
              showWordmark
              size="lg"
              className="gap-2 sm:gap-2.5"
              imageClassName="hx-header-logo-glow h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12"
              wordmarkClassName="hx-header-wordmark hidden md:inline md:text-xl lg:text-[1.35rem]"
            />
          </Link>

          <div className="min-w-0 flex-1">
            <SearchBar />
          </div>
        </div>

        <nav className="flex shrink-0 items-center gap-1.5 text-sm sm:gap-2">
          {session?.user ? (
            <>
              <Suspense fallback={<HeaderGamificationHudSkeleton />}>
                <div data-tour="header-gamification">
                  <HeaderGamificationHud userId={session.user.id} />
                </div>
              </Suspense>
              <NotificationBell />
              <Link
                href={`/perfil/${session.user.username}`}
                className="hidden rounded-full transition hover:ring-2 sm:inline-flex hx-header-avatar-ring"
                aria-label={`Perfil de @${session.user.username}`}
              >
                <Avatar src={session.user.image} alt={session.user.username ?? ""} size="sm" />
              </Link>
              <HeaderSignOut />
            </>
          ) : (
            <HeaderAuthActions />
          )}
        </nav>
      </div>
    </header>
  );
}
