const plugin = require('tailwindcss/plugin');
/** @type {import('tailwindcss').Config} */

const fontSize = {
  xs: ['0.75rem', { lineHeight: '1rem' }],
  sm: ['0.875rem', { lineHeight: '1.25rem' }],
  base: ['1rem', { lineHeight: '1.5rem' }],
  lg: ['1.125rem', { lineHeight: '1.75rem' }],
  xl: ['1.25rem', { lineHeight: '1.75rem' }],
  '2xl': ['1.5rem', { lineHeight: '2rem' }],
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  '5xl': ['3rem', { lineHeight: '4.25rem' }],
  '6xl': ['3.75rem', { lineHeight: '1' }],
  '7xl': ['4.5rem', { lineHeight: '6.75rem' }],
  '8xl': ['6rem', { lineHeight: '1' }],
  '9xl': ['8rem', { lineHeight: '1' }],
};

const minWidthAndHeight = {
  70: '70px',
  80: '80px',
  90: '90px',
  100: '100px',
  200: '200px',
  220: '220px',
  240: '240px',
  300: '200px',
  340: '340px',
  360: '360px',
};

const colors = {
  error: {
    25: '#FFFBFA',
    50: '#FEF3F2',
    100: '#FEE4E2',
    200: '#FECDCA',
    300: '#FDA29B',
    400: '#F97066',
    500: '#F04438',
    600: '#D92D20',
    700: '#B42318',
    800: '#912018',
    900: '#7A271A',
  },
  primary: {
    25: '#fcf1ee',
    50: '#f6d4cd',
    100: '#f0b7ac',
    200: '#ea9a8b',
    300: '#FDA29B',
    400: '#e47d6a',
    500: '#df6751',
    600: '#dd6049',
    700: '#d74328',
    800: '#b63922',
    900: '#952e1b',
  },
  secondary: {
    25: '#d7f4d9',
    50: '#a3e4a7',
    100: '#88dd8e',
    200: '#6ed575',
    300: '#53ce5c',
    400: '#30a839',
    500: '#27892f',
    600: '#1f6b24',
    700: '#164c1a',
    800: '#0d2e10',
    900: '#0b280d',
  },
  gray: {
    25: '#f5f5f5',
    50: '#e2e2e2',
    100: '#cecece',
    200: '#bababa',
    300: '#a7a7a7',
    400: '#939393',
    500: '#808080',
    600: '#6c6c6c',
    700: '#585858',
    800: '#454545',
    900: '#313131',
  },
  chimney: {
    25: '#eceff2',
    50: '#c7cfd8',
    100: '#a1aebe',
    200: '#7b8ea3',
    300: '#5c6e84',
    400: '#414f5e',
    500: '#272f38',
    600: '#2e3742',
    700: '#21272f',
    800: '#14181c',
    900: '#070809',
  },
  transparent: 'transparent',
  current: 'currentColor',
  white: '#ffffff',
  black: '#202020',
  foggypith: '#fbf6ed',
  grey: 'rgba(0, 0, 0, 0.55)',
  footerlinks: 'rgba(54, 54, 54, 0.9)',
  bordertop: 'rgba(105, 120, 131, 0.16)',
  darkgrey: 'rgba(44, 9, 11, 0.8)',
  bgprimary: 'rgba(223, 103, 81, 0.15)',
};

const button = {
  '.btn': {
    fontWeight: 500,
    outline: 'none',
    '&:focus-visible': {
      outline: 'none',
    },
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.3,
    },
  },
};

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors,
    fontSize,
    extend: {
      minWidth: minWidthAndHeight,
      minHeight: minWidthAndHeight,
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(function ({ addComponents }: { addComponents: any }) {
      addComponents({ ...button });
    }),
  ],
};
