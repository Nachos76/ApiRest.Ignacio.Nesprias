/** @type {import('tailwindcss').Config} */

const paletteTheme = {
  primary: {
    default: 'var(--theme-primary-default)',
    50: 'var(--theme-primary-50)',
    100: 'var(--theme-primary-100)',
    200: 'var(--theme-primary-200)',
    300: 'var(--theme-primary-300)',
    400: 'var(--theme-primary-400)',
    500: 'var(--theme-primary-500)',
    600: 'var(--theme-primary-600)',
    700: 'var(--theme-primary-700)',
    800: 'var(--theme-primary-800)',
    900: 'var(--theme-primary-900)',
    A100: 'var(--theme-primary-A100)',
    A200: 'var(--theme-primary-A200)',
    A400: 'var(--theme-primary-A400)',
    A700: 'var(--theme-primary-A700)',
    contrast: {
      default: 'var(--theme-primary-contrast-default)',
      50: 'var(--theme-primary-contrast-50)',
      100: 'var(--theme-primary-contrast-100)',
      200: 'var(--theme-primary-contrast-200)',
      300: 'var(--theme-primary-contrast-300)',
      400: 'var(--theme-primary-contrast-400)',
      500: 'var(--theme-primary-contrast-500)',
      600: 'var(--theme-primary-contrast-600)',
      700: 'var(--theme-primary-contrast-700)',
      800: 'var(--theme-primary-contrast-800)',
      900: 'var(--theme-primary-contrast-900)',
      A100: 'var(--theme-primary-contrast-A100)',
      A200: 'var(--theme-primary-contrast-A200)',
      A400: 'var(--theme-primary-contrast-A400)',
      A700: 'var(--theme-primary-contrast-A700)'
    }
  },
  secondary: {
    default: 'var(--theme-secondary-default)',
    50: 'var(--theme-secondary-50)',
    100: 'var(--theme-secondary-100)',
    200: 'var(--theme-secondary-200)',
    300: 'var(--theme-secondary-300)',
    400: 'var(--theme-secondary-400)',
    500: 'var(--theme-secondary-500)',
    600: 'var(--theme-secondary-600)',
    700: 'var(--theme-secondary-700)',
    800: 'var(--theme-secondary-800)',
    900: 'var(--theme-secondary-900)',
    A100: 'var(--theme-secondary-A100)',
    A200: 'var(--theme-secondary-A200)',
    A400: 'var(--theme-secondary-A400)',
    A700: 'var(--theme-secondary-A700)',
    contrast: {
      default: 'var(--theme-secondary-contrast-default)',
      50: 'var(--theme-secondary-contrast-50)',
      100: 'var(--theme-secondary-contrast-100)',
      200: 'var(--theme-secondary-contrast-200)',
      300: 'var(--theme-secondary-contrast-300)',
      400: 'var(--theme-secondary-contrast-400)',
      500: 'var(--theme-secondary-contrast-500)',
      600: 'var(--theme-secondary-contrast-600)',
      700: 'var(--theme-secondary-contrast-700)',
      800: 'var(--theme-secondary-contrast-800)',
      900: 'var(--theme-secondary-contrast-900)',
      A100: 'var(--theme-secondary-contrast-A100)',
      A200: 'var(--theme-secondary-contrast-A200)',
      A400: 'var(--theme-secondary-contrast-A400)',
      A700: 'var(--theme-secondary-contrast-A700)'
    }
  },
  danger: {
    default: 'var(--theme-danger-default)',
    50: 'var(--theme-danger-50)',
    100: 'var(--theme-danger-100)',
    200: 'var(--theme-danger-200)',
    300: 'var(--theme-danger-300)',
    400: 'var(--theme-danger-400)',
    500: 'var(--theme-danger-500)',
    600: 'var(--theme-danger-600)',
    700: 'var(--theme-danger-700)',
    800: 'var(--theme-danger-800)',
    900: 'var(--theme-danger-900)',
    A100: 'var(--theme-danger-A100)',
    A200: 'var(--theme-danger-A200)',
    A400: 'var(--theme-danger-A400)',
    A700: 'var(--theme-danger-A700)',
    contrast: {
      default: 'var(--theme-danger-contrast-default)',
      50: 'var(--theme-danger-contrast-50)',
      100: 'var(--theme-danger-contrast-100)',
      200: 'var(--theme-danger-contrast-200)',
      300: 'var(--theme-danger-contrast-300)',
      400: 'var(--theme-danger-contrast-400)',
      500: 'var(--theme-danger-contrast-500)',
      600: 'var(--theme-danger-contrast-600)',
      700: 'var(--theme-danger-contrast-700)',
      800: 'var(--theme-danger-contrast-800)',
      900: 'var(--theme-danger-contrast-900)',
      A100: 'var(--theme-danger-contrast-A100)',
      A200: 'var(--theme-danger-contrast-A200)',
      A400: 'var(--theme-danger-contrast-A400)',
      A700: 'var(--theme-danger-contrast-A700)'
    }
  }
};

const bgPalette = {
  default: {
    50: '#e9e9e9',
    100: '#c8c8c8',
    200: '#a3a3a3',
    300: '#7e7e7e',
    400: '#636363',
    500: '#474747',
    600: '#404040',
    700: '#373737',
    800: '#2f2f2f',
    900: '#202020'
  }
};

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: 'class',
  important: true,
  theme: {
    extend: {
      colors: paletteTheme,
      backgroundColor: Object.assign({ ...paletteTheme }, bgPalette),
      divideColor: Object.assign({ ...paletteTheme }, bgPalette),
      borderColor: Object.assign({ ...paletteTheme }, bgPalette),
      gradientColorStops: paletteTheme,
      placeholderColor: paletteTheme,
      ringColor: paletteTheme,
      ringOffsetColor: paletteTheme,
      textColor: Object.assign({ ...paletteTheme }, bgPalette),
    },
  },
  plugins: [],
}
