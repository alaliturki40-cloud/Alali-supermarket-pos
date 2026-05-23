/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        amber: {
          50:  '#FAEEDA',
          100: '#FAC775',
          200: '#EF9F27',
          400: '#BA7517',
          600: '#854F0B',
          800: '#633806',
          900: '#412402',
        }
      }
    }
  },
  plugins: [],
}
