export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingFooter } from "@/components/landing/landing-footer";
import { BackgroundMusic } from "@/components/landing/background-music";
import { getTutorial, incrementTutorialViews } from "@/services/tutorial.service";
import { VideoPlayer } from "@/components/courses/video-player";
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
  const session = await auth();
  const user = session?.user ?? null;

  const tutorial = await getTutorial(slug, true);
  if (!tutorial) notFound();

  await incrementTutorialViews(tutorial.id);

  return (
    <div className="min-h-screen bg-[var(--background)] overflow-x-hidden">
      <LandingHeader user={user} />
      <BackgroundMusic />

      <main className="pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Link
            href="/tutorials"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-[hsl(var(--sidebar-foreground)/0.5)] hover:text-[hsl(var(--sidebar-foreground))] transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Tutoriais
          </Link>

          <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            {tutorial.videoUrl ? (
              <VideoPlayer url={tutorial.videoUrl} />
            ) : (
              <div className="flex aspect-video w-full items-center justify-center bg-[hsl(var(--sidebar-background))]">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-cyan-500/10 text-cyan-400">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}

            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {tutorial.category && (
                    <span className="mb-2 inline-block rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-xs font-medium text-cyan-300">
                      {tutorial.category.name}
                    </span>
                  )}
                  <h1 className="text-2xl font-bold text-[hsl(var(--sidebar-foreground))] sm:text-3xl">{tutorial.title}</h1>
                  {tutorial.description && (
                    <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--sidebar-foreground)/0.6)]">{tutorial.description}</p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4 border-t border-white/[0.06] pt-4">
                <div className="flex items-center gap-3">
                  <img
                    src={tutorial.author.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(tutorial.author.fullName)}&background=2563eb&color=fff&size=40`}
                    alt={tutorial.author.fullName}
                    className="h-9 w-9 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium text-[hsl(var(--sidebar-foreground))]">{tutorial.author.fullName}</p>
                    <p className="text-xs text-[hsl(var(--sidebar-foreground)/0.4)]">@{tutorial.author.username}</p>
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-4 text-xs text-[hsl(var(--sidebar-foreground)/0.4)]">
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
                      className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-[hsl(var(--sidebar-foreground)/0.45)]"
                    >
                      {t.tag.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
