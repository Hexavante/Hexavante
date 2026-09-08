import { redirect } from "next/navigation";

export default function ModeracaoLayout({ children }: { children: React.ReactNode }) {
  redirect("/admin");
}
