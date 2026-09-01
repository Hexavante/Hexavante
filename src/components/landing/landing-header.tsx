"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  HelpCircle,
  LogOut,
  Menu,
  Settings,
  Sparkles,
  BarChart3,
  Hexagon,
  X,
} from "lucide-react";
import { HexavanteLogo } from "@/components/brand/hexavante-logo";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/app/actions/sign-out";

type SessionUser = {
  name?: string | null;
  username?: string | null;
  image?: string | null;
};

type Props = {
  user: SessionUser | null;
};

export function LandingHeader({ user }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/[0.06] bg-[var(--background)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Hexavante">
          <HexavanteLogo
            size="lg"
            showWordmark={false}
            className="gap-0"
            imageClassName="hx-header-logo-glow h-9 w-9"
          />
          <span className="text-lg font-extrabold tracking-tight hx-accent-text">
            HEXAVANTE
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {[
            { href: "/courses", label: "Cursos" },
            { href: "/simulados", label: "Simulados" },
            { href: "/hexa", label: "Hexa" },
            { href: "/ajuda", label: "Ajuda" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[hsl(var(--sidebar-foreground)/0.72)] transition hover:bg-white/[0.06] hover:text-[hsl(var(--sidebar-foreground))]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-2 py-1.5 transition hover:bg-white/[0.08]"
              >
                <Avatar
                  src={user.image}
                  alt={user.username ?? user.name ?? ""}
                  size="sm"
                />
                <span className="hidden text-sm font-medium text-[hsl(var(--sidebar-foreground))] sm:block">
                  {user.name?.split(" ")[0] ?? user.username}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-[hsl(var(--sidebar-foreground)/0.5)]" />
              </button>

              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-white/[0.08] bg-[hsl(var(--sidebar-background))] shadow-2xl shadow-black/50">
                    <div className="border-b border-white/[0.06] px-4 py-3">
                      <p className="text-sm font-semibold text-[hsl(var(--sidebar-foreground))]">
                        {user.name}
                      </p>
                      <p className="text-xs text-[hsl(var(--sidebar-foreground)/0.5)]">
                        @{user.username}
                      </p>
                    </div>
                    <div className="p-1.5">
                      {[
                        { href: "/app", icon: BarChart3, label: "Meu painel" },
                        { href: "/estatisticas", icon: Sparkles, label: "Estatísticas" },
                        { href: "/configuracoes", icon: Settings, label: "Configurações" },
                        { href: "/hexa", icon: Hexagon, label: "Hexa", iconClassName: "text-amber-400" },
                        { href: "/ajuda", icon: HelpCircle, label: "Ajuda" },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[hsl(var(--sidebar-foreground)/0.78)] transition hover:bg-white/[0.06] hover:text-[hsl(var(--sidebar-foreground))]"
                        >
                          <item.icon className={`h-4 w-4 ${item.iconClassName ?? ""}`} />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-white/[0.06] p-1.5">
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            await signOutAction();
                          } catch {
                            window.location.href = "/";
                          }
                        }}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10"
                      >
                        <LogOut className="h-4 w-4" />
                        Sair
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Entrar
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="accent" size="sm">
                  Criar conta
                </Button>
              </Link>
            </div>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-[hsl(var(--sidebar-foreground)/0.6)] transition hover:bg-white/[0.06] hover:text-[hsl(var(--sidebar-foreground))] md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/[0.06] bg-[var(--background)]/95 backdrop-blur-xl md:hidden">
          <div className="space-y-1 px-4 py-4">
            {[
              { href: "/courses", label: "Cursos" },
              { href: "/simulados", label: "Simulados" },
              { href: "/hexa", label: "Hexa" },
              { href: "/ajuda", label: "Ajuda" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[hsl(var(--sidebar-foreground)/0.78)] transition hover:bg-white/[0.06]"
              >
                {item.label}
              </Link>
            ))}
            {!user && (
              <div className="mt-3 flex flex-col gap-2 border-t border-white/[0.06] pt-3">
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="w-full">
                    Entrar
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)}>
                  <Button variant="accent" className="w-full">
                    Criar conta
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
