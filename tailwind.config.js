/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './renderer/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',

  ],
  theme: {
    extend: {
      colors: {
        'rm-blue-100': '#367CF4',
        'rm-blue-200': '#367cc8',
      },
    },
  },
  plugins: [],
};