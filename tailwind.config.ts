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
      textOverflow: {
        ellipsis: "ellipsis",
      },
      colors: {
        primary: "#f1f5f9",
        secondary: "white",
        accent: "#16a34a",
        accentHover: "#15803d",
      },
    },
  },
  plugins: [
    require("daisyui"),
    function ({ addUtilities }: any) {
      const newUtilities = {
        ".ellipsis": {
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
export default config;
