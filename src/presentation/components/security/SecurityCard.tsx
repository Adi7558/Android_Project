import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from '../common/AppText';
import { ChevronRight } from '../../theme/icons';

export interface SecurityCardProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  statusBadge?: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

export const SecurityCard: React.FC<SecurityCardProps> = ({
  title,
  subtitle,
  icon,
  statusBadge,
  onPress,
  style,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={!onPress}
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.borderRadius.large,
          ...theme.shadows.small,
        },
        style,
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: theme.colors.surfaceSecondary },
        ]}
      >
        {icon}
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <AppText variant="labelLarge" color="primary" numberOfLines={1} style={styles.title}>
            {title}
          </AppText>
          {statusBadge}
        </View>
        {subtitle && (
          <AppText variant="bodySmall" color="secondary" numberOfLines={2} style={styles.subtitle}>
            {subtitle}
          </AppText>
        )}
      </View>

      {onPress && (
        <ChevronRight size={18} color={theme.colors.textMuted} style={styles.chevron} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    marginVertical: 6,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    flex: 1,
    marginRight: 8,
  },
  subtitle: {
    lineHeight: 18,
  },
  chevron: {
    marginLeft: 8,
  },
});
