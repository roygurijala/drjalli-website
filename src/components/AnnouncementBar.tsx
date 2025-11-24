// src/components/AnnouncementBar.tsx
// Server Component (no "use client")
import dynamic from "next/dynamic";
import { activeAnnouncements, fetchAnnouncementConfig } from "@/lib/announcement";

// Dynamically load the client component on the browser only.
const AnnouncementBarClient = dynamic(() => import("./AnnouncementBarClient"), {
  ssr: false,
});

export default async function AnnouncementBar() {
  // Soft-fail: if Edge Config fails, treat as empty config
  const cfg = await fetchAnnouncementConfig().catch(() => null);

  const messages = Array.isArray(activeAnnouncements(cfg))
    ? activeAnnouncements(cfg)
    : [];

  const rotateMs =
    typeof cfg?.rotateMs === "number" && cfg.rotateMs > 0 ? cfg.rotateMs : 7000;

  const mode =
    cfg?.mode === "marquee" || cfg?.mode === "single" || cfg?.mode === "rotate"
      ? cfg.mode
      : "rotate";

  // Always render the client wrapper; it will no-op when messages is empty.
  return (
    <AnnouncementBarClient
      messages={messages}
      rotateMs={rotateMs}
      mode={mode}
    />
  );
}
