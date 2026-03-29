"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";
import { getServiceHref, services } from "@/data/services";

type Props = {
  heading?: string;
  options?: EmblaOptionsType;
  /** When false, users swipe/click arrows only — better for reading comprehension */
  autoplayEnabled?: boolean;
  autoplayDelayMs?: number;
  /** Extra classes on the outer `<section>` (e.g. top border when below featured grid) */
  sectionClassName?: string;
};

export default function ServicesCarousel({
  heading = "Services we provide",
  options,
  autoplayEnabled = false,
  autoplayDelayMs = 8500,
  sectionClassName = "",
}: Props) {
  const plugins = autoplayEnabled
    ? [
        Autoplay({
          delay: autoplayDelayMs,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]
    : [];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      dragFree: true,
      slidesToScroll: 1,
      ...options,
    },
    plugins
  );

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section
      className={`mx-auto max-w-6xl px-4 ${sectionClassName ?? "py-12"}`}
    >
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
            {heading}
          </h2>
          <p className="mt-1 max-w-xl text-sm text-slate-600">
            Swipe or use the arrows to browse every service—we&apos;re here for prevention, chronic
            care, testing, and more.
          </p>
        </div>
        <div className="hidden shrink-0 gap-3 md:flex">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous"
            className="h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next"
            className="h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50"
          >
            ›
          </button>
        </div>
      </div>

      <div className="relative">
        {/* big side arrows */}
        <button
          type="button"
          aria-label="Previous"
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 md:block"
        >
          <div className="h-24 w-24 -translate-x-1/2 rounded-full bg-navy-900/90 text-white/95 shadow-md">
            <div className="flex h-full items-center justify-center text-3xl">‹</div>
          </div>
        </button>

        <button
          type="button"
          aria-label="Next"
          onClick={scrollNext}
          className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 md:block"
        >
          <div className="h-24 w-24 translate-x-1/2 rounded-full bg-navy-900/90 text-white/95 shadow-md">
            <div className="flex h-full items-center justify-center text-3xl">›</div>
          </div>
        </button>

        {/* track */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {services.map((s) => (
              <div
                key={s.slug}
                className="min-w-0 shrink-0 basis-[78%] px-2 sm:basis-[55%] md:basis-[40%] lg:basis-[32%]"
              >
                <Link
                  href={getServiceHref(s)}
                  prefetch
                  draggable={false}
                  className="block h-full rounded-2xl border border-teal-200/80 bg-gradient-to-br from-teal-50/90 to-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                  aria-label={`Open ${s.title}`}
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                    <span aria-hidden>{s.icon ?? "✨"}</span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm text-slate-700">{s.blurb}</p>

                  {s.tags?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <span className="mt-4 inline-flex text-sm font-semibold text-slate-900">
                    Learn more →
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}