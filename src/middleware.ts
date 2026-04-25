import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthConfigured, isAuthorizedAdminRequest } from "./lib/admin-auth";

function unauthorizedResponse() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Dr Jalli Admin", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}

export function middleware(req: NextRequest) {
  if (!isAdminAuthConfigured()) {
    return new NextResponse(
      "Admin authentication is not configured. Set CHAT_ADMIN_USERNAME and CHAT_ADMIN_PASSWORD.",
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }

  if (!isAuthorizedAdminRequest(req)) {
    return unauthorizedResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chat-analytics/:path*", "/api/chat/analytics/:path*"],
};
