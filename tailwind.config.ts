import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");

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
        secondary: "#fafafa",
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
    plugin(({ addBase, theme }: { addBase: Function; theme: Function }) => {
      addBase({
        ".scrollbar": {
          overflowY: "auto",
          scrollbarColor: `${theme("colors.gray.400")} ${theme("transparent")}`,
        },
        ".scrollbar::-webkit-scrollbar": {
          height: "11px",
          width: "10px",
        },
        ".scrollbar::-webkit-scrollbar-thumb": {
          backgroundColor: theme("colors.gray.400"),
          borderRadius: "8px",
        },
        ".scrollbar::-webkit-scrollbar-thumb:hover": {
          backgroundColor: theme("colors.gray.500"),
        },
        ".scrollbar::-webkit-scrollbar-track-piece": {
          backgroundColor: "transparent",
        },
      });
    }),
  ],
};
export default config;
