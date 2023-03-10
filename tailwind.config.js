/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens:{
      'sm': {'max': '767px'},
      'md': {'max': '1100px'},
    }
  },
  variants: {
    opacity: ({ after }) => after(['disabled'])
  },
  plugins: [],
}
