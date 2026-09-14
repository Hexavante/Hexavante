import { Search, Video } from "lucide-react";
import { TutorialCard } from "@/components/tutorials/tutorial-card";
import { TutorialFilters } from "@/components/tutorials/tutorial-filters";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { PageShell } from "@/components/ui/page-shell";
import { listCategories } from "@/services/course.service";
import { searchPublishedTutorials } from "@/services/tutorial.service";

type Props = {
  searchParams: Promise<{
    category?: string;
    q?: string;
    sort?: string;
  }>;
};

export default async function TutorialsPage({ searchParams }: Props) {
  const params = await searchParams;
  const sort = params.sort === "popular" ? "popular" : "recent";

  const [tutorials, categories] = await Promise.all([
    searchPublishedTutorials({
      categoryId: params.category,
      q: params.q,
      sort,
    }),
    listCategories(),
  ]);

  return (
    <PageShell>
      <div className="anim-enter anim-d1">
        <PageHeader
          badge="Catálogo"
          icon={Video}
          title="Tutoriais"
          description="Vídeos curtos e diretos para aprender na prática."
          action={
            <Card padding="sm" className="text-sm text-slate-300">
              <span className="font-semibold text-white">{tutorials.length}</span> tutoriais encontrados
            </Card>
          }
        />
      </div>

      <div className="anim-enter anim-d2">
        <TutorialFilters
          categories={categories}
          current={{
            category: params.category,
            q: params.q,
            sort,
          }}
        />
      </div>

      {tutorials.length === 0 ? (
        <div className="anim-enter-fade anim-d3">
          <EmptyState
            icon={Search}
            title="Nenhum tutorial encontrado."
            description="Tente outros termos de busca ou remova alguns filtros."
          />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tutorials.map((tut, i) => (
            <div key={tut.id} className="anim-enter-scale" style={{ animationDelay: `${0.1 + i * 0.06}s` }}>
              <TutorialCard
                slug={tut.slug}
                title={tut.title}
                description={tut.description}
                thumbnailUrl={tut.thumbnailUrl}
                categoryName={tut.category?.name}
                authorName={tut.author.fullName}
                authorAvatar={tut.author.avatarUrl}
                duration={tut.duration}
                viewCount={tut.viewCount}
              />
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}
