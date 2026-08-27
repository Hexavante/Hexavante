import { AppLink } from "@/components/ui/app-link";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { loginAction } from "@/app/actions/auth";
import { getSafeCallbackUrl } from "@/lib/auth-routes";

type Props = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const { callbackUrl } = await searchParams;
  const safeCallback = getSafeCallbackUrl(callbackUrl);

  return (
    <AuthPageShell>
      <div className="w-full">
        <AuthForm
          embedded
          title="ENTRAR"
          subtitle="Acesse sua conta Hexavante"
          submitLabel="Entrar"
          action={loginAction}
          callbackUrl={safeCallback}
          formKind="login"
          fields={[
            { name: "email", label: "E-mail", type: "email" },
            { name: "password", label: "Senha", type: "password" },
          ]}
          footer={
            <p>
              Não tem conta?{" "}
              <AppLink
                href={
                  safeCallback === "/"
                    ? "/register"
                    : `/register?callbackUrl=${encodeURIComponent(safeCallback)}`
                }
              >
                Cadastre-se
              </AppLink>
            </p>
          }
        />
      </div>
    </AuthPageShell>
  );
}
