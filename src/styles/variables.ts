/* eslint-disable max-len */

import { brandAltBackground, neutral } from '@guardian/src-foundations/palette'

export const colors = {
  siteBackground: `${brandAltBackground.ctaPrimary}`,
  silverGrey: `${neutral[86]}`,
  primaryText: `${neutral[97]}`,
  brand: 'blue',
  lilac: '#9d7cbf',
  accent: '#ffb238',
  success: '#37b635',
  warning: '#ec1818',
  ui: {
    bright: '#e0d6eb',
    light: '#f5f3f7',
    whisper: '#fbfafc'
  },
  code: '#fcf6f0',
  gray: {
    dark: 'hsla(270, 17%, 0%, 0.92)',
    copy: 'hsla(270, 16%, 0%, 0.88)',
    calm: 'rgba(0, 0, 0, 0.54)'
  },
  white: '#fff',
  black: '#000'
}

export const fonts = {
  sansSerif:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif',
  serif: 'Georgia, "Times New Roman", Times, serif',
  monospace: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace, monospace',
  headline: 'GH Guardian Headline, Georgia, "Times New Roman", Times, serif'
}

export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
}

export const widths = {
  md: 720,
  lg: 960,
  xl: 1140
}

export const dimensions = {
  fontSize: {
    regular: 16,
    large: 18
  },
  headingSizes: {
    h1: 2.441,
    h2: 1.953,
    h3: 1.563,
    h4: 1.25
  },
  lineHeight: {
    regular: 1.45,
    heading: 1.2
  },
  containerPadding: 1.5
}

export const heights = {
  header: 80,
  headerDesktop: 120
}
