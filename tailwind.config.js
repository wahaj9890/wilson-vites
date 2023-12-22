/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
import { tailwindConfig } from '@storefront-ui/vue/tailwind-config';
export default {
  presets: [tailwindConfig],
  content: ['./index.html', './**/*.vue', './node_modules/@storefront-ui/vue/**/*.{js,mjs}'],
  theme: {
    colors:  colors,
    extend: {
      transitionProperty: {
        'all': 'all',
      }
    },
  },
  plugins: [],
}

