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
          "30%": { transform: "translateX(10px)" }, // Move right
          "60%": { transform: "translateX(0)" }, // Back to original
          "100%": { transform: "translateX(0)" }, // Ensure it ends at original
        },
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
