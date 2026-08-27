import { PageTransition } from "@/components/ui/page-transition";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-w-0">
      <PageTransition>{children}</PageTransition>
    </div>
  );
}
