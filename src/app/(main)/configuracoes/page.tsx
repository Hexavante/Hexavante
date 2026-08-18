import Link from "next/link";
import { redirect } from "next/navigation";
import { Bell, Lock, Palette, Settings, UserRound } from "lucide-react";
import { auth } from "@/auth";
import { PageHeader } from "@/components/ui/page-header";
import { PageShell } from "@/components/ui/page-shell";

export default async function ConfiguracoesPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?callbackUrl=/configuracoes");

  const items = [
    {
      href: "/inventario",
      icon: Palette,
      title: "Inventário",
      description: "Cosméticos, boosters, passes e pacotes de revisão que você possui.",
    },
    {
      href: "/configuracoes/perfil",
      icon: UserRound,
      title: "Editar perfil",
      description: "Nome, bio, foto e visibilidade do perfil.",
    },
    {
      href: "/perfil",
      icon: Settings,
      title: "Meu perfil público",
      description: "Veja como outros enxergam seu perfil.",
    },
    {
      href: "/configuracoes/notificacoes",
      icon: Bell,
      title: "Notificações",
      description: "Escolha quais alertas receber sobre cursos, mensagens e progresso.",
    },
    {
      href: "#",
      icon: Lock,
      title: "Privacidade",
      description: "Controle quem vê suas atividades (em breve).",
      disabled: true,
    },
  ];

  return (
    <PageShell size="md">
      <PageHeader
        badge="Conta"
        icon={Settings}
        title="Configurações"
        description="Gerencie sua conta e preferências."
      />

      <div className="mt-6 grid gap-3">
        {items.map((item) => {
          const Icon = item.icon;
          const content = (
            <div className="hx-list-item flex items-start gap-4 rounded-xl p-4">
              <span className="hx-icon-box">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-sm text-slate-400">{item.description}</p>
              </div>
            </div>
          );

          if (item.disabled) {
            return (
              <div key={item.title} className="opacity-60">
                {content}
              </div>
            );
          }

          return (
            <Link key={item.href} href={item.href}>
              {content}
            </Link>
          );
        })}
      </div>
    </PageShell>
  );
}
