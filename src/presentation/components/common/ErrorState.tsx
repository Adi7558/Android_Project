import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from './AppText';
import { AppButton } from './AppButton';
import { AlertTriangle } from '../../theme/icons';

export interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  style?: ViewStyle;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'An unexpected error occurred.',
  onRetry,
  style,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: theme.colors.errorLight },
        ]}
      >
        <AlertTriangle size={32} color={theme.colors.error} />
      </View>
      <AppText variant="headingSmall" align="center" style={styles.title}>
        Something went wrong
      </AppText>
      <AppText
        variant="bodyMedium"
        color="secondary"
        align="center"
        style={styles.message}
      >
        {message}
      </AppText>
      {onRetry && (
        <AppButton
          title="Try Again"
          onPress={onRetry}
          variant="outline"
          size="sm"
          fullWidth={false}
          style={styles.retryBtn}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    marginBottom: 8,
  },
  message: {
    maxWidth: 280,
    marginBottom: 20,
    lineHeight: 20,
  },
  retryBtn: {
    marginTop: 4,
  },
});
