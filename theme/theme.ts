import { Platform, Easing } from 'react-native';

// ─────────────────────────────────────────────────────────────────────────────
// PALETTE — raw color values
// ─────────────────────────────────────────────────────────────────────────────

const palette = {
  // Deep Slate family
  slate950: '#0f1115',
  slate900: '#1a1d24',
  slate800: '#252932',
  slate700: '#323744',
  slate400: '#94a3b8',
  slate200: '#cbd5e1',

  // Cream family (light mode bases)
  cream50: '#faf8f3',
  cream100: '#f2ede0',
  cream200: '#e8e0cc',
  cream300: '#d4c9b0',

  // Mint — the signature accent, shared across both modes
  mint400: '#7dd3c0',  // primary accent
  mint500: '#5dbdb0',  // pressed / hover
  mint600: '#3fa89b',  // deep accent for light mode contrast
  mint100: '#d1f5ef',  // tint for light mode backgrounds

  // Semantic status colors — vibrant enough for dark, readable on cream too
  green400: '#4ade80',
  green600: '#16a34a',
  red400: '#f87171',
  red600: '#dc2626',
  amber400: '#fbbf24',
  amber600: '#d97706',

  // Absolute
  white: '#ffffff',
  black: '#000000',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// SEMANTIC COLOR TOKENS
// ─────────────────────────────────────────────────────────────────────────────

export type ColorTheme = {
  // Surfaces
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  bgElevated: string;
  // Text
  textPrimary: string;
  textSecondary: string;
  textAccent: string;
  textAccentPressed: string;
  textDisabled: string;
  // Status
  success: string;
  error: string;
  warning: string;
  // Interactive
  accentPrimary: string;
  accentPressed: string;
  accentSubtle: string;
  // string;
  borderSubtle: string;
  borderDefault: string;
  borderAccent: string;
  // Overlays
  overlay: string;
  scrim: string;
}

export const darkColors = {
  bgPrimary: palette.slate950,
  bgSecondary: palette.slate900,
  bgTertiary: palette.slate800,
  bgElevated: palette.slate700,
  textPrimary: palette.white,
  textSecondary: palette.slate400,
  textAccent: palette.mint400,
  textAccentPressed: palette.mint500,
  textDisabled: palette.slate700,
  success: palette.green400,
  error: palette.red400,
  warning: palette.amber400,
  accentPrimary: palette.mint400,
  accentPressed: palette.mint500,
  accentSubtle: 'rgba(125, 211, 192, 0.12)',
  borderSubtle: 'rgba(255, 255, 255, 0.06)',
  borderDefault: 'rgba(255, 255, 255, 0.12)',
  borderAccent: palette.mint400,
  overlay: 'rgba(0, 0, 0, 0.6)',
  scrim: 'rgba(15, 17, 21, 0.85)',
} as const;

// Light mode — Warm Cream & Sage. Same brand, completely different mood.
// Feels like a cookbook on a sunlit kitchen counter.
export const lightColors: ColorTheme = {
  bgPrimary: palette.cream50,
  bgSecondary: palette.cream100,
  bgTertiary: palette.cream200,
  bgElevated: palette.white,
  textPrimary: '#1a1a1a',
  textSecondary: '#6b7280',
  textAccent: palette.mint600,
  textAccentPressed: palette.mint500,
  textDisabled: palette.cream300,
  success: palette.green600,
  error: palette.red600,
  warning: palette.amber600,
  accentPrimary: palette.mint600,
  accentPressed: palette.mint500,
  accentSubtle: 'rgba(63, 168, 155, 0.10)',
  borderSubtle: 'rgba(0, 0, 0, 0.06)',
  borderDefault: 'rgba(0, 0, 0, 0.12)',
  borderAccent: palette.mint600,
  overlay: 'rgba(0, 0, 0, 0.4)',
  scrim: 'rgba(250, 248, 243, 0.92)',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// TYPOGRAPHY
// ─────────────────────────────────────────────────────────────────────────────

// ⚠️ Load these via expo-font at your app root.
// Playfair Display: https://fonts.google.com/specimen/Playfair+Display
// Inter: https://fonts.google.com/specimen/Inter
export const fonts = {
  // Body copy — expressive but highly readable
  main: Platform.select({
    ios: 'Inter',
    android: 'Inter',
    default: 'Inter',
  }),
  // Display / headings — editorial warmth, perfect for recipe names
  display: Platform.select({
    ios: 'PlayfairDisplay-Regular',
    android: 'PlayfairDisplay-Regular',
    default: 'PlayfairDisplay-Regular',
  }),
  displayItalic: Platform.select({
    ios: 'PlayfairDisplay-Italic',
    android: 'PlayfairDisplay-Italic',
    default: 'PlayfairDisplay-Italic',
  }),
  displayBold: Platform.select({
    ios: 'PlayfairDisplay-Bold',
    android: 'PlayfairDisplay-Bold',
    default: 'PlayfairDisplay-Bold',
  }),
} as const;

// Modular scale — each step is ~1.25x the previous (Major Third scale)
// Gives you clear hierarchy without wild jumps
export const fontSizes = {
  xxs: 10,  // labels, legal, timestamps
  xs: 12,  // captions, tags
  sm: 14,  // secondary body, metadata
  md: 16,  // primary body text
  lg: 18,  // large body, card titles
  xl: 22,  // section headers
  xxl: 28,  // screen titles
  display: 36,  // hero text, recipe names
  hero: 48,  // splash / onboarding only
} as const;

export const fontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
} as const;

export const lineHeights = {
  none: 1.0,
  tight: 1.2,   // headings
  snug: 1.4,   // subheadings
  normal: 1.6,   // body — matches your CSS
  relaxed: 1.75,  // long-form recipe instructions
} as const;

export const textStyles = {
  h1: {
    fontFamily: fonts.display,
    fontSize: fontSizes.display,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.display * lineHeights.tight,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: fonts.display,
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.xxl * lineHeights.tight,
    letterSpacing: -0.4,
  },
  h3: {
    fontFamily: fonts.display,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.xl * lineHeights.snug,
    letterSpacing: -0.3,
  },
  // Body
  bodyLarge: {
    fontFamily: fonts.main,
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.lg * lineHeights.normal,
    letterSpacing: 0,
  },
  body: {
    fontFamily: fonts.main,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.md * lineHeights.normal,
    letterSpacing: 0,
  },
  bodySmall: {
    fontFamily: fonts.main,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.sm * lineHeights.normal,
    letterSpacing: 0.1,
  },
  // UI elements
  label: {
    fontFamily: fonts.main,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    lineHeight: fontSizes.xs * lineHeights.normal,
    letterSpacing: 0.8,
    textTransform: 'uppercase' as const,
  },
  caption: {
    fontFamily: fonts.main,
    fontSize: fontSizes.xxs,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.xxs * lineHeights.normal,
    letterSpacing: 0.2,
  },
  button: {
    fontFamily: fonts.main,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    lineHeight: fontSizes.md * lineHeights.none,
    letterSpacing: 0.3,
  },
  // Recipe-specific
  recipeName: {
    fontFamily: fonts.displayItalic,  // italic Playfair for recipe titles = *chef's kiss*
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.xxl * lineHeights.tight,
    letterSpacing: -0.3,
  },
  ingredientItem: {
    fontFamily: fonts.main,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.md * lineHeights.relaxed,
    letterSpacing: 0,
  },
  stepNumber: {
    fontFamily: fonts.display,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
    lineHeight: fontSizes.xl * lineHeights.none,
    letterSpacing: -0.2,
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// SPACING
// ─────────────────────────────────────────────────────────────────────────────

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,   // 0.5rem — compact padding, icon gaps
  md: 16,  // 1rem — standard padding
  lg: 24,  // 1.5rem — section gaps (added — useful between card rows)
  xl: 32,  // 2rem — your original --spacing-lg
  xxl: 48,  // 3rem — generous section breaks
  xxxl: 64,  // 4rem — your original --spacing-xl, hero sections
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// BORDER RADIUS
// ─────────────────────────────────────────────────────────────────────────────

export const radii = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// SHADOWS
// ─────────────────────────────────────────────────────────────────────────────

export const shadows = {
  sm: Platform.select({
    ios: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.18,
      shadowRadius: 4,
    },
    android: { elevation: 3 },
  }),
  card: Platform.select({
    ios: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.5,
      shadowRadius: 15,
    },
    android: { elevation: 12 },
  }),
  lg: Platform.select({
    ios: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.6,
      shadowRadius: 25,
    },
    android: { elevation: 20 },
  }),
  // Light mode card shadow
  cardLight: Platform.select({
    ios: {
      shadowColor: '#8b7355',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.18,
      shadowRadius: 12,
    },
    android: { elevation: 6 },
  }),
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION
// ─────────────────────────────────────────────────────────────────────────────

export const animation = {
  durationFast: 150,  // micro-interactions
  durationNormal: 250,  // standard transitions
  durationSlow: 400,  // page transitions, modals
  durationVerySlow: 600,  // hero animations, onboarding

  // cubic-bezier(0.4, 0, 0.2, 1) — Material "standard" — your --transition-fast equivalent
  easingStandard: Easing.bezier(0.4, 0, 0.2, 1),
  // Snappy spring feel for cards and list items
  easingDecelerate: Easing.bezier(0, 0, 0.2, 1),
  easingAccelerate: Easing.bezier(0.4, 0, 1, 1),
  // Bouncy — great for recipe add/save confirmations
  easingSpring: Easing.bezier(0.34, 1.56, 0.64, 1),
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Z-INDEX
// ─────────────────────────────────────────────────────────────────────────────

export const zIndex = {
  base: 0,
  raised: 10,
  dropdown: 100,
  sticky: 150,
  modal: 200,
  toast: 300,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL STYLE HINTS (replaces your CSS reset/body rules)
// ─────────────────────────────────────────────────────────────────────────────

export const globalStyles = {
  rootViewDark: {
    flex: 1,
    backgroundColor: darkColors.bgPrimary,
  },
  rootViewLight: {
    flex: 1,
    backgroundColor: lightColors.bgPrimary,
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// THEME OBJECT — the single import for components that need everything
// ─────────────────────────────────────────────────────────────────────────────

export type ThemeMode = 'dark' | 'light';

export const getTheme = (mode: ThemeMode = 'dark') => ({
  colors: mode === 'dark' ? darkColors : lightColors,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  textStyles,
  spacing,
  radii,
  shadows,
  animation,
  zIndex,
  globalStyles,
  mode,
}) as const;

// Static dark theme (default) — use when you don't need dynamic switching
const theme = getTheme('light');
export default theme;
