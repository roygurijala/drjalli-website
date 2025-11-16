// src/components/WaveDivider.tsx

export function WaveDivider({
    flip = false,
    color = "#FFF7F0",
  }: {
    flip?: boolean;
    color?: string;
  }) {
    return (
      <div
        className={`overflow-hidden leading-none ${
          flip ? "rotate-180" : ""
        }`}
      >
        <svg
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          className="h-[60px] w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z"
            fill={color}
          ></path>
        </svg>
      </div>
    );
  }
  