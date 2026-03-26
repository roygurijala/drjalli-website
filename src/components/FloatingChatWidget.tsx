// src/components/FloatingChatWidget.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { PRACTICE_PHONE, PRACTICE_PHONE_TEL } from "@/lib/constants";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

type ChatMessage = { role: "user" | "assistant"; content: string };

function normalizeBotText(src: string) {
  return src.replace(/<br\s*\/?>/gi, "\n").trim();
}

const safeSchema = {
  ...defaultSchema,
  tagNames: ["p","br","strong","em","u","s","a","ul","ol","li","blockquote","code"],
  attributes: { a: ["href","title","rel","target"] },
};

// ─── Animated AI Logo ──────────────────────────────────────────────────────────
// Pulsing neural-network orb: outer ring, rotating orbit, inner brain nodes
function AiLogo({ size = 36, active = false }: { size?: number; active?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
      style={{ flexShrink: 0 }}
    >
      <defs>
        <radialGradient id="orb-grad" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0DBFA0" stopOpacity="0.6" />
        </radialGradient>
        <radialGradient id="core-grad" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#A7F3D0" />
          <stop offset="100%" stopColor="#2DD4BF" />
        </radialGradient>
      </defs>

      {/* Outer pulse ring */}
      <circle
        cx="20" cy="20" r="18"
        stroke="#2DD4BF"
        strokeWidth="0.75"
        strokeOpacity={active ? "0.6" : "0.3"}
        fill="none"
        style={{ transition: "stroke-opacity 0.3s" }}
      >
        {active && (
          <animate
            attributeName="r"
            values="17;19;17"
            dur="2s"
            repeatCount="indefinite"
          />
        )}
        <animate
          attributeName="stroke-opacity"
          values="0.3;0.6;0.3"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Rotating orbit ring */}
      <circle
        cx="20" cy="20" r="14"
        stroke="#0DBFA0"
        strokeWidth="0.5"
        strokeOpacity="0.35"
        strokeDasharray="4 3"
        fill="none"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 20 20"
          to="360 20 20"
          dur="12s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Orbiting dot */}
      <circle cx="34" cy="20" r="1.5" fill="#2DD4BF" opacity="0.8">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 20 20"
          to="360 20 20"
          dur="12s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.8;0.3;0.8"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Counter-rotating small dot */}
      <circle cx="6" cy="20" r="1" fill="#5EEAD4" opacity="0.6">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 20 20"
          to="-360 20 20"
          dur="8s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Central orb (filled circle) */}
      <circle cx="20" cy="20" r="10" fill="url(#orb-grad)" opacity="0.15" />

      {/* Neural node lines — brain-like connections */}
      <line x1="20" y1="12" x2="14" y2="18" stroke="#2DD4BF" strokeWidth="0.75" strokeOpacity="0.55" />
      <line x1="20" y1="12" x2="26" y2="18" stroke="#2DD4BF" strokeWidth="0.75" strokeOpacity="0.55" />
      <line x1="14" y1="18" x2="16" y2="25" stroke="#2DD4BF" strokeWidth="0.75" strokeOpacity="0.45" />
      <line x1="26" y1="18" x2="24" y2="25" stroke="#2DD4BF" strokeWidth="0.75" strokeOpacity="0.45" />
      <line x1="14" y1="18" x2="26" y2="18" stroke="#5EEAD4" strokeWidth="0.5" strokeOpacity="0.35" />
      <line x1="16" y1="25" x2="24" y2="25" stroke="#5EEAD4" strokeWidth="0.5" strokeOpacity="0.3" />
      <line x1="20" y1="12" x2="20" y2="25" stroke="#0DBFA0" strokeWidth="0.5" strokeOpacity="0.25" />

      {/* Neural nodes */}
      {/* Top (head) */}
      <circle cx="20" cy="12" r="2.2" fill="url(#core-grad)">
        <animate attributeName="r" values="2.2;2.6;2.2" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.7;1" dur="2.5s" repeatCount="indefinite" />
      </circle>
      {/* Left */}
      <circle cx="14" cy="18" r="1.8" fill="#2DD4BF" opacity="0.85">
        <animate attributeName="opacity" values="0.85;0.4;0.85" dur="3s" begin="0.4s" repeatCount="indefinite" />
      </circle>
      {/* Right */}
      <circle cx="26" cy="18" r="1.8" fill="#2DD4BF" opacity="0.85">
        <animate attributeName="opacity" values="0.85;0.4;0.85" dur="3s" begin="0.8s" repeatCount="indefinite" />
      </circle>
      {/* Bottom left */}
      <circle cx="16" cy="25" r="1.5" fill="#5EEAD4" opacity="0.7">
        <animate attributeName="opacity" values="0.7;0.3;0.7" dur="3.5s" begin="0.6s" repeatCount="indefinite" />
      </circle>
      {/* Bottom right */}
      <circle cx="24" cy="25" r="1.5" fill="#5EEAD4" opacity="0.7">
        <animate attributeName="opacity" values="0.7;0.3;0.7" dur="3.5s" begin="1.2s" repeatCount="indefinite" />
      </circle>

      {/* Signal pulse traveling along top-left connection */}
      <circle r="1" fill="#A7F3D0" opacity="0">
        <animateMotion
          path="M20,12 L14,18"
          dur="2s"
          begin="0s"
          repeatCount="indefinite"
        />
        <animate attributeName="opacity" values="0;0.9;0" dur="2s" repeatCount="indefinite" />
      </circle>
      {/* Signal pulse top-right */}
      <circle r="1" fill="#A7F3D0" opacity="0">
        <animateMotion
          path="M20,12 L26,18"
          dur="2s"
          begin="1s"
          repeatCount="indefinite"
        />
        <animate attributeName="opacity" values="0;0.9;0" dur="2s" begin="1s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

// ─── Launcher button ──────────────────────────────────────────────────────────
function LauncherButton({
  isOpen,
  hasUnread,
  onClick,
  btnRef,
}: {
  isOpen: boolean;
  hasUnread: boolean;
  onClick: () => void;
  btnRef: React.RefObject<HTMLButtonElement | null>;
}) {
  return (
    <button
      ref={btnRef}
      type="button"
      onClick={onClick}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full border border-teal-400/30 bg-navy-900/95 px-4 py-2.5 shadow-2xl shadow-black/30 backdrop-blur-xl transition-all hover:border-teal-400/50 hover:shadow-teal-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2"
      aria-expanded={isOpen}
      aria-controls="clinic-ai-chat"
      aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
    >
      <AiLogo size={32} active={isOpen} />

      <div className="flex flex-col items-start leading-tight">
        <span className="text-xs font-semibold text-white">Ask AI</span>
        <span className="text-[10px] text-teal-400">Clinic assistant</span>
      </div>

      {/* Live dot */}
      <div className="relative ml-0.5 flex h-2.5 w-2.5 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-60" style={{ animationDuration: "2.5s" }} />
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${hasUnread && !isOpen ? "bg-green-400" : "bg-teal-400"}`} />
      </div>
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi, I'm the **Dr. Jalli MD PC** AI assistant.\n\nI can answer general questions about the clinic, services, and how to visit. I can't give personal medical advice.\n\n**How can I help?**",
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const launcherRef = useRef<HTMLButtonElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const id = requestAnimationFrame(() => {
      textareaRef.current?.focus();
      endRef.current?.scrollIntoView({ behavior: "instant", block: "end" } as ScrollIntoViewOptions);
    });
    setHasUnread(false);
    return () => cancelAnimationFrame(id);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const id = requestAnimationFrame(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    });
    return () => cancelAnimationFrame(id);
  }, [messages.length, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node | null;
      if (!panelRef.current?.contains(t) && !launcherRef.current?.contains(t)) {
        setIsOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    document.addEventListener("mousedown", handlePointerDown, true);
    document.addEventListener("touchstart", handlePointerDown, true);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown, true);
      document.removeEventListener("touchstart", handlePointerDown, true);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) return;
    const last = messages[messages.length - 1];
    if (last?.role === "assistant") setHasUnread(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length]);

  async function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const next = [...messages, { role: "user", content: trimmed } as const];
    setMessages(next);
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok) throw new Error("AI error");
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.reply ??
            "I'm sorry, I couldn't process that just now. Please try again or call the office.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having trouble responding right now. Please try again shortly or call the office directly.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    const onlyEnter =
      e.key === "Enter" && !e.shiftKey && !e.altKey && !e.ctrlKey && !e.metaKey;
    const isComposing = (e.nativeEvent as KeyboardEvent & { isComposing?: boolean })?.isComposing;
    if (onlyEnter && !isComposing) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      <LauncherButton
        isOpen={isOpen}
        hasUnread={hasUnread}
        onClick={() => setIsOpen((o) => !o)}
        btnRef={launcherRef}
      />

      {/* Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          id="clinic-ai-chat"
          role="dialog"
          aria-modal="false"
          aria-label="Clinic AI assistant"
          className="fixed bottom-20 right-5 z-50 flex h-[540px] w-[370px] max-h-[72vh] max-w-[92vw] flex-col overflow-hidden rounded-3xl border border-white/10 bg-navy-900/97 shadow-2xl shadow-black/50 backdrop-blur-xl"
        >
          {/* ─── Header ──────────────────────────────────────────────── */}
          <div className="flex items-center gap-3 border-b border-white/8 px-4 py-3">
            <AiLogo size={34} active />

            <div className="flex flex-col leading-tight">
              <span className="text-xs font-semibold text-white">Dr. Jalli AI Assistant</span>
              <span className="text-[10px] text-teal-400">
                General info · Not medical advice
              </span>
            </div>

            <button
              type="button"
              className="ml-auto flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-xs text-slate-500 transition hover:border-white/20 hover:text-slate-300"
              onClick={() => setIsOpen(false)}
              aria-label="Close assistant"
            >
              ✕
            </button>
          </div>

          {/* ─── Messages ────────────────────────────────────────────── */}
          <div className="flex-1 overflow-y-auto px-4 py-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`mb-3 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="mr-2 mt-0.5 flex-shrink-0">
                    <AiLogo size={18} />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl px-3 py-2.5 ${
                    m.role === "user"
                      ? "rounded-tr-sm bg-teal-500/90 text-white"
                      : "rounded-tl-sm border border-white/8 bg-white/6 text-slate-200"
                  }`}
                >
                  {m.role === "assistant" ? (
                    <div className="prose prose-xs prose-invert max-w-none [&_p]:my-1 [&_ul]:my-1 [&_li]:my-0.5 [&_strong]:text-teal-300">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[[rehypeSanitize, safeSchema]]}
                        components={{
                          a: ({ node, ...props }) => (
                            <a {...props} target="_blank" rel="noopener noreferrer"
                              className="text-teal-300 underline" />
                          ),
                        }}
                      >
                        {normalizeBotText(m.content)}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <span className="whitespace-pre-wrap">{m.content}</span>
                  )}
                </div>
              </div>
            ))}

            {isSending && (
              <div className="mb-3 flex items-start gap-2">
                <AiLogo size={18} active />
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-white/8 bg-white/6 px-3 py-2.5">
                  {[0, 0.2, 0.4].map((delay) => (
                    <span
                      key={delay}
                      className="h-1.5 w-1.5 rounded-full bg-teal-400"
                      style={{ animation: `bounce 1s ${delay}s infinite` }}
                    />
                  ))}
                  <style jsx>{`
                    @keyframes bounce {
                      0%, 60%, 100% { transform: translateY(0); }
                      30% { transform: translateY(-4px); }
                    }
                  `}</style>
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* ─── Input ───────────────────────────────────────────────── */}
          <form
            onSubmit={handleSend}
            className="border-t border-white/8 px-3 pb-3 pt-2.5"
          >
            <div className="flex gap-2">
              <textarea
                ref={textareaRef}
                rows={2}
                className="flex-1 resize-none rounded-2xl border border-white/10 bg-white/6 px-3 py-2 text-[13px] text-slate-200 placeholder-slate-500 outline-none transition focus:border-teal-400/50 focus:bg-white/8 focus:ring-0"
                placeholder="Ask about hours, services, location…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                enterKeyHint="send"
              />
              <button
                type="submit"
                disabled={isSending || !input.trim()}
                className="self-end rounded-full bg-teal-500 p-2.5 text-white shadow-md shadow-teal-500/20 transition hover:bg-teal-400 disabled:opacity-40"
                aria-label="Send message"
              >
                <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M14.854 1.146a.5.5 0 00-.707 0L1.5 13.793V9.5a.5.5 0 00-1 0v5a.5.5 0 00.5.5h5a.5.5 0 000-1H2.207L14.854 1.854a.5.5 0 000-.708z"/>
                </svg>
              </button>
            </div>
            <p className="mt-1.5 text-[10px] text-slate-600">
              Enter to send · Shift+Enter for new line
            </p>
          </form>

          {/* ─── Footer ──────────────────────────────────────────────── */}
          <div className="border-t border-white/8 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-500">Need to speak with someone?</span>
              <a
                href={`tel:${PRACTICE_PHONE_TEL}`}
                className="rounded-full bg-teal-500/15 px-3.5 py-1.5 text-[11px] font-semibold text-teal-300 transition hover:bg-teal-500/25"
              >
                Call {PRACTICE_PHONE}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
