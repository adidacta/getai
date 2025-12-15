/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'getstatus-blue': '#0c6dfa',
        'getstatus-rose': '#ff4081',
        'getstatus-indigo': '#3f51b5',
        'getstatus-grey': '#d3d3d3',
      },
      fontFamily: {
        'noto-sans': ['"Noto Sans"', 'sans-serif'],
        'noto-sans-hebrew': ['"Noto Sans Hebrew"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
