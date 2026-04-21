// src/components/AnnouncementBarClient.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { AnnouncementMessage } from "@/lib/announcement";

type Props = {
  messages: AnnouncementMessage[];
  rotateMs?: number;
  mode?: "rotate" | "marquee" | "single";
};

const DISMISS_KEY = "dj_announce_dismiss_v3";
const PX_PER_SEC = 60;
const GAP_PX = 120;
const SEPARATOR = "  •  ";

function variantStyles(v?: AnnouncementMessage["variant"]) {
  switch (v) {
    case "warning":
      return {
        bar: "bg-amber-900 border-b-2 border-amber-400/80 shadow-md shadow-amber-950/40",
        pill: "bg-amber-500/25 text-amber-100 border border-amber-300/60",
        pillDot: "bg-amber-300",
        text: "text-amber-50 font-semibold",
        link: "text-amber-100 font-semibold underline decoration-amber-200/90 underline-offset-2 hover:text-white hover:decoration-white",
        close: "text-amber-200/90 hover:text-white hover:bg-amber-800/80",
        label: "Notice",
        dotAnimate: "",
      };
    case "success":
      return {
        bar: "bg-emerald-900 border-b-2 border-emerald-400/70 shadow-md shadow-emerald-950/40",
        pill: "bg-emerald-500/25 text-emerald-100 border border-emerald-300/60",
        pillDot: "bg-emerald-300",
        text: "text-emerald-50 font-semibold",
        link: "text-emerald-100 font-semibold underline decoration-emerald-200/90 underline-offset-2 hover:text-white",
        close: "text-emerald-200/90 hover:text-white hover:bg-emerald-800/80",
        label: "Update",
        dotAnimate: "",
      };
    case "danger":
      return {
        bar: "bg-rose-900 border-b-2 border-rose-400/80 shadow-md shadow-rose-950/40",
        pill: "bg-rose-500/25 text-rose-100 border border-rose-300/60",
        pillDot: "bg-rose-300 animate-pulse",
        text: "text-rose-50 font-semibold",
        link: "text-rose-100 font-semibold underline decoration-rose-200/90 underline-offset-2 hover:text-white",
        close: "text-rose-200/90 hover:text-white hover:bg-rose-800/80",
        label: "Urgent",
        dotAnimate: "animate-pulse",
      };
    default:
      return {
        bar: "bg-slate-900 border-b-2 border-teal-500/70 shadow-md shadow-black/30",
        pill: "bg-teal-500/25 text-teal-100 border border-teal-400/55",
        pillDot: "bg-teal-300",
        text: "text-white font-semibold",
        link: "text-teal-100 font-semibold underline decoration-teal-200/90 underline-offset-2 hover:text-white hover:decoration-white",
        close: "text-slate-300 hover:text-white hover:bg-slate-800",
        label: "Announcement",
        dotAnimate: "",
      };
  }
}

export default function AnnouncementBarClient({
  messages,
  rotateMs = 7000,
  mode = "rotate",
}: Props) {
  const [dismissed, setDismissed] = useState<Set<string>>(() => {
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(DISMISS_KEY);
        return new Set(stored ? JSON.parse(stored) : []);
      }
    } catch {}
    return new Set();
  });

  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [durationSec, setDurationSec] = useState(30);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const visible = useMemo(
    () => messages.filter((m) => !dismissed.has(m.id)),
    [messages, dismissed]
  );

  // Use the first message's variant for the bar color in marquee mode
  const current = visible[index % visible.length];

  function dismissAll() {
    const next = new Set(dismissed);
    visible.forEach((m) => next.add(m.id));
    setDismissed(next);
    try {
      localStorage.setItem(DISMISS_KEY, JSON.stringify([...next]));
    } catch {}
  }

  function dismiss(id: string) {
    const next = new Set(dismissed).add(id);
    setDismissed(next);
    try {
      localStorage.setItem(DISMISS_KEY, JSON.stringify([...next]));
    } catch {}
  }

  // Rotate with fade transition
  useEffect(() => {
    if (mode !== "rotate" || visible.length <= 1) return;
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % visible.length);
        setFading(false);
      }, 300);
    }, Math.max(3000, rotateMs));
    return () => clearInterval(t);
  }, [mode, rotateMs, visible.length]);

  // Marquee: compute duration based on total content width
  useEffect(() => {
    if (mode !== "marquee") return;
    const compute = () => {
      const trackEl = trackRef.current?.firstElementChild as HTMLElement | null;
      const contentW = trackEl?.offsetWidth ?? 600;
      setDurationSec(Math.max(10, (contentW + GAP_PX) / PX_PER_SEC));
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [mode, visible.length]);

  if (visible.length === 0) return null;

  const s = variantStyles(current?.variant);

  // Build the full combined text for marquee — all messages joined by separator
  const combinedText = visible
    .map((m) => m.text)
    .join(`  ${SEPARATOR}  `);

  return (
    <div
      className={`sticky top-0 z-50 ${s.bar}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="mx-auto flex max-w-full items-center gap-3 px-4 py-2.5 md:py-3">

        {/* Variant pill */}
        <div className={`hidden shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest sm:flex ${s.pill}`}>
          <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${s.pillDot} ${s.dotAnimate}`} aria-hidden />
          {s.label}
        </div>

        {/* Content */}
        {mode === "marquee" ? (
          <div ref={containerRef} className="relative min-w-0 flex-1 overflow-hidden">
            <div
              ref={trackRef}
              className="flex w-max items-center"
              style={{
                ["--dj-d" as string]: `${durationSec}s`,
                animation: "dj-marquee var(--dj-d) linear infinite",
              }}
            >
              {/* First copy */}
              <span className={`whitespace-nowrap text-sm font-semibold md:text-[15px] ${s.text}`}>
                {combinedText}
              </span>
              {/* Gap between loops */}
              <span style={{ display: "inline-block", width: GAP_PX }} aria-hidden />
              {/* Duplicate for seamless loop */}
              <span className={`whitespace-nowrap text-sm font-semibold md:text-[15px] ${s.text}`} aria-hidden>
                {combinedText}
              </span>
              <span style={{ display: "inline-block", width: GAP_PX }} aria-hidden />
            </div>
            <style jsx>{`
              @keyframes dj-marquee {
                from { transform: translateX(0); }
                to   { transform: translateX(-50%); }
              }
            `}</style>
          </div>
        ) : (
          <div className={`flex min-w-0 flex-1 transition-opacity duration-300 ${fading ? "opacity-0" : "opacity-100"}`}>
            {current?.href ? (
              <a href={current.href} className={`truncate text-sm font-semibold md:text-[15px] ${s.link}`} title={current.text}>
                {current.text}
              </a>
            ) : (
              <p className={`truncate text-sm font-semibold md:text-[15px] ${s.text}`} title={current.text}>
                {current.text}
              </p>
            )}
          </div>
        )}

        {/* Dot indicators (rotate mode, 2+ messages) */}
        {mode === "rotate" && visible.length > 1 && (
          <div className="hidden shrink-0 items-center gap-1 sm:flex">
            {visible.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setFading(true);
                  setTimeout(() => { setIndex(i); setFading(false); }, 200);
                }}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === index % visible.length ? "w-4 bg-teal-400" : "w-1 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to announcement ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Dismiss */}
        <button
          type="button"
          onClick={() => mode === "marquee" ? dismissAll() : dismiss(current.id)}
          className={`ml-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition ${s.close}`}
          aria-label="Dismiss announcement"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
