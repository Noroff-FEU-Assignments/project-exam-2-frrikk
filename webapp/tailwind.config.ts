import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "pastel-purple": "#986CF9",
        "pastel-pink": "#F28DB4",
        "pastel-lightPurple": "#AA9DFF",
        "pastel-lightGreen": "#83E4BF",
        "pastel-green": "#176E78",
        "pastel-yellow": "#FFCD1D",
      },
    },
  },
  plugins: [],
};
export default config;
