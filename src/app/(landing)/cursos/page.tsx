export const dynamic = "force-dynamic";

import { BookOpen, Search } from "lucide-react";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingFooter } from "@/components/landing/landing-footer";
import { FloatingDecor } from "@/components/landing/floating-decor";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { BackgroundMusic } from "@/components/landing/background-music";
import { Badge } from "@/components/ui/badge";
import { listCategories, searchApprovedCourses } from "@/services/course.service";
import { auth } from "@/auth";
import Link from "next/link";

type Props = {
  searchParams: Promise<{
    category?: string;
    level?: string;
    q?: string;
    sort?: string;
  }>;
};

const LEVELS = [
  { value: "BEGINNER", label: "Iniciante" },
  { value: "INTERMEDIATE", label: "Intermediário" },
  { value: "ADVANCED", label: "Avançado" },
] as const;

const LEVEL_LABELS: Record<string, string> = {
  BEGINNER: "Iniciante",
  INTERMEDIATE: "Intermediário",
  ADVANCED: "Avançado",
};

export default async function CursosPage({ searchParams }: Props) {
  const session = await auth();
  const user = session?.user ?? null;
  const params = await searchParams;

  const level =
    params.level === "BEGINNER" || params.level === "INTERMEDIATE" || params.level === "ADVANCED"
      ? params.level
      : undefined;
  const sort = params.sort === "popular" ? "popular" : "recent";

  const [courses, categories] = await Promise.all([
    searchApprovedCourses({ categoryId: params.category, level, q: params.q, sort }),
    listCategories(),
  ]);

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
              <Badge variant="sky">Catálogo público</Badge>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-5xl">
                Explore nossos <span className="hx-accent-text">cursos</span>
              </h1>
              <p className="mt-5 text-base text-[hsl(var(--sidebar-foreground)/0.56)] sm:text-lg">
                Escolha uma trilha, acompanhe módulos e avance no seu ritmo.
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
                  placeholder="Buscar cursos..."
                  className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-[hsl(var(--sidebar-foreground))] placeholder:text-[hsl(var(--sidebar-foreground)/0.35)] transition focus:border-[hsl(var(--sidebar-highlight)/0.5)] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--sidebar-highlight)/0.3)]"
                />
              </div>

              {/* Category */}
              <select
                name="category"
                defaultValue={params.category ?? ""}
                className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-sm text-[hsl(var(--sidebar-foreground))] transition focus:border-[hsl(var(--sidebar-highlight)/0.5)] focus:outline-none"
              >
                <option value="">Todas categorias</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>

              {/* Level */}
              <select
                name="level"
                defaultValue={params.level ?? ""}
                className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-sm text-[hsl(var(--sidebar-foreground))] transition focus:border-[hsl(var(--sidebar-highlight)/0.5)] focus:outline-none"
              >
                <option value="">Todos níveis</option>
                {LEVELS.map((l) => (
                  <option key={l.value} value={l.value}>{l.label}</option>
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

      {/* Results */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="mb-8 text-sm text-[hsl(var(--sidebar-foreground)/0.45)]">
            <span className="font-semibold text-[hsl(var(--sidebar-foreground))]">{courses.length}</span> cursos encontrados
          </p>

          {courses.length === 0 ? (
            <div className="py-20 text-center">
              <Search className="mx-auto mb-4 h-12 w-12 text-[hsl(var(--sidebar-foreground)/0.15)]" />
              <p className="text-lg font-bold text-[hsl(var(--sidebar-foreground))]">Nenhum curso encontrado</p>
              <p className="mt-2 text-sm text-[hsl(var(--sidebar-foreground)/0.45)]">
                Tente outros termos de busca ou remova alguns filtros.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {courses.map((course, i) => (
                <ScrollReveal key={course.id} delay={Math.min(i * 60, 300)}>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] transition hover:border-white/[0.12] hover:bg-white/[0.06]"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-cyan-500/15 to-violet-500/15">
                      {course.coverImage || course.thumbnailUrl ? (
                        <img
                          src={course.coverImage || course.thumbnailUrl || ""}
                          alt={course.title}
                          className="h-full w-full object-cover transition group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <BookOpen className="h-12 w-12 text-white/15" />
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      {/* Category + Level */}
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="sky" className="text-[10px]">
                          <BookOpen className="h-3 w-3" />
                          {course.category.name}
                        </Badge>
                        <Badge variant="emerald" className="text-[10px]">
                          {LEVEL_LABELS[course.level] ?? course.level}
                        </Badge>
                      </div>

                      {/* Title */}
                      <h3 className="mt-3 text-sm font-bold text-[hsl(var(--sidebar-foreground))] line-clamp-2 group-hover:hx-accent-text transition">
                        {course.title}
                      </h3>

                      {/* Description */}
                      {course.shortDescription && (
                        <p className="mt-2 text-xs text-[hsl(var(--sidebar-foreground)/0.45)] line-clamp-2">
                          {course.shortDescription}
                        </p>
                      )}

                      {/* Stats */}
                      <div className="mt-4 flex items-center gap-4 text-xs text-[hsl(var(--sidebar-foreground)/0.35)]">
                        <span>{course._count.modules} módulos</span>
                        <span>{course._count.enrollments} alunos</span>
                        {course.estimatedHours && course.estimatedHours > 0 && (
                          <span>{course.estimatedHours}h</span>
                        )}
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
