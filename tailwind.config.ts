import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0a0a0a",
          elevated: "#121212",
          raised: "#191919",
          light: "#fafafa",
          "light-elevated": "#f1f1ef"
        },
        border: {
          DEFAULT: "#242424",
          hover: "#3a3a3a",
          light: "#e2e2e0"
        },
        ink: {
          DEFAULT: "#ededed",
          secondary: "#9a9a9a",
          muted: "#5c5c5c",
          light: "#111111",
          "light-secondary": "#5c5c5c"
        },
        red: {
          DEFAULT: "#e5303f",
          dim: "#7a1c24",
          bright: "#ff4a58",
          glow: "rgba(229,48,63,0.35)"
        },
        signal: {
          green: "#3ecf6e"
        }
      },
      fontFamily: {
        mono: ["var(--font-mono)", "JetBrains Mono", "Fira Code", "monospace"],
        display: ["var(--font-mono)", "JetBrains Mono", "monospace"]
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)"
      },
      backgroundSize: {
        grid: "40px 40px"
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" }
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" }
        }
      },
      animation: {
        blink: "blink 1s step-end infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        scan: "scan 8s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
