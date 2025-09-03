/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        michroma: ["Michroma", "sans-serif"],
        oxanium: ["Oxanium", "sans-serif"],
        saira: ["Saira", "sans-serif"],
      },
    },
  },
  plugins: [require("tailgrids/plugin")],
};
