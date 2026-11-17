import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from './AppText';
import { CheckCircle2, AlertCircle, Info } from '../../theme/icons';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastProps {
  visible: boolean;
  message: string;
  type?: ToastType;
}

export const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  type = 'success',
}) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  if (!visible) return null;

  const getIcon = () => {
    switch (type) {
      case 'error':
        return <AlertCircle size={18} color={theme.colors.error} />;
      case 'info':
        return <Info size={18} color={theme.colors.info} />;
      case 'success':
      default:
        return <CheckCircle2 size={18} color={theme.colors.success} />;
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          bottom: Math.max(insets.bottom, 16) + 16,
          ...theme.shadows.large,
        },
      ]}
    >
      <View style={styles.iconContainer}>{getIcon()}</View>
      <AppText variant="bodySmall" color="primary" weight="600" style={styles.text}>
        {message}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    zIndex: 9999,
  },
  iconContainer: {
    marginRight: 10,
  },
  text: {
    flex: 1,
  },
});
