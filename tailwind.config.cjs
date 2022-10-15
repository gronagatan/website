/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        patua: ['"Patua One"', 'serif'],
        // roboto: ['"Roboto Slab"', 'serif'],
        // zilla: ['"Zilla Slab"', 'serif'],
        sans: ['Jost', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        test: '#456723'
      },
      gridTemplateColumns: {
        'auto-fit-40': 'repeat(auto-fit, minmax(10rem, 1fr))'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
