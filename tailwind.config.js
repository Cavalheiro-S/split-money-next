const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#00B528',
        'background': '#EEEEEE',
      },
      fontFamily: {
        'sans': ['var(--font-noto-sans)', ...fontFamily.sans],
        'heading': ['var(--font-rubik)', ...fontFamily.sans],
      }
    },
  },
  plugins: [],
}
