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
        primary: "#7C45F9",
        secondary: "#102F22",
        success: "#102F22",
        info: "#D9F4F9",
        warning: "#FAE4D0",
        danger: "#d7191c",
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
