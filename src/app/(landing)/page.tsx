import { auth } from "@/auth";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  GraduationCap,
  Radio,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingFooter } from "@/components/landing/landing-footer";
import { Badge } from "@/components/ui/badge";
import { HexavanteLogo } from "@/components/brand/hexavante-logo";

const features = [
  {
    icon: BookOpen,
    title: "Central de Estudos",
    description:
      "Cursos organizados por disciplina com aulas em vídeo, material de apoio e exercícios práticos. Acompanhe seu progresso em tempo real.",
    badge: "Mais popular",
    badgeVariant: "sky" as const,
    bullets: ["Cursos com videoaulas", "Material complementar", "Progresso em tempo real"],
  },
  {
    icon: Target,
    title: "Simulados ao vivo",
    description:
      "Questões que simulam provas reais com correção automática e gabarito comentado. Prepare-se com estilo ENEM e vestibulares.",
    badge: "Ao vivo",
    badgeVariant: "red" as const,
    bullets: ["Correção automática", "Gabarito comentado", "Ranking de desempenho"],
  },
  {
    icon: Trophy,
    title: "Ranking e gamificação",
    description:
      "Ganhe XP, suba de nível e compita com outros estudantes. Desbloqueie conquistas e personalize seu perfil com itens da loja.",
    badge: "Competir",
    badgeVariant: "amber" as const,
    bullets: ["Sistema de XP e níveis", "Conquistas desbloqueáveis", "Loja de cosméticos"],
  },
  {
    icon: BarChart3,
    title: "Estatísticas detalhadas",
    description:
      "Acompanhe seu desempenho por disciplina, taxa de acerto, tempo de estudo e evolução ao longo do tempo com gráficos interativos.",
    badge: "Insights",
    badgeVariant: "emerald" as const,
    bullets: ["Gráficos interativos", "Desempenho por área", "Histórico completo"],
  },
];

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
    <div className="min-h-screen bg-[var(--background)]">
      <LandingHeader user={user} />

      {/* ───── HERO ───── */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        {/* Ambient glow — same as dashboard body */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-20%] top-[-10%] h-[600px] w-[600px] rounded-full bg-primary/[0.12] blur-[12rem]" />
          <div className="absolute right-[-10%] top-[5%] h-[400px] w-[400px] rounded-full bg-accent/[0.08] blur-[10rem]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="sky">Plataforma educacional</Badge>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-5xl lg:text-6xl">
              Aprenda, pratique e{" "}
              <span className="hx-accent-text">
                evolua
              </span>{" "}
              em um só lugar.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[hsl(var(--sidebar-foreground)/0.6)] sm:text-lg">
              Cursos, simulados ao vivo, ranking competitivo e gamificação —
              tudo na plataforma que transforma estudo em progresso real.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/register"
                className="hx-hero-btn inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--sidebar-highlight))] px-6 py-3 text-sm font-bold text-[hsl(var(--sidebar-background))] transition hover:brightness-110"
                style={{
                  boxShadow: "0 8px 24px hsl(var(--sidebar-highlight) / 0.3)",
                }}
              >
                Começar agora
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/courses"
                className="hx-btn-secondary inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-[hsl(var(--sidebar-foreground))] transition hover:bg-white/[0.08]"
              >
                Explorar cursos
              </a>
            </div>
          </div>

          {/* Dashboard preview card */}
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/30 backdrop-blur">
              <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[hsl(var(--sidebar-background))] px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-500/60" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                <div className="h-3 w-3 rounded-full bg-green-500/60" />
                <div className="ml-4 flex-1 text-center text-xs text-[hsl(var(--sidebar-foreground)/0.36)]">
                  hexavante.com.br
                </div>
              </div>
              <div className="grid gap-4 p-6 sm:grid-cols-3">
                {[
                  { icon: BookOpen, label: "Cursos", value: "12", tone: "hx-accent-text", iconBg: "hx-icon-box" },
                  { icon: Target, label: "Simulados", value: "8", tone: "text-teal-300", iconBg: "border-teal-400/25 bg-teal-400/10 text-teal-300" },
                  { icon: Trophy, label: "Nível", value: "27", tone: "text-amber-300", iconBg: "border-amber-400/25 bg-amber-400/10 text-amber-300" },
                ].map((item) => (
                  <div key={item.label} className="hx-card p-5">
                    <div className="flex items-center gap-3">
                      <div className={`grid h-10 w-10 place-items-center rounded-lg ${item.iconBg}`}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-[hsl(var(--sidebar-foreground)/0.48)]">{item.label}</p>
                        <p className="text-lg font-bold text-[hsl(var(--sidebar-foreground))]">{item.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
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
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
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

          <div className="space-y-20">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              const isReversed = i % 2 === 1;
              return (
                <div
                  key={feature.title}
                  className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16`}
                >
                  <div className={isReversed ? "lg:order-2" : ""}>
                    <Badge variant={feature.badgeVariant}>{feature.badge}</Badge>
                    <h3 className="mt-3 text-2xl font-bold text-[hsl(var(--sidebar-foreground))]">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--sidebar-foreground)/0.6)]">
                      {feature.description}
                    </p>
                    <ul className="mt-5 space-y-2">
                      {feature.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-center gap-2 text-sm text-[hsl(var(--sidebar-foreground)/0.78)]"
                        >
                          <Zap
                            className={`h-3.5 w-3.5 flex-shrink-0 hx-accent-text`}
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className={`${isReversed ? "lg:order-1" : ""} hx-card overflow-hidden p-8`}
                  >
                    <div className="flex h-48 items-center justify-center">
                      <div className="hx-icon-box h-20 w-20 rounded-2xl">
                        <Icon className="h-10 w-10" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───── CTA FINAL ───── */}
      <section className="border-t border-white/[0.06] py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
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
                boxShadow: "0 8px 24px hsl(var(--sidebar-highlight) / 0.3)",
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
