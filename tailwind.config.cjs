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
        wine: {
          light: '#292A29',
          DEFAULT: '#191A19',
          dark: '#090A09'
        },
        fogra: {
          DEFAULT: '#001a23'
        },
        kombugreen: {
          DEFAULT: '#31493C'
        },
        'russian-green': {
          DEFAULT: '#7A9E7E'
        },
        lichen: {
          DEFAULT: '#D8E9A8'
        },
        'baby-powder': {
          DEFAULT: '#E8F1F2'
        },
        'dark-purple': {
          DEFAULT: '#210124'
        }
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
