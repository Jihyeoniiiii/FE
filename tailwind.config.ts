/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        glowCircle: {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: "0.8",
            boxShadow: "0 0 0px 10px rgba(0, 0, 0, 0.5)",
          },
          "50%": {
            transform: "scale(5.0)",
            opacity: "0",
            boxShadow: "0 0 40px 30px rgba(0, 0, 0, 0)",
          },
        },
        levelText: {
          "0%": { transform: "scale(0.5)", opacity: "0" },
          "30%": { transform: "scale(1.2)", opacity: "1" },
          "100%": {
            transform: "scale(1) translateY(-50px)",
            opacity: "0",
          },
        },

        confettiShrink: {
          "0%": { transform: "scale(1) rotate(0deg)" },
          "100%": { transform: "scale(0) rotate(180deg)" },
        },
      },
      animation: {
        levelUpGlow: "glowCircle 1.5s ease-out",
        levelText: "levelText 1s ease-out",
        confettiShrink: "confettiShrink 0.5s ease-in forwards",
      },
    },
  },
  // Add Tailwind plugins
  plugins: [require("tailwind-scrollbar")],
  safelist: [
    "scrollbar-none",
    "animate-confettiGrow",
    "animate-confettiShrink",
  ],
};

module.exports = config;
