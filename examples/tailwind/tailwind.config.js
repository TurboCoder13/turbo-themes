/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  presets: [require('../../dist/adapters/tailwind/preset.js')],
  theme: {
    extend: {},
  },
  plugins: [],
};
