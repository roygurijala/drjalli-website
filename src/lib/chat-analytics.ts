import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

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

type ChatAnalyticsEvent = {
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

let writeQueue: Promise<void> = Promise.resolve();

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
  writeQueue = writeQueue.then(async () => {
    const store = await readStore();
    const nextEvents = [...store.events, event].slice(-MAX_EVENTS);
    await writeStore({ events: nextEvents });
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
  const store = await readStore();
  const cutoff = Date.now() - periodDays * 24 * 60 * 60 * 1000;
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
