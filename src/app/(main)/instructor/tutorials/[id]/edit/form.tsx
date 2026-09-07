"use client";

import { useActionState } from "react";
import { Video, ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { PageShell } from "@/components/ui/page-shell";
import { Button } from "@/components/ui/button";
import {
  updateTutorialAction,
  deleteTutorialAction,
  type ActionResult,
} from "@/app/actions/tutorial";
import { VideoUploadInput } from "@/components/tutorials/video-upload-input";

const initialState: ActionResult = { success: false };

type Tutorial = {
  id: string;
  title: string;
  description?: string | null;
  videoUrl?: string | null;
  thumbnailUrl?: string | null;
  duration?: number | null;
  isPublished: boolean;
  categoryId?: string | null;
  tags: string[];
};

type Category = { id: string; name: string };

export default function EditTutorialForm({
  tutorial,
  categories,
}: {
  tutorial: Tutorial;
  categories: Category[];
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    (prev: ActionResult, formData: FormData) =>
      updateTutorialAction(tutorial.id, prev, formData),
    initialState,
  );

  async function handleDelete() {
    if (!confirm("Tem certeza que deseja excluir este tutorial?")) return;
    await deleteTutorialAction(tutorial.id);
    router.push("/instructor/tutorials");
  }

  return (
    <PageShell>
      <Link
        href="/instructor/tutorials"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Link>

      <PageHeader
        badge="Editar tutorial"
        icon={Video}
        title={tutorial.title}
        description="Atualize as informações do tutorial."
        action={
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/20"
          >
            <Trash2 className="h-4 w-4" />
            Excluir
          </button>
        }
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
            defaultValue={tutorial.title}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30"
          />
        </div>

        <div>
          <label htmlFor="categoryId" className="mb-1.5 block text-sm font-medium text-slate-300">
            Categoria
          </label>
          <select
            id="categoryId"
            name="categoryId"
            defaultValue={tutorial.categoryId ?? ""}
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
            defaultValue={tutorial.description ?? ""}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30"
          />
        </div>

        <VideoUploadInput initialUrl={tutorial.videoUrl ?? ""} />

        <div>
          <label htmlFor="duration" className="mb-1.5 block text-sm font-medium text-slate-300">
            Duração (segundos)
          </label>
          <input
            id="duration"
            name="duration"
            type="number"
            min={1}
            defaultValue={tutorial.duration ?? ""}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400/50"
          />
        </div>

        <div>
          <label htmlFor="tags" className="mb-1.5 block text-sm font-medium text-slate-300">
            Tags (separadas por vírgula)
          </label>
          <input
            id="tags"
            name="tags"
            defaultValue={tutorial.tags.join(", ")}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400/50"
          />
        </div>

        <div className="flex items-center gap-3">
          <input type="hidden" name="isPublished" value="false" />
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              name="isPublished"
              value="true"
              defaultChecked={tutorial.isPublished}
              className="h-4 w-4 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-400/30"
            />
            Publicado
          </label>
        </div>

        {state.error && (
          <p className="text-sm text-red-400">{state.error}</p>
        )}
        {state.success && (
          <p className="text-sm text-emerald-400">Tutorial atualizado!</p>
        )}

        <Button type="submit" disabled={isPending}>
          {isPending ? "Salvando..." : "Salvar alterações"}
        </Button>
      </form>
    </PageShell>
  );
}
