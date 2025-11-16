/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f3f5ff",
          100: "#e4e8ff",
          200: "#c8ceff",
          300: "#a4adff",
          400: "#7d85ff",
          500: "#5a59ff",
          600: "#463fe5",
          700: "#342fba",
          800: "#252186",
          900: "#191659"
        }
      }
    }
  },
  plugins: []
};
