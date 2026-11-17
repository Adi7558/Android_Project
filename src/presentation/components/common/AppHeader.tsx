import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from './AppText';
import { ArrowLeft, ShieldCheck, Lock } from '../../theme/icons';

export interface AppHeaderProps {
  title: string;
  subtitle?: string;
  onBackPress?: () => void;
  showBack?: boolean;
  rightAction?: React.ReactNode;
  showSecurityLock?: boolean;
  onSecurityLockPress?: () => void;
  isSecurityVerified?: boolean;
  style?: ViewStyle;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  onBackPress,
  showBack = false,
  rightAction,
  showSecurityLock = false,
  onSecurityLockPress,
  isSecurityVerified = true,
  style,
}) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.border,
          paddingTop: insets.top,
          minHeight: 56 + insets.top,
        },
        style,
      ]}
    >
      <View style={styles.contentRow}>
        <View style={styles.leftRow}>
          {showBack && (
            <TouchableOpacity
              onPress={onBackPress}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              accessible
              accessibilityRole="button"
              accessibilityLabel="Go back"
              style={styles.backButton}
            >
              <ArrowLeft size={22} color={theme.colors.textPrimary} />
            </TouchableOpacity>
          )}

          <View style={styles.titleContainer}>
            <View style={styles.titleRow}>
              <AppText
                variant="headingSmall"
                color="primary"
                numberOfLines={1}
                style={styles.title}
              >
                {title}
              </AppText>
              {showSecurityLock && (
                <TouchableOpacity
                  onPress={onSecurityLockPress}
                  accessible
                  accessibilityRole="button"
                  accessibilityLabel="Security details"
                  style={[
                    styles.securityBadge,
                    {
                      backgroundColor: isSecurityVerified
                        ? theme.colors.successLight
                        : theme.colors.warningLight,
                    },
                  ]}
                >
                  <Lock
                    size={13}
                    color={
                      isSecurityVerified
                        ? theme.colors.securityVerified
                        : theme.colors.securityWarning
                    }
                  />
                </TouchableOpacity>
              )}
            </View>
            {subtitle && (
              <AppText variant="caption" color="secondary" numberOfLines={1}>
                {subtitle}
              </AppText>
            )}
          </View>
        </View>

        {rightAction && <View style={styles.rightActionContainer}>{rightAction}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: 14,
  },
  titleContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginRight: 6,
  },
  securityBadge: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
});
