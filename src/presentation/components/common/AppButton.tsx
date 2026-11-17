import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from './AppText';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = true,
  style,
  onPress,
  ...rest
}) => {
  const { theme } = useTheme();

  const getContainerStyle = (): ViewStyle => {
    let bg = theme.colors.primary;
    let border = 'transparent';
    let borderWidth = 0;

    switch (variant) {
      case 'secondary':
        bg = theme.colors.surfaceSecondary;
        break;
      case 'outline':
        bg = 'transparent';
        border = theme.colors.border;
        borderWidth = 1.5;
        break;
      case 'ghost':
        bg = 'transparent';
        break;
      case 'danger':
        bg = theme.colors.error;
        break;
      case 'primary':
      default:
        bg = theme.colors.primary;
        break;
    }

    let paddingVertical = theme.spacing.md;
    let paddingHorizontal = theme.spacing.lg;

    if (size === 'sm') {
      paddingVertical = theme.spacing.sm;
      paddingHorizontal = theme.spacing.md;
    } else if (size === 'lg') {
      paddingVertical = theme.spacing.md + 4;
      paddingHorizontal = theme.spacing.xl;
    }

    return {
      backgroundColor: bg,
      borderColor: border,
      borderWidth,
      borderRadius: theme.borderRadius.medium,
      paddingVertical,
      paddingHorizontal,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      opacity: disabled || isLoading ? 0.6 : 1,
      width: fullWidth ? '100%' : undefined,
      ...theme.shadows.small,
    };
  };

  const getTextColor = (): any => {
    switch (variant) {
      case 'secondary':
        return 'primary';
      case 'outline':
      case 'ghost':
        return 'primary';
      case 'danger':
      case 'primary':
      default:
        return 'white';
    }
  };

  const getTextVariant = () => {
    if (size === 'sm') return 'labelMedium';
    if (size === 'lg') return 'labelLarge';
    return 'labelLarge';
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      disabled={disabled || isLoading}
      onPress={onPress}
      style={[getContainerStyle(), style]}
      accessible
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: disabled || isLoading, busy: isLoading }}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? theme.colors.primary : '#FFFFFF'}
        />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
          <AppText variant={getTextVariant()} color={getTextColor()} weight="600">
            {title}
          </AppText>
          {rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIconContainer: {
    marginRight: 8,
  },
  rightIconContainer: {
    marginLeft: 8,
  },
});
