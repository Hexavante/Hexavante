import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hexavante — Aprenda, pratique e evolua",
  description:
    "Plataforma educacional com cursos, simulados ao vivo, ranking e gamificação para estudantes do ensino técnico, universitários de TI e candidatos ao ENEM.",
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
