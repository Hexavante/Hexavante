import Link from "next/link";
import { cn } from "@/lib/cn";

const tabs = [
  { href: "/moderacao", label: "Visão Geral", exact: true },
  { href: "/moderacao/usuarios", label: "Usuários" },
  { href: "/moderacao/conteudo", label: "Conteúdo" },
  { href: "/moderacao/logs", label: "Logs" },
  { href: "/moderacao/terminal", label: "Terminal" },
  { href: "/moderacao/configuracoes", label: "Configurações" },
];

type Props = {
  pathname: string;
};

export function ModerationNav({ pathname }: Props) {
  return (
    <nav className="hx-segment-nav-inline mb-6">
      {tabs.map((tab) => {
        const active = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "hx-segment-link",
              active ? "hx-segment-link-active" : "hx-segment-link-inactive",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
