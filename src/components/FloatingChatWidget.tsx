// src/components/FloatingChatWidget.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { PRACTICE_PHONE, PRACTICE_PHONE_TEL } from "@/lib/constants";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

type ChatMessage = { role: "user" | "assistant"; content: string };

/** Convert <br/> to newlines so Markdown renders correctly */
function normalizeBotText(src: string) {
  return src.replace(/<br\s*\/?>/gi, "\n").trim();
}

/** Safe schema: allow basic formatting + links */
const safeSchema = {
  ...defaultSchema,
  tagNames: ["p", "br", "strong", "em", "u", "s", "a", "ul", "ol", "li", "blockquote", "code"],
  attributes: {
    a: ["href", "title", "rel", "target"],
  },
};

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi, I’m the **Dr. Jalli MD PC** AI assistant.\n\nI can answer general questions about the clinic, services, and how to visit. I can’t give personal medical advice.\n\n**How can I help?**",
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
      endRef.current?.scrollIntoView({ behavior: "instant", block: "end" } as any);
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
      const inside = panelRef.current?.contains(t) ?? false;
      const onLauncher = launcherRef.current?.contains(t) ?? false;
      if (!inside && !onLauncher) setIsOpen(false);
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
      const reply =
        data.reply ??
        "I’m sorry, I couldn’t process that just now. Please try again or call the office.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I’m having trouble responding right now. Please try again shortly or call the office directly.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  // NEW: Enter submits, Shift+Enter makes a newline, and IME composition is respected.
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    const onlyEnter =
      e.key === "Enter" && !e.shiftKey && !e.altKey && !e.ctrlKey && !e.metaKey;

    // If user is composing text (IME), ignore Enter.
    const isComposing = (e.nativeEvent as any)?.isComposing;

    if (onlyEnter && !isComposing) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-[#F29B82] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-300/40 hover:bg-[#E68566] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F29B82]"
        aria-expanded={isOpen}
        aria-controls="clinic-ai-chat"
      >
        <span
          className={`inline-block h-2 w-2 rounded-full transition ${
            hasUnread ? "bg-green-500 animate-pulse" : "bg-green-400"
          }`}
          aria-hidden
        />
        <span>Chat with AI</span>
      </button>

      {/* Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          id="clinic-ai-chat"
          role="dialog"
          aria-modal="false"
          aria-label="Clinic AI chat"
          className="fixed bottom-16 right-4 z-40 flex h-[520px] w-[360px] max-h-[70vh] max-w-[92vw] flex-col overflow-hidden rounded-3xl border border-[#F3D3C6] bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#F4D9CA] px-4 py-3">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-900">Chat with AI</span>
              <span className="text-[10px] text-slate-500">
                General info only · Not for emergencies
              </span>
            </div>
            <button
              type="button"
              className="text-xs text-slate-500 hover:text-slate-800"
              onClick={() => setIsOpen(false)}
              aria-label="Minimize chat"
              title="Minimize"
            >
              ⤢
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`mb-2 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 ${
                    m.role === "user"
                      ? "bg-[#F29B82] text-white"
                      : "bg-[#FFF4EC] text-slate-800 border border-[#F6D3BF]"
                  }`}
                >
                  {m.role === "assistant" ? (
                    <div className="prose prose-sm prose-slate max-w-none [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[[rehypeSanitize, safeSchema]]}
                        components={{
                          a: ({ node, ...props }) => (
                            <a {...props} target="_blank" rel="noopener noreferrer" />
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
            <div ref={endRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="border-t border-[#F4D9CA] px-3 pt-3 pb-4">
            <textarea
              ref={textareaRef}
              rows={3}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-[13px] text-slate-800 outline-none focus:border-[#F29B82] focus:bg-white focus:ring-1 focus:ring-[#F29B82]"
              placeholder="Ask about clinic hours, services, location…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              enterKeyHint="send"
            />
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[10px] text-slate-500">
                Press <strong>Enter</strong> to send, <strong>Shift+Enter</strong> for a new line.
              </span>
              <button
                type="submit"
                disabled={isSending || !input.trim()}
                className="ml-2 rounded-full bg-black px-4 py-2 text-[12px] font-semibold text-white shadow-sm hover:bg-slate-900 disabled:opacity-40"
              >
                Send
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="border-t border-[#F4D9CA] bg-[#FFF7F0] px-4 py-3 text-[11px] text-slate-700">
            <div className="flex items-center justify-between gap-3">
              <span>Need to talk to a person?</span>
              <a
                href={`tel:${PRACTICE_PHONE_TEL}`}
                className="rounded-full bg-black px-3.5 py-1.5 text-[11px] font-semibold text-white hover:bg-slate-900"
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
