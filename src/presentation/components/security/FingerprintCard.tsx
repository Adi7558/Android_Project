import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from '../common/AppText';
import { Copy, Key } from '../../theme/icons';

export interface FingerprintCardProps {
  title?: string;
  fingerprint: string;
  onCopy?: (fingerprint: string) => void;
}

export const FingerprintCard: React.FC<FingerprintCardProps> = ({
  title = 'Public Identity Fingerprint',
  fingerprint,
  onCopy,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surfaceSecondary,
          borderColor: theme.colors.border,
          borderRadius: theme.borderRadius.medium,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Key size={14} color={theme.colors.primary} style={styles.icon} />
          <AppText variant="caption" color="secondary" weight="600">
            {title.toUpperCase()}
          </AppText>
        </View>
        {onCopy && (
          <TouchableOpacity
            onPress={() => onCopy(fingerprint)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Copy fingerprint"
            style={styles.copyBtn}
          >
            <Copy size={14} color={theme.colors.textMuted} />
            <AppText variant="caption" color="muted" style={styles.copyText}>
              Copy
            </AppText>
          </TouchableOpacity>
        )}
      </View>

      <AppText
        variant="code"
        color="primary"
        selectable
        style={styles.fingerprintText}
      >
        {fingerprint}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    borderWidth: 1,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyText: {
    marginLeft: 4,
  },
  fingerprintText: {
    lineHeight: 20,
    letterSpacing: 1.5,
  },
});
