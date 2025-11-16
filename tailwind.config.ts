// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#FFE7DA",     // soft peach
          DEFAULT: "#F29B82",   // warm coral/peach
          dark: "#D46A4A",      // deeper accent
        },
        neutralBg: "#FFF7F0",   // page background
        pill: "#F6E6DE",        // little tag backgrounds
      },
      borderRadius: {
        "3xl": "1.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
