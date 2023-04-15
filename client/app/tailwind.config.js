
const { mauve, violet } = require('@radix-ui/colors');

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#', // Primary brand color
        secondary: '#', // Secondary brand color
        background: '#', // Background color for the component
        text: '#', // Text color for the component
        border: '#', // Border color for the component
        hoverBackground: '#', // Background color on hover
        activeBackground: '#', // Background color on active
        ...mauve,
        ...violet,
      }
    },
  },
  plugins: [],
}