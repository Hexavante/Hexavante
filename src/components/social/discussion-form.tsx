"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSquarePlus } from "lucide-react";
import {
  createDiscussionAction,
  type CommunityActionResult,
} from "@/app/actions/community";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import { COMMUNITY_TAGS } from "@/lib/community";
import { cn } from "@/lib/cn";
import { getContentPolicyHint } from "@/lib/profanity-filter";
import { themeUi } from "@/lib/theme-ui";
import { ContentPolicyHint } from "@/components/social/content-policy-hint";

const initialState: CommunityActionResult = { success: false };

type Props = {
  canPost: boolean;
};

function DiscussionFormFields({
  formAction,
  pending,
}: {
  formAction: (payload: FormData) => void;
  pending: boolean;
}) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const titleHint = getContentPolicyHint(title);
  const bodyHint = getContentPolicyHint(body);
  const blocked = Boolean(titleHint || bodyHint);

  function toggleTag(tag: string) {
    setSelectedTags((current) => {
      if (current.includes(tag)) return current.filter((value) => value !== tag);
      if (current.length >= 3) return current;
      return [...current, tag];
    });
  }

  return (
    <form action={formAction} className="space-y-4">
      {selectedTags.map((tag) => (
        <input key={tag} type="hidden" name="tags" value={tag} />
      ))}

      <div>
        <Label htmlFor="discussion-title">Título</Label>
        <Input
          id="discussion-title"
          name="title"
          required
          maxLength={120}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Ex.: Dúvida sobre função quadrática"
          className="mt-1.5"
        />
        <ContentPolicyHint text={title} className="mt-2" />
      </div>

      <div>
        <Label htmlFor="discussion-body">Conteúdo</Label>
        <Textarea
          id="discussion-body"
          name="body"
          required
          maxLength={4000}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Descreva sua dúvida ou ideia..."
          className="mt-1.5 min-h-[120px]"
        />
        <ContentPolicyHint text={body} className="mt-2" />
      </div>

      <div>
        <Label>Tags (até 3)</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {COMMUNITY_TAGS.map((tag) => {
            const active = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-semibold transition hx-filter-pill",
                  active ? themeUi.filterActive : themeUi.filterInactive,
                )}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      <Button type="submit" disabled={pending || blocked} className="min-h-11">
        <MessageSquarePlus className="h-4 w-4" />
        {pending ? "Publicando..." : "Publicar discussão"}
      </Button>
    </form>
  );
}

export function DiscussionForm({ canPost }: Props) {
  const [state, formAction, pending] = useActionState(createDiscussionAction, initialState);
  const [formKey, setFormKey] = useState(0);
  const { toast } = useToast();
  const router = useRouter();
  const handledSuccessRef = useRef(false);

  useEffect(() => {
    if (state.success && !handledSuccessRef.current) {
      handledSuccessRef.current = true;
      toast("Publicação criada!", "success");
      router.refresh();
      queueMicrotask(() => setFormKey((key) => key + 1));
    }
    if (!state.success) {
      handledSuccessRef.current = false;
    }
    if (state.error) {
      toast(state.error, "error");
    }
  }, [state, toast, router]);

  if (!canPost) {
    return null;
  }

  return (
    <div className="rounded-xl border border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-accent)/0.35)] p-5">
      <h3 className="mb-4 text-sm font-bold hx-text-title">Nova discussão</h3>
      <DiscussionFormFields key={formKey} formAction={formAction} pending={pending} />
    </div>
  );
}
