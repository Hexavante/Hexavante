import { redirect } from "next/navigation";
import { MonitorSmartphone } from "lucide-react";
import { auth } from "@/auth";
import { PageHeader } from "@/components/ui/page-header";
import { PageShell } from "@/components/ui/page-shell";
import { EmptyState } from "@/components/ui/empty-state";
import { DeviceRow } from "@/components/settings/device-row";
import { getMyDevices } from "@/app/actions/security";

export default async function DispositivosPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?callbackUrl=/configuracoes/dispositivos");

  const { devices } = await getMyDevices();

  return (
    <PageShell size="md">
      <div className="anim-enter anim-d1">
        <PageHeader
          badge="Segurança"
          icon={MonitorSmartphone}
          title="Dispositivos conectados"
          description="Veja onde sua conta está conectada. Desconecte o que não reconhecer."
        />
      </div>

      {devices.length === 0 ? (
        <div className="anim-enter-fade anim-d2">
          <EmptyState
            icon={MonitorSmartphone}
            title="Nenhum dispositivo registrado."
            description="Novos acessos aparecem aqui após a confirmação por e-mail."
          />
        </div>
      ) : (
        <div className="space-y-3">
          {devices.map((device, i) => (
            <div key={device.id} className="anim-enter-fade" style={{ animationDelay: `${0.05 + i * 0.06}s` }}>
              <DeviceRow device={device} isCurrent={i === 0} />
            </div>
          ))}
          <p className="anim-enter-fade pt-2 text-xs text-slate-500">
            O dispositivo mais recente aparece como atual. Ao desconectar um dispositivo, as
            sessões dele são encerradas.
          </p>
        </div>
      )}
    </PageShell>
  );
}
