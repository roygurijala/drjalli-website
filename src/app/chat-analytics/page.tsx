"use client";

import { useEffect, useMemo, useState } from "react";

type ChatIntent =
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

type Summary = {
  periodDays: number;
  total: number;
  errors: number;
  fallbackReplies: number;
  byIntent: { intent: ChatIntent; count: number }[];
  unansweredByIntent: { intent: ChatIntent; count: number }[];
  bySource: { source: string; count: number }[];
  recentEvents: {
    ts: string;
    source: string;
    intent: ChatIntent;
    status: "ok" | "error";
    usedFallbackReply: boolean;
  }[];
};

function pct(part: number, total: number) {
  if (!total) return "0%";
  return `${Math.round((part / total) * 100)}%`;
}

export default function ChatAnalyticsPage() {
  const [days, setDays] = useState(30);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadSummary(nextDays = days) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/chat/analytics?days=${nextDays}`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        throw new Error(`Failed (${res.status})`);
      }
      const data = (await res.json()) as Summary;
      setSummary(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch analytics");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadSummary(30);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cards = useMemo(() => {
    if (!summary) return [];
    return [
      { label: "Total chats", value: summary.total.toString() },
      { label: "Errors", value: `${summary.errors} (${pct(summary.errors, summary.total)})` },
      {
        label: "Fallback replies",
        value: `${summary.fallbackReplies} (${pct(summary.fallbackReplies, summary.total)})`,
      },
      { label: "Window", value: `${summary.periodDays} days` },
    ];
  }, [summary]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Chat Analytics</h1>
          <p className="text-sm text-slate-600">
            Anonymous intent and quality trends from your website chatbot.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="days" className="text-sm text-slate-600">
            Time window
          </label>
          <select
            id="days"
            className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          >
            <option value={7}>7 days</option>
            <option value={30}>30 days</option>
            <option value={90}>90 days</option>
          </select>
          <button
            type="button"
            onClick={() => void loadSummary(days)}
            className="rounded-md bg-teal-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-teal-500"
          >
            Refresh
          </button>
          <a
            href="/api/chat/analytics?days=7&format=csv"
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Export Weekly CSV
          </a>
        </div>
      </div>

      {loading && <p className="text-sm text-slate-500">Loading analytics...</p>}
      {error && <p className="text-sm text-red-600">Could not load analytics: {error}</p>}

      {!loading && !error && summary && (
        <>
          <section className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => (
              <article key={card.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-500">{card.label}</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">{card.value}</p>
              </article>
            ))}
          </section>

          <section className="mb-6 grid gap-4 lg:grid-cols-2">
            <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-base font-semibold text-slate-900">Top Intents</h2>
              <div className="space-y-2">
                {summary.byIntent.length === 0 && (
                  <p className="text-sm text-slate-500">No events in this range yet.</p>
                )}
                {summary.byIntent.slice(0, 8).map((row) => (
                  <div key={row.intent} className="flex items-center justify-between text-sm">
                    <span className="text-slate-700">{row.intent}</span>
                    <span className="font-medium text-slate-900">{row.count}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-base font-semibold text-slate-900">Traffic Sources</h2>
              <div className="space-y-2">
                {summary.bySource.length === 0 && (
                  <p className="text-sm text-slate-500">No events in this range yet.</p>
                )}
                {summary.bySource.map((row) => (
                  <div key={row.source} className="flex items-center justify-between text-sm">
                    <span className="text-slate-700">{row.source}</span>
                    <span className="font-medium text-slate-900">{row.count}</span>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="mb-6">
            <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-base font-semibold text-slate-900">Top Unanswered Intents</h2>
              <p className="mb-3 text-sm text-slate-600">
                Counts of intents where responses had errors or fallback output.
              </p>
              <div className="space-y-2">
                {summary.unansweredByIntent.length === 0 && (
                  <p className="text-sm text-slate-500">
                    No unanswered intents in this range.
                  </p>
                )}
                {summary.unansweredByIntent.slice(0, 8).map((row) => (
                  <div key={row.intent} className="flex items-center justify-between text-sm">
                    <span className="text-slate-700">{row.intent}</span>
                    <span className="font-medium text-slate-900">{row.count}</span>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-base font-semibold text-slate-900">Recent Events</h2>
            {summary.recentEvents.length === 0 ? (
              <p className="text-sm text-slate-500">No recent events yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-600">
                      <th className="px-2 py-2 font-medium">Time</th>
                      <th className="px-2 py-2 font-medium">Source</th>
                      <th className="px-2 py-2 font-medium">Intent</th>
                      <th className="px-2 py-2 font-medium">Status</th>
                      <th className="px-2 py-2 font-medium">Fallback</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.recentEvents.map((event, idx) => (
                      <tr key={`${event.ts}-${idx}`} className="border-b border-slate-100">
                        <td className="px-2 py-2 text-slate-700">
                          {new Date(event.ts).toLocaleString()}
                        </td>
                        <td className="px-2 py-2 text-slate-700">{event.source}</td>
                        <td className="px-2 py-2 text-slate-700">{event.intent}</td>
                        <td className="px-2 py-2">
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                              event.status === "ok"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {event.status}
                          </span>
                        </td>
                        <td className="px-2 py-2 text-slate-700">
                          {event.usedFallbackReply ? "Yes" : "No"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}
