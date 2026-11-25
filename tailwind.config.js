/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FFFCF7",
          100: "#FBF6EE",
          200: "#F3E9D8",
          300: "#E8D5B5",
          400: "#D4B483",
        },
        forest: {
          900: "#081C15",
          800: "#1B4332",
          700: "#2D6A4F",
          600: "#40916C",
          500: "#52B788",
          100: "#D8F3DC",
        },
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Outfit", "system-ui", "sans-serif"],
      },
      boxShadow: {
        phone: "0 28px 80px -20px rgba(27, 67, 50, 0.45)",
      },
    },
  },
  plugins: [],
};
