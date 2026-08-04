import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0a",
        "bg-alt": "#121212",
        surface: "#181818",
        "surface-2": "#1e1e1e",
        border: "#2b2b2b",
        red: {
          DEFAULT: "#e13a4b",
          dim: "#7a1f29",
        },
        cream: "#f2ede2",
        muted: {
          DEFAULT: "#8c8880",
          2: "#5c5952",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
