import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from './AppText';
import { AppButton } from './AppButton';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionTitle?: string;
  onActionPress?: () => void;
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionTitle,
  onActionPress,
  style,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, style]}>
      {icon && (
        <View
          style={[
            styles.iconWrapper,
            { backgroundColor: theme.colors.surfaceSecondary },
          ]}
        >
          {icon}
        </View>
      )}
      <AppText variant="headingSmall" align="center" style={styles.title}>
        {title}
      </AppText>
      {description && (
        <AppText
          variant="bodyMedium"
          color="secondary"
          align="center"
          style={styles.description}
        >
          {description}
        </AppText>
      )}
      {actionTitle && onActionPress && (
        <AppButton
          title={actionTitle}
          onPress={onActionPress}
          variant="outline"
          size="sm"
          fullWidth={false}
          style={styles.actionBtn}
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
  iconWrapper: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    maxWidth: 280,
    marginBottom: 20,
    lineHeight: 20,
  },
  actionBtn: {
    marginTop: 4,
  },
});
