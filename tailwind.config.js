/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: 'var(--primary-color)',
        surface: 'var(--surface-color)',
        page: 'var(--background-color)',
      },
    },
  },
  plugins: [],
}

