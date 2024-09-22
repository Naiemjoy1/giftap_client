/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "'Poppins', sans-serif ",
        opensans: "'Open Sans',sans-serif",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#50aa1a",
          secondary: "#4ECDC4",
          accent: "#FFE66D",
          neutral: "#F7FFF7",
          "base-100": "#ffffff",
        },
      },
      "light",
      "synthwave",
    ],
  },
};
