"use client";

import { useState, useRef } from "react";
import { Upload, Video, X } from "lucide-react";

type Props = {
  initialUrl?: string;
  name?: string;
};

export function VideoUploadInput({ initialUrl, name = "videoUrl" }: Props) {
  const [videoUrl, setVideoUrl] = useState(initialUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/upload/video");

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          setProgress(Math.round((e.loaded / e.total) * 100));
        }
      };

      const response = await new Promise<{ url: string }>((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            const data = JSON.parse(xhr.responseText);
            reject(new Error(data.error || "Erro ao enviar vídeo"));
          }
        };
        xhr.onerror = () => reject(new Error("Erro de conexão"));
        xhr.send(formData);
      });

      setVideoUrl(response.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar vídeo");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }

  return (
    <div className="space-y-2">
      <label className="mb-1.5 block text-sm font-medium text-slate-300">
        Vídeo
      </label>

      <input type="hidden" name={name} value={videoUrl} />

      {videoUrl ? (
        <div className="relative overflow-hidden rounded-lg border border-cyan-400/30 bg-cyan-500/5 p-3">
          <div className="flex items-center gap-3">
            <Video className="h-5 w-5 text-cyan-400" />
            <span className="flex-1 truncate text-sm text-white">{videoUrl}</span>
            <button
              type="button"
              onClick={() => setVideoUrl("")}
              className="rounded p-1 text-slate-400 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div>
          <input
            ref={fileRef}
            type="file"
            accept="video/mp4,video/webm,video/ogg,video/quicktime"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-white/15 bg-white/[0.02] px-4 py-8 text-sm text-slate-400 transition hover:border-cyan-400/30 hover:bg-white/[0.04] hover:text-white disabled:opacity-50"
          >
            <Upload className="h-5 w-5" />
            {uploading ? `Enviando... ${progress}%` : "Clique para enviar um vídeo (MP4, WebM, OGG)"}
          </button>
          {uploading && (
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-cyan-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      )}

      <p className="text-xs text-slate-500">
        Ou cole uma URL de YouTube/Vimeo no campo acima.
      </p>

      <input
        type="text"
        placeholder="https://youtube.com/watch?v=... ou https://vimeo.com/..."
        value={videoUrl.startsWith("/uploads/") ? "" : videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30"
      />

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
