/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,html}',
  ],
  theme: {
    fontFamily: {
      heading: ['"Times New Roman"', 'Times', 'serif'],
      body: ['Arial', 'Helvetica', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#18428F',
          blue: '#18428F',
          cyan: '#00C2F3',
          dark: '#41434C',
          orange: '#B64B28',
        },
        secondary: {
          navy: '#19226D',
          orange: '#F26524',
          light: '#E2E1EE',
          off: '#F8F8F8',
        },
      },
    },
  },
  plugins: [],
};
