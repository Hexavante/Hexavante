"use client";

import { ShieldCheck } from "lucide-react";

export function CommunityGuidelinesNotice() {
  return (
    <div className="hx-panel !p-4">
      <div className="flex gap-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 hx-accent-text" />
        <div>
          <p className="text-sm font-semibold hx-text-body">Comunidade educacional segura</p>
          <p className="mt-1 text-xs leading-6 hx-text-muted">
            Linguagem ofensiva, assédio, ódio, ameaças e conteúdo sexual são bloqueados automaticamente
            — inclusive com leetspeak, unicode disfarçado, mensagens fragmentadas e texto invertido.
            Mantenha o foco em estudos e respeito mútuo.
          </p>
        </div>
      </div>
    </div>
  );
}
