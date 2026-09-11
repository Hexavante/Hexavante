export const dynamic = "force-dynamic";

import { Target, Search, Clock3, ClipboardList, Crown } from "lucide-react";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingFooter } from "@/components/landing/landing-footer";
import { FloatingDecor } from "@/components/landing/floating-decor";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { BackgroundMusic } from "@/components/landing/background-music";
import { Badge } from "@/components/ui/badge";
import { searchPublishedExams } from "@/services/exam.service";
import { auth } from "@/auth";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ tipo?: string; q?: string; sort?: string }>;
};

const EXAM_TYPES = [
  { value: "ENEM", label: "ENEM" },
  { value: "VESTIBULAR", label: "Vestibular" },
  { value: "TECNOLOGIA", label: "Tecnologia" },
] as const;

const examBadgeVariant: Record<string, "sky" | "amber" | "emerald"> = {
  ENEM: "sky",
  VESTIBULAR: "amber",
  TECNOLOGIA: "emerald",
};

const examTypeGradient: Record<string, string> = {
  ENEM: "from-cyan-500/15 to-blue-500/10",
  VESTIBULAR: "from-amber-500/15 to-orange-500/10",
  TECNOLOGIA: "from-emerald-500/15 to-teal-500/10",
};

export default async function SimuladosPage({ searchParams }: Props) {
  const session = await auth();
  const user = session?.user ?? null;
  const params = await searchParams;
  const sort = params.sort === "popular" ? "popular" : "recent";

  const exams = await searchPublishedExams(
    { examType: params.tipo, q: params.q, sort },
    session?.user?.id,
  );

  return (
    <div className="min-h-screen bg-[var(--background)] overflow-x-hidden">
      <LandingHeader user={user} />
      <BackgroundMusic />

      {/* Header */}
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-16">
        <FloatingDecor />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="sky">Prática</Badge>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-5xl">
                Teste seus <span className="hx-accent-text">conhecimentos</span>
              </h1>
              <p className="mt-5 text-base text-[hsl(var(--sidebar-foreground)/0.56)] sm:text-lg">
                Simulados com correção automática e gabarito comentado.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Filters */}
      <section className="border-y border-white/[0.06] bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <ScrollReveal>
            <form className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--sidebar-foreground)/0.35)]" />
                <input
                  type="text"
                  name="q"
                  defaultValue={params.q ?? ""}
                  placeholder="Buscar simulados..."
                  className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-[hsl(var(--sidebar-foreground))] placeholder:text-[hsl(var(--sidebar-foreground)/0.35)] transition focus:border-[hsl(var(--sidebar-highlight)/0.5)] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--sidebar-highlight)/0.3)]"
                />
              </div>

              {/* Type */}
              <select
                name="tipo"
                defaultValue={params.tipo ?? ""}
                className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-sm text-[hsl(var(--sidebar-foreground))] transition focus:border-[hsl(var(--sidebar-highlight)/0.5)] focus:outline-none"
              >
                <option value="">Todos os tipos</option>
                {EXAM_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                name="sort"
                defaultValue={sort}
                className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-sm text-[hsl(var(--sidebar-foreground))] transition focus:border-[hsl(var(--sidebar-highlight)/0.5)] focus:outline-none"
              >
                <option value="recent">Mais recentes</option>
                <option value="popular">Mais populares</option>
              </select>

              <button
                type="submit"
                className="rounded-lg bg-[hsl(var(--sidebar-highlight))] px-5 py-2.5 text-sm font-bold text-[hsl(var(--sidebar-background))] transition hover:brightness-110"
              >
                Filtrar
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* Type pills */}
      <section className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/simulados"
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                !params.tipo
                  ? "bg-[hsl(var(--sidebar-highlight))] text-[hsl(var(--sidebar-background))]"
                  : "bg-white/5 text-[hsl(var(--sidebar-foreground)/0.5)] hover:bg-white/10 hover:text-[hsl(var(--sidebar-foreground)/0.8)]"
              }`}
            >
              Todos
            </Link>
            {EXAM_TYPES.map((t) => (
              <Link
                key={t.value}
                href={`/simulados?tipo=${t.value}${params.q ? `&q=${params.q}` : ""}${sort !== "recent" ? `&sort=${sort}` : ""}`}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                  params.tipo === t.value
                    ? "bg-[hsl(var(--sidebar-highlight))] text-[hsl(var(--sidebar-background))]"
                    : "bg-white/5 text-[hsl(var(--sidebar-foreground)/0.5)] hover:bg-white/10 hover:text-[hsl(var(--sidebar-foreground)/0.8)]"
                }`}
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="mb-8 text-sm text-[hsl(var(--sidebar-foreground)/0.45)]">
            <span className="font-semibold text-[hsl(var(--sidebar-foreground))]">{exams.length}</span> simulados encontrados
          </p>

          {exams.length === 0 ? (
            <div className="py-20 text-center">
              <Search className="mx-auto mb-4 h-12 w-12 text-[hsl(var(--sidebar-foreground)/0.15)]" />
              <p className="text-lg font-bold text-[hsl(var(--sidebar-foreground))]">Nenhum simulado encontrado</p>
              <p className="mt-2 text-sm text-[hsl(var(--sidebar-foreground)/0.45)]">
                Tente outros termos de busca ou remova alguns filtros.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {exams.map((exam, i) => (
                <ScrollReveal key={exam.id} delay={Math.min(i * 60, 300)}>
                  <Link
                    href={`/simulados/${exam.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] transition hover:border-white/[0.12] hover:bg-white/[0.06]"
                  >
                    {/* Thumbnail */}
                    <div className={`relative aspect-video overflow-hidden bg-gradient-to-br ${examTypeGradient[exam.examType] ?? "from-rose-500/15 to-amber-500/10"}`}>
                      {exam.coverImage ? (
                        <img
                          src={exam.coverImage}
                          alt={exam.title}
                          className="h-full w-full object-cover transition group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Target className="h-12 w-12 text-white/15" />
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={examBadgeVariant[exam.examType] ?? "sky"} className="text-[10px]">
                          <Target className="h-3 w-3" />
                          {EXAM_TYPES.find((t) => t.value === exam.examType)?.label ?? exam.examType}
                        </Badge>
                        {exam.isPremiumOnly && (
                          <Badge variant="amber" className="text-[10px]">
                            <Crown className="h-3 w-3" />
                            Premium
                          </Badge>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="mt-3 text-sm font-bold text-[hsl(var(--sidebar-foreground))] line-clamp-2 group-hover:hx-accent-text transition">
                        {exam.title}
                      </h3>

                      {/* Description */}
                      {exam.description && (
                        <p className="mt-2 text-xs text-[hsl(var(--sidebar-foreground)/0.45)] line-clamp-2">
                          {exam.description}
                        </p>
                      )}

                      {/* Stats */}
                      <div className="mt-4 flex items-center gap-4 text-xs text-[hsl(var(--sidebar-foreground)/0.35)]">
                        <span className="flex items-center gap-1">
                          <ClipboardList className="h-3.5 w-3.5" />
                          {exam._count.questions} questões
                        </span>
                        {exam.timeLimit && (
                          <span className="flex items-center gap-1">
                            <Clock3 className="h-3.5 w-3.5" />
                            {exam.timeLimit} min
                          </span>
                        )}
                        <span>{exam._count.attempts} tentativas</span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
