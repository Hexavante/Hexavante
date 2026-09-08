"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const YOUTUBE_VIDEO_ID = "MX-iaTDEyGI";

function getStoredMuted(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem("hx_bg_muted") !== "false";
}

declare global {
  interface Window {
    YT?: { Player: new (el: HTMLIFrameElement, opts: unknown) => { playVideo(): void; pauseVideo(): void; mute(): void; unMute(): void } };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export function BackgroundMusic() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<{ playVideo(): void; pauseVideo(): void; mute(): void; unMute(): void } | null>(null);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = getStoredMuted();
    setMuted(stored);

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode?.insertBefore(tag, firstScript);

    window.onYouTubeIframeAPIReady = () => {
      if (!iframeRef.current) return;
      const player = new window.YT!.Player(iframeRef.current, {
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
          loop: 1,
          playlist: YOUTUBE_VIDEO_ID,
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            playerRef.current = player;
            setReady(true);
            player.mute();
            if (!stored) {
              const tryPlay = () => {
                player.playVideo();
              };
              document.addEventListener("click", tryPlay, { once: true });
              document.addEventListener("keydown", tryPlay, { once: true });
            }
          },
        },
      });
    };

    return () => {
      playerRef.current = null;
      window.onYouTubeIframeAPIReady = undefined;
    };
  }, []);

  const toggle = () => {
    const player = playerRef.current;
    if (!player) return;
    const next = !muted;
    setMuted(next);
    localStorage.setItem("hx_bg_muted", String(next));
    if (next) {
      player.mute();
      player.pauseVideo();
    } else {
      player.unMute();
      player.playVideo();
    }
  };

  return (
    <>
      <iframe
        ref={iframeRef}
        className="hidden"
        title="background-music"
        allow="autoplay"
        sandbox="allow-scripts allow-same-origin"
      />
      <button
        onClick={toggle}
        title={muted ? "Ligar música de fundo" : "Desligar música"}
        className="fixed bottom-5 right-5 z-[9999] grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-[hsl(var(--sidebar-background))]/80 text-slate-400 shadow-lg backdrop-blur transition hover:border-white/20 hover:text-white"
      >
        {muted ? <VolumeX className="h-4.5 w-4.5" /> : <Volume2 className="h-4.5 w-4.5" />}
      </button>
    </>
  );
}
