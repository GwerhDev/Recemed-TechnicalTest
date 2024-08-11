/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./renderer/**/*.{vue,js,ts,jsx,tsx}",
    "./pages/**/*.{vue,js,ts,jsx,tsx}",
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
}

