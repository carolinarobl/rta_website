/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {

       keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.4s ease-out forwards',
      },
      
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
