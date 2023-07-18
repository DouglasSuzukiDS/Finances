/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      colors: {
        light: '#C1C7E0',
        warning: '#FFC107',
        danger: '#DC3545'
      }
    },
  },
  plugins: [],
}

