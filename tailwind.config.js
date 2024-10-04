/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { poppins: '"Poppins"' },
      colors: {
        "dark-layer1": "#262729",
        "dark-layer2": "#222327",
        "dark-layer3": "rgb(39 39 42)",
        "light-bg": "#dfe6eb",
        form: "#eef2f5",
        footer: "hsla(205, 42%, 17%, 1)",
        // "hsla(212,99%,61%,.2)",
      },
    },
  },
  plugins: [require("daisyui")],
};
