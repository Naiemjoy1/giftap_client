import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "'Poppins', sans-serif ",
        opensans: "'Open Sans',sans-serif",
        gabarito: "'Gabarito','sans-serif'",
      },
      animation: {
        poke: "poke 0.8s ease-in-out forwards",
      },
      keyframes: {
        poke: {
          "0%": { transform: "translateX(0)" },
          "30%": { transform: "translateX(10px)" },
          "60%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ed246a",
          secondary: "#fe93bd",
          accent: "#eceef2",
          neutral: "#f7f8fd",
        },
      },
      "light",
      "synthwave",
    ],
  },
};
