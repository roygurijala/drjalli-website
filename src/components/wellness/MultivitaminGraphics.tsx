/**
 * Decorative SVG art for multivitamin / wellness sections — colorful, no external assets.
 */

export function MultivitaminHeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 440 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="mv-bg" x1="0" y1="0" x2="440" y2="300" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F0FDFA" />
          <stop offset="0.45" stopColor="#ECFEFF" />
          <stop offset="1" stopColor="#FDF4FF" />
        </linearGradient>
        <linearGradient id="mv-sun" x1="60" y1="40" x2="200" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE68A" />
          <stop offset="1" stopColor="#FB923C" />
        </linearGradient>
        <linearGradient id="mv-leaf" x1="280" y1="180" x2="400" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6EE7B7" />
          <stop offset="1" stopColor="#14B8A6" />
        </linearGradient>
        <linearGradient id="mv-cap" x1="160" y1="120" x2="260" y2="220" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDA4AF" />
          <stop offset="0.5" stopColor="#C084FC" />
          <stop offset="1" stopColor="#818CF8" />
        </linearGradient>
      </defs>
      <rect width="440" height="300" rx="28" fill="url(#mv-bg)" />
      {/* soft blobs */}
      <circle cx="72" cy="68" r="48" fill="url(#mv-sun)" opacity="0.85" />
      <ellipse cx="360" cy="220" rx="56" ry="44" fill="#A5F3FC" opacity="0.55" />
      <ellipse cx="320" cy="90" rx="38" ry="32" fill="#FBCFE8" opacity="0.7" />
      {/* capsule large */}
      <g transform="translate(175 95) rotate(-18 45 55)">
        <rect x="0" y="20" width="90" height="36" rx="18" fill="url(#mv-cap)" />
        <rect x="36" y="20" width="54" height="36" rx="18" fill="#6366F1" opacity="0.92" />
        <ellipse cx="45" cy="38" rx="22" ry="14" fill="white" opacity="0.25" />
      </g>
      {/* small capsules */}
      <g opacity="0.9">
        <rect x="48" y="200" width="52" height="20" rx="10" fill="#F472B6" transform="rotate(12 74 210)" />
        <rect x="58" y="200" width="28" height="20" rx="10" fill="#FB7185" transform="rotate(12 74 210)" />
      </g>
      <g opacity="0.88">
        <rect x="310" y="140" width="56" height="22" rx="11" fill="#34D399" transform="rotate(-8 338 151)" />
        <rect x="338" y="140" width="28" height="22" rx="11" fill="#10B981" transform="rotate(-8 338 151)" />
      </g>
      {/* leaf */}
      <path
        d="M320 200 Q 380 140 400 80 Q 360 120 320 200 Z"
        fill="url(#mv-leaf)"
        opacity="0.9"
      />
      <path
        d="M325 195 Q 350 150 385 95"
        stroke="#0F766E"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.35"
      />
      {/* vitamin letters as bubbles */}
      {[
        { x: 95, y: 145, c: "#FBBF24", t: "D" },
        { x: 255, y: 58, c: "#38BDF8", t: "C" },
        { x: 378, y: 168, c: "#A78BFA", t: "B" },
      ].map((b) => (
        <g key={b.t}>
          <circle cx={b.x} cy={b.y} r="22" fill={b.c} opacity="0.92" />
          <text
            x={b.x}
            y={b.y + 7}
            textAnchor="middle"
            fill="white"
            fontSize="18"
            fontWeight="700"
            fontFamily="system-ui, sans-serif"
          >
            {b.t}
          </text>
        </g>
      ))}
      {/* bottle silhouette */}
      <g transform="translate(32 118)">
        <rect x="18" y="28" width="56" height="92" rx="10" fill="#E0E7FF" stroke="#A5B4FC" strokeWidth="2" />
        <rect x="28" y="12" width="36" height="22" rx="6" fill="#C7D2FE" stroke="#818CF8" strokeWidth="2" />
        <rect x="34" y="44" width="24" height="36" rx="4" fill="#EEF2FF" opacity="0.9" />
      </g>
    </svg>
  );
}

export function MultivitaminTileCapsules({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 100" fill="none" aria-hidden>
      <defs>
        <linearGradient id="tile1" x1="0" y1="0" x2="120" y2="100">
          <stop stopColor="#FECDD3" />
          <stop offset="1" stopColor="#FDA4AF" />
        </linearGradient>
      </defs>
      <rect width="120" height="100" rx="16" fill="url(#tile1)" opacity="0.35" />
      <rect x="20" y="38" width="80" height="28" rx="14" fill="#EC4899" opacity="0.9" />
      <rect x="52" y="38" width="48" height="28" rx="14" fill="#DB2777" />
      <circle cx="40" cy="24" r="8" fill="#FBBF24" />
      <circle cx="78" cy="20" r="6" fill="#34D399" />
    </svg>
  );
}

export function MultivitaminTileCitrus({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 100" fill="none" aria-hidden>
      <defs>
        <linearGradient id="tile2" x1="20" y1="80" x2="100" y2="10">
          <stop stopColor="#FDE047" />
          <stop offset="1" stopColor="#FB923C" />
        </linearGradient>
      </defs>
      <rect width="120" height="100" rx="16" fill="#FFFBEB" />
      <circle cx="58" cy="48" r="36" fill="url(#tile2)" opacity="0.95" />
      <path
        d="M58 22 Q 72 38 58 52 Q 44 38 58 22"
        fill="#4ADE80"
        opacity="0.85"
      />
      <ellipse cx="58" cy="50" rx="28" ry="26" fill="none" stroke="#F59E0B" strokeWidth="2" opacity="0.4" />
    </svg>
  );
}

export function MultivitaminTileShield({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 100" fill="none" aria-hidden>
      <defs>
        <linearGradient id="tile3" x1="60" y1="8" x2="60" y2="92">
          <stop stopColor="#5EEAD4" />
          <stop offset="1" stopColor="#0D9488" />
        </linearGradient>
      </defs>
      <rect width="120" height="100" rx="16" fill="#F0FDFA" />
      <path
        d="M60 12 L 92 24 V 52 Q 92 78 60 92 Q 28 78 28 52 V 24 Z"
        fill="url(#tile3)"
        opacity="0.92"
      />
      <path
        d="M48 48 L56 58 L74 36"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
