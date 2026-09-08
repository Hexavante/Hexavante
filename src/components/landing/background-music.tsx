"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const TRACKS = [
  "https://cdn.pixabay.com/audio/2024/11/28/audio_febc2038b0.mp3",
  "https://cdn.pixabay.com/audio/2024/09/24/audio_89ea0e8103.mp3",
  "https://cdn.pixabay.com/audio/2024/07/18/audio_21f4d0e39c.mp3",
];

function getStoredTrack(): number {
  if (typeof window === "undefined") return 0;
  const v = localStorage.getItem("hx_bg_track");
  return v ? parseInt(v, 10) : 0;
}

function getStoredMuted(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem("hx_bg_muted") !== "false";
}

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.18;
    audio.preload = "auto";
    audioRef.current = audio;

    const idx = getStoredTrack();
    audio.src = TRACKS[idx % TRACKS.length];

    const stored = getStoredMuted();
    setMuted(stored);
    audio.muted = stored;

    audio.addEventListener("canplaythrough", () => setLoaded(true), { once: true });

    const tryPlay = () => {
      if (!stored && audio.paused) {
        audio.play().catch(() => {});
      }
    };

    audio.load();
    document.addEventListener("click", tryPlay, { once: true });
    document.addEventListener("keydown", tryPlay, { once: true });

    return () => {
      audio.pause();
      audio.src = "";
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("keydown", tryPlay);
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !muted;
    setMuted(next);
    audio.muted = next;
    localStorage.setItem("hx_bg_muted", String(next));
    if (!next && audio.paused) {
      try {
        await audio.play();
      } catch {}
    }
  };

  return (
    <button
      onClick={toggle}
      title={muted ? "Ligar música de fundo" : "Desligar música"}
      className="fixed bottom-5 right-5 z-[9999] grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-[hsl(var(--sidebar-background))]/80 text-slate-400 shadow-lg backdrop-blur transition hover:border-white/20 hover:text-white"
    >
      {muted ? <VolumeX className="h-4.5 w-4.5" /> : <Volume2 className="h-4.5 w-4.5" />}
    </button>
  );
}
