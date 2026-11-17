import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from './AppText';

export type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'muted';

export interface BadgeProps {
  label?: string | number;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  size = 'md',
  icon,
  style,
}) => {
  const { theme } = useTheme();

  const getColors = () => {
    switch (variant) {
      case 'success':
        return {
          bg: theme.colors.successLight,
          text: theme.colors.success,
        };
      case 'warning':
        return {
          bg: theme.colors.warningLight,
          text: theme.colors.warning,
        };
      case 'error':
        return {
          bg: theme.colors.errorLight,
          text: theme.colors.error,
        };
      case 'muted':
        return {
          bg: theme.colors.surfaceSecondary,
          text: theme.colors.textMuted,
        };
      case 'primary':
      default:
        return {
          bg: theme.colors.primary,
          text: '#FFFFFF',
        };
    }
  };

  const { bg, text } = getColors();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: bg,
          paddingHorizontal: size === 'sm' ? 6 : 9,
          paddingVertical: size === 'sm' ? 2 : 4,
          borderRadius: theme.borderRadius.pill,
        },
        style,
      ]}
    >
      {icon && <View style={styles.icon}>{icon}</View>}
      {label !== undefined && (
        <AppText
          variant={size === 'sm' ? 'caption' : 'labelMedium'}
          customColor={text}
          weight="600"
        >
          {label}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: 4,
  },
});
