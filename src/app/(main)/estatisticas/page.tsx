import { redirect } from "next/navigation";
import { BarChart3 } from "lucide-react";
import { auth } from "@/auth";
import { PersonalStatsView } from "@/components/stats/personal-stats-view";
import { PageHeader } from "@/components/ui/page-header";
import { PageShell } from "@/components/ui/page-shell";
import { getPersonalStats } from "@/services/personal-stats.service";

export default async function StatisticsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?callbackUrl=/estatisticas");

  const stats = await getPersonalStats(session.user.id);

  return (
    <PageShell>
      <PageHeader
        badge="Progresso"
        icon={BarChart3}
        title="Estatísticas"
        description="Visão completa do seu desempenho: XP, cursos, simulados, sequência e conquistas."
      />

      <PersonalStatsView stats={stats} variant="full" showHeader={false} />
    </PageShell>
  );
}
