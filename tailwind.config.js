/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      backgroundColor: {
        "primary-blue": "#2e5899",
        "primary-dark-blue": "#172c4b",
        "primary-light-blue": "#466fae",
        "secondary-red": "#d20030",
        "button-green": "#01b691",
      },
      colors: {
        "btn-green": "#13B295",
        "primary-blue": "#2e5899",
        "primary-dark-blue": "#172c4b",
        "primary-light-blue": "#466fae",
        "secondary-red": "#d20030",
      },
      borderColor: {
        "btn-green": "#13B295",
        "primary-blue": "#2e5899",
        "primary-dark-blue": "#172c4b",
        "primary-light-blue": "#466fae",
        "secondary-red": "#d20030",
      },
    },
  },
  plugins: [],
};
