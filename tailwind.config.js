/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: { 400: '#e8b820', 500: '#d4a012', 600: '#b07d0c' },
        olive: { 500: '#738238', 600: '#5a662b', 700: '#454f24' },
        cream: { 50: '#fefdf8', 100: '#fdf9ed', 200: '#faf2d5' },
        charcoal: { 800: '#454545', 900: '#3d3d3d', 950: '#1f1f1f' }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Noto Sans Arabic', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}