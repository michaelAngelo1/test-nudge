/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '9000': '9000px',
      },
    },
    screens: {
      'mobile': '600px',
      'tablet': '800px',
      'laptop': '1000px'
    }
  },
  plugins: [
    require('daisyui'),
  ],
}