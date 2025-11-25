const base = "sticky top-0 z-40 border-b";
const isMarquee = mode === "marquee";

return (
  <div className={`${base} ${variantClasses(current.variant)}`} aria-live="polite">
    <div className="mx-auto flex max-w-6xl items-center gap-3 px-3 py-2">
      {/* Label pill */}
      <span className="inline-flex shrink-0 items-center rounded-full bg-black/10 px-2.5 py-0.5 text-[11px] font-bold">
        Announcement
      </span>

      {/* Message */}
      {isMarquee ? (
  <div ref={containerRef} className="relative w-full overflow-hidden">
    {/* key restarts the animation when the message (or duration) changes */}
    <div
      key={`${current.id}-${marqueeMs}`}
      ref={textRef}
      className="marqueeLoop whitespace-nowrap font-semibold will-change-transform"
      // marqueeMs should ALREADY include your tiny pause buffer (e.g., +300–2000ms)
      style={{
        animationDuration: `${Math.max(1, marqueeMs) / 1000}s`,
        animationIterationCount: "infinite",
        animationTimingFunction: "linear",
      }}
      title={current.text}
    >
      {current.href ? (
        // opens in the SAME tab (no target="_blank")
        <a href={current.href} className="underline decoration-2 underline-offset-[3px]">
          {current.text}
        </a>
      ) : (
        current.text
      )}
    </div>

    {/* Scoped keyframes: 0–85% = scroll, 85–100% = brief pause offscreen */}
    <style jsx>{`
      .marqueeLoop {
        animation-name: dj-marquee-loop;
      }
      @keyframes dj-marquee-loop {
        0% { transform: translateX(100%); }
        85% { transform: translateX(-100%); }  /* finish pass */
        100% { transform: translateX(-100%); } /* hold to create a pause */
      }
    `}</style>
  </div>
) : (
  <div className="flex min-w-0 flex-1 items-center">
    {current.href ? (
      <a
        href={current.href}
        className="truncate font-semibold underline decoration-2 underline-offset-[3px]"
        title={current.text}
      >
        {current.text}
      </a>
    ) : (
      <p className="truncate font-semibold" title={current.text}>
        {current.text}
      </p>
    )}
  </div>
)}
    </div>
  </div>
);
}