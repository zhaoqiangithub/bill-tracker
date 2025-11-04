/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './constants/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Use Tailwind defaults; expose aliases for app theme if needed
        primary: {
          400: '#38bdf8', // sky-400
        },
        accent: {
          400: '#f472b6', // pink-400
        },
      },
    },
  },
  darkMode: 'media',
  plugins: [],
};

