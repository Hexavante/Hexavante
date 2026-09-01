import { auth } from "@/auth";
import {
  ArrowRight,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingFooter } from "@/components/landing/landing-footer";
import { PantherMascot } from "@/components/landing/panther-mascot";
import { FloatingDecor } from "@/components/landing/floating-decor";
import { FeatureCards } from "@/components/landing/feature-cards";
import { Badge } from "@/components/ui/badge";

const stats = [
  { value: "500+", label: "Alunos ativos" },
  { value: "50+", label: "Cursos disponíveis" },
  { value: "10k+", label: "Questões respondidas" },
  { value: "98%", label: "Satisfação" },
];

export default async function LandingPage() {
  const session = await auth();
  const user = session?.user ?? null;

  return (
    <div className="min-h-screen bg-[var(--background)] overflow-x-hidden">
      <LandingHeader user={user} />

      {/* ───── HERO ───── */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
        <FloatingDecor />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-4">
            {/* Text */}
            <div className="max-w-2xl">
              <Badge variant="sky">Plataforma educacional</Badge>

              <h1 className="mt-5 text-4xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-5xl lg:text-6xl xl:text-7xl">
                Aprenda, pratique e{" "}
                <span className="hx-accent-text">evolua</span>{" "}
                em um só lugar.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-[hsl(var(--sidebar-foreground)/0.6)] sm:text-lg">
                Cursos, simulados ao vivo, ranking competitivo e gamificação —
                tudo na plataforma que transforma estudo em progresso real.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/register"
                  className="hx-hero-btn inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--sidebar-highlight))] px-7 py-3.5 text-sm font-bold text-[hsl(var(--sidebar-background))] transition hover:brightness-110"
                  style={{
                    boxShadow: "0 8px 32px hsl(var(--sidebar-highlight) / 0.35)",
                  }}
                >
                  Começar agora
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/courses"
                  className="hx-btn-secondary inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-[hsl(var(--sidebar-foreground))] transition hover:bg-white/[0.08]"
                >
                  Explorar cursos
                </a>
              </div>
            </div>

            {/* Mascot */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 rounded-full bg-[hsl(var(--sidebar-highlight))]/[0.06] blur-[3rem]" />
              <PantherMascot className="relative h-[340px] w-[340px] xl:h-[420px] xl:w-[420px]" />
            </div>
          </div>

          {/* Dashboard preview card */}
          <div className="mx-auto mt-12 max-w-4xl lg:mt-16">
            <div
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/40 backdrop-blur"
              style={{ boxShadow: "0 25px 60px -12px rgb(0 0 0 / 0.5), 0 0 40px hsl(187, 85%, 53% / 0.06)" }}
            >
              <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[hsl(var(--sidebar-background))] px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-500/60" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                <div className="h-3 w-3 rounded-full bg-green-500/60" />
                <div className="ml-4 flex-1 text-center text-xs text-[hsl(var(--sidebar-foreground)/0.36)]">
                  hexavante.com.br
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-2">
                  <div className="hx-icon-box h-8 w-8">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wide hx-accent-text">
                    Seu painel
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Cursos", value: "12", accent: "hx-accent-text", bg: "hx-icon-box" },
                    { label: "Simulados", value: "8", accent: "text-teal-300", bg: "border-teal-400/25 bg-teal-400/10 text-teal-300" },
                    { label: "Nível", value: "27", accent: "text-amber-300", bg: "border-amber-400/25 bg-amber-400/10 text-amber-300" },
                  ].map((item) => (
                    <div key={item.label} className="hx-card p-4">
                      <div className="flex items-center gap-3">
                        <div className={`grid h-10 w-10 place-items-center rounded-lg ${item.bg}`}>
                          <span className={`text-lg font-black ${item.accent}`}>{item.value}</span>
                        </div>
                        <div>
                          <p className="text-xs text-[hsl(var(--sidebar-foreground)/0.48)]">{item.label}</p>
                          <p className="text-sm font-bold text-[hsl(var(--sidebar-foreground))]">{item.value} completed</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── STATS BAR ───── */}
      <section className="border-y border-white/[0.06] bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-black text-[hsl(var(--sidebar-foreground))] sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-[hsl(var(--sidebar-foreground)/0.48)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── FEATURES ───── */}
      <section className="relative py-20 sm:py-28">
        <FloatingDecor />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 hx-intro-chip">
              <Sparkles className="h-3.5 w-3.5" />
              Funcionalidades
            </div>
            <h2 className="text-3xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-4xl">
              Tudo que você precisa para{" "}
              <span className="hx-accent-text">aprender</span>
            </h2>
            <p className="mt-4 text-base text-[hsl(var(--sidebar-foreground)/0.56)]">
              Uma plataforma completa que reúne estudo, prática e competição.
            </p>
          </div>

          <FeatureCards />
        </div>
      </section>

      {/* ───── CTA FINAL ───── */}
      <section className="relative border-t border-white/[0.06] py-20 sm:py-28">
        <FloatingDecor />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="hx-icon-box mx-auto mb-6 h-16 w-16 rounded-2xl">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-4xl">
            Pronto para começar?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[hsl(var(--sidebar-foreground)/0.56)]">
            Crie sua conta gratuita e comece a aprender hoje. Sem cartão de
            crédito, sem compromisso.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/register"
              className="hx-hero-btn inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--sidebar-highlight))] px-8 py-3.5 text-sm font-bold text-[hsl(var(--sidebar-background))] transition hover:brightness-110"
              style={{
                boxShadow: "0 8px 32px hsl(var(--sidebar-highlight) / 0.35)",
              }}
            >
              Criar conta grátis
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/courses"
              className="hx-btn-secondary inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-8 py-3.5 text-sm font-medium text-[hsl(var(--sidebar-foreground))] transition hover:bg-white/[0.08]"
            >
              Ver cursos
            </a>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
