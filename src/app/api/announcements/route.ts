import { get } from "@vercel/edge-config";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  try {
    const announcements = await get("announcements");
    return NextResponse.json({ ok: true, announcements });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
