export const dynamic = "force-dynamic";

import { Video, Search } from "lucide-react";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingFooter } from "@/components/landing/landing-footer";
import { FloatingDecor } from "@/components/landing/floating-decor";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { BackgroundMusic } from "@/components/landing/background-music";
import { Badge } from "@/components/ui/badge";
import { listTutorials } from "@/services/tutorial.service";
import { listCategories } from "@/services/course.service";
import { auth } from "@/auth";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function TutorialsPage({ searchParams }: Props) {
  const session = await auth();
  const user = session?.user ?? null;
  const params = await searchParams;

  const [tutorials, categories] = await Promise.all([
    listTutorials({ categoryId: params.category, publishedOnly: true }),
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
              <Badge variant="sky">Aprenda</Badge>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-5xl">
                Tutoriais da <span className="hx-accent-text">comunidade</span>
              </h1>
              <p className="mt-5 text-base text-[hsl(var(--sidebar-foreground)/0.56)] sm:text-lg">
                Vídeos curtos e diretos para aprender na prática.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Category filters */}
      {categories.length > 0 && (
        <section className="border-y border-white/[0.06] bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <ScrollReveal>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="/tutorials"
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                    !params.category
                      ? "bg-[hsl(var(--sidebar-highlight))] text-[hsl(var(--sidebar-background))]"
                      : "bg-white/5 text-[hsl(var(--sidebar-foreground)/0.5)] hover:bg-white/10 hover:text-[hsl(var(--sidebar-foreground)/0.8)]"
                  }`}
                >
                  Todos
                </a>
                {categories.map((cat) => (
                  <a
                    key={cat.id}
                    href={`/tutorials?category=${cat.id}`}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                      params.category === cat.id
                        ? "bg-[hsl(var(--sidebar-highlight))] text-[hsl(var(--sidebar-background))]"
                        : "bg-white/5 text-[hsl(var(--sidebar-foreground)/0.5)] hover:bg-white/10 hover:text-[hsl(var(--sidebar-foreground)/0.8)]"
                    }`}
                  >
                    {cat.name}
                  </a>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Results */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="mb-8 text-sm text-[hsl(var(--sidebar-foreground)/0.45)]">
            <span className="font-semibold text-[hsl(var(--sidebar-foreground))]">{tutorials.length}</span> tutoriais encontrados
          </p>

          {tutorials.length === 0 ? (
            <div className="py-20 text-center">
              <Video className="mx-auto mb-4 h-12 w-12 text-[hsl(var(--sidebar-foreground)/0.15)]" />
              <p className="text-lg font-bold text-[hsl(var(--sidebar-foreground))]">Nenhum tutorial encontrado</p>
              <p className="mt-2 text-sm text-[hsl(var(--sidebar-foreground)/0.45)]">
                Em breve teremos tutoriais disponíveis.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {tutorials.map((tut, i) => (
                <ScrollReveal key={tut.id} delay={Math.min(i * 60, 300)}>
                  <Link
                    href={`/tutorials/${tut.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] transition hover:border-white/[0.12] hover:bg-white/[0.06]"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-blue-500/15 to-emerald-500/15">
                      {tut.thumbnailUrl ? (
                        <img
                          src={tut.thumbnailUrl}
                          alt={tut.title}
                          className="h-full w-full object-cover transition group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Video className="h-12 w-12 text-white/15" />
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      {/* Category */}
                      {tut.category && (
                        <Badge variant="sky" className="text-[10px]">
                          {tut.category.name}
                        </Badge>
                      )}

                      {/* Title */}
                      <h3 className="mt-3 text-sm font-bold text-[hsl(var(--sidebar-foreground))] line-clamp-2 group-hover:hx-accent-text transition">
                        {tut.title}
                      </h3>

                      {/* Description */}
                      {tut.description && (
                        <p className="mt-2 text-xs text-[hsl(var(--sidebar-foreground)/0.45)] line-clamp-2">
                          {tut.description}
                        </p>
                      )}

                      {/* Author + Stats */}
                      <div className="mt-4 flex items-center justify-between text-xs text-[hsl(var(--sidebar-foreground)/0.35)]">
                        <span className="flex items-center gap-1.5">
                          <img
                            src={tut.author.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(tut.author.fullName)}&background=2563eb&color=fff&size=24`}
                            alt={tut.author.fullName}
                            className="h-4 w-4 rounded-full"
                          />
                          {tut.author.fullName}
                        </span>
                        <span>{tut.viewCount} views</span>
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
