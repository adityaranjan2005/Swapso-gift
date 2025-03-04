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
      boxShadow: {
        'inner-custom': 'inset 0px -7px 11px 0px rgba(164, 143, 255, 0.12)',
        'right': '40px 0 10px rgba(0, 255, 255, 0.5)', // Shadow only on the right side
        'left': '-4px 0 30px rgba(0, 255, 255, 0.5)', // Shadow only on the left side
        'top': '0 -4px 30px rgba(0, 255, 255, 0.5)', // Shadow only on the top
        'bottom': '0 4px 30px rgba(0, 255, 255, 0.5)', // Shadow only on the bottom
      },
      colors: {
        'custom-blue': '#CBFBFF',
      },
      backdropBlur: {
        'extreme': '420px',
      },
      backgroundGradient: {
        'text-gradient': 'linear-gradient(180deg, #FFFFFF 26.5%, #999999 37.86%)',
      },
    },
  },
  plugins: [],
};
export default config;
