import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        stage: {
          DEFAULT: "#E30A04",
          50: "#FFF2F1",
          100: "#FEDEDD",
          200: "#FEB7B5",
          300: "#FD908D",
          400: "#FC6965",
          500: "#FC423D",
          600: "#FB1B15",
          700: "#E30A04",
          800: "#AC0803",
          900: "#750502",
          950: "#590402",
        },
      },
      fontFamily: {
        sans: ["var(--font-prompt)", "sans-serif"],
        serif: ["var(--font-stix-two-text)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
