// src/components/AnnouncementBarClient.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { AnnouncementMessage } from "@/lib/announcement";

type Props = {
  messages: AnnouncementMessage[];
  rotateMs?: number;                  // used by rotate/single, fallback for marquee
  mode?: "rotate" | "marquee" | "single";
};

const DISMISS_KEY = "dj_announce_dismiss_v2";

/** Tune marquee feel */
const PX_PER_SEC = 160;               // ↓ slow down/speed up the scroll here
const GAP_PX = 128;                    // space between repeated content in marquee

function variantClasses(v?: AnnouncementMessage["variant"]) {
  switch (v) {
    case "warning": return "bg-amber-50 border-amber-200 text-amber-900";
    case "success": return "bg-emerald-50 border-emerald-200 text-emerald-900";
    case "danger":  return "bg-rose-50 border-rose-200 text-rose-900";
    default:        return "bg-sky-50 border-sky-200 text-sky-900";
  }
}

export default function AnnouncementBarClient({
  messages,
  rotateMs = 7000,
  mode = "marquee",
}: Props) {
  /** ------- hooks are declared unconditionally (no early returns before this line) ------- */
  const [dismissedId, setDismissedId] = useState<string | null>(() => {
    try {
      if (typeof window !== "undefined") return localStorage.getItem(DISMISS_KEY);
    } catch {}
    return null;
  });
  const [index, setIndex] = useState(0);
  const [durationSec, setDurationSec] = useState(8); // marquee animation duration

  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Visible messages (filter dismissed)
  const visible = useMemo(
    () => messages.filter((m) => m.id !== dismissedId),
    [messages, dismissedId]
  );

  // Compute marquee duration from measured width (container + content + gap)
  useEffect(() => {
    if (mode !== "marquee") return;
    const compute = () => {
      const containerW = containerRef.current?.offsetWidth ?? 0;
      const contentW = trackRef.current?.firstElementChild
        ? (trackRef.current.firstElementChild as HTMLElement).offsetWidth
        : 0;
      const travel = containerW + contentW + GAP_PX; // distance to slide off-screen
      const d = Math.max(1, travel / PX_PER_SEC);    // seconds
      setDurationSec(d);
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (containerRef.current) ro.observe(containerRef.current);
    if (trackRef.current?.firstElementChild) ro.observe(trackRef.current.firstElementChild as Element);
    window.addEventListener("resize", compute);
    window.addEventListener("orientationchange", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
      window.removeEventListener("orientationchange", compute);
    };
  }, [mode, index, visible.length]);

  // Rotate for non-marquee mode
  useEffect(() => {
    if (mode === "single" || visible.length <= 1 || mode === "marquee") return;
    const t = setInterval(() => setIndex((i) => (i + 1) % visible.length), Math.max(2000, rotateMs));
    return () => clearInterval(t);
  }, [mode, rotateMs, visible.length]);

  // It’s okay to return null now (after all hooks)
  if (visible.length === 0) return null;

  const current = mode === "single" ? visible[0] : visible[index % visible.length];
  const base = "sticky top-0 z-40 border-b";

  return (
    <div className={`${base} ${variantClasses(current.variant)}`} aria-live="polite">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-3 py-2">
        <span className="inline-flex shrink-0 items-center rounded-full bg-black/10 px-2.5 py-0.5 text-[11px] font-bold">
          Announcement
        </span>

        {mode === "marquee" ? (
          <div ref={containerRef} className="relative w-full overflow-hidden">
            {/* Continuous marquee: duplicate content inside a single animated track */}
            <div
              ref={trackRef}
              className="flex w-max items-center"
              style={{
                // CSS var controls the speed
                // (use inline style to avoid hydration mismatch)
                ["--dj-duration" as any]: `${durationSec}s`,
                animation: "dj-scroll var(--dj-duration) linear infinite",
              }}
            >
              <MarqueeContent message={current} />
              <Spacer />
              <MarqueeContent message={current} />
              <Spacer />
            </div>

            {/* Keyframes scoped to this component */}
            <style jsx>{`
              @keyframes dj-scroll {
                0%   { transform: translateX(0); }
                100% { transform: translateX(-50%); } /* -50% because we duplicated content */
              }
            `}</style>
          </div>
        ) : (
          <div className="flex min-w-0 flex-1 items-center">
            {current.href ? (
              <a
                href={current.href}
                className="truncate font-semibold underline decoration-2 underline-offset-[3px]"
                // same tab on purpose
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
      </div>
    </div>
  );
}

/** Single message chip used twice to create a seamless loop */
function MarqueeContent({ message }: { message: AnnouncementMessage }) {
  return (
    <div className="whitespace-nowrap font-semibold">
      {message.href ? (
        <a
          href={message.href}
          className="underline decoration-2 underline-offset-[3px]"
          // same-tab navigation
          title={message.text}
        >
          {message.text}
        </a>
      ) : (
        <span title={message.text}>{message.text}</span>
      )}
    </div>
  );
}

function Spacer() {
  return <span style={{ display: "inline-block", width: GAP_PX }} aria-hidden />;
}
