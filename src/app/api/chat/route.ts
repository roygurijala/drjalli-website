import { NextResponse } from "next/server";

export async function POST() {
  // Placeholder: later we’ll connect this to Vercel AI SDK
  return NextResponse.json(
    { message: "Chat API not yet implemented." },
    { status: 501 }
  );
}
