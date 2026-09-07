import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { isInstructor } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import EditTutorialForm from "./form";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditTutorialPage({ params }: Props) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect("/login?callbackUrl=/instructor/tutorials");
  if (!isInstructor(session.user.roles)) redirect("/app");

  const tutorial = await prisma.tutorial.findFirst({
    where: { id, authorId: session.user.id },
    include: {
      tags: { include: { tag: true } },
    },
  });

  if (!tutorial) notFound();

  const categories = await prisma.category.findMany({
    where: { isApproved: true },
    orderBy: { name: "asc" },
  });

  return (
    <EditTutorialForm
      tutorial={{
        id: tutorial.id,
        title: tutorial.title,
        description: tutorial.description,
        videoUrl: tutorial.videoUrl,
        thumbnailUrl: tutorial.thumbnailUrl,
        duration: tutorial.duration,
        isPublished: tutorial.isPublished,
        categoryId: tutorial.categoryId,
        tags: tutorial.tags.map((t) => t.tag.name),
      }}
      categories={categories}
    />
  );
}
