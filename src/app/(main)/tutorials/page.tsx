import { Video, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { PageShell } from "@/components/ui/page-shell";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
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
      <ScrollReveal>
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
      </ScrollReveal>

      {categories.length > 0 && (
        <ScrollReveal delay={100}>
          <div className="mb-4 flex flex-wrap gap-2">
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
        </ScrollReveal>
      )}

      {tutorials.length === 0 ? (
        <ScrollReveal delay={200}>
          <EmptyState
            icon={Video}
            title="Nenhum tutorial encontrado."
            description="Em breve teremos tutoriais disponíveis."
          />
        </ScrollReveal>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tutorials.map((tutorial, i) => (
            <ScrollReveal key={tutorial.id} delay={Math.min(i * 50, 400)}>
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
            </ScrollReveal>
          ))}
        </div>
      )}
    </PageShell>
  );
}
