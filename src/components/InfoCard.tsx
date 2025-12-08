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
  href?: string; // 👈 NEW: where to go when clicked
};

export function InfoCard({ item, pillLabel, href }: InfoCardProps) {
  const CardContent = () => (
    <article
      className="group flex h-full flex-col rounded-3xl border border-[#F3D3C6] bg-white/90 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#FFE7DA] px-3 py-1 text-[11px] font-medium text-slate-800">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/80 text-sm">
          {item.icon}
        </span>
        <span>{pillLabel}</span>
      </div>

      <h3 className="text-sm font-semibold text-slate-900 md:text-base">
        {item.name}
      </h3>

      <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-700 md:text-sm">
        {item.description}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[#FFF2EC] px-2.5 py-1 text-[10px] font-medium text-slate-700 group-hover:bg-[#FFD9C4]"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );

  // If href is provided → make the whole card clickable using <Link>
  if (href) {
    return (
      <Link
        href={href}
        className="block h-full focus:outline-none focus:ring-2 focus:ring-[#E9B6A3] focus:ring-offset-2 focus:ring-offset-[#FFF4EC]"
        aria-label={`Open ${item.name}`}
      >
        <CardContent />
      </Link>
    );
  }

  // Otherwise just render the static card
  return <CardContent />;
}
