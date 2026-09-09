import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BookOpen, Video, Radio, Plus, Settings } from "lucide-react";
import { isInstructor } from "@/lib/permissions";
import { PageHeader } from "@/components/ui/page-header";
import { PageShell } from "@/components/ui/page-shell";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { prisma } from "@/lib/prisma";
import { listInstructorCourses } from "@/services/course.service";
import { listInstructorLiveRooms } from "@/services/live-room.service";
import { Badge } from "@/components/ui/badge";

export default async function GerenciarPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?callbackUrl=/instructor/gerenciar");
  if (!isInstructor(session.user.roles)) redirect("/instructor/apply");

  const [courses, tutorials, rooms] = await Promise.all([
    listInstructorCourses(session.user.id),
    prisma.tutorial.findMany({
      where: { authorId: session.user.id },
      include: { category: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    }),
    listInstructorLiveRooms(session.user.id),
  ]);

  return (
    <PageShell>
      <ScrollReveal>
        <PageHeader
          badge="Instrutor"
          icon={Settings}
          title="Gerenciar conteúdo"
          description="Crie, edite e gerencie todo seu conteúdo em um só lugar."
        />
      </ScrollReveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ScrollReveal delay={0}>
          <SectionCard
            icon={BookOpen}
            title="Cursos"
            count={courses.length}
            color="text-sky-400 bg-sky-400/10 border-sky-400/20"
            href="/instructor/courses"
            createHref="/instructor/courses/new"
            createLabel="Novo curso"
            items={courses.slice(0, 3).map((c) => ({
              id: c.id,
              name: c.title,
              status: c.status === "APPROVED" ? "Publicado" : c.status === "PENDING_REVIEW" ? "Pendente" : "Rascunho",
              statusColor: c.status === "APPROVED" ? "bg-emerald-500/15 text-emerald-400" : c.status === "PENDING_REVIEW" ? "bg-amber-500/15 text-amber-400" : "bg-slate-500/15 text-slate-400",
              href: `/instructor/courses/${c.id}/edit`,
            }))}
          />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <SectionCard
            icon={Video}
            title="Tutoriais"
            count={tutorials.length}
            color="text-cyan-400 bg-cyan-400/10 border-cyan-400/20"
            href="/instructor/tutorials"
            createHref="/instructor/tutorials/new"
            createLabel="Novo tutorial"
            items={tutorials.slice(0, 3).map((t) => ({
              id: t.id,
              name: t.title,
              status: t.isPublished ? "Publicado" : "Rascunho",
              statusColor: t.isPublished ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400",
              href: `/instructor/tutorials/${t.id}/edit`,
            }))}
          />
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <SectionCard
            icon={Radio}
            title="Salas ao vivo"
            count={rooms.length}
            color="text-violet-400 bg-violet-400/10 border-violet-400/20"
            href="/instructor/live-rooms"
            createHref="/instructor/live-rooms/new"
            createLabel="Nova sala"
            items={rooms.slice(0, 3).map((r) => ({
              id: r.id,
              name: r.title,
              status: r.status === "LIVE" ? "Ao vivo" : r.status === "SCHEDULED" ? "Agendada" : "Finalizada",
              statusColor: r.status === "LIVE" ? "bg-red-500/15 text-red-400" : r.status === "SCHEDULED" ? "bg-sky-500/15 text-sky-400" : "bg-slate-500/15 text-slate-400",
              href: `/live-rooms/${r.id}`,
            }))}
          />
        </ScrollReveal>
      </div>
    </PageShell>
  );
}

function SectionCard({
  icon: Icon,
  title,
  count,
  color,
  href,
  createHref,
  createLabel,
  items,
}: {
  icon: typeof BookOpen;
  title: string;
  count: number;
  color: string;
  href: string;
  createHref: string;
  createLabel: string;
  items: { id: string; name: string; status: string; statusColor: string; href: string }[];
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`grid h-10 w-10 place-items-center rounded-lg border ${color}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">{title}</p>
            <p className="text-xs text-slate-400">{count} itens</p>
          </div>
        </div>
      </div>

      {items.length > 0 && (
        <div className="mt-4 space-y-2">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="flex items-center justify-between rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2 transition hover:bg-white/[0.05]"
            >
              <span className="truncate text-xs font-medium text-slate-300">{item.name}</span>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${item.statusColor}`}>
                {item.status}
              </span>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <Link
          href={createHref}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white transition hover:bg-white/[0.08]"
        >
          <Plus className="h-3 w-3" />
          {createLabel}
        </Link>
        <Link
          href={href}
          className="flex flex-1 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-400 transition hover:bg-white/[0.08] hover:text-white"
        >
          Ver todos
        </Link>
      </div>
    </div>
  );
}
