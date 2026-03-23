import { Platform, Easing } from "react-native";

// ─────────────────────────────────────────────────────────────────────────────
// PALETTE — raw values, never reference in components directly
// ─────────────────────────────────────────────────────────────────────────────
const palette = {
  slate950: "#0f1115",
  slate900: "#1a1d24",
  slate800: "#252932",
  slate700: "#323744",
  slate600: "#434957",
  slate400: "#94a3b8",
  slate200: "#cbd5e1",

  cream50: "#faf8f3",
  cream100: "#f2ede0",
  cream200: "#e8e0cc",
  cream300: "#d4c9b0",

  mint400: "#7dd3c0",
  mint500: "#5dbdb0",
  mint600: "#3fa89b",
  mint100: "#d1f5ef",

  green400: "#4ade80",
  green600: "#16a34a",
  red400: "#f87171",
  red600: "#dc2626",
  amber400: "#fbbf24",
  amber600: "#d97706",

  white: "#ffffff",
  black: "#000000",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// SEMANTIC COLOR TOKENS — use these in components, never raw palette
// ─────────────────────────────────────────────────────────────────────────────
export type ColorTheme = {
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  bgElevated: string;
  textPrimary: string;
  textSecondary: string;
  textAccent: string;
  textAccentPressed: string;
  textDisabled: string;
  success: string;
  error: string;
  warning: string;
  accentPrimary: string;
  accentPressed: string;
  accentSubtle: string;
  accentGlow: string;
  borderSubtle: string;
  borderDefault: string;
  borderAccent: string;
  overlay: string;
  scrim: string;
  // Badge-specific
  badgeGelato: string;
  badgeGelatoText: string;
  badgeSorbetto: string;
  badgeSorbettoText: string;
  badgeCrema: string;
  badgeCremaText: string;
};

export const darkColors = {
  bgPrimary: palette.slate950,
  bgSecondary: palette.slate900,
  bgTertiary: palette.slate800,
  bgElevated: palette.slate700,

  textPrimary: palette.white,
  textSecondary: palette.slate400,
  textAccent: palette.mint400,
  textAccentPressed: palette.mint500,
  textDisabled: palette.slate600,

  success: palette.green400,
  error: palette.red400,
  warning: palette.amber400,

  accentPrimary: palette.mint400,
  accentPressed: palette.mint500,
  accentSubtle: "rgba(125, 211, 192, 0.12)",
  accentGlow: "rgba(125, 211, 192, 0.25)",

  borderSubtle: "rgba(255, 255, 255, 0.05)",
  borderDefault: "rgba(255, 255, 255, 0.10)",
  borderAccent: palette.mint400,

  overlay: "rgba(0, 0, 0, 0.65)",
  scrim: "rgba(15, 17, 21, 0.92)",

  // Badge-specific
  badgeGelato: "rgba(125, 211, 192, 0.18)",
  badgeGelatoText: palette.mint400,
  badgeSorbetto: "rgba(251, 191, 36, 0.18)",
  badgeSorbettoText: palette.amber400,
  badgeCrema: "rgba(255, 255, 255, 0.08)",
  badgeCremaText: palette.slate400,
} as const;

// Warm Cream & Sage — same brand DNA, sunlit kitchen energy
export const lightColors: ColorTheme = {
  bgPrimary: palette.cream50,
  bgSecondary: palette.cream100,
  bgTertiary: palette.cream200,
  bgElevated: palette.white,

  textPrimary: "#1a1a1a",
  textSecondary: "#6b7280",
  textAccent: palette.mint600,
  textAccentPressed: palette.mint500,
  textDisabled: palette.cream300,

  success: palette.green600,
  error: palette.red600,
  warning: palette.amber600,

  accentPrimary: palette.mint600,
  accentPressed: palette.mint500,
  accentSubtle: "rgba(63, 168, 155, 0.10)",
  accentGlow: "rgba(63, 168, 155, 0.20)",

  borderSubtle: "rgba(0, 0, 0, 0.05)",
  borderDefault: "rgba(0, 0, 0, 0.10)",
  borderAccent: palette.mint600,

  overlay: "rgba(0, 0, 0, 0.4)",
  scrim: "rgba(250, 248, 243, 0.92)",

  badgeGelato: "rgba(63, 168, 155, 0.12)",
  badgeGelatoText: palette.mint600,
  badgeSorbetto: "rgba(217, 119, 6, 0.12)",
  badgeSorbettoText: palette.amber600,
  badgeCrema: "rgba(0, 0, 0, 0.06)",
  badgeCremaText: "#6b7280",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// TYPOGRAPHY
// ─────────────────────────────────────────────────────────────────────────────
export const fonts = {
  main: "Inter",
  display: "PlayfairDisplay",
} as const;

export const fontSizes = {
  xxs: 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
  display: 36,
  hero: 48,
} as const;

export const fontWeights = {
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
} as const;

export const lineHeights = {
  none: 1.0,
  tight: 1.2,
  snug: 1.4,
  normal: 1.6,
  relaxed: 1.75,
} as const;

// Reusable text style presets — spread into StyleSheet, add color from theme
export const textStyles = {
  h1: {
    fontFamily: fonts.display,
    fontSize: fontSizes.display,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.display * 1.2,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: fonts.display,
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.xxl * 1.2,
    letterSpacing: -0.4,
  },
  h3: {
    fontFamily: fonts.display,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.xl * 1.3,
    letterSpacing: -0.3,
  },
  body: {
    fontFamily: fonts.main,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.md * 1.6,
    letterSpacing: 0,
  },
  bodySmall: {
    fontFamily: fonts.main,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.sm * 1.6,
    letterSpacing: 0.1,
  },
  label: {
    fontFamily: fonts.main,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    lineHeight: fontSizes.xs * 1.4,
    letterSpacing: 0.9,
    textTransform: "uppercase" as const,
  },
  button: {
    fontFamily: fonts.main,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    lineHeight: fontSizes.md,
    letterSpacing: 0.3,
  },
  // Recipe-specific
  recipeName: {
    fontFamily: fonts.display,
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.xxl * 1.2,
    letterSpacing: -0.3,
  },
  recipeNameLarge: {
    fontFamily: fonts.display,
    fontSize: fontSizes.display,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.display * 1.1,
    letterSpacing: -0.5,
  },
  stepNumber: {
    fontFamily: fonts.display,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
    lineHeight: fontSizes.xl,
    letterSpacing: -0.2,
  },
  weightDisplay: {
    fontFamily: fonts.main,
    fontSize: 80,
    fontWeight: fontWeights.bold,
    lineHeight: 80,
    letterSpacing: -3,
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// SPACING — 4pt grid
// ─────────────────────────────────────────────────────────────────────────────
export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
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
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.18,
      shadowRadius: 4,
    },
    android: { elevation: 3 },
    default: {},
  }),
  card: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.5,
      shadowRadius: 15,
    },
    android: { elevation: 12 },
    default: {},
  }),
  lg: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.6,
      shadowRadius: 25,
    },
    android: { elevation: 20 },
    default: {},
  }),
  cardLight: Platform.select({
    ios: {
      shadowColor: "#8b7355",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.18,
      shadowRadius: 12,
    },
    android: { elevation: 6 },
    default: {},
  }),
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION
// ─────────────────────────────────────────────────────────────────────────────
export const animation = {
  durationFast: 150,
  durationNormal: 250,
  durationSlow: 400,
  durationVerySlow: 600,
  easingStandard: Easing.bezier(0.4, 0, 0.2, 1),
  easingDecelerate: Easing.bezier(0, 0, 0.2, 1),
  easingAccelerate: Easing.bezier(0.4, 0, 1, 1),
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
// THEME FACTORY
// ─────────────────────────────────────────────────────────────────────────────
export type ThemeMode = "dark" | "light";

export const getTheme = (mode: ThemeMode = "light") =>
  ({
    colors: mode === "dark" ? darkColors : lightColors,
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
    mode,
  }) as const;

export type Theme = ReturnType<typeof getTheme>;

const theme = getTheme("light");
export default theme;
