// src/components/AnnouncementBarClient.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { AnnouncementMessage } from "@/lib/announcement";

type Props = {
  messages: AnnouncementMessage[];
  rotateMs?: number;                 // fallback for rotate/single, and minimum for marquee
  mode?: "rotate" | "marquee" | "single";
};

const DISMISS_KEY = "dj_announce_dismiss_v2";

// Tweak this to change marquee speed (px/sec)
const MARQUEE_SPEED_PX_PER_SEC = 110;
const MARQUEE_BUFFER_MS = 600; // small pause after finishing before switching

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

  // restore dismissal
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DISMISS_KEY);
      if (saved) setDismissedId(saved);
    } catch {}
  }, []);

  const visible = useMemo(
    () => messages.filter((m) => m.id !== dismissedId),
    [messages, dismissedId]
  );

  if (!visible.length) return null;

  const current =
    mode === "single" ? visible[0] : visible[index % visible.length];

  // ---------- ROTATION CONTROL ----------
  // Rotate for rotate/single via interval; for marquee we compute duration and use timeout.

  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const [marqueeMs, setMarqueeMs] = useState<number>(rotateMs); // computed per message

  // Recompute marquee duration whenever message or size changes
  useEffect(() => {
    if (mode !== "marquee") return;

    const compute = () => {
      const containerW = containerRef.current?.offsetWidth ?? 0;
      const textW = textRef.current?.scrollWidth ?? 0;
      // distance to travel is text width + container width (off-screen right to off-screen left)
      const distance = containerW + textW;
      const sec = distance / Math.max(1, MARQUEE_SPEED_PX_PER_SEC);
      const ms = sec * 1000 + MARQUEE_BUFFER_MS;
      setMarqueeMs(Math.max(ms, rotateMs)); // never shorter than fallback
    };

    compute();

    // Recompute on resize
    const ro = new ResizeObserver(() => compute());
    if (containerRef.current) ro.observe(containerRef.current);
    if (textRef.current) ro.observe(textRef.current);
    window.addEventListener("orientationchange", compute);
    window.addEventListener("resize", compute);

    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", compute);
      window.removeEventListener("resize", compute);
    };
  }, [mode, index, rotateMs, current.id]);

  // Rotation timers
  useEffect(() => {
    if (visible.length <= 1 || mode === "single") return;

    if (mode === "marquee") {
      // Wait until the marquee finishes scrolling this long line
      const t = setTimeout(
        () => setIndex((i) => (i + 1) % visible.length),
        marqueeMs
      );
      return () => clearTimeout(t);
    } else {
      // classic rotate
      const t = setInterval(
        () => setIndex((i) => (i + 1) % visible.length),
        Math.max(2000, rotateMs)
      );
      return () => clearInterval(t);
    }
  }, [visible.length, marqueeMs, rotateMs, mode, index]);

  // ---------- RENDER ----------
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
          <div ref={containerRef} className="relative w-full overflow-hidden">
            {/* key restarts CSS animation when message changes */}
            <div
              key={current.id}
              ref={textRef}
              // Set animation duration dynamically from measurement
              style={{ animationDuration: `${Math.max(1, marqueeMs - MARQUEE_BUFFER_MS) / 1000}s` }}
              className="marquee whitespace-nowrap font-semibold"
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
              .marquee {
                animation-name: dj-marquee;
                animation-timing-function: linear;
                animation-iteration-count: 1; /* one pass per message */
              }
              @keyframes dj-marquee {
                0%   { transform: translateX(100%); }
                100% { transform: translateX(-100%); }
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

        {/* dismiss current message */}
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
