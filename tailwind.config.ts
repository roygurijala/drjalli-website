// tailwind.config.ts
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";  // ⬅️ ADD THIS

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#FFE7DA",
          DEFAULT: "#F29B82",
          dark: "#D46A4A",
        },
        neutralBg: "#FFF7F0",
        pill: "#F6E6DE",
      },
      borderRadius: {
        "3xl": "1.75rem",
      },
    },
  },
  plugins: [
    typography, // ⬅️ ADD THIS
  ],
};

export default config;
