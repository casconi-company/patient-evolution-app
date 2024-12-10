import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        white: "#ffffff",
        black: "#000000",
        gray: {
          100: "#E0E0E0",
          200: "#D0D0D0",
          300: "#C8C8C8",
          400: "#B8B8B8",
          500: "#A0A0A0",
          600: "#888888",
          700: "#686868",
        },
        primary: "#1D1D1D",
        secondary: "#8865BA",
        blue: {
          50: "#55D0E5",
        },
        green: {
          50: "#4C9B37",
        },
        pink: {
          50: "#D32D8C",
        },
        yellow: {
          50: "#E59C0A",
        },
        negative: {
          100: "#c25848",
          200: "#bf3e2a",
          300: "#ba230b",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
