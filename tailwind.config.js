/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-pink': '#FFF5F7',
        'soft-rose': '#FFB6C1',
        'rose': '#FF91A4',
        'deep-rose': '#D63384',
        'gradient-end': '#FF4D94',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

