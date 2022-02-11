module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Nunito', 'sans-serif'],
    },
    colors: {
      primary: {
        500: '#009F93',
        600: '#006A62',
      },
      gray: {
        200: '#e5e7eb',
      },
      white: '#fff',
      red: {
        600: '#dc2626',
      },
    },
  },
  plugins: [],
}
