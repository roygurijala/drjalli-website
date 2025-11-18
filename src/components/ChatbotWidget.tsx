// src/components/ChatbotWidget.tsx
"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

type ChatRole = "assistant" | "user";

interface ChatMessageType {
  role: ChatRole;
  content: string;
}

const QUICK_ACTIONS: { label: string; prompt: string }[] = [
  { label: "Office Hours", prompt: "What are your office hours?" },
  { label: "Providers", prompt: "Who are the providers at your clinic?" },
  {
    label: "Location & Parking",
    prompt: "What is your address and where do I park?",
  },
  { label: "Insurance", prompt: "What insurances do you accept?" },
  {
    label: "New Patient Appointment",
    prompt: "I am a new patient. How do I schedule an appointment?",
  },
  {
    label: "Existing Patient Appointment",
    prompt: "I am an existing patient. How do I schedule an appointment?",
  },
];

// Local bubble component – this does NOT use ChatMessage,
// it renders Markdown directly so we can be sure it’s applied.
function Bubble({ role, content }: ChatMessageType) {
  const isAssistant = role === "assistant";

  return (
    <div
      className={`w-full py-2 px-3 my-1 rounded-3xl max-w-[85%] ${
        isAssistant ? "bg-orange-50 self-start" : "bg-blue-600 self-end"
      }`}
    >
      <div
        className={
          isAssistant
            ? "prose prose-sm max-w-none text-gray-900"
            : "prose prose-sm prose-invert max-w-none"
        }
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      role: "assistant",
      content:
        "Hello! I’m the virtual assistant for **Dr. Jalli MD PC**. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const callChatApi = async (updatedMessages: ChatMessageType[]) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();
      const replyContent: string =
        data.reply ?? "I’m sorry, I couldn’t generate a response just now.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: replyContent,
        },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong reaching the assistant. Please try again or call the office.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (overridePrompt?: string) => {
    const text = (overridePrompt ?? input).trim();
    if (!text) return;

    const userMessage: ChatMessageType = { role: "user", content: text };
    const updated = [...messages, userMessage];

    setMessages(updated);
    if (!overridePrompt) setInput("");

    await callChatApi(updated);
  };

  const handleQuickAction = (prompt: string) => {
    void sendMessage(prompt);
  };

  // Floating button (closed)
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white shadow-lg hover:bg-brand-dark flex items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-green-400" />
        Chat with AI
      </button>
    );
  }

  // Open widget
  return (
    <div className="fixed bottom-4 right-4 z-40 w-80 max-w-[90vw] rounded-2xl border border-slate-200 bg-white shadow-xl flex flex-col">
      {/* Header */}
      <div className="border-b px-3 py-2 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-900">Chat with AI</p>
          <p className="mt-0.5 text-[11px] text-slate-500">
            General info only · Not for emergencies
          </p>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="text-xs text-slate-500 hover:text-slate-800"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="h-64 overflow-y-auto px-3 py-2 flex flex-col">
        {messages.map((m, idx) => (
          <Bubble key={idx} role={m.role} content={m.content} />
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-1">
            <span className="inline-flex gap-1">
              <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.15s]" />
              <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.3s]" />
            </span>
            <span>Assistant is typing…</span>
          </div>
        )}
      </div>

      {/* Quick buttons */}
      <div className="px-3 pb-1 border-t bg-neutralBg">
        <div className="flex flex-wrap gap-1.5 py-1.5">
          {QUICK_ACTIONS.map((a) => (
            <button
              key={a.label}
              type="button"
              className="text-[10px] px-2 py-1 rounded-full border border-brand/50 bg-white hover:bg-brand-light/40"
              onClick={() => handleQuickAction(a.prompt)}
              disabled={isLoading}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="px-3 pb-2 bg-neutralBg border-t">
        <div className="flex gap-2 mb-1">
          <input
            className="flex-1 border rounded-full px-3 py-1.5 text-xs border-brand/50 bg-white"
            value={input}
            placeholder="Ask about clinic hours, services, location..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && !isLoading && sendMessage()
            }
          />
          <button
            onClick={() => sendMessage()}
            disabled={isLoading || !input.trim()}
            className="bg-gray-700 text-white px-3 py-1.5 rounded-full text-xs disabled:opacity-50"
          >
            Send
          </button>
        </div>
        <p className="text-[10px] text-slate-500">
          For emergencies, call 911. No personal medical advice here.
        </p>
      </div>
    </div>
  );
}
