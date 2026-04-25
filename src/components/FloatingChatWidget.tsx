// src/components/FloatingChatWidget.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import {
  AI_CHAT_DISCLAIMER_COMPACT,
  PRACTICE_PHONE,
  PRACTICE_PHONE_TEL,
} from "@/lib/constants";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

type SuggestedAction = {
  label: string;
  href: string;
  kind: "call" | "portal" | "directions" | "link";
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  suggestedActions?: SuggestedAction[];
  suggestedPrompts?: string[];
};

function normalizeBotText(src: string) {
  return src.replace(/<br\s*\/?>/gi, "\n").trim();
}

const safeSchema = {
  ...defaultSchema,
  tagNames: ["p","br","strong","em","u","s","a","ul","ol","li","blockquote","code"],
  attributes: { a: ["href","title","rel","target"] },
};

// ─── Animated AI Logo — works on both dark and light backgrounds ──────────────
function AiLogo({ size = 36, active = false }: { size?: number; active?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden style={{ flexShrink: 0 }}>
      <defs>
        <radialGradient id="logo-orb" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0DBFA0" stopOpacity="0.6" />
        </radialGradient>
        <radialGradient id="logo-core" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#A7F3D0" />
          <stop offset="100%" stopColor="#2DD4BF" />
        </radialGradient>
      </defs>
      {/* Outer ring */}
      <circle cx="20" cy="20" r="18" stroke="#0D9488" strokeWidth="0.75" fill="none">
        <animate attributeName="stroke-opacity" values="0.35;0.7;0.35" dur="3s" repeatCount="indefinite" />
        {active && <animate attributeName="r" values="17;19;17" dur="2s" repeatCount="indefinite" />}
      </circle>
      {/* Orbit */}
      <g style={{ transformOrigin: "50% 50%", animation: "logo-orbit 12s linear infinite" }}>
        <circle cx="20" cy="20" r="14" stroke="#0D9488" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="4 3" fill="none" />
        <circle cx="34" cy="20" r="1.5" fill="#0D9488" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3s" repeatCount="indefinite" />
        </circle>
      </g>
      {/* Counter orbit */}
      <g style={{ transformOrigin: "50% 50%", animation: "logo-orbit-rev 8s linear infinite" }}>
        <circle cx="6" cy="20" r="1" fill="#14B8A6" opacity="0.6" />
      </g>
      {/* Core fill */}
      <circle cx="20" cy="20" r="10" fill="url(#logo-orb)" opacity="0.12" />
      {/* Neural lines */}
      <line x1="20" y1="12" x2="14" y2="18" stroke="#0D9488" strokeWidth="0.75" strokeOpacity="0.6" />
      <line x1="20" y1="12" x2="26" y2="18" stroke="#0D9488" strokeWidth="0.75" strokeOpacity="0.6" />
      <line x1="14" y1="18" x2="16" y2="25" stroke="#0D9488" strokeWidth="0.75" strokeOpacity="0.45" />
      <line x1="26" y1="18" x2="24" y2="25" stroke="#0D9488" strokeWidth="0.75" strokeOpacity="0.45" />
      <line x1="14" y1="18" x2="26" y2="18" stroke="#14B8A6" strokeWidth="0.5" strokeOpacity="0.35" />
      <line x1="16" y1="25" x2="24" y2="25" stroke="#14B8A6" strokeWidth="0.5" strokeOpacity="0.3" />
      {/* Nodes */}
      <circle cx="20" cy="12" r="2.2" fill="url(#logo-core)">
        <animate attributeName="r" values="2.2;2.7;2.2" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="14" cy="18" r="1.8" fill="#0D9488" opacity="0.85">
        <animate attributeName="opacity" values="0.85;0.35;0.85" dur="3s" begin="0.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="26" cy="18" r="1.8" fill="#0D9488" opacity="0.85">
        <animate attributeName="opacity" values="0.85;0.35;0.85" dur="3s" begin="0.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="16" cy="25" r="1.5" fill="#14B8A6" opacity="0.7">
        <animate attributeName="opacity" values="0.7;0.25;0.7" dur="3.5s" begin="0.6s" repeatCount="indefinite" />
      </circle>
      <circle cx="24" cy="25" r="1.5" fill="#14B8A6" opacity="0.7">
        <animate attributeName="opacity" values="0.7;0.25;0.7" dur="3.5s" begin="1.2s" repeatCount="indefinite" />
      </circle>
      <style>{`
        @keyframes logo-orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes logo-orbit-rev { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      `}</style>
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi, I'm the **Dr. Jalli MD PC** assistant.\n\nI can help with **hours, location, providers, insurance, and scheduling**—general information only.\n\nPlease **do not share personal health details** (symptoms, diagnoses, medications, or ID numbers) here. For those topics, call us or use the **patient portal**.\n\n**How can I help?**",
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const STARTER_PROMPTS = [
    "I'm a new patient. How do I schedule?",
    "What insurances do you accept?",
    "What are your office hours today?",
  ];

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

  async function handleSend(e?: React.FormEvent, overridePrompt?: string) {
    e?.preventDefault();
    const trimmed = (overridePrompt ?? input).trim();
    if (!trimmed || isSending) return;
    const next = [...messages, { role: "user", content: trimmed } as const];
    setMessages(next);
    if (!overridePrompt) setInput("");
    setIsSending(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, source: "floating-widget" }),
      });
      if (!res.ok) throw new Error("AI error");
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply ?? "I'm sorry, I couldn't process that just now. Please try again or call the office.",
          suggestedActions: Array.isArray(data.suggestedActions) ? data.suggestedActions : undefined,
          suggestedPrompts: Array.isArray(data.suggestedPrompts) ? data.suggestedPrompts.slice(0, 2) : undefined,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm having trouble responding right now. Please try again shortly or call the office directly." },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    const onlyEnter = e.key === "Enter" && !e.shiftKey && !e.altKey && !e.ctrlKey && !e.metaKey;
    const isComposing = (e.nativeEvent as KeyboardEvent & { isComposing?: boolean })?.isComposing;
    if (onlyEnter && !isComposing) { e.preventDefault(); handleSend(); }
  }

  return (
    <>
      {/* ─── Launcher ─────────────────────────────────────────────────── */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))] right-4 z-50 flex min-h-[48px] items-center gap-2.5 rounded-full border border-teal-200 bg-white px-4 py-2.5 shadow-xl shadow-slate-200/60 transition-all hover:border-teal-300 hover:shadow-teal-100/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 md:bottom-6 md:right-5"
        aria-expanded={isOpen}
        aria-controls="clinic-ai-chat"
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
      >
        <AiLogo size={32} active={isOpen} />
        <div className="flex flex-col items-start leading-tight">
          <span className="text-sm font-semibold text-slate-800">Ask AI</span>
          <span className="text-xs text-teal-600">Clinic assistant</span>
        </div>
        {/* Live dot */}
        <div className="relative ml-0.5 flex h-2.5 w-2.5 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-50" style={{ animationDuration: "2.5s" }} />
          <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${hasUnread && !isOpen ? "bg-green-500" : "bg-teal-500"}`} />
        </div>
      </button>

      {/* ─── Panel ────────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          ref={panelRef}
          id="clinic-ai-chat"
          role="dialog"
          aria-modal="false"
          aria-label="Clinic AI assistant"
          className="fixed bottom-[calc(10rem+env(safe-area-inset-bottom,0px))] right-4 z-50 flex h-[min(540px,75vh)] w-[min(380px,93vw)] max-h-[75vh] max-w-[93vw] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/80 md:bottom-24 md:right-5"
        >
          {/* Header — dark teal strip for brand anchoring */}
          <div className="flex items-center gap-3 bg-teal-700 px-4 py-3">
            <AiLogo size={34} active />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold text-white">Dr. Jalli AI Assistant</span>
              <span className="text-xs text-teal-200">General info only — not for personal health details</span>
            </div>
            <button
              type="button"
              className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-sm text-teal-100 transition hover:bg-white/20"
              onClick={() => setIsOpen(false)}
              aria-label="Close assistant"
            >
              ✕
            </button>
          </div>

          {/* Messages — white background, dark readable text */}
          <div className="flex-1 overflow-y-auto bg-slate-50 px-4 py-3">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`mb-3 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="mr-2 mt-1 flex-shrink-0">
                    <AiLogo size={20} />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 ${
                    m.role === "user"
                      ? "rounded-tr-sm bg-teal-600 text-white"
                      : "rounded-tl-sm border border-slate-200 bg-white text-slate-800 shadow-sm"
                  }`}
                >
                  {m.role === "assistant" ? (
                    <div>
                      <div className="prose prose-sm max-w-none text-slate-800 [&_p]:my-1 [&_p]:text-slate-800 [&_ul]:my-1 [&_li]:my-0.5 [&_strong]:text-teal-700 [&_a]:text-teal-600">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[[rehypeSanitize, safeSchema]]}
                          components={{
                            a: ({ node, ...props }) => (
                              <a {...props} target="_blank" rel="noopener noreferrer"
                                className="text-teal-600 underline" />
                            ),
                          }}
                        >
                          {normalizeBotText(m.content)}
                        </ReactMarkdown>
                      </div>
                      {!!m.suggestedActions?.length && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {m.suggestedActions.slice(0, 2).map((action) => (
                            <a
                              key={`${action.label}-${action.href}`}
                              href={action.href}
                              target={action.href.startsWith("http") ? "_blank" : undefined}
                              rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                              className="rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-[11px] font-medium text-teal-700 hover:bg-teal-100"
                            >
                              {action.label}
                            </a>
                          ))}
                        </div>
                      )}
                      {!!m.suggestedPrompts?.length && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {m.suggestedPrompts.map((prompt) => (
                            <button
                              key={prompt}
                              type="button"
                              disabled={isSending}
                              onClick={() => void handleSend(undefined, prompt)}
                              className="rounded-full border border-slate-300 bg-white px-2.5 py-1 text-[11px] text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                            >
                              {prompt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="whitespace-pre-wrap text-sm">{m.content}</span>
                  )}
                </div>
              </div>
            ))}

            {isSending && (
              <div className="mb-3 flex items-start gap-2">
                <AiLogo size={20} active />
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-3.5 py-2.5 shadow-sm">
                  {[0, 0.18, 0.36].map((delay, i) => (
                    <span
                      key={i}
                      className="h-2 w-2 rounded-full bg-teal-400"
                      style={{ animation: `bounce 1s ${delay}s infinite` }}
                    />
                  ))}
                  <style jsx>{`
                    @keyframes bounce {
                      0%,60%,100% { transform:translateY(0) }
                      30% { transform:translateY(-5px) }
                    }
                  `}</style>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input — white, high contrast */}
          <form onSubmit={handleSend} className="border-t border-slate-200 bg-white px-3 pb-3 pt-2.5">
            {!messages.some((m) => m.role === "user") && (
              <div className="mb-2 flex flex-wrap gap-1.5">
                {STARTER_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void handleSend(undefined, prompt)}
                    disabled={isSending}
                    className="rounded-full border border-slate-300 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <textarea
                ref={textareaRef}
                rows={2}
                className="flex-1 resize-none rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                placeholder="Hours, location, insurance… (no personal health info)"
                aria-describedby="floating-chat-disclaimer"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                enterKeyHint="send"
              />
              <button
                type="submit"
                disabled={isSending || !input.trim()}
                className="self-end rounded-full bg-teal-600 p-2.5 text-white shadow-md shadow-teal-600/20 transition hover:bg-teal-500 disabled:opacity-40"
                aria-label="Send message"
              >
                <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                  <path d="M14.854 1.146a.5.5 0 00-.707 0L1.5 13.793V9.5a.5.5 0 00-1 0v5a.5.5 0 00.5.5h5a.5.5 0 000-1H2.207L14.854 1.854a.5.5 0 000-.708z"/>
                </svg>
              </button>
            </div>
            <p id="floating-chat-disclaimer" className="mt-1.5 text-[11px] leading-snug text-slate-500">
              {AI_CHAT_DISCLAIMER_COMPACT} · Enter to send · Shift+Enter for new line
            </p>
          </form>

          {/* Footer */}
          <div className="border-t border-slate-200 bg-white px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-slate-500">Need to speak with someone?</span>
              <a
                href={`tel:${PRACTICE_PHONE_TEL}`}
                className="rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-sm font-semibold text-teal-700 transition hover:bg-teal-100"
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
