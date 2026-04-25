// src/components/ChatMessage.tsx

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

type SuggestedAction = {
  label: string;
  href: string;
  kind: "call" | "portal" | "directions" | "link";
};

interface ChatMessageProps {
  role: "assistant" | "user";
  content: string;
  suggestedActions?: SuggestedAction[];
  suggestedPrompts?: string[];
  onPromptSelect?: (prompt: string) => void;
}

const safeSchema = {
  ...defaultSchema,
  tagNames: ["p", "br", "strong", "em", "u", "s", "a", "ul", "ol", "li", "blockquote", "code"],
  attributes: { a: ["href", "title", "rel", "target"] },
};

export default function ChatMessage({
  role,
  content,
  suggestedActions,
  suggestedPrompts,
  onPromptSelect,
}: ChatMessageProps) {
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
          rehypePlugins={[[rehypeSanitize, safeSchema]]}
          components={{
            a: ({ node, ...props }) => (
              <a
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                className={isAssistant ? "text-teal-700 underline" : "underline"}
              />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
        {isAssistant && !!suggestedActions?.length && (
          <div className="mt-3 flex flex-wrap gap-2">
            {suggestedActions.map((action) => (
              <a
                key={`${action.label}-${action.href}`}
                href={action.href}
                target={action.href.startsWith("http") ? "_blank" : undefined}
                rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700 hover:bg-teal-100"
              >
                {action.label}
              </a>
            ))}
          </div>
        )}
        {isAssistant && !!suggestedPrompts?.length && (
          <div className="mt-2 flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => onPromptSelect?.(prompt)}
                className="rounded-full border border-gray-300 bg-white px-3 py-1 text-xs text-gray-700 hover:bg-gray-100"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
