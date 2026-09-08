"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

const YOUTUBE_VIDEO_ID = "MX-iaTDEyGI";

function getStoredMuted(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem("hx_bg_muted") !== "false";
}

export function BackgroundMusic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const sendCommand = useCallback((command: string) => {
    const iframe = containerRef.current?.querySelector("iframe");
    if (!iframe?.contentWindow) return;
    iframe.contentWindow.postMessage(JSON.stringify({ event: "command", func: command, args: [] }), "*");
  }, []);

  useEffect(() => {
    const stored = getStoredMuted();
    setMuted(stored);
  }, []);

  const togglePlay = async () => {
    if (!playing) {
      setMuted(false);
      setPlaying(true);
      localStorage.setItem("hx_bg_muted", "false");
      setTimeout(() => {
        sendCommand("unMute");
        sendCommand("playVideo");
      }, 500);
    } else {
      const nextMuted = !muted;
      setMuted(nextMuted);
      localStorage.setItem("hx_bg_muted", String(nextMuted));
      sendCommand(nextMuted ? "mute" : "unMute");
      if (!nextMuted) sendCommand("playVideo");
      else sendCommand("pauseVideo");
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex items-center gap-2">
      {expanded && (
        <div
          ref={containerRef}
          className="overflow-hidden rounded-xl border border-white/10 bg-[hsl(var(--sidebar-background))]/90 shadow-xl backdrop-blur"
        >
          <iframe
            width="320"
            height="80"
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&rel=0&loop=1&playlist=${YOUTUBE_VIDEO_ID}`}
            title="Música de fundo"
            allow="autoplay; encrypted-media"
            className="pointer-events-none"
            style={{ marginTop: "-14px", marginBottom: "-14px" }}
          />
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        {playing && (
          <button
            onClick={() => setExpanded(!expanded)}
            title={expanded ? "Recolher" : "Expandir"}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-[hsl(var(--sidebar-background))]/80 text-slate-400 shadow-lg backdrop-blur transition hover:border-white/20 hover:text-white"
          >
            <Music className="h-3.5 w-3.5" />
          </button>
        )}
        <button
          onClick={togglePlay}
          title={!playing ? "Tocar música" : muted ? "Retomar música" : "Pausar música"}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-[hsl(var(--sidebar-background))]/80 text-slate-400 shadow-lg backdrop-blur transition hover:border-white/20 hover:text-white"
        >
          {!playing || muted ? <VolumeX className="h-4.5 w-4.5" /> : <Volume2 className="h-4.5 w-4.5" />}
        </button>
      </div>
    </div>
  );
}
