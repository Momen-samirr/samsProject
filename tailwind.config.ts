import type { Config } from "tailwindcss";

const config: Config = {
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
        lamaSky: "#A7E4FA", // A fresher, more vibrant sky blue
        lamaSkyLight: "#E5F8FF", // A softer, cleaner light sky blue
        lamaPurple: "#B8B6FF", // A more striking, modern purple
        lamaPurpleLight: "#EAE8FF", // A subtle, airy lavender
        lamaYellow: "#FAD65E", // A warmer, more golden yellow
        lamaYellowLight: "#FFF9DC", // A soft, creamy pastel yellow
      },
    },
  },
  plugins: [],
};
export default config;
