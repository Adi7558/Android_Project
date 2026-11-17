import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme/ThemeContext';
import { AppHeader } from '../../components/common/AppHeader';
import { AppText } from '../../components/common/AppText';
import { SectionHeader } from '../../components/common/SectionHeader';
import { Toast } from '../../components/common/Toast';
import { Badge } from '../../components/common/Badge';
import {
  Moon,
  Sun,
  Bell,
  Lock,
  ShieldCheck,
  Smartphone,
  Eye,
  Info,
} from '../../theme/icons';
import { useAppDispatch, useAppSelector, RootState } from '../../../application/state/store';
import {
  toggleNotificationSetting,
  togglePrivacySetting,
  toggleSecuritySetting,
  setThemeModeSetting,
} from '../../../application/state/slices/settingsSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { theme, isDark, setThemeMode, themeMode } = useTheme();
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state: RootState) => state.settings);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleToggleTheme = (mode: 'light' | 'dark' | 'system') => {
    setThemeMode(mode);
    dispatch(setThemeModeSetting(mode));
    setToastMessage(`Theme switched to ${mode.toUpperCase()}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppHeader
        title="Settings & Privacy"
        subtitle="Application configuration and security preferences"
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Appearance Section */}
        <SectionHeader title="Appearance" />
        <View
          style={[
            styles.settingsCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              borderRadius: theme.borderRadius.large,
            },
          ]}
        >
          <View style={styles.themeOptionsRow}>
            {(['light', 'dark', 'system'] as const).map((mode) => (
              <TouchableOpacity
                key={mode}
                onPress={() => handleToggleTheme(mode)}
                style={[
                  styles.themeTab,
                  {
                    backgroundColor:
                      themeMode === mode ? theme.colors.primary : theme.colors.surfaceSecondary,
                    borderColor:
                      themeMode === mode ? theme.colors.primary : theme.colors.border,
                  },
                ]}
              >
                <AppText
                  variant="labelMedium"
                  customColor={themeMode === mode ? '#FFFFFF' : theme.colors.textSecondary}
                  weight={themeMode === mode ? '700' : '500'}
                >
                  {mode.toUpperCase()}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Notifications Section */}
        <SectionHeader title="Notifications" />
        <View
          style={[
            styles.settingsCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              borderRadius: theme.borderRadius.large,
            },
          ]}
        >
          <View style={[styles.toggleRow, { borderBottomColor: theme.colors.border }]}>
            <View style={styles.toggleTextCol}>
              <AppText variant="labelLarge" color="primary">
                Message Notifications
              </AppText>
              <AppText variant="caption" color="secondary">
                Receive notifications when new encrypted messages arrive
              </AppText>
            </View>
            <Switch
              value={settings.notifications.messagesEnabled}
              onValueChange={() => {
                dispatch(toggleNotificationSetting('messagesEnabled'));
              }}
              trackColor={{ false: theme.colors.surfaceTertiary, true: theme.colors.primary }}
            />
          </View>

          <View style={styles.toggleRow}>
            <View style={styles.toggleTextCol}>
              <AppText variant="labelLarge" color="primary">
                Security Alerts
              </AppText>
              <AppText variant="caption" color="secondary">
                Alerts when a contact's safety number changes or new sessions join
              </AppText>
            </View>
            <Switch
              value={settings.notifications.securityAlertsEnabled}
              onValueChange={() => {
                dispatch(toggleNotificationSetting('securityAlertsEnabled'));
              }}
              trackColor={{ false: theme.colors.surfaceTertiary, true: theme.colors.primary }}
            />
          </View>
        </View>

        {/* Privacy Section */}
        <SectionHeader title="Privacy Controls" />
        <View
          style={[
            styles.settingsCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              borderRadius: theme.borderRadius.large,
            },
          ]}
        >
          <View style={[styles.toggleRow, { borderBottomColor: theme.colors.border }]}>
            <View style={styles.toggleTextCol}>
              <AppText variant="labelLarge" color="primary">
                Read Receipts
              </AppText>
              <AppText variant="caption" color="secondary">
                Allow participants to see when you have read their messages
              </AppText>
            </View>
            <Switch
              value={settings.privacy.readReceipts}
              onValueChange={() => {
                dispatch(togglePrivacySetting('readReceipts'));
              }}
              trackColor={{ false: theme.colors.surfaceTertiary, true: theme.colors.primary }}
            />
          </View>

          <View style={styles.toggleRow}>
            <View style={styles.toggleTextCol}>
              <AppText variant="labelLarge" color="primary">
                Online Status
              </AppText>
              <AppText variant="caption" color="secondary">
                Broadcast online availability to your trusted contacts
              </AppText>
            </View>
            <Switch
              value={settings.privacy.onlineStatus}
              onValueChange={() => {
                dispatch(togglePrivacySetting('onlineStatus'));
              }}
              trackColor={{ false: theme.colors.surfaceTertiary, true: theme.colors.primary }}
            />
          </View>
        </View>

        {/* Device & Vault Security */}
        <SectionHeader title="Vault Security" />
        <View
          style={[
            styles.settingsCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              borderRadius: theme.borderRadius.large,
            },
          ]}
        >
          <View style={[styles.toggleRow, { borderBottomColor: theme.colors.border }]}>
            <View style={styles.toggleTextCol}>
              <AppText variant="labelLarge" color="primary">
                Screen Security
              </AppText>
              <AppText variant="caption" color="secondary">
                Block screenshots and hide app preview in recent tasks
              </AppText>
            </View>
            <Switch
              value={settings.security.screenSecurity}
              onValueChange={() => {
                dispatch(toggleSecuritySetting('screenSecurity'));
              }}
              trackColor={{ false: theme.colors.surfaceTertiary, true: theme.colors.primary }}
            />
          </View>

          <View style={styles.toggleRow}>
            <View style={styles.toggleTextCol}>
              <AppText variant="labelLarge" color="primary">
                Incognito Keyboard
              </AppText>
              <AppText variant="caption" color="secondary">
                Request keyboard to disable personalized dictionary learning
              </AppText>
            </View>
            <Switch
              value={settings.security.incognitoKeyboard}
              onValueChange={() => {
                dispatch(toggleSecuritySetting('incognitoKeyboard'));
              }}
              trackColor={{ false: theme.colors.surfaceTertiary, true: theme.colors.primary }}
            />
          </View>
        </View>

        {/* About App Section */}
        <SectionHeader title="About Application" />
        <View
          style={[
            styles.settingsCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              borderRadius: theme.borderRadius.large,
              padding: 16,
            },
          ]}
        >
          <View style={styles.aboutRow}>
            <AppText variant="labelLarge" color="primary">
              SecureChat
            </AppText>
            <Badge label="v1.0.0-Phase1" variant="primary" size="sm" />
          </View>
          <AppText variant="caption" color="secondary" style={styles.aboutDesc}>
            Secure End-to-End Encrypted Mobile Chat Application developed with Clean Architecture.
            Designed for MSc Project Demonstration.
          </AppText>

          <View style={[styles.divider, { backgroundColor: theme.colors.separator }]} />

          <View style={styles.aboutMetaRow}>
            <AppText variant="caption" color="muted">Architecture:</AppText>
            <AppText variant="caption" color="primary" weight="600">
              Clean Architecture (Domain / Application / Infrastructure / Presentation)
            </AppText>
          </View>
          <View style={styles.aboutMetaRow}>
            <AppText variant="caption" color="muted">Cryptography Target:</AppText>
            <AppText variant="caption" color="primary" weight="600">
              Signal Protocol (Double Ratchet, X25519, Ed25519, AES-256-GCM)
            </AppText>
          </View>
        </View>
      </ScrollView>

      <Toast visible={!!toastMessage} message={toastMessage || ''} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 40,
  },
  settingsCard: {
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 8,
  },
  themeOptionsRow: {
    flexDirection: 'row',
    padding: 8,
    gap: 8,
  },
  themeTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  toggleTextCol: {
    flex: 1,
    marginRight: 14,
  },
  aboutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  aboutDesc: {
    lineHeight: 18,
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 12,
  },
  aboutMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
});
