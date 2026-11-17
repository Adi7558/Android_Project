import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from '../common/AppText';
import { ShieldCheck, ShieldAlert, Lock } from '../../theme/icons';

export interface SecurityBadgeProps {
  status: 'verified' | 'unverified' | 'warning';
  label?: string;
  onPress?: () => void;
}

export const SecurityBadge: React.FC<SecurityBadgeProps> = ({
  status,
  label,
  onPress,
}) => {
  const { theme } = useTheme();

  const getStyle = () => {
    switch (status) {
      case 'verified':
        return {
          icon: <ShieldCheck size={14} color={theme.colors.securityVerified} />,
          text: label || 'Verified',
          color: theme.colors.securityVerified,
          bg: theme.colors.successLight,
        };
      case 'warning':
        return {
          icon: <ShieldAlert size={14} color={theme.colors.securityWarning} />,
          text: label || 'Key Changed',
          color: theme.colors.securityWarning,
          bg: theme.colors.warningLight,
        };
      case 'unverified':
      default:
        return {
          icon: <Lock size={14} color={theme.colors.textMuted} />,
          text: label || 'Unverified',
          color: theme.colors.textMuted,
          bg: theme.colors.surfaceSecondary,
        };
    }
  };

  const current = getStyle();

  const content = (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: current.bg,
          borderRadius: theme.borderRadius.pill,
        },
      ]}
    >
      <View style={styles.icon}>{current.icon}</View>
      <AppText variant="caption" customColor={current.color} weight="700">
        {current.text}
      </AppText>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: 4,
  },
});
