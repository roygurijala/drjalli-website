"use client";

import { useState, useRef, useEffect } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi, I’m the Dr. Jalli MD PC AI assistant. I can answer general questions about the clinic, services, and how to visit. I can’t give personal medical advice. How can I help?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  async function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const newMessage: ChatMessage = { role: "user", content: trimmed };
    const nextMessages = [...messages, newMessage];

    setMessages(nextMessages);
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok) {
        throw new Error("Failed to reach AI.");
      }

      const data = await res.json();
      const reply: ChatMessage = {
        role: "assistant",
        content:
          data.reply ||
          "I’m sorry, I couldn’t process that just now. Please try again or call the office.",
      };

      setMessages((prev) => [...prev, reply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I’m having trouble responding right now. Please try again in a moment or call the office directly.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-[#F29B82] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-300/40 hover:bg-[#E68566] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F29B82]"
      >
        <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
        <span>Chat with AI</span>
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 z-40 w-[320px] max-w-[90vw] rounded-3xl border border-[#F3D3C6] bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#F4D9CA] px-4 py-3">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-900">
                Chat with AI
              </span>
              <span className="text-[10px] text-slate-500">
                General info only · Not for emergencies
              </span>
            </div>
            <button
              type="button"
              className="text-xs text-slate-500 hover:text-slate-800"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="max-h-80 overflow-y-auto px-4 py-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`mb-2 flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 ${
                    m.role === "user"
                      ? "bg-[#F29B82] text-white"
                      : "bg-[#FFF4EC] text-slate-800 border border-[#F6D3BF]"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isSending && (
              <div className="mb-2 flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl bg-[#FFF4EC] px-3 py-2 text-[10px] text-slate-600 border border-[#F6D3BF]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-500" />
                  <span>Thinking…</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="border-t border-[#F4D9CA] p-3">
            <textarea
              rows={2}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#F29B82] focus:bg-white focus:ring-1 focus:ring-[#F29B82]"
              placeholder="Ask about clinic hours, services, location…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[9px] text-slate-500">
                For medical emergencies, call 911. This chat cannot give
                personal medical advice.
              </span>
              <button
                type="submit"
                disabled={isSending || !input.trim()}
                className="ml-2 rounded-full bg-black px-3 py-1 text-[11px] font-semibold text-white disabled:opacity-40"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
