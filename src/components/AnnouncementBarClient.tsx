// src/components/AnnouncementBarClient.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import type { AnnouncementMessage } from "@/lib/announcement";

type Props = {
  messages: AnnouncementMessage[];
  rotateMs?: number;
  mode?: "rotate" | "marquee" | "single";
};

const DISMISS_KEY = "dj_announce_dismiss_v2";

function variantClasses(v?: AnnouncementMessage["variant"]) {
  switch (v) {
    case "warning":
      return "bg-amber-50 border-amber-200 text-amber-900";
    case "success":
      return "bg-emerald-50 border-emerald-200 text-emerald-900";
    case "danger":
      return "bg-rose-50 border-rose-200 text-rose-900";
    default:
      return "bg-sky-50 border-sky-200 text-sky-900";
  }
}

export default function AnnouncementBarClient({
  messages,
  rotateMs = 7000,
  mode = "rotate",
}: Props) {
  const [dismissedId, setDismissedId] = useState<string | null>(null);
  const [index, setIndex] = useState(0);

  // Restore dismissal
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DISMISS_KEY);
      if (saved) setDismissedId(saved);
    } catch {}
  }, []);

  // Messages to show (skip dismissed)
  const visible = useMemo(
    () => messages.filter((m) => m.id !== dismissedId),
    [messages, dismissedId]
  );

  // Rotate through messages in BOTH rotate & marquee modes
  useEffect(() => {
    if (mode === "single" || visible.length <= 1) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % visible.length),
      Math.max(2000, rotateMs)
    );
    return () => clearInterval(t);
  }, [visible.length, rotateMs, mode]);

  if (!visible.length) return null;

  const current =
    mode === "single" ? visible[0] : visible[index % visible.length];

  const base = "sticky top-0 z-40 border-b";
  const isMarquee = mode === "marquee";

  return (
    <div className={`${base} ${variantClasses(current.variant)}`} aria-live="polite">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-3 py-2">
        {/* Label pill */}
        <span className="inline-flex shrink-0 items-center rounded-full bg-black/10 px-2.5 py-0.5 text-[11px] font-bold">
          Announcement
        </span>

        {/* Message */}
        {isMarquee ? (
          <div className="relative w-full overflow-hidden">
            {/* key restarts CSS animation when message changes */}
            <div
              key={current.id}
              className="animate-[marquee_16s_linear_infinite] whitespace-nowrap font-semibold"
              title={current.text}
            >
              {current.href ? (
                <a
                  href={current.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-2 underline-offset-[3px]"
                >
                  {current.text}
                </a>
              ) : (
                current.text
              )}
            </div>
            <style jsx>{`
              @keyframes marquee {
                0% {
                  transform: translateX(100%);
                }
                100% {
                  transform: translateX(-100%);
                }
              }
            `}</style>
          </div>
        ) : (
          <div className="flex min-w-0 flex-1 items-center">
            {current.href ? (
              <a
                href={current.href}
                className="truncate font-semibold underline decoration-2 underline-offset-[3px]"
                target="_blank"
                rel="noopener noreferrer"
                title={current.text}
              >
                {current.text}
              </a>
            ) : (
              <p className="truncate font-semibold" title={current.text}>
                {current.text}
              </p>
            )}
          </div>
        )}

        {/* Dismiss current message */}
        <button
          onClick={() => {
            try {
              localStorage.setItem(DISMISS_KEY, current.id);
            } catch {}
            setDismissedId(current.id);
          }}
          className="ml-auto inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/10 text-xs font-bold hover:bg-black/15"
          aria-label="Dismiss announcement"
          title="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
}
