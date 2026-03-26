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
const PX_PER_SEC = 80;
const GAP_PX = 160;

function variantStyles(v?: AnnouncementMessage["variant"]) {
  switch (v) {
    case "warning":
      return {
        bar: "bg-amber-950/98 border-amber-400/25",
        pill: "bg-amber-400/15 text-amber-300 border border-amber-400/30",
        pillDot: "bg-amber-400",
        text: "text-amber-100",
        link: "text-amber-300 underline decoration-amber-400/50 hover:decoration-amber-300",
        close: "text-amber-400/50 hover:text-amber-300",
        label: "Notice",
        dotAnimate: "",
      };
    case "success":
      return {
        bar: "bg-emerald-950/98 border-emerald-400/25",
        pill: "bg-emerald-400/15 text-emerald-300 border border-emerald-400/30",
        pillDot: "bg-emerald-400",
        text: "text-emerald-100",
        link: "text-emerald-300 underline decoration-emerald-400/50",
        close: "text-emerald-400/50 hover:text-emerald-300",
        label: "Update",
        dotAnimate: "",
      };
    case "danger":
      return {
        bar: "bg-rose-950/98 border-rose-500/30",
        pill: "bg-rose-500/15 text-rose-300 border border-rose-500/30",
        pillDot: "bg-rose-400 animate-pulse",
        text: "text-rose-100",
        link: "text-rose-300 underline decoration-rose-400/50",
        close: "text-rose-400/50 hover:text-rose-300",
        label: "Urgent",
        dotAnimate: "animate-pulse",
      };
    default:
      return {
        bar: "bg-navy-950/98 border-teal-400/20",
        pill: "bg-teal-400/12 text-teal-300 border border-teal-400/25",
        pillDot: "bg-teal-400",
        text: "text-slate-300",
        link: "text-teal-300 underline decoration-teal-400/40 hover:decoration-teal-300",
        close: "text-slate-500 hover:text-slate-300",
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
  const [durationSec, setDurationSec] = useState(20);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const visible = useMemo(
    () => messages.filter((m) => !dismissed.has(m.id)),
    [messages, dismissed]
  );

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

  // Marquee speed from measured widths
  useEffect(() => {
    if (mode !== "marquee") return;
    const compute = () => {
      const cW = containerRef.current?.offsetWidth ?? 800;
      const contentW =
        (trackRef.current?.firstElementChild as HTMLElement)?.offsetWidth ?? 400;
      setDurationSec(Math.max(8, (cW + contentW + GAP_PX) / PX_PER_SEC));
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", compute);
    return () => { ro.disconnect(); window.removeEventListener("resize", compute); };
  }, [mode, visible.length]);

  if (visible.length === 0) return null;

  const current = mode === "single" ? visible[0] : visible[index % visible.length];
  const s = variantStyles(current.variant);

  return (
    <div
      className={`sticky top-0 z-50 border-b backdrop-blur-xl ${s.bar}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2">

        {/* Variant pill */}
        <div className={`hidden shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest sm:flex ${s.pill}`}>
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
              <span className={`whitespace-nowrap text-xs font-medium ${s.text}`}>
                {current.href
                  ? <a href={current.href} className={s.link}>{current.text}</a>
                  : current.text}
              </span>
              <span style={{ display: "inline-block", width: GAP_PX }} aria-hidden />
              <span className={`whitespace-nowrap text-xs font-medium ${s.text}`}>
                {current.href
                  ? <a href={current.href} className={s.link}>{current.text}</a>
                  : current.text}
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
            {current.href ? (
              <a href={current.href} className={`truncate text-xs font-medium ${s.link}`} title={current.text}>
                {current.text}
              </a>
            ) : (
              <p className={`truncate text-xs font-medium ${s.text}`} title={current.text}>
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
          onClick={() => dismiss(current.id)}
          className={`ml-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] transition ${s.close}`}
          aria-label="Dismiss announcement"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
