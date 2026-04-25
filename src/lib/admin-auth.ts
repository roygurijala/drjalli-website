import { NextRequest } from "next/server";

function getBasicAuthCredentials(req: NextRequest): { username: string; password: string } | null {
  const authHeader = req.headers.get("authorization") ?? "";
  if (!authHeader.startsWith("Basic ")) return null;

  const encoded = authHeader.slice("Basic ".length).trim();
  try {
    const decoded = atob(encoded);
    const separatorIndex = decoded.indexOf(":");
    if (separatorIndex < 0) return null;
    const username = decoded.slice(0, separatorIndex);
    const password = decoded.slice(separatorIndex + 1);
    return { username, password };
  } catch {
    return null;
  }
}

export function isAdminAuthConfigured() {
  const username = process.env.CHAT_ADMIN_USERNAME?.trim();
  const password = process.env.CHAT_ADMIN_PASSWORD?.trim();
  return Boolean(username && password);
}

export function isAuthorizedAdminRequest(req: NextRequest): boolean {
  const token = process.env.CHAT_ANALYTICS_TOKEN?.trim();
  const bearer = req.headers.get("authorization") ?? "";
  const bearerToken = bearer.startsWith("Bearer ")
    ? bearer.slice("Bearer ".length).trim()
    : "";

  if (token && bearerToken === token) return true;

  const expectedUser = process.env.CHAT_ADMIN_USERNAME?.trim();
  const expectedPass = process.env.CHAT_ADMIN_PASSWORD?.trim();
  if (!expectedUser || !expectedPass) return false;

  const basic = getBasicAuthCredentials(req);
  if (!basic) return false;

  return basic.username === expectedUser && basic.password === expectedPass;
}
