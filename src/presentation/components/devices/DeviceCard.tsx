import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Device } from '../../../domain/entities/Device';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from '../common/AppText';
import { Badge } from '../common/Badge';
import { Smartphone, Laptop, Globe, Monitor, Trash2, Key } from '../../theme/icons';

export interface DeviceCardProps {
  device: Device;
  onRevoke?: (device: Device) => void;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({ device, onRevoke }) => {
  const { theme } = useTheme();

  const getDeviceIcon = () => {
    switch (device.deviceType) {
      case 'desktop':
        return <Monitor size={22} color={theme.colors.primary} />;
      case 'browser':
        return <Globe size={22} color={theme.colors.info} />;
      case 'mobile':
      default:
        return <Smartphone size={22} color={theme.colors.primary} />;
    }
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.borderRadius.large,
          ...theme.shadows.small,
        },
      ]}
    >
      <View style={styles.topRow}>
        <View
          style={[
            styles.iconWrapper,
            { backgroundColor: theme.colors.surfaceSecondary },
          ]}
        >
          {getDeviceIcon()}
        </View>

        <View style={styles.infoCol}>
          <View style={styles.nameRow}>
            <AppText variant="labelLarge" color="primary" numberOfLines={1} style={styles.deviceName}>
              {device.deviceName}
            </AppText>
            {device.isCurrentDevice && (
              <Badge label="This Device" variant="success" size="sm" />
            )}
          </View>
          <AppText variant="bodySmall" color="secondary">
            {device.operatingSystem}
          </AppText>
          <AppText variant="caption" color="muted" style={styles.activeText}>
            {device.lastActive} • {device.location}
          </AppText>
        </View>

        {!device.isCurrentDevice && onRevoke && (
          <TouchableOpacity
            onPress={() => onRevoke(device)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessible
            accessibilityRole="button"
            accessibilityLabel={`Revoke session for ${device.deviceName}`}
            style={styles.revokeButton}
          >
            <Trash2 size={18} color={theme.colors.error} />
          </TouchableOpacity>
        )}
      </View>

      {/* Security Key Fingerprint for Device */}
      <View
        style={[
          styles.keyRow,
          {
            backgroundColor: theme.colors.surfaceSecondary,
            borderRadius: theme.borderRadius.small,
          },
        ]}
      >
        <Key size={12} color={theme.colors.textMuted} style={styles.keyIcon} />
        <AppText variant="code" color="muted" numberOfLines={1} style={styles.keyText}>
          {device.keyFingerprint}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 1,
    marginVertical: 6,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoCol: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  deviceName: {
    flex: 1,
    marginRight: 6,
  },
  activeText: {
    marginTop: 2,
  },
  revokeButton: {
    padding: 8,
    marginLeft: 6,
  },
  keyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginTop: 12,
  },
  keyIcon: {
    marginRight: 6,
  },
  keyText: {
    fontSize: 10,
    flex: 1,
  },
});
