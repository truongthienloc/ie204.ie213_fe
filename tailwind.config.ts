import type { Config } from 'tailwindcss';

import colors from './src/constants/colors';
import extendTheme from './src/constants/extendTheme';

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{html,js,jsx,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors,
      ...extendTheme,
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
