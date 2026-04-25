import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { kv } from "@vercel/kv";

export type ChatIntent =
  | "emergency"
  | "mental-health-crisis"
  | "personal-medical"
  | "office-hours"
  | "insurance"
  | "providers"
  | "new-patient"
  | "existing-patient"
  | "location"
  | "weight-management"
  | "general";

export type ChatAnalyticsEvent = {
  ts: string;
  source: string;
  intent: ChatIntent;
  status: "ok" | "error";
  usedFallbackReply: boolean;
};

type ChatAnalyticsStore = {
  events: ChatAnalyticsEvent[];
};

export type ChatAnalyticsSummary = {
  periodDays: number;
  total: number;
  errors: number;
  fallbackReplies: number;
  byIntent: { intent: ChatIntent; count: number }[];
  unansweredByIntent: { intent: ChatIntent; count: number }[];
  bySource: { source: string; count: number }[];
  recentEvents: ChatAnalyticsEvent[];
};

const STORE_DIR = path.join(process.cwd(), ".data");
const STORE_FILE = path.join(STORE_DIR, "chat-analytics.json");
const MAX_EVENTS = 3000;
const MAX_RECENT_EVENTS = 20;
const KV_EVENTS_KEY = "chat:analytics:events";
const DEFAULT_RETENTION_DAYS = 180;
const MAX_RETENTION_DAYS = 730;

let writeQueue: Promise<void> = Promise.resolve();

function getRetentionDays() {
  const raw = Number(process.env.CHAT_ANALYTICS_RETENTION_DAYS ?? DEFAULT_RETENTION_DAYS);
  if (!Number.isFinite(raw) || raw < 1) return DEFAULT_RETENTION_DAYS;
  return Math.min(Math.floor(raw), MAX_RETENTION_DAYS);
}

function isKvConfigured() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

function eventTsToScore(ts: string) {
  const parsed = Date.parse(ts);
  return Number.isFinite(parsed) ? parsed : Date.now();
}

function safeParseEvent(raw: unknown): ChatAnalyticsEvent | null {
  if (typeof raw !== "string") return null;
  try {
    const event = JSON.parse(raw) as Partial<ChatAnalyticsEvent>;
    if (
      typeof event.ts === "string" &&
      typeof event.source === "string" &&
      typeof event.intent === "string" &&
      (event.status === "ok" || event.status === "error") &&
      typeof event.usedFallbackReply === "boolean"
    ) {
      return event as ChatAnalyticsEvent;
    }
  } catch {
    return null;
  }
  return null;
}

async function readStore(): Promise<ChatAnalyticsStore> {
  try {
    const raw = await readFile(STORE_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<ChatAnalyticsStore>;
    if (!Array.isArray(parsed.events)) return { events: [] };
    return {
      events: parsed.events.filter((event) => {
        return (
          typeof event?.ts === "string" &&
          typeof event?.source === "string" &&
          typeof event?.intent === "string" &&
          (event?.status === "ok" || event?.status === "error") &&
          typeof event?.usedFallbackReply === "boolean"
        );
      }),
    };
  } catch {
    return { events: [] };
  }
}

async function writeStore(store: ChatAnalyticsStore) {
  await mkdir(STORE_DIR, { recursive: true });
  await writeFile(STORE_FILE, JSON.stringify(store, null, 2), "utf8");
}

export async function appendChatAnalyticsEvent(event: ChatAnalyticsEvent) {
  if (isKvConfigured()) {
    const retentionDays = getRetentionDays();
    const cutoff = Date.now() - retentionDays * 24 * 60 * 60 * 1000;
    await kv.zadd(KV_EVENTS_KEY, {
      score: eventTsToScore(event.ts),
      member: JSON.stringify(event),
    });
    await kv.zremrangebyscore(KV_EVENTS_KEY, 0, cutoff);
    return;
  }

  // Never let analytics writes interrupt user-facing requests.
  writeQueue = writeQueue
    .catch(() => undefined)
    .then(async () => {
      const store = await readStore();
      const nextEvents = [...store.events, event].slice(-MAX_EVENTS);
      await writeStore({ events: nextEvents });
    })
    .catch((err) => {
      console.warn(
        "chat analytics write skipped:",
        err instanceof Error ? err.message : "unknown"
      );
    });
  await writeQueue;
}

export async function getChatAnalyticsSummary(periodDays = 30): Promise<ChatAnalyticsSummary> {
  const events = await getChatAnalyticsEvents(periodDays);

  const byIntentMap = new Map<ChatIntent, number>();
  const unansweredByIntentMap = new Map<ChatIntent, number>();
  const bySourceMap = new Map<string, number>();
  let errors = 0;
  let fallbackReplies = 0;

  for (const event of events) {
    byIntentMap.set(event.intent, (byIntentMap.get(event.intent) ?? 0) + 1);
    bySourceMap.set(event.source, (bySourceMap.get(event.source) ?? 0) + 1);
    if (event.status === "error") errors += 1;
    if (event.usedFallbackReply) fallbackReplies += 1;
    if (event.status === "error" || event.usedFallbackReply) {
      unansweredByIntentMap.set(
        event.intent,
        (unansweredByIntentMap.get(event.intent) ?? 0) + 1
      );
    }
  }

  const byIntent = [...byIntentMap.entries()]
    .map(([intent, count]) => ({ intent, count }))
    .sort((a, b) => b.count - a.count);

  const bySource = [...bySourceMap.entries()]
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count);

  const unansweredByIntent = [...unansweredByIntentMap.entries()]
    .map(([intent, count]) => ({ intent, count }))
    .sort((a, b) => b.count - a.count);

  const recentEvents = [...events]
    .sort((a, b) => Date.parse(b.ts) - Date.parse(a.ts))
    .slice(0, MAX_RECENT_EVENTS);

  return {
    periodDays,
    total: events.length,
    errors,
    fallbackReplies,
    byIntent,
    unansweredByIntent,
    bySource,
    recentEvents,
  };
}

export async function getChatAnalyticsEvents(periodDays = 30): Promise<ChatAnalyticsEvent[]> {
  if (isKvConfigured()) {
    const retentionDays = getRetentionDays();
    const boundedDays = Math.min(Math.max(periodDays, 1), retentionDays);
    const cutoff = Date.now() - boundedDays * 24 * 60 * 60 * 1000;
    const rows = await kv.zrangebyscore(KV_EVENTS_KEY, cutoff, Date.now());
    return rows
      .map((row) => safeParseEvent(row))
      .filter((event): event is ChatAnalyticsEvent => Boolean(event));
  }

  const store = await readStore();
  const boundedDays = Math.min(Math.max(periodDays, 1), getRetentionDays());
  const cutoff = Date.now() - boundedDays * 24 * 60 * 60 * 1000;
  return store.events.filter((event) => {
    const ts = Date.parse(event.ts);
    return Number.isFinite(ts) && ts >= cutoff;
  });
}

function toCsvValue(value: string) {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function getChatAnalyticsCsv(periodDays = 7): Promise<string> {
  const events = await getChatAnalyticsEvents(periodDays);
  const rows = [
    ["timestamp", "source", "intent", "status", "usedFallbackReply"],
    ...events.map((event) => [
      event.ts,
      event.source,
      event.intent,
      event.status,
      event.usedFallbackReply ? "true" : "false",
    ]),
  ];
  return rows.map((row) => row.map((cell) => toCsvValue(String(cell))).join(",")).join("\n");
}
