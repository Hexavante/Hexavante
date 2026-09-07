"use server";

import { auth } from "@/auth";
import { isInstructor } from "@/lib/permissions";
import {
  createTutorial,
  updateTutorial,
  deleteTutorial,
  setTutorialTags,
} from "@/services/tutorial.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ActionResult = { success: boolean; error?: string };

async function requireInstructor() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Faça login para continuar.");
  }
  if (!isInstructor(session.user.roles)) {
    throw new Error("Você precisa do papel INSTRUCTOR para gerenciar tutoriais.");
  }
  return session.user;
}

export async function createTutorialAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  let user;
  try {
    user = await requireInstructor();
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Sem permissão",
    };
  }

  try {
    const title = formData.get("title")?.toString().trim();
    if (!title || title.length < 3) {
      return { success: false, error: "Título muito curto" };
    }

    const tutorial = await createTutorial(user.id, {
      title,
      categoryId: formData.get("categoryId")?.toString().trim() || undefined,
      description: formData.get("description")?.toString() || undefined,
      videoUrl: formData.get("videoUrl")?.toString() || undefined,
      thumbnailUrl: formData.get("thumbnailUrl")?.toString() || undefined,
      duration: formData.get("duration") ? Number(formData.get("duration")) : undefined,
      isPublished: formData.get("isPublished") === "true",
    });

    const tagNames = (formData.get("tags")?.toString() ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (tagNames.length > 0) await setTutorialTags(tutorial.id, tagNames);

    revalidatePath("/tutorials");
    revalidatePath("/instructor/tutorials");
    redirect(`/instructor/tutorials/${tutorial.id}/edit`);
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro ao criar tutorial",
    };
  }
}

export async function updateTutorialAction(
  tutorialId: string,
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  let user;
  try {
    user = await requireInstructor();
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Sem permissão",
    };
  }

  try {
    await updateTutorial(tutorialId, user.id, {
      title: formData.get("title")?.toString().trim() || undefined,
      categoryId: formData.get("categoryId")?.toString().trim() || undefined,
      description: formData.get("description")?.toString() || undefined,
      videoUrl: formData.get("videoUrl")?.toString() || undefined,
      thumbnailUrl: formData.get("thumbnailUrl")?.toString() || undefined,
      duration: formData.get("duration") ? Number(formData.get("duration")) : undefined,
      isPublished: formData.get("isPublished") === "true",
    });

    const tagNames = (formData.get("tags")?.toString() ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    await setTutorialTags(tutorialId, tagNames);

    revalidatePath("/tutorials");
    revalidatePath("/instructor/tutorials");
    revalidatePath(`/instructor/tutorials/${tutorialId}/edit`);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro ao atualizar tutorial",
    };
  }
}

export async function deleteTutorialAction(tutorialId: string) {
  const user = await requireInstructor();
  await deleteTutorial(tutorialId, user.id);
  revalidatePath("/tutorials");
  revalidatePath("/instructor/tutorials");
}
