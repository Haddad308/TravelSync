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
        main: "#FAFAFA",
        second: "#EFF3F4",
        primary: "#CDF463",
      },
    },
  },
  plugins: [nextui()],
  darkMode: "class",
};

export default tailwindConfig;
