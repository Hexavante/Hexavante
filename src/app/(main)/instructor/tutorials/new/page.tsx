import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { isInstructor } from "@/lib/permissions";
import { listCategories } from "@/services/course.service";
import NewTutorialForm from "./form";

export default async function NewTutorialPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?callbackUrl=/instructor/tutorials");
  if (!isInstructor(session.user.roles)) redirect("/app");

  const categories = await listCategories();

  return <NewTutorialForm categories={categories} />;
}
