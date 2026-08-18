import { PageTransition } from "@/components/ui/page-transition";
import { getLayoutSessionAndCosmetics } from "@/lib/layout-cosmetics";
import { ImpersonationBanner } from "@/components/layout/impersonation-banner";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const { session } = await getLayoutSessionAndCosmetics();
  const isImpersonating = session?.session?.impersonatedBy;

  return (
    <div className={`w-full min-w-0 ${isImpersonating ? "pt-10" : ""}`}>
      {isImpersonating && session?.user && (
        <ImpersonationBanner
          username={session.user.username ?? ""}
          impersonatorUsername={session.session?.impersonator?.username}
        />
      )}
      <PageTransition>{children}</PageTransition>
    </div>
  );
}
