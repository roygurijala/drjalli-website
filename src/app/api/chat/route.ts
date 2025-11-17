import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import {
  PRACTICE_NAME,
  PRACTICE_PHONE,
  PRACTICE_PHONE_TEL,
  PRACTICE_ADDRESS_LINE1,
  PRACTICE_CITY_STATE_ZIP,
} from "@/lib/constants";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = Array.isArray(body.messages) ? body.messages : [];

    const systemMessage = {
      role: "system" as const,
      content:
        [
          `You are an AI assistant for ${PRACTICE_NAME}.`,
          `Authoritative details (never invent or change):`,
          `• Phone: ${PRACTICE_PHONE} (tel:${PRACTICE_PHONE_TEL})`,
          `• Address: ${PRACTICE_ADDRESS_LINE1}, ${PRACTICE_CITY_STATE_ZIP}`,
          `Rules:`,
          `1) If asked for phone/contact, ALWAYS reply with exactly ${PRACTICE_PHONE}.`,
          `2) If unsure, say you don't know—do NOT guess numbers.`,
          `3) No personal medical advice. For emergencies instruct to call 911.`,
        ].join("\n"),
    };

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0.2,
      max_tokens: 500,
      messages: [systemMessage, ...messages],
    });

    let reply =
      completion.choices[0]?.message?.content ??
      "Sorry, I couldn't respond just now.";

    // --- Safety net: normalize any phone-like digits back to canonical ---
    // If the assistant happened to output a different number, swap it.
    const phoneLike = /\(?\d{3}\)?[ -.]?\d{3}[ -.]?\d{4}/g;
    reply = reply.replace(phoneLike, PRACTICE_PHONE);

    return NextResponse.json({ reply });
  } catch (e) {
    return NextResponse.json(
      { error: "Chat error. Please try again shortly." },
      { status: 500 }
    );
  }
}