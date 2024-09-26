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
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ed246a",
          secondary: "#fe93bd",
          accent: "#eceef2",
          neutral: "#F7FFF7",
          "base-100": "#ffffff",
        },
      },
      "light",
      "synthwave",
    ],
  },
};
