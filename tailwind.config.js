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
        500: '#6b7280',
        600: '#4b5563',
      },
      slate: {
        300: '#e2e8f0',
      },
      white: '#fff',
      red: {
        600: '#dc2626',
      },
      dark: '#3C3B3B',
      blue: {
        700: '#1d4ed8 ',
      },
    },
  },
  plugins: [],
}
