import { TextStyle } from 'react-native';

export const FontFamily = {
  regular: 'Nunito_400Regular',
  medium: 'Nunito_500Medium',
  semiBold: 'Nunito_600SemiBold',
  bold: 'Nunito_700Bold',
  extraBold: 'Nunito_800ExtraBold',
};

export const FontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
};

export const LineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
};

export const Typography: Record<string, TextStyle> = {
  // Headings
  h1: {
    fontFamily: FontFamily.extraBold,
    fontSize: FontSize['4xl'],
    lineHeight: FontSize['4xl'] * LineHeight.tight,
  },
  h2: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize['3xl'],
    lineHeight: FontSize['3xl'] * LineHeight.tight,
  },
  h3: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize['2xl'],
    lineHeight: FontSize['2xl'] * LineHeight.tight,
  },
  h4: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.xl,
    lineHeight: FontSize.xl * LineHeight.tight,
  },
  h5: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.lg,
    lineHeight: FontSize.lg * LineHeight.tight,
  },
  h6: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.base,
    lineHeight: FontSize.base * LineHeight.tight,
  },

  // Body text
  bodyLarge: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.lg,
    lineHeight: FontSize.lg * LineHeight.normal,
  },
  body: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.base,
    lineHeight: FontSize.base * LineHeight.normal,
  },
  bodySmall: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    lineHeight: FontSize.sm * LineHeight.normal,
  },

  // Labels
  labelLarge: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.lg,
    lineHeight: FontSize.lg * LineHeight.tight,
  },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.base,
    lineHeight: FontSize.base * LineHeight.tight,
  },
  labelSmall: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.sm,
    lineHeight: FontSize.sm * LineHeight.tight,
  },

  // Caption
  caption: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.xs,
    lineHeight: FontSize.xs * LineHeight.normal,
  },

  // Button text
  button: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.base,
    lineHeight: FontSize.base * LineHeight.tight,
  },
  buttonSmall: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.sm,
    lineHeight: FontSize.sm * LineHeight.tight,
  },
};

export default Typography;
