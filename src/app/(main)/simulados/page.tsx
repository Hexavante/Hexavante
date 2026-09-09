import { auth } from "@/auth";
import { BarChart3, Search, Target } from "lucide-react";
import { ExamCard } from "@/components/exams/exam-card";
import { ExamFilters } from "@/components/exams/exam-filters";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { LinkButton } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { PageShell } from "@/components/ui/page-shell";
import { getUserFinishedAttemptCounts, searchPublishedExams } from "@/services/exam.service";

type Props = {
  searchParams: Promise<{ tipo?: string; q?: string; sort?: string }>;
};

export default async function SimuladosPage({ searchParams }: Props) {
  const params = await searchParams;
  const sort = params.sort === "popular" ? "popular" : "recent";
  const session = await auth();

  const exams = await searchPublishedExams(
    {
      examType: params.tipo,
      q: params.q,
      sort,
    },
    session?.user?.id,
  );

  const attemptCounts = session?.user?.id
    ? await getUserFinishedAttemptCounts(session.user.id)
    : {};

  return (
    <PageShell>
      <div className="anim-enter anim-d1">
        <PageHeader
          badge="Prática"
          icon={Target}
          title="Simulados"
          description="Resolva questões objetivas e acompanhe sua evolução por tentativa."
          action={
            <LinkButton
              href="/simulados/historico"
              variant="outline"
              aria-label="Ver histórico de simulados"
            >
              <BarChart3 className="h-4 w-4 text-teal-300" />
              Histórico
            </LinkButton>
          }
        />
      </div>

      <div className="anim-enter anim-d2">
        <ExamFilters
          current={{
            tipo: params.tipo,
            q: params.q,
            sort,
          }}
        />
      </div>

      <div className="anim-enter-fade anim-d3">
        <Card padding="sm" className="mb-6 text-sm text-slate-300">
          <span className="font-semibold text-white">{exams.length}</span> simulados encontrados
        </Card>
      </div>

      {exams.length === 0 ? (
        <div className="anim-enter-fade anim-d4">
          <EmptyState
            icon={Search}
            title="Nenhum simulado encontrado."
            description="Tente outros termos de busca ou remova alguns filtros."
          />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam, i) => (
            <div key={exam.id} className="anim-enter-scale" style={{ animationDelay: `${0.15 + i * 0.06}s` }}>
              <ExamCard
                slug={exam.slug}
                title={exam.title}
                description={exam.description}
                coverImage={exam.coverImage}
                examType={exam.examType}
                questionCount={exam._count.questions}
                timeLimit={exam.timeLimit}
                userAttemptCount={attemptCounts[exam.id]}
                isPremiumOnly={exam.isPremiumOnly}
              />
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}
