/** @type {import('tailwindcss').Config} */

const config = { 
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        glowCircle: {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: "0.8",
            boxShadow: "0 0 0px 10px rgba(0, 0, 0, 0.5)", // gold
          },
          "50%": {
            transform: "scale(1.4)",
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
      },
      animation: {
        levelUpGlow: "glowCircle 1.5s ease-out",
        levelText: "levelText 1s ease-out",
      },
    },
  },
  plugins: [],
  safelist:['scrollbar-none',], //PurgeCSS가 "사용되지 않는 것"으로 간주하고 제거했을수도있으므로 강제로 적용 시킴킴
};

export default config;
