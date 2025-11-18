// src/components/ChatMessage.tsx

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface ChatMessageProps {
  role: "assistant" | "user";
  content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isAssistant = role === "assistant";

  return (
    <div
      className={`w-full py-3 px-4 my-2 rounded-3xl max-w-[75%] ${
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
