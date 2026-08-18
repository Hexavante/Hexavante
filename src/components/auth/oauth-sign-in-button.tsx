"use client";

import { Capacitor } from "@capacitor/core";
import { Browser } from "@capacitor/browser";
import { buildOAuthSignInHref } from "@/lib/auth-routes";
import { getPublicAppUrl } from "@/lib/native-app";
import { cn } from "@/lib/cn";

type Props = {
  provider: "google" | "github";
  callbackUrl: string;
  children: React.ReactNode;
  className?: string;
};

let browserListenersReady = false;

function toAbsoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${getPublicAppUrl()}${path}`;
}

async function ensureBrowserListeners() {
  if (browserListenersReady || !Capacitor.isNativePlatform()) return;
  browserListenersReady = true;

  await Browser.addListener("browserFinished", () => {
    window.location.reload();
  });
}

export function OAuthSignInButton({ provider, callbackUrl, children, className }: Props) {
  const href = buildOAuthSignInHref(provider, callbackUrl);

  async function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!Capacitor.isNativePlatform()) return;

    event.preventDefault();
    await ensureBrowserListeners();
    await Browser.open({ url: toAbsoluteUrl(href) });
  }

  return (
    <a
      href={href}
      onClick={(event) => void handleClick(event)}
      className={cn(
        "hx-btn-secondary inline-flex min-h-11 w-full items-center justify-center gap-3 px-5 py-2.5 transition-all hover:shadow-md",
        className,
      )}
    >
      {children}
    </a>
  );
}
