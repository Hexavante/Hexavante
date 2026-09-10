"use client";

import { useActionState } from "react";
import { Video, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { PageShell } from "@/components/ui/page-shell";
import { Button } from "@/components/ui/button";
import { createTutorialAction, type ActionResult } from "@/app/actions/tutorial";
import { VideoUploadInput } from "@/components/tutorials/video-upload-input";
import { SuccessPopup } from "@/components/ui/success-popup";

const initialState: ActionResult = { success: false };

type Category = { id: string; name: string };

export default function NewTutorialForm({ categories }: { categories: Category[] }) {
  const [state, formAction, isPending] = useActionState(createTutorialAction, initialState);

  return (
    <PageShell>
      <SuccessPopup show={state.success} message="Tutorial criado com sucesso!" />

      <Link
        href="/instructor/tutorials"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Link>

      <PageHeader
        badge="Novo tutorial"
        icon={Video}
        title="Criar Tutorial"
        description="Adicione um vídeo tutorial para a comunidade."
      />

      <form action={formAction} className="mx-auto max-w-2xl space-y-5">
        <div>
          <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-slate-300">
            Título *
          </label>
          <input
            id="title"
            name="title"
            required
            minLength={3}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30"
            placeholder="Ex: Como usar Promise.all"
          />
        </div>

        <div>
          <label htmlFor="categoryId" className="mb-1.5 block text-sm font-medium text-slate-300">
            Categoria
          </label>
          <select
            id="categoryId"
            name="categoryId"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-400/50"
          >
            <option value="">Nenhuma</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-slate-300">
            Descrição
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30"
            placeholder="Descreva o conteúdo do tutorial..."
          />
        </div>

        <VideoUploadInput />

        <div>
          <label htmlFor="duration" className="mb-1.5 block text-sm font-medium text-slate-300">
            Duração (segundos)
          </label>
          <input
            id="duration"
            name="duration"
            type="number"
            min={1}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400/50"
            placeholder="Ex: 300"
          />
        </div>

        <div>
          <label htmlFor="tags" className="mb-1.5 block text-sm font-medium text-slate-300">
            Tags (separadas por vírgula)
          </label>
          <input
            id="tags"
            name="tags"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400/50"
            placeholder="javascript, promise, async"
          />
        </div>

        <div className="flex items-center gap-3">
          <input type="hidden" name="isPublished" value="false" />
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              name="isPublished"
              value="true"
              className="h-4 w-4 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-400/30"
            />
            Publicar imediatamente
          </label>
        </div>

        {state.error && (
          <p className="text-sm text-red-400">{state.error}</p>
        )}

        <Button type="submit" disabled={isPending}>
          {isPending ? "Criando..." : "Criar tutorial"}
        </Button>
      </form>
    </PageShell>
  );
}
