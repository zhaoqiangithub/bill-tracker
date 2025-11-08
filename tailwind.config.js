const nativewind = require('nativewind/preset');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './constants/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [nativewind],
  theme: {
    extend: {
      colors: {
        night: {
          900: '#050607',
          800: '#0B0F0E',
          700: '#141917',
          600: '#1C221F',
        },
        jungle: {
          900: '#0D110F',
          800: '#151B18',
        },
        neon: '#9FE870',
        limeglass: '#74D34A',
        graphite: '#1F2622',
        mist: '#9AA5A0',
      },
      borderRadius: {
        '4xl': '32px',
      },
      boxShadow: {
        card: '0px 20px 40px rgba(5, 6, 7, 0.65)',
      },
    },
  },
  darkMode: 'media',
  plugins: [],
};
