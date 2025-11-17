// src/app/api/chat/route.ts

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body.messages ?? [];

    // Basic safety: ensure messages array exists
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided." },
        { status: 400 }
      );
    }

    // System prompt to keep it on-topic and safe
    const systemMessage = {
      role: "system" as const,
      content:
        "You are an AI assistant for a primary care clinic called Dr. Jalli MD PC in Rockville, Maryland. " +
        "You can answer general questions about the clinic, services, scheduling, location, and logistics. " +
        "You must not provide personal medical advice, diagnoses, or treatment plans. " +
        "Always remind users to call the office or 911 for urgent or personal medical issues.",
    };

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [systemMessage, ...messages],
      temperature: 0.3,
      max_tokens: 400,
    });

    const reply =
      completion.choices[0]?.message?.content ??
      "I’m sorry, I couldn’t generate a response just now.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      {
        error: "Something went wrong processing your request.",
      },
      { status: 500 }
    );
  }
}
