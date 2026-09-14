export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import {
  ArrowRight,
  BookOpen,
  Download,
  FileText,
  GraduationCap,
  Target,
  Users,
  Play,
} from "lucide-react";
import Link from "next/link";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingFooter } from "@/components/landing/landing-footer";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { BackgroundMusic } from "@/components/landing/background-music";
import { Badge } from "@/components/ui/badge";
import { getPlatformStats } from "@/services/platform-stats.service";
import { listApprovedCourses } from "@/services/course.service";
import { listTutorials } from "@/services/tutorial.service";
import { searchPublishedExams } from "@/services/exam.service";
import { getUserCertificates } from "@/services/certificate.service";

export default async function LandingPage() {
  const session = await auth();
  const user = session?.user ?? null;

  const [platformStats, courses, tutorials, exams, certificates] =
    await Promise.all([
      getPlatformStats(),
      listApprovedCourses(),
      listTutorials({ publishedOnly: true }),
      searchPublishedExams(),
      user?.id ? getUserCertificates(user.id) : null,
    ]);

  return (
    <div className="min-h-screen bg-[var(--background)] overflow-x-hidden">
      <LandingHeader user={user} />
      <BackgroundMusic />

      {/* ───── HERO ───── */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <Badge variant="sky" className="mx-auto">
            Plataforma educacional
          </Badge>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-5xl lg:text-6xl">
            {user
              ? `Bem-vindo de volta, ${user.name?.split(" ")[0] ?? user.username}!`
              : "Aprenda, pratique e "}
            {!user && (
              <span className="hx-accent-text">evolua</span>
            )}
            {(!user || true) && " em um só lugar."}
          </h1>
          <p className="mt-5 mx-auto max-w-xl text-base leading-relaxed text-[hsl(var(--sidebar-foreground)/0.6)] sm:text-lg">
            {user
              ? "Continue de onde parou, acompanhe suas estatísticas e descubra novos cursos."
              : "Cursos, tutoriais, simulados e certificados — tudo na plataforma que transforma estudo em progresso real."}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {user ? (
              <>
                <a
                  href="/app"
                  className="hx-hero-btn inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--sidebar-highlight))] px-8 py-4 text-sm font-bold text-[hsl(var(--sidebar-background))] transition hover:brightness-110"
                  style={{
                    boxShadow: "0 8px 32px hsl(var(--sidebar-highlight) / 0.35)",
                  }}
                >
                  Ir para o painel <ArrowRight className="h-4 w-4" />
                </a>
              </>
            ) : (
              <>
                <a
                  href="/register"
                  className="hx-hero-btn inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--sidebar-highlight))] px-8 py-4 text-sm font-bold text-[hsl(var(--sidebar-background))] transition hover:brightness-110"
                  style={{
                    boxShadow: "0 8px 32px hsl(var(--sidebar-highlight) / 0.35)",
                  }}
                >
                  Criar conta grátis <ArrowRight className="h-4 w-4" />
                </a>
              </>
            )}
            <a
              href="#cursos"
              className="hx-btn-secondary inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-8 py-4 text-sm font-medium text-[hsl(var(--sidebar-foreground))] transition hover:bg-white/[0.08]"
            >
              Explorar cursos
            </a>
          </div>
        </div>
      </section>

      {/* ───── STATS BAR ───── */}
      <section className="border-y border-white/[0.06] bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 sm:grid-cols-4">
          {[
            { value: `${platformStats.totalUsers.toLocaleString("pt-BR")}+`, label: "Alunos" },
            { value: `${platformStats.totalCourses}`, label: "Cursos" },
            { value: `${tutorials.length}`, label: "Tutoriais" },
            { value: `${exams.length}`, label: "Simulados" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-black text-[hsl(var(--sidebar-foreground))] sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs text-[hsl(var(--sidebar-foreground)/0.48)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── COURSES ───── */}
      <section id="cursos" className="border-t border-white/[0.06] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-12">
              <div className="mb-4 inline-flex items-center gap-2 hx-intro-chip">
                <BookOpen className="h-3.5 w-3.5" />
                Cursos
              </div>
              <h2 className="text-3xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-4xl">
                Explore nossos cursos
              </h2>
              <p className="mt-3 text-sm text-[hsl(var(--sidebar-foreground)/0.5)]">
                Conteúdo organizado por disciplina com videoaulas e materiais.
              </p>
            </div>
          </ScrollReveal>

          {courses.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-slate-400">Nenhum curso disponível no momento.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {courses.map((course, i) => (
                  <ScrollReveal key={course.id} delay={i * 60}>
                    <Link
                      href={`/courses/${course.slug}`}
                      className="group block overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] transition hover:border-white/[0.12] hover:bg-white/[0.06]"
                    >
                      <div className="aspect-video bg-gradient-to-br from-cyan-500/15 to-violet-500/15 flex items-center justify-center">
                        <BookOpen className="h-10 w-10 text-white/20" />
                      </div>
                      <div className="p-5">
                        <h3 className="text-sm font-bold text-[hsl(var(--sidebar-foreground))] line-clamp-2 group-hover:hx-accent-text transition">
                          {course.title}
                        </h3>
                        {course.category && (
                          <p className="mt-2 text-xs text-[hsl(var(--sidebar-foreground)/0.4)]">
                            {course.category.name}
                          </p>
                        )}
                        <div className="mt-3 flex items-center gap-3 text-xs text-[hsl(var(--sidebar-foreground)/0.35)]">
                          <span className="flex items-center gap-1">
                            <Play className="h-3 w-3" />{" "}
                            {course._count?.modules ?? 0} módulos
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />{" "}
                            {course._count?.enrollments ?? 0} alunos
                          </span>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
              <div className="mt-8 text-center">
                <a
                  href="/courses"
                  className="hx-accent-link inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                >
                  Ver todos os cursos <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ───── TUTORIALS ───── */}
      <section id="tutorials" className="border-t border-white/[0.06] bg-white/[0.02] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-12">
              <div className="mb-4 inline-flex items-center gap-2 hx-intro-chip">
                <FileText className="h-3.5 w-3.5" />
                Tutoriais
              </div>
              <h2 className="text-3xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-4xl">
                Tutoriais da comunidade
              </h2>
              <p className="mt-3 text-sm text-[hsl(var(--sidebar-foreground)/0.5)]">
                Guias práticos criados por instrutores e alunos.
              </p>
            </div>
          </ScrollReveal>

          {tutorials.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-slate-400">Nenhum tutorial disponível no momento.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {tutorials.map((tut, i) => (
                  <ScrollReveal key={tut.id} delay={i * 60}>
                    <Link
                      href={`/tutorials/${tut.slug}`}
                      className="group block overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] transition hover:border-white/[0.12] hover:bg-white/[0.06]"
                    >
                      <div className="aspect-video bg-gradient-to-br from-blue-500/15 to-emerald-500/15 flex items-center justify-center">
                        <FileText className="h-10 w-10 text-white/20" />
                      </div>
                      <div className="p-5">
                        <h3 className="text-sm font-bold text-[hsl(var(--sidebar-foreground))] line-clamp-2 group-hover:hx-accent-text transition">
                          {tut.title}
                        </h3>
                        {tut.description && (
                          <p className="mt-2 text-xs text-[hsl(var(--sidebar-foreground)/0.4)] line-clamp-2">
                            {tut.description}
                          </p>
                        )}
                        <div className="mt-3 flex items-center gap-2 text-xs text-[hsl(var(--sidebar-foreground)/0.35)]">
                          <span>
                            {tut.viewCount} views
                          </span>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
              <div className="mt-8 text-center">
                <a
                  href="/tutorials"
                  className="hx-accent-link inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                >
                  Ver todos os tutoriais <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ───── SIMULADOS ───── */}
      <section id="simulados" className="border-t border-white/[0.06] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-12">
              <div className="mb-4 inline-flex items-center gap-2 hx-intro-chip">
                <Target className="h-3.5 w-3.5" />
                Simulados
              </div>
              <h2 className="text-3xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-4xl">
                Teste seus conhecimentos
              </h2>
              <p className="mt-3 text-sm text-[hsl(var(--sidebar-foreground)/0.5)]">
                Simulados com correção automática e gabarito comentado.
              </p>
            </div>
          </ScrollReveal>

          {exams.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-slate-400">Nenhum simulado disponível no momento.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {exams.map((exam, i) => (
                  <ScrollReveal key={exam.id} delay={i * 60}>
                    <Link
                      href={`/simulados/${exam.slug}`}
                      className="group block overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] transition hover:border-white/[0.12] hover:bg-white/[0.06]"
                    >
                      <div className="aspect-video bg-gradient-to-br from-rose-500/15 to-amber-500/15 flex items-center justify-center">
                        <Target className="h-10 w-10 text-white/20" />
                      </div>
                      <div className="p-5">
                        <h3 className="text-sm font-bold text-[hsl(var(--sidebar-foreground))] line-clamp-2 group-hover:hx-accent-text transition">
                          {exam.title}
                        </h3>
                        <div className="mt-3 flex items-center gap-3 text-xs text-[hsl(var(--sidebar-foreground)/0.35)]">
                          <span>{exam._count?.questions ?? 0} questões</span>
                          <span>{exam._count?.attempts ?? 0} tentativas</span>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
              <div className="mt-8 text-center">
                <a
                  href="/simulados"
                  className="hx-accent-link inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                >
                  Ver todos os simulados <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ───── CERTIFICATES ───── */}
      <section className="border-t border-white/[0.06] bg-white/[0.02] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-5 inline-flex items-center gap-2 hx-intro-chip">
                <GraduationCap className="h-3.5 w-3.5" />
                Certificados
              </div>
              <h2 className="text-3xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-4xl">
                {user && certificates && certificates.length > 0
                  ? "Seus certificados"
                  : "Certifique seu conhecimento"}
              </h2>
              <p className="mt-5 text-base text-[hsl(var(--sidebar-foreground)/0.56)]">
                {user && certificates && certificates.length > 0
                  ? "Baixe seus certificados concluídos e compartilhe suas conquistas."
                  : "Complete cursos e obtenha certificados reconhecidos para impulsionar seu currículo."}
              </p>
            </div>
          </ScrollReveal>

          {user && certificates && certificates.length > 0 ? (
            <ScrollReveal delay={100}>
              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {certificates.slice(0, 6).map((cert) => (
                  <Link
                    href="/certificados"
                    key={cert.id}
                    className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 transition hover:border-white/[0.12]"
                  >
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-amber-400/15 text-amber-300">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-[hsl(var(--sidebar-foreground))] truncate">
                        {cert.course?.title ?? "Curso"}
                      </p>
                      <p className="text-xs text-[hsl(var(--sidebar-foreground)/0.4)]">
                        {cert.course?.category?.name ?? "Geral"} ·{" "}
                        {new Date(cert.issuedAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <Download className="h-4 w-4 shrink-0 text-[hsl(var(--sidebar-foreground)/0.4)]" />
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal delay={100}>
              <div className="mt-12 flex justify-center">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent" />
                  <div className="relative">
                    <div className="hx-icon-box mx-auto mb-5 h-14 w-14 rounded-2xl">
                      <GraduationCap className="h-7 w-7" />
                    </div>
                    <p className="text-sm text-[hsl(var(--sidebar-foreground)/0.6)]">
                      {user
                        ? "Complete um curso para receber seu certificado."
                        : "Faça login e comece a aprender para ganhar certificados."}
                    </p>
                    <a
                      href={user ? "/courses" : "/register"}
                      className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--sidebar-highlight))] px-6 py-3 text-sm font-bold text-[hsl(var(--sidebar-background))] transition hover:brightness-110"
                      style={{
                        boxShadow: "0 8px 32px hsl(var(--sidebar-highlight) / 0.3)",
                      }}
                    >
                      {user ? "Explorar cursos" : "Criar conta grátis"}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* ───── CTA FINAL ───── */}
      <ScrollReveal>
        <section className="relative border-t border-white/[0.06] py-20 sm:py-28">
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="text-3xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-4xl">
              {user ? "Continue sua jornada" : "Pronto para começar?"}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-[hsl(var(--sidebar-foreground)/0.56)]">
              {user
                ? "Acesse seu painel e continue de onde parou."
                : "Crie sua conta gratuita e comece a aprender hoje. Sem cartão de crédito, sem compromisso."}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={user ? "/app" : "/register"}
                className="hx-hero-btn inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--sidebar-highlight))] px-9 py-4 text-sm font-bold text-[hsl(var(--sidebar-background))] transition hover:brightness-110"
                style={{
                  boxShadow: "0 8px 32px hsl(var(--sidebar-highlight) / 0.35)",
                }}
              >
                {user ? "Ir para o painel" : "Criar conta grátis"}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/courses"
                className="hx-btn-secondary inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-9 py-4 text-sm font-medium text-[hsl(var(--sidebar-foreground))] transition hover:bg-white/[0.08]"
              >
                Ver cursos
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <LandingFooter />
    </div>
  );
}
