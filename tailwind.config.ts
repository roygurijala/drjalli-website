// tailwind.config.ts
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-sora)", "Sora", "sans-serif"],
        body: ["var(--font-jakarta)", "'Plus Jakarta Sans'", "sans-serif"],
        sans: ["var(--font-jakarta)", "'Plus Jakarta Sans'", "sans-serif"],
      },
      colors: {
        // Medical-tech teal palette (primary brand)
        brand: {
          light: "#CCFBF1",
          DEFAULT: "#0DBFA0",
          dark: "#0A9E88",
        },
        // Deep navy (hero sections, dark UI)
        navy: {
          950: "#060D1F",
          900: "#0B1628",
          800: "#0F1E38",
          700: "#162947",
          600: "#1E3A5F",
        },
        // Neutral page bg (replaces warm peach)
        neutralBg: "#F0F7FF",
        // Keep for backward compat with components not yet updated
        pill: "#E0F2FE",
      },
      borderRadius: {
        "3xl": "1.75rem",
        "4xl": "2.5rem",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out both",
        "fade-in": "fadeIn 0.5s ease-out both",
        "spin-slow": "spin 12s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "grid-pattern": `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        "grid-40": "40px 40px",
      },
      boxShadow: {
        "teal-glow": "0 0 30px rgba(13, 191, 160, 0.25)",
        "teal-glow-lg": "0 0 60px rgba(13, 191, 160, 0.35)",
      },
    },
  },
  plugins: [typography],
};

export default config;
