import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:  ["var(--font-cairo)", "Cairo", "sans-serif"],
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#25D366",
          50:  "#f0fdf4",
          500: "#25D366",
          600: "#1ebe5d",
          700: "#15a34a",
        },
        wa: {
          green: "#25D366",
          teal:  "#128C7E",
          dark:  "#075E54",
          light: "#DCF8C6",
          bg:    "#ECE5DD",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "float-slow": {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        float:            "float 3s ease-in-out infinite",
        "float-slow":     "float-slow 5s ease-in-out infinite",
        shimmer:          "shimmer 2s linear infinite",
        "fade-up":        "fade-up 0.6s ease-out",
      },
      boxShadow: {
        "glow":     "0 0 40px rgba(37,211,102,0.20)",
        "glow-lg":  "0 0 80px rgba(37,211,102,0.30)",
        "card":     "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)",
        "card-lg":  "0 4px 8px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.10)",
        "premium":  "0 0 0 1px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
