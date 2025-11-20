// src/components/AnnouncementBar.tsx
import AnnouncementBarClient from "./AnnouncementBarClient";
import { activeAnnouncements, fetchAnnouncementConfig } from "@/lib/announcement";

export default async function AnnouncementBar() {
  // Fail soft: if Edge Config is unreachable, just render nothing
  const cfg = await fetchAnnouncementConfig().catch(() => null);
  const messages = activeAnnouncements(cfg);

  if (!messages.length) return null;

  return (
    <AnnouncementBarClient
      messages={messages}
      rotateMs={cfg?.rotateMs ?? 7000}
      mode={cfg?.mode ?? "rotate"}
    />
  );
}
