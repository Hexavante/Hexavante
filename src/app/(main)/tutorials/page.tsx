import { Video, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { PageShell } from "@/components/ui/page-shell";
import { listTutorials } from "@/services/tutorial.service";
import { TutorialCard } from "@/components/tutorials/tutorial-card";
import { listCategories } from "@/services/course.service";

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function TutorialsPage({ searchParams }: Props) {
  const params = await searchParams;

  const [tutorials, categories] = await Promise.all([
    listTutorials({ categoryId: params.category, publishedOnly: true }),
    listCategories(),
  ]);

  return (
    <PageShell>
      <div className="anim-enter anim-d1">
        <PageHeader
          badge="Aprenda"
          icon={Video}
          title="Tutoriais"
          description="Vídeos curtos e diretos para aprender na prática."
          action={
            <Card padding="sm" className="text-sm text-slate-300">
              <span className="font-semibold text-white">{tutorials.length}</span> tutoriais
            </Card>
          }
        />
      </div>

      {categories.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2 anim-enter-fade anim-d2">
          <a
            href="/tutorials"
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              !params.category
                ? "bg-cyan-500/20 text-cyan-300"
                : "bg-white/5 text-slate-400 hover:bg-white/10"
            }`}
          >
            Todos
          </a>
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/tutorials?category=${cat.id}`}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                params.category === cat.id
                  ? "bg-cyan-500/20 text-cyan-300"
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              {cat.name}
            </a>
          ))}
        </div>
      )}

      {tutorials.length === 0 ? (
        <div className="anim-enter-fade anim-d3">
          <EmptyState
            icon={Video}
            title="Nenhum tutorial encontrado."
            description="Em breve teremos tutoriais disponíveis."
          />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tutorials.map((tutorial, i) => (
            <div key={tutorial.id} className="anim-enter-scale" style={{ animationDelay: `${0.12 + i * 0.06}s` }}>
              <TutorialCard
                slug={tutorial.slug}
                title={tutorial.title}
                description={tutorial.description}
                thumbnailUrl={tutorial.thumbnailUrl}
                categoryName={tutorial.category?.name}
                authorName={tutorial.author.fullName}
                authorAvatar={tutorial.author.avatarUrl}
                duration={tutorial.duration}
                viewCount={tutorial.viewCount}
              />
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}
