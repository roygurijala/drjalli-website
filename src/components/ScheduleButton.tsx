// src/components/ScheduleButton.tsx
"use client";

import Link from "next/link";

type Props = {
  href: string;
  small?: boolean;
  className?: string;
};

export function ScheduleButton({ href, small, className }: Props) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center justify-center rounded-full bg-black text-white",
        small ? "px-3 py-1.5 text-[11px]" : "px-4 py-2 text-sm",
        "font-semibold shadow-sm hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black",
        className ?? "",
      ].join(" ")}
    >
      Schedule appointment
    </Link>
  );
}
