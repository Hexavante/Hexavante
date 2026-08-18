export const dynamic = 'force-dynamic';

import Link from "next/link";
import { ContentPublishToggle } from "@/components/moderation/content-publish-toggle";
import { DeleteContentButton } from "@/components/courses/delete-content-button";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  deleteCommunityPostFormAction,
  deleteCourseModeratorAction,
  deleteExamModeratorAction,
} from "@/app/actions/moderation";
import { COURSE_STATUS_LABELS, isCoursePublished } from "@/lib/course-status";
import { COMMUNITY_REPORT_REASON_LABELS } from "@/lib/community-reports";
import { prisma } from "@/lib/prisma";
import { listPendingCommunityReports } from "@/services/community-report.service";
import { listRecentContentPolicyViolations } from "@/services/content-policy.service";

const CONTEXT_LABELS: Record<string, string> = {
  REGISTER: "Cadastro",
  PROFILE: "Perfil",
  DIRECT_MESSAGE: "Mensagem",
  COMMUNITY_POST: "Post",
  COMMUNITY_COMMENT: "Comentário",
  COMMUNITY_TAG: "Tag",
  LIVE_CHAT: "Chat ao vivo",
  LIVE_ROOM: "Sala ao vivo",
  INSTRUCTOR_APPLICATION: "Instrutor",
  COURSE: "Curso",
};

export default async function ModerationContentPage() {
  const [courses, exams, pendingCourses, recentDiscussions, pendingEssays, contentViolations, pendingReports] =
    await Promise.all([
    prisma.course.findMany({
      take: 15,
      orderBy: { updatedAt: "desc" },
      select: { id: true, title: true, slug: true, status: true },
    }),
    prisma.exam.findMany({
      take: 15,
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, slug: true, isPublished: true },
    }),
    prisma.course.count({ where: { status: "PENDING_REVIEW" } }),
    prisma.socialActivity.findMany({
      where: { type: "DISCUSSION" },
      orderBy: { createdAt: "desc" },
      take: 8,
      select: {
        id: true,
        createdAt: true,
        metadata: true,
        user: { select: { username: true, fullName: true } },
        _count: { select: { comments: true } },
      },
    }),
    prisma.examAnswer.count({
      where: { essayStatus: "PENDING" },
    }),
    listRecentContentPolicyViolations(12),
    listPendingCommunityReports(8),
  ]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3">
          <p className="text-2xl font-bold text-amber-100">{pendingCourses}</p>
          <p className="text-sm text-amber-200/90">Cursos aguardando revisão</p>
        </div>
        <div className="rounded-xl border border-violet-400/20 bg-violet-400/10 px-4 py-3">
          <p className="text-2xl font-bold text-violet-100">{pendingEssays}</p>
          <p className="text-sm text-violet-200/90">Dissertativas pendentes</p>
        </div>
        <div className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3">
          <p className="text-2xl font-bold text-rose-100">{pendingReports.length}</p>
          <p className="text-sm text-rose-200/90">Denúncias pendentes</p>
        </div>
        <Link
          href="/moderacao/simulados/correcoes"
          className="rounded-xl border border-[hsl(var(--sidebar-highlight)/0.22)] bg-[hsl(var(--sidebar-highlight)/0.1)] px-4 py-3 transition hover:border-[hsl(var(--sidebar-highlight)/0.4)]"
        >
          <p className="text-sm font-semibold text-[hsl(var(--sidebar-foreground)/0.92)]">Corrigir dissertativas →</p>
          <p className="mt-1 text-xs hx-accent-text-muted">Fila de correção manual</p>
        </Link>
      </div>

      {pendingReports.length > 0 && (
        <section className="rounded-xl border border-rose-400/20 bg-rose-400/5 p-5">
          <h2 className="text-lg font-bold text-white">Denúncias da comunidade</h2>
          <p className="mt-1 text-sm text-slate-400">
            Publicações reportadas por usuários aguardando revisão.
          </p>
          <ul className="mt-4 space-y-2">
            {pendingReports.map((report) => {
              const metadata =
                report.activity.metadata &&
                typeof report.activity.metadata === "object" &&
                !Array.isArray(report.activity.metadata)
                  ? (report.activity.metadata as { title?: string })
                  : null;

              return (
                <li
                  key={report.id}
                  className="flex flex-col gap-2 rounded-lg border border-[hsl(var(--sidebar-border))] bg-[var(--surface)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-white">
                      {metadata?.title ?? "Publicação na comunidade"}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {COMMUNITY_REPORT_REASON_LABELS[report.reason]} · denunciado por @
                      {report.reporter.username} · autor @{report.activity.user.username}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/social?post=${report.activity.id}`}
                      className="text-sm font-semibold hx-accent-link hover:underline"
                    >
                      Revisar
                    </Link>
                    <DeleteContentButton
                      action={deleteCommunityPostFormAction.bind(null, report.activity.id)}
                      label="Remover"
                      confirmMessage="Remover a publicação denunciada?"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Cursos</h2>
            <Link href="/moderacao/cursos" className="text-sm hx-accent-link hover:underline">
              Fila de pendentes →
            </Link>
          </div>
          <ul className="space-y-2">
            {courses.map((course) => (
              <li
                key={course.id}
                className="flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="font-medium text-white">{course.title}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <StatusBadge
                      status={course.status}
                      label={COURSE_STATUS_LABELS[course.status]}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <ContentPublishToggle
                    kind="course"
                    id={course.id}
                    isPublished={isCoursePublished(course.status)}
                  />
                  <Link
                    href={`/moderacao/cursos/${course.id}`}
                    className="text-sm font-semibold hx-accent-link hover:underline"
                  >
                    {course.status === "PENDING_REVIEW" ? "Revisar" : "Gerenciar"}
                  </Link>
                  {course.status === "APPROVED" && (
                    <Link
                      href={`/courses/${course.slug}`}
                      className="text-sm text-slate-400 hover:text-slate-200"
                    >
                      Ver
                    </Link>
                  )}
                  <DeleteContentButton
                    action={deleteCourseModeratorAction.bind(null, course.id)}
                    label="Excluir"
                    confirmMessage={`Excluir o curso "${course.title}" permanentemente? Matrículas, módulos e certificados serão removidos.`}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Simulados</h2>
            <Link href="/moderacao/simulados" className="text-sm hx-accent-link hover:underline">
              Gerenciar todos →
            </Link>
          </div>
          <ul className="space-y-2">
            {exams.map((exam) => (
              <li
                key={exam.id}
                className="flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="font-medium text-white">{exam.title}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {exam.isPublished ? "Publicado" : "Rascunho"}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <ContentPublishToggle kind="exam" id={exam.id} isPublished={exam.isPublished} />
                  <Link
                    href={`/moderacao/simulados/${exam.id}/edit`}
                    className="text-sm font-semibold hx-accent-link hover:underline"
                  >
                    Editar
                  </Link>
                  {exam.isPublished && (
                    <Link
                      href={`/simulados/${exam.slug}`}
                      className="text-sm text-slate-400 hover:text-slate-200"
                    >
                      Ver
                    </Link>
                  )}
                  <DeleteContentButton
                    action={deleteExamModeratorAction.bind(null, exam.id)}
                    label="Excluir"
                    confirmMessage={`Excluir o simulado "${exam.title}" permanentemente? Tentativas e questões serão removidas.`}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="hx-panel">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Comunidade — publicações recentes</h2>
            <p className="mt-1 text-sm text-slate-400">
              Revise discussões reportadas pela comunidade ou conteúdo sensível.
            </p>
          </div>
          <Link href="/social" className="text-sm hx-accent-link hover:underline">
            Abrir comunidade →
          </Link>
        </div>

        {recentDiscussions.length === 0 ? (
          <p className="text-sm text-slate-500">Nenhuma publicação recente.</p>
        ) : (
          <ul className="space-y-2">
            {recentDiscussions.map((post) => {
              const metadata =
                post.metadata && typeof post.metadata === "object" && !Array.isArray(post.metadata)
                  ? (post.metadata as { title?: string })
                  : null;

              return (
                <li
                  key={post.id}
                  className="flex flex-col gap-2 rounded-lg border border-[hsl(var(--sidebar-border))] bg-[var(--surface)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-white">
                      {metadata?.title ?? "Publicação na comunidade"}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {post.user.fullName} (@{post.user.username}) · {post._count.comments}{" "}
                      respostas
                    </p>
                  </div>
                  <Link
                    href={`/social?post=${post.id}`}
                    className="text-sm font-semibold hx-accent-link hover:underline"
                  >
                    Revisar
                  </Link>
                  <DeleteContentButton
                    action={deleteCommunityPostFormAction.bind(null, post.id)}
                    label="Excluir"
                    confirmMessage="Remover esta publicação permanentemente?"
                  />
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="rounded-xl border border-rose-400/20 bg-rose-400/5 p-5">
        <h2 className="text-lg font-bold text-white">Filtro de conteúdo — tentativas bloqueadas</h2>
        <p className="mt-1 text-sm text-slate-400">
          Registro recente de linguagem ofensiva detectada em cadastro, perfil, mensagens e posts.
        </p>

        {contentViolations.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">Nenhuma tentativa registrada recentemente.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {contentViolations.map((violation) => (
              <li
                key={violation.id}
                className="rounded-lg border border-[hsl(var(--sidebar-border))] bg-[var(--surface)] px-4 py-3 text-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold text-rose-200">
                    {CONTEXT_LABELS[violation.context] ?? violation.context}
                    {" · "}
                    {violation.field}
                  </span>
                  <span className="text-xs text-slate-500">
                    {new Date(violation.createdAt).toLocaleString("pt-BR")}
                  </span>
                </div>
                <p className="mt-2 text-slate-300">
                  {violation.user ? (
                    <>
                      @{violation.user.username} — {violation.user.fullName}
                    </>
                  ) : (
                    violation.identifier ?? "Usuário não identificado"
                  )}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Termo: <span className="text-slate-400">{violation.matchedTerm}</span> · Prévia:{" "}
                  {violation.preview}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
