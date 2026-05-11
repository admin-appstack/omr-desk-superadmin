/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          500: '#1a1b4b',
          600: '#2d3282',
          700: '#1e40af',
          900: '#1a1b4b',
        },
        accent: {
          500: '#f47621',
          600: '#e85b24',
        }
      },
    },
  },
  corePlugins: {
    preflight: true,
  },
}
