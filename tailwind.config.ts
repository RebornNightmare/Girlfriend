import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF4D8D",
        secondary: "#FF7EB3",
        accent: "#6A1B9A",
        bg: "#FFF8FC",
        ink: "#222222",
        gold: "#F4C869",
        midnight: "#170B2E",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      backgroundImage: {
        aurora:
          "radial-gradient(60% 50% at 20% 20%, rgba(255,77,141,0.35) 0%, rgba(255,77,141,0) 60%), radial-gradient(50% 40% at 80% 10%, rgba(106,27,154,0.30) 0%, rgba(106,27,154,0) 60%), radial-gradient(45% 45% at 60% 80%, rgba(255,126,179,0.30) 0%, rgba(255,126,179,0) 60%)",
        "paper-texture":
          "repeating-linear-gradient(180deg, rgba(34,34,34,0.035) 0px, rgba(34,34,34,0.035) 1px, transparent 1px, transparent 32px)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(4deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.08)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
