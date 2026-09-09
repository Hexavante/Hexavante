import { BookOpen, Search } from "lucide-react";
import { CourseCard } from "@/components/courses/course-card";
import { CourseFilters } from "@/components/courses/course-filters";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { PageShell } from "@/components/ui/page-shell";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { listCategories, searchApprovedCourses } from "@/services/course.service";

type Props = {
  searchParams: Promise<{
    category?: string;
    level?: string;
    q?: string;
    sort?: string;
  }>;
};

export default async function CoursesPage({ searchParams }: Props) {
  const params = await searchParams;
  const level =
    params.level === "BEGINNER" || params.level === "INTERMEDIATE" || params.level === "ADVANCED"
      ? params.level
      : undefined;
  const sort = params.sort === "popular" ? "popular" : "recent";

  const [courses, categories] = await Promise.all([
    searchApprovedCourses({
      categoryId: params.category,
      level,
      q: params.q,
      sort,
    }),
    listCategories(),
  ]);

  return (
    <PageShell>
      <ScrollReveal>
        <PageHeader
          badge="Catálogo"
          icon={BookOpen}
          title="Cursos"
          description="Escolha uma trilha, acompanhe módulos e avance no seu ritmo."
          action={
            <Card padding="sm" className="text-sm text-slate-300">
              <span className="font-semibold text-white">{courses.length}</span> cursos encontrados
            </Card>
          }
        />
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <CourseFilters
          categories={categories}
          current={{
            category: params.category,
            level: params.level,
            q: params.q,
            sort,
          }}
        />
      </ScrollReveal>

      {courses.length === 0 ? (
        <ScrollReveal delay={200}>
          <EmptyState
            icon={Search}
            title="Nenhum curso encontrado."
            description="Tente outros termos de busca ou remova alguns filtros."
          />
        </ScrollReveal>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, i) => (
            <ScrollReveal key={course.id} delay={Math.min(i * 50, 400)}>
              <CourseCard
                slug={course.slug}
                title={course.title}
                shortDescription={course.shortDescription}
                thumbnailUrl={course.thumbnailUrl}
                coverImage={course.coverImage}
                categoryName={course.category.name}
                moduleCount={course._count.modules}
                enrollmentCount={course._count.enrollments}
                level={course.level}
                estimatedHours={course.estimatedHours}
              />
            </ScrollReveal>
          ))}
        </div>
      )}
    </PageShell>
  );
}
