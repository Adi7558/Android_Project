import { TextStyle, Platform } from 'react-native';

const monospaceFont = Platform.select({
  ios: 'Courier',
  android: 'monospace',
  default: 'monospace',
});

export interface TypographyTheme {
  displayLarge: TextStyle;
  headingLarge: TextStyle;
  headingMedium: TextStyle;
  headingSmall: TextStyle;
  bodyLarge: TextStyle;
  bodyMedium: TextStyle;
  bodySmall: TextStyle;
  labelLarge: TextStyle;
  labelMedium: TextStyle;
  caption: TextStyle;
  code: TextStyle;
}

export const typography: TypographyTheme = {
  displayLarge: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  headingLarge: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  headingMedium: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  headingSmall: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  bodyLarge: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  bodySmall: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  labelLarge: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
  },
  labelMedium: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
  caption: {
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 14,
  },
  code: {
    fontFamily: monospaceFont,
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 1,
  },
};
