/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],

  darkMode: "class",
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          md: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      colors: {
        DARKBLUE05: "#6148FF",
        DARKBLUE04: "#EBF3FC",
        DARKBLUE03: "#489CFF",
        DARKBLUE02: "#D0B7E6",
        DARKBLUE01: "#E2D4F0",
        LIMEGREEN05: "#AA9B87",
        LIMEGREEN04: "#D4C2A8",
        LIMEGREEN03: "#FFE9CA",
        LIMEGREEN02: "#FFF0DC",
        LIMEGREEN01: "#FFF8ED",
        ALERTRED: "#FF0000",
        ALERTYELLOW: "#F9CC00",
        ALERTGREEN: "#73CA5C",
        NEUTRAL05: "#222222",
        NEUTRAL04: "#3C3C3C",
        NEUTRAL03: "#8A8A8A",
        NEUTRAL02: "#D0D0D0",
        LightBlue5: "#EBF3FC",
        LightBlue4: "#489CFF",
        DEEPGRAY: "#8A8A8A",
        YELLOW05: "#10b981",
        YELLOW04: "#34d399",
        BLUE05: "#1e293b",
        WHITE05: "#FDFDFD",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        Montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [import("flowbite/plugin")],
};
