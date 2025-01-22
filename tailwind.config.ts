import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#FF9CE7",
        secondary: "",
        success: "#00FFAC",
        info: "#1C57FF",
        warning: "#FCEA08",
        danger: "#FF5700",
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          default: "1440px",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
