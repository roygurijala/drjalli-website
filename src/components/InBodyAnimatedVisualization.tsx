"use client";

/**
 * Animated body outline + sample metric callouts — used on home InBody section and /inbody.
 */
export function InBodyAnimatedVisualization() {
  return (
    <div className="flex items-center justify-center rounded-3xl border border-teal-100 bg-teal-50 py-6 sm:py-8">
      <div className="relative mx-auto max-w-[min(100%,240px)]">
        <svg
          viewBox="0 0 240 480"
          className="relative mx-auto h-auto w-full max-h-[min(70vh,22rem)] sm:max-h-[26rem]"
          aria-label="Body composition scan visualization"
          role="img"
        >
          <ellipse
            cx="120"
            cy="42"
            rx="34"
            ry="38"
            stroke="#0D9488"
            strokeWidth="1.5"
            fill="rgba(13,148,136,0.08)"
          />
          <rect
            x="108"
            y="78"
            width="24"
            height="22"
            rx="5"
            fill="rgba(13,148,136,0.06)"
            stroke="#0D9488"
            strokeWidth="1.2"
          />
          <path
            d="M78 100 L68 100 L54 240 L95 252 L120 257 L145 252 L186 240 L172 100 L162 100 Q148 90 120 90 Q92 90 78 100Z"
            fill="rgba(13,148,136,0.05)"
            stroke="#0D9488"
            strokeWidth="1.5"
          />
          <path
            d="M78 108 L50 116 L34 200 L48 205 L66 124"
            fill="rgba(13,148,136,0.04)"
            stroke="#0891B2"
            strokeWidth="1.3"
          />
          <path
            d="M162 108 L190 116 L206 200 L192 205 L174 124"
            fill="rgba(13,148,136,0.04)"
            stroke="#0891B2"
            strokeWidth="1.3"
          />
          <path
            d="M95 252 L83 258 L72 408 L95 414 L113 258"
            fill="rgba(13,148,136,0.04)"
            stroke="#0D9488"
            strokeWidth="1.3"
          />
          <path
            d="M145 252 L157 258 L168 408 L145 414 L127 258"
            fill="rgba(13,148,136,0.04)"
            stroke="#0D9488"
            strokeWidth="1.3"
          />

          <circle cx="120" cy="168" r="5" fill="#0D9488">
            <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite" />
            <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="56" cy="156" r="4" fill="#0891B2">
            <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2.5s" begin="0.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="184" cy="156" r="4" fill="#0891B2">
            <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2.5s" begin="0.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="93" cy="330" r="4" fill="#0D9488">
            <animate attributeName="opacity" values="0.7;0.2;0.7" dur="3s" begin="0.6s" repeatCount="indefinite" />
          </circle>
          <circle cx="147" cy="330" r="4" fill="#0D9488">
            <animate attributeName="opacity" values="0.7;0.2;0.7" dur="3s" begin="1.2s" repeatCount="indefinite" />
          </circle>

          <line
            x1="35"
            y1="80"
            x2="205"
            y2="80"
            stroke="#0D9488"
            strokeWidth="0.8"
            strokeDasharray="5 5"
          >
            <animate attributeName="y1" values="80;420;80" dur="4s" repeatCount="indefinite" />
            <animate attributeName="y2" values="80;420;80" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="4s" repeatCount="indefinite" />
          </line>
        </svg>

        <div className="absolute right-0 top-6 rounded-xl border border-teal-200 bg-white px-2 py-1.5 text-center shadow-sm sm:top-10 sm:px-3 sm:py-2">
          <p className="text-[10px] font-semibold text-teal-700 sm:text-xs">Body Fat</p>
          <p className="text-xs font-bold text-slate-900 sm:text-sm">22.4%</p>
        </div>
        <div className="absolute -left-1 top-[28%] rounded-xl border border-cyan-200 bg-white px-2 py-1.5 text-center shadow-sm sm:-left-2 sm:px-3 sm:py-2">
          <p className="text-[10px] font-semibold text-cyan-700 sm:text-xs">Muscle</p>
          <p className="text-xs font-bold text-slate-900 sm:text-sm">34.2 kg</p>
        </div>
        <div className="absolute bottom-12 right-0 rounded-xl border border-sky-200 bg-white px-2 py-1.5 text-center shadow-sm sm:bottom-16 sm:px-3 sm:py-2">
          <p className="text-[10px] font-semibold text-sky-700 sm:text-xs">Hydration</p>
          <p className="text-xs font-bold text-slate-900 sm:text-sm">Optimal</p>
        </div>
      </div>
    </div>
  );
}
