import { getVideoEmbedUrl, isDirectVideoUrl } from "@/lib/video";

type VideoPlayerProps = {
  url: string;
  provider?: string | null;
};

export function VideoPlayer({ url, provider }: VideoPlayerProps) {
  const embedUrl = getVideoEmbedUrl(url, provider);

  if (embedUrl) {
    return (
      <iframe
        src={embedUrl}
        title="Videoaula"
        className="aspect-video w-full rounded-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  if (isDirectVideoUrl(url)) {
    return (
      <video src={url} controls className="aspect-video w-full rounded-lg bg-black">
        Seu navegador não suporta vídeos.
      </video>
    );
  }

  return (
    <div className="flex aspect-video items-center justify-center rounded-lg bg-white/[0.04] text-slate-400">
      Vídeo não disponível ou URL inválida.
    </div>
  );
}
