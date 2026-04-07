import type { Config } from 'tailwindcss';
import { colors, typography, spacing, shadows } from './lib/constants';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        text: colors.text,
        background: colors.background,
        accent: colors.accent,
        ui: colors.ui,
      },
      fontFamily: {
        sans: typography.fontFamily.base,
      },
      fontSize: {
        h1: typography.sizes.h1,
        h2: typography.sizes.h2,
        h3: typography.sizes.h3,
        h4: typography.sizes.h4,
        body: typography.sizes.body,
        small: typography.sizes.small,
        xs: typography.sizes.xs,
      },
      fontWeight: {
        light: typography.weights.light,
        normal: typography.weights.normal,
        medium: typography.weights.medium,
        semibold: typography.weights.semibold,
        bold: typography.weights.bold,
      },
      lineHeight: {
        tight: typography.lineHeight.tight,
        normal: typography.lineHeight.normal,
        relaxed: typography.lineHeight.relaxed,
      },
      spacing: {
        xs: spacing.xs,
        sm: spacing.sm,
        md: spacing.md,
        lg: spacing.lg,
        xl: spacing.xl,
        xxl: spacing.xxl,
        xxxl: spacing.xxxl,
      },
      boxShadow: {
        ...shadows,
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};

export default config;
