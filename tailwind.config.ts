import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        line: "var(--line)",
      },
      fontFamily: {
        display: ["var(--font-clash-display)", "Arial", "sans-serif"],
        sans: ["var(--font-satoshi)", "Arial", "sans-serif"],
      },
      letterSpacing: {
        editorial: "0",
      },
      maxWidth: {
        content: "90rem",
      },
    },
  },
  plugins: [],
};

export default config;
