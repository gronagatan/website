/** @type {import('tailwindcss').Config} */
/* eslint-env node */
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')
// import defaultTheme from 'tailwindcss/defaultTheme'
// import plugin from 'tailwindcss/plugin'
// import typography from '@tailwindcss/typography'
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
          DEFAULT: '#0e4025'
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
    require('@tailwindcss/typography'),
    // typography,
    plugin(function ({ addVariant }) {
      addVariant('no-hover', '@media (hover: none)')
      addVariant('supports-hover', '@media (hover: hover)')
    })
  ]
}
