import { nextui } from "@nextui-org/react";

const tailwindConfig = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#415A77",
        second: "#344860",
      },
    },
  },
  plugins: [nextui()],
  darkMode: "class",
};

export default tailwindConfig;
