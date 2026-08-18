"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Flag, MoreHorizontal, Pin, PinOff, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import type { SocialActivityType } from "@prisma/client";
import { reportCommunityPostAction } from "@/app/actions/community";
import {
  deleteCommunityPostAction,
  togglePinCommunityPostAction,
} from "@/app/actions/moderation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import { COMMUNITY_REPORT_REASON_LABELS } from "@/lib/community-reports";
import { cn } from "@/lib/cn";

type Props = {
  activityId: string;
  activityType: SocialActivityType;
  isPinned: boolean;
  canModerate: boolean;
  isOwnPost: boolean;
};

type MenuItem = {
  key: string;
  label: string;
  icon: typeof Flag;
  tone?: "danger";
  onClick: () => void;
};

export function ActivityPostMenu({
  activityId,
  activityType,
  isPinned,
  canModerate,
  isOwnPost,
}: Props) {
  const [open, setOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reason, setReason] = useState<keyof typeof COMMUNITY_REPORT_REASON_LABELS>("SPAM");
  const [details, setDetails] = useState("");
  const [pending, startTransition] = useTransition();
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { toast } = useToast();

  const canPin = canModerate && activityType === "DISCUSSION";
  const showReport = !isOwnPost;
  const hasActions = showReport || canModerate;

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  if (!hasActions) return null;

  const runAction = (action: () => Promise<{ success: boolean; error?: string; message?: string }>) => {
    setOpen(false);
    startTransition(async () => {
      const result = await action();
      if (result.success) {
        toast(result.message ?? "Ação concluída.", "success");
        router.refresh();
      } else {
        toast(result.error ?? "Não foi possível concluir a ação.", "error");
      }
    });
  };

  const items: MenuItem[] = [];

  if (showReport) {
    items.push({
      key: "report",
      label: "Denunciar",
      icon: Flag,
      onClick: () => {
        setOpen(false);
        setReportOpen(true);
      },
    });
  }

  if (canPin) {
    items.push({
      key: "pin",
      label: isPinned ? "Desfixar" : "Fixar",
      icon: isPinned ? PinOff : Pin,
      onClick: () => runAction(() => togglePinCommunityPostAction(activityId)),
    });
  }

  if (canModerate) {
    items.push({
      key: "delete",
      label: "Remover",
      icon: Trash2,
      tone: "danger",
      onClick: () => {
        if (
          !window.confirm(
            "Remover esta publicação permanentemente? Comentários e reações também serão apagados.",
          )
        ) {
          return;
        }
        runAction(() => deleteCommunityPostAction(activityId));
      },
    });
  }

  return (
    <>
      <div ref={menuRef} className="relative shrink-0">
        <button
          type="button"
          aria-label="Opções da publicação"
          aria-expanded={open}
          aria-haspopup="menu"
          disabled={pending}
          onClick={() => setOpen((value) => !value)}
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-full border border-transparent text-slate-400 transition",
            "hover:border-[hsl(var(--sidebar-border))] hover:bg-white/[0.05] hover:text-slate-200",
            open && "border-[hsl(var(--sidebar-border))] bg-white/[0.05] text-slate-200",
          )}
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>

        {open && (
          <div
            role="menu"
            className="absolute right-0 top-full z-20 mt-1 min-w-[11rem] overflow-hidden rounded-xl border border-[hsl(var(--sidebar-border))] bg-[var(--surface)] py-1 shadow-xl shadow-black/30"
          >
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  type="button"
                  role="menuitem"
                  disabled={pending}
                  onClick={item.onClick}
                  className={cn(
                    "flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition",
                    item.tone === "danger"
                      ? "text-rose-300 hover:bg-rose-400/10"
                      : "text-slate-200 hover:bg-white/[0.05]",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <Dialog.Root open={reportOpen} onOpenChange={setReportOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[10002] bg-black/60" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-[10003] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[hsl(var(--sidebar-border))] bg-[var(--surface)] p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Dialog.Title className="text-lg font-bold text-white">Denunciar publicação</Dialog.Title>
                <Dialog.Description className="mt-1 text-sm text-slate-400">
                  Nossa equipe de moderação vai analisar o conteúdo reportado.
                </Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="rounded-full p-1 text-slate-400 transition hover:bg-white/[0.06] hover:text-slate-200"
                  aria-label="Fechar"
                >
                  <X className="h-4 w-4" />
                </button>
              </Dialog.Close>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <Label htmlFor={`report-reason-${activityId}`}>Motivo</Label>
                <NativeSelect
                  id={`report-reason-${activityId}`}
                  value={reason}
                  onChange={(event) =>
                    setReason(event.target.value as keyof typeof COMMUNITY_REPORT_REASON_LABELS)
                  }
                >
                  {Object.entries(COMMUNITY_REPORT_REASON_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </NativeSelect>
              </div>

              <div>
                <Label htmlFor={`report-details-${activityId}`}>Detalhes (opcional)</Label>
                <Textarea
                  id={`report-details-${activityId}`}
                  value={details}
                  onChange={(event) => setDetails(event.target.value)}
                  maxLength={500}
                  rows={4}
                  placeholder="Descreva o problema, se quiser."
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Dialog.Close asChild>
                <Button type="button" variant="outline" disabled={pending}>
                  Cancelar
                </Button>
              </Dialog.Close>
              <Button
                type="button"
                disabled={pending}
                onClick={() => {
                  startTransition(async () => {
                    const result = await reportCommunityPostAction(activityId, reason, details);
                    if (result.success) {
                      toast("Denúncia enviada. Obrigado por ajudar a comunidade.", "success");
                      setReportOpen(false);
                      setDetails("");
                      setReason("SPAM");
                    } else {
                      toast(result.error ?? "Não foi possível enviar a denúncia.", "error");
                    }
                  });
                }}
              >
                {pending ? "Enviando..." : "Enviar denúncia"}
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
