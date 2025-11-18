// src/app/chat/page.tsx (App Router)
// or src/pages/chat.tsx (Pages Router, with minor tweaks)

"use client";

import React, { useState } from "react";
import ChatMessage from "@/components/ChatMessage";
import ProviderStrip from "@/components/ProviderStrip";

type ChatRole = "assistant" | "user";

interface ChatMessageType {
  role: ChatRole;
  content: string;
}

const QUICK_ACTIONS: { label: string; prompt: string }[] = [
  {
    label: "Office Hours",
    prompt: "What are your office hours?",
  },
  {
    label: "Providers",
    prompt: "Who are the providers at your clinic?",
  },
  {
    label: "Location & Parking",
    prompt: "What is your address and where do I park?",
  },
  {
    label: "Insurance",
    prompt: "What insurances do you accept?",
  },
  {
    label: "New Patient Appointment",
    prompt: "I am a new patient. How do I schedule an appointment?",
  },
  {
    label: "Existing Patient Appointment",
    prompt: "I am an existing patient. How do I schedule an appointment?",
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      role: "assistant",
      content:
        "Hello! I’m the virtual assistant for Dr. Jalli MD PC. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const callChatApi = async (updatedMessages: ChatMessageType[]) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();
      const replyContent =
        data.reply ?? "I’m sorry, I couldn’t generate a response just now.";

      const botMessage: ChatMessageType = {
        role: "assistant",
        content: replyContent,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
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

    const userMessage: ChatMessageType = {
      role: "user",
      content: text,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    if (!overridePrompt) setInput("");

    await callChatApi(updatedMessages);
  };

  const handleQuickAction = (prompt: string) => {
    void sendMessage(prompt);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
    setUploadStatus(null);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    setUploadStatus("Uploading...");
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      setUploadStatus("Uploaded successfully.");

      // Optional: let the assistant know a file was uploaded
      const userMessage: ChatMessageType = {
        role: "user",
        content: `I just uploaded a file named "${selectedFile.name}".`,
      };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      await callChatApi(updatedMessages);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("Upload failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto border rounded-lg shadow-sm">
      {/* Header with logo + subtitle */}
      <header className="flex items-center gap-3 px-4 py-3 border-b bg-white">
        <img
          src="/images/logo-drjalli.png"
          alt="Dr. Jalli MD PC Logo"
          className="h-10 w-10 rounded-full object-cover"
          onError={(e) => {
            // Fallback to text logo if image not found
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div>
          <div className="font-semibold text-gray-900">
            Dr. Jalli MD PC – Virtual Assistant
          </div>
          <div className="text-sm text-gray-600">
            Questions about hours, providers, appointments, or insurance.
          </div>
        </div>
      </header>
      <ProviderStrip />
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col">
        {messages.map((m, idx) => (
          <ChatMessage key={idx} role={m.role} content={m.content} />
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
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
      <div className="px-4 pb-2 border-t bg-gray-50">
        <div className="flex flex-wrap gap-2 py-2">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.label}
              type="button"
              className="text-xs px-2 py-1 rounded-full border border-gray-300 bg-white hover:bg-gray-100"
              onClick={() => handleQuickAction(action.prompt)}
              disabled={isLoading}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* File upload + input row */}
      <div className="p-4 border-t bg-white flex flex-col gap-3">
        {/* File upload row */}
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="text-sm"
          />
          <button
            type="button"
            onClick={handleFileUpload}
            disabled={!selectedFile}
            className="text-xs px-3 py-1 rounded bg-gray-800 text-white disabled:opacity-40"
          >
            Upload
          </button>
          {uploadStatus && (
            <span className="text-xs text-gray-600">{uploadStatus}</span>
          )}
        </div>

        {/* Chat input row */}
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded px-3 py-2 text-sm"
            value={input}
            placeholder="Type your message..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isLoading && sendMessage()}
          />
          <button
            onClick={() => sendMessage()}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Send
          </button>
        </div>

        <p className="text-[11px] text-gray-500">
          No medical advice. For emergencies, call 911. For personal questions,
          call (301) 686-8554.
        </p>
      </div>
    </div>
  );
}
