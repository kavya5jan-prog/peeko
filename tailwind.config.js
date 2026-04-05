/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        peeko: {
          bg: "#EBF9FF",
          logo: "#006573",
          headline: "#003441",
          body: "#2E6273",
          ctaStart: "#006573",
          ctaEnd: "#005864",
          onPrimary: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
