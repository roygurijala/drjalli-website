// components/InfoCard.tsx
import Link from "next/link";

export type InfoCardItem = {
  name: string;
  description: string;
  tags: string[];
  icon: string;
  href?: string;
};

type InfoCardProps = {
  item: InfoCardItem;
  pillLabel: string;
  href?: string;
};

const focusRing =
  "focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-white";

export function InfoCard({ item, pillLabel, href }: InfoCardProps) {
  const CardContent = () => (
    <article className="group flex h-full flex-col rounded-3xl border border-teal-200/70 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-teal-300/80 hover:shadow-md">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-200/60 bg-teal-50 px-3 py-1 text-[11px] font-medium text-slate-800">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm shadow-sm">
          {item.icon}
        </span>
        <span>{pillLabel}</span>
      </div>

      <h3 className="font-display text-sm font-semibold text-slate-900 md:text-base">
        {item.name}
      </h3>

      <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-700 md:text-sm">
        {item.description}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-teal-100 bg-teal-50/80 px-2.5 py-1 text-[10px] font-medium text-slate-700 group-hover:bg-teal-100/80"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );

  if (href) {
    const isExternal = href.startsWith("http");

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`block h-full rounded-3xl ${focusRing}`}
          aria-label={`Open ${item.name}`}
        >
          <CardContent />
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={`block h-full rounded-3xl ${focusRing}`}
        aria-label={`Open ${item.name}`}
      >
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
}
