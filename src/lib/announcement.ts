// src/lib/announcement.ts
import { get } from '@vercel/edge-config';

export type AnnouncementVariant = 'info' | 'warning' | 'success' | 'danger';

export type AnnouncementMessage = {
  id: string;
  text: string;
  /** Optional ISO strings with timezone, e.g. "2025-11-20T00:00:00-05:00" */
  startsAt?: string;
  endsAt?: string;
  href?: string;            // optional link target
  variant?: AnnouncementVariant;
};

export type AnnouncementConfig = {
  messages: AnnouncementMessage[];
  /** 'rotate' = cycle through messages, 'marquee' = scroll, 'single' = first only */
  mode?: 'rotate' | 'marquee' | 'single';
  rotateMs?: number;        // delay between messages
};

export async function fetchAnnouncementConfig(): Promise<AnnouncementConfig | null> {
  // Expecting Edge Config key "announcements"
  // If not set, return null and the server component will no-op gracefully.
  const data = await get<AnnouncementConfig>('announcements');
  if (!data) return null;

  // Normalize shape defensively
  return {
    messages: Array.isArray(data.messages) ? data.messages : [],
    mode: data.mode ?? 'rotate',
    rotateMs: typeof data.rotateMs === 'number' ? data.rotateMs : 7000,
  };
}

export function isActive(m: AnnouncementMessage, now = new Date()): boolean {
  const start = m.startsAt ? new Date(m.startsAt) : null;
  const end = m.endsAt ? new Date(m.endsAt) : null;
  // Active if: (no start or now >= start) AND (no end or now <= end)
  return (!start || now >= start) && (!end || now <= end);
}

export function activeAnnouncements(
  cfg: AnnouncementConfig | null,
  now = new Date()
): AnnouncementMessage[] {
  if (!cfg?.messages?.length) return [];
  return cfg.messages.filter((m) => isActive(m, now));
}
