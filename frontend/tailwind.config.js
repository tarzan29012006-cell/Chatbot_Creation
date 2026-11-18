/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        svce: {
          navy: '#0b192c',
          darkBlue: '#0c2340',
          primary: '#1254cf',
          primaryHover: '#0b44aa',
          yellow: '#f9b916',
          yellowHover: '#e5a50b',
          lightBlue: '#ebf4ff',
          assistantBg: '#f0f6ff',
          cardBorder: '#e2e8f0',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
