import React from 'react';
import { Text, TextProps, StyleSheet, TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { TypographyTheme } from '../../theme/typography';

export type TextVariant = keyof TypographyTheme;
export type TextColor =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'error'
  | 'success'
  | 'warning'
  | 'info'
  | 'white'
  | 'custom';

export interface AppTextProps extends TextProps {
  variant?: TextVariant;
  color?: TextColor;
  customColor?: string;
  weight?: TextStyle['fontWeight'];
  align?: TextStyle['textAlign'];
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
}

export const AppText: React.FC<AppTextProps> = ({
  variant = 'bodyMedium',
  color = 'primary',
  customColor,
  weight,
  align,
  style,
  children,
  ...rest
}) => {
  const { theme } = useTheme();

  const getColor = (): string => {
    if (customColor) return customColor;
    switch (color) {
      case 'secondary':
        return theme.colors.textSecondary;
      case 'muted':
        return theme.colors.textMuted;
      case 'error':
        return theme.colors.error;
      case 'success':
        return theme.colors.success;
      case 'warning':
        return theme.colors.warning;
      case 'info':
        return theme.colors.info;
      case 'white':
        return '#FFFFFF';
      case 'primary':
      default:
        return theme.colors.textPrimary;
    }
  };

  const textStyle: TextStyle = {
    ...theme.typography[variant],
    color: getColor(),
    ...(weight ? { fontWeight: weight } : {}),
    ...(align ? { textAlign: align } : {}),
  };

  return (
    <Text style={[textStyle, style]} {...rest}>
      {children}
    </Text>
  );
};
