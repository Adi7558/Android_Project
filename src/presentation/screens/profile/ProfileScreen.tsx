import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme/ThemeContext';
import { AppHeader } from '../../components/common/AppHeader';
import { AppText } from '../../components/common/AppText';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { SectionHeader } from '../../components/common/SectionHeader';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
import { Toast } from '../../components/common/Toast';
import {
  ShieldCheck,
  Smartphone,
  Lock,
  Key,
  Bell,
  Moon,
  Sun,
  LogOut,
  ChevronRight,
  Info,
  Settings,
} from '../../theme/icons';
import { useAuth } from '../../hooks/useAuth';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'ProfileTab'>,
  NativeStackScreenProps<RootStackParamList>
>;

export const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { theme, isDark, toggleTheme, themeMode } = useTheme();
  const { currentUser, logout } = useAuth();

  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleConfirmLogout = async () => {
    setIsLogoutModalVisible(false);
    await logout();
    navigation.replace('Auth', { screen: 'Login' });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppHeader
        title="Profile & Vault"
        rightAction={
          <TouchableOpacity
            style={[styles.headerIconBtn, { backgroundColor: theme.colors.surfaceSecondary }]}
            onPress={() => navigation.navigate('Settings')}
          >
            <Settings size={18} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View
          style={[
            styles.profileCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              borderRadius: theme.borderRadius.large,
              ...theme.shadows.small,
            },
          ]}
        >
          <Avatar
            name={currentUser?.fullName || 'Alex Mercer'}
            imageUrl={currentUser?.avatarUrl}
            size="lg"
            securityRing="verified"
          />
          <AppText variant="headingMedium" color="primary" weight="700" style={styles.name}>
            {currentUser?.fullName || 'Alex Mercer'}
          </AppText>
          <AppText variant="bodySmall" color="secondary" style={styles.username}>
            @{currentUser?.username || 'alex_mercer'}
          </AppText>
          <AppText variant="caption" color="muted" style={styles.email}>
            {currentUser?.email || 'alex.mercer@securechat.io'}
          </AppText>

          <View style={styles.badgeRow}>
            <Badge
              label="Identity Verified"
              variant="success"
              icon={<ShieldCheck size={13} color={theme.colors.securityVerified} />}
            />
          </View>
        </View>

        {/* Security Section */}
        <SectionHeader title="Cryptographic Vault" />
        <View
          style={[
            styles.menuGroup,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              borderRadius: theme.borderRadius.large,
            },
          ]}
        >
          <TouchableOpacity
            style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}
            onPress={() => navigation.navigate('Main', { screen: 'SecurityTab' })}
          >
            <View style={[styles.menuIconBox, { backgroundColor: theme.colors.successLight }]}>
              <ShieldCheck size={18} color={theme.colors.securityVerified} />
            </View>
            <View style={styles.menuTextCol}>
              <AppText variant="labelLarge" color="primary">
                Security Center
              </AppText>
              <AppText variant="caption" color="secondary">
                View cryptographic status, keys, and session activity
              </AppText>
            </View>
            <ChevronRight size={18} color={theme.colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}
            onPress={() => navigation.navigate('Devices')}
          >
            <View style={[styles.menuIconBox, { backgroundColor: theme.colors.primaryLight }]}>
              <Smartphone size={18} color={theme.colors.primary} />
            </View>
            <View style={styles.menuTextCol}>
              <AppText variant="labelLarge" color="primary">
                Authorized Devices
              </AppText>
              <AppText variant="caption" color="secondary">
                Manage linked mobile, desktop, and web sessions
              </AppText>
            </View>
            <ChevronRight size={18} color={theme.colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Settings')}
          >
            <View style={[styles.menuIconBox, { backgroundColor: theme.colors.infoLight }]}>
              <Lock size={18} color={theme.colors.info} />
            </View>
            <View style={styles.menuTextCol}>
              <AppText variant="labelLarge" color="primary">
                Privacy & Data
              </AppText>
              <AppText variant="caption" color="secondary">
                Read receipts, online status, and local encryption
              </AppText>
            </View>
            <ChevronRight size={18} color={theme.colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Preferences Section */}
        <SectionHeader title="Application Preferences" />
        <View
          style={[
            styles.menuGroup,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              borderRadius: theme.borderRadius.large,
            },
          ]}
        >
          {/* Theme Toggle */}
          <TouchableOpacity
            style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}
            onPress={toggleTheme}
          >
            <View style={[styles.menuIconBox, { backgroundColor: theme.colors.warningLight }]}>
              {isDark ? (
                <Moon size={18} color={theme.colors.warning} />
              ) : (
                <Sun size={18} color={theme.colors.warning} />
              )}
            </View>
            <View style={styles.menuTextCol}>
              <AppText variant="labelLarge" color="primary">
                Appearance
              </AppText>
              <AppText variant="caption" color="secondary">
                Currently: {isDark ? 'Dark Mode' : 'Light Mode'}
              </AppText>
            </View>
            <Badge label={isDark ? 'Dark' : 'Light'} variant="muted" size="sm" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Settings')}
          >
            <View style={[styles.menuIconBox, { backgroundColor: theme.colors.surfaceSecondary }]}>
              <Info size={18} color={theme.colors.textPrimary} />
            </View>
            <View style={styles.menuTextCol}>
              <AppText variant="labelLarge" color="primary">
                About SecureChat
              </AppText>
              <AppText variant="caption" color="secondary">
                Version 1.0.0 (Phase 1 UI / MSc Project)
              </AppText>
            </View>
            <ChevronRight size={18} color={theme.colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutWrapper}>
          <TouchableOpacity
            style={[
              styles.logoutButton,
              {
                backgroundColor: theme.colors.errorLight,
                borderColor: theme.colors.error,
              },
            ]}
            onPress={() => setIsLogoutModalVisible(true)}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Log out of SecureChat"
          >
            <LogOut size={18} color={theme.colors.error} style={styles.logoutIcon} />
            <AppText variant="labelLarge" color="error" weight="700">
              Sign Out & Lock Vault
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Logout Confirmation Dialog */}
      <ConfirmationDialog
        visible={isLogoutModalVisible}
        title="Sign Out of SecureChat?"
        message="Logging out will close your encrypted local session. To access your messages again, you will need to authenticate with your master credentials."
        confirmText="Log Out"
        isDestructive={true}
        onConfirm={handleConfirmLogout}
        onCancel={() => setIsLogoutModalVisible(false)}
      />

      <Toast visible={!!toastMessage} message={toastMessage || ''} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  profileCard: {
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 16,
  },
  name: {
    marginTop: 12,
  },
  username: {
    marginTop: 2,
  },
  email: {
    marginTop: 2,
  },
  badgeRow: {
    marginTop: 12,
  },
  menuGroup: {
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
  },
  menuIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuTextCol: {
    flex: 1,
  },
  logoutWrapper: {
    marginTop: 24,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  logoutIcon: {
    marginRight: 8,
  },
});
