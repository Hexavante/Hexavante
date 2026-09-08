import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { PageShell } from "@/components/ui/page-shell";
import { getTutorial, incrementTutorialViews } from "@/services/tutorial.service";
import { Avatar } from "@/components/ui/avatar";
import { Eye, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default async function TutorialDetailPage({ params }: Props) {
  const { slug } = await params;
  const tutorial = await getTutorial(slug, true);
  if (!tutorial) notFound();

  await incrementTutorialViews(tutorial.id);

  return (
    <PageShell>
      <Link
        href="/tutorials"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Tutoriais
      </Link>

      <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02]">
        {tutorial.videoUrl ? (
          <div className="relative aspect-video w-full bg-black">
            {tutorial.videoUrl.includes("youtube.com") || tutorial.videoUrl.includes("youtu.be") ? (
              <iframe
                src={`https://www.youtube.com/embed/${tutorial.videoUrl.includes("youtu.be") ? tutorial.videoUrl.split("/").pop() : new URL(tutorial.videoUrl).searchParams.get("v")}`}
                className="absolute inset-0 h-full w-full"
                allowFullScreen
              />
            ) : tutorial.videoUrl.includes("vimeo.com") ? (
              <iframe
                src={`https://player.vimeo.com/video/${tutorial.videoUrl.split("/").pop()}`}
                className="absolute inset-0 h-full w-full"
                allowFullScreen
              />
            ) : (
              <video
                src={tutorial.videoUrl}
                controls
                className="h-full w-full"
              />
            )}
          </div>
        ) : (
          <div className="flex aspect-video w-full items-center justify-center bg-slate-900">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-cyan-500/10 text-cyan-400">
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {tutorial.category && (
                <span className="mb-2 inline-block rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-xs font-medium text-cyan-300">
                  {tutorial.category.name}
                </span>
              )}
              <h1 className="text-2xl font-bold text-white">{tutorial.title}</h1>
              {tutorial.description && (
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{tutorial.description}</p>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4 border-t border-white/[0.06] pt-4">
            <div className="flex items-center gap-3">
              <Avatar src={tutorial.author.avatarUrl} alt={tutorial.author.fullName} size="sm" />
              <div>
                <p className="text-sm font-medium text-white">{tutorial.author.fullName}</p>
                <p className="text-xs text-slate-400">@{tutorial.author.username}</p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-4 text-xs text-slate-400">
              {tutorial.duration && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {formatDuration(tutorial.duration)}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                {tutorial.viewCount} views
              </span>
            </div>
          </div>

          {tutorial.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {tutorial.tags.map((t) => (
                <span
                  key={t.tag.id}
                  className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-slate-400"
                >
                  {t.tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
