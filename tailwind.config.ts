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
          light: "#e0f4ff",
          DEFAULT: "#0b7fc1",
          dark: "#07537f",
        },
      },
    },
  },
  plugins: [],
};

export default config;
