import { NextRequest, NextResponse } from "next/server";
import { getChatAnalyticsCsv, getChatAnalyticsSummary } from "@/lib/chat-analytics";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  if (!isAuthorizedAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const days = Number(req.nextUrl.searchParams.get("days") ?? "30");
  const periodDays = Number.isFinite(days) && days > 0 && days <= 365 ? Math.floor(days) : 30;
  const format = (req.nextUrl.searchParams.get("format") ?? "json").toLowerCase();

  if (format === "csv") {
    const csv = await getChatAnalyticsCsv(periodDays);
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="chat-analytics-${periodDays}d.csv"`,
      },
    });
  }

  const summary = await getChatAnalyticsSummary(periodDays);
  return NextResponse.json(summary);
}
