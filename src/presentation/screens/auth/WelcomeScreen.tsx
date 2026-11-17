import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from '../../components/common/AppText';
import { AppButton } from '../../components/common/AppButton';
import { ShieldCheck, Lock, Key, Radio } from '../../theme/icons';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

export const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand Header */}
        <View style={styles.header}>
          <View
            style={[
              styles.logoBadge,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                ...theme.shadows.medium,
              },
            ]}
          >
            <ShieldCheck size={40} color={theme.colors.primary} />
          </View>
          <AppText variant="displayLarge" color="primary" weight="700" style={styles.title}>
            SecureChat
          </AppText>
          <AppText variant="bodyLarge" color="primary" weight="600" align="center" style={styles.headline}>
            Connect privately. Communicate securely.
          </AppText>
          <AppText variant="bodyMedium" color="secondary" align="center" style={styles.description}>
            SecureChat is designed to protect your conversations using modern security technologies and zero-trust architecture.
          </AppText>
        </View>

        {/* Security Feature Highlights */}
        <View
          style={[
            styles.featuresCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              borderRadius: theme.borderRadius.large,
              ...theme.shadows.small,
            },
          ]}
        >
          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: theme.colors.successLight }]}>
              <Lock size={18} color={theme.colors.securityVerified} />
            </View>
            <View style={styles.featureTextCol}>
              <AppText variant="labelLarge" color="primary">
                End-to-End Encryption
              </AppText>
              <AppText variant="caption" color="secondary">
                Messages are encrypted on your device. Only recipient keys can decipher them.
              </AppText>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.colors.separator }]} />

          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: theme.colors.infoLight }]}>
              <Key size={18} color={theme.colors.info} />
            </View>
            <View style={styles.featureTextCol}>
              <AppText variant="labelLarge" color="primary">
                Cryptographic Identity Verification
              </AppText>
              <AppText variant="caption" color="secondary">
                Verify contacts via safety numbers and QR fingerprints to prevent MITM attacks.
              </AppText>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.colors.separator }]} />

          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: theme.colors.warningLight }]}>
              <Radio size={18} color={theme.colors.warning} />
            </View>
            <View style={styles.featureTextCol}>
              <AppText variant="labelLarge" color="primary">
                Forward & Future Secrecy
              </AppText>
              <AppText variant="caption" color="secondary">
                Continuous ratchet key rotation ensures past & future messages remain protected.
              </AppText>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View
        style={[
          styles.actionFooter,
          {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.border,
            paddingBottom: Math.max(insets.bottom, 16) + 16,
          },
        ]}
      >
        <AppButton
          title="Create Account"
          onPress={() => navigation.navigate('Register')}
          size="lg"
          style={styles.primaryBtn}
        />
        <AppButton
          title="Log In"
          variant="outline"
          onPress={() => navigation.navigate('Login')}
          size="lg"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoBadge: {
    width: 76,
    height: 76,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    marginBottom: 8,
  },
  headline: {
    marginBottom: 8,
  },
  description: {
    maxWidth: 300,
    lineHeight: 21,
  },
  featuresCard: {
    width: '100%',
    padding: 16,
    borderWidth: 1,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  featureTextCol: {
    flex: 1,
  },
  divider: {
    height: 1,
    width: '100%',
  },
  actionFooter: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
  },
  primaryBtn: {
    marginBottom: 12,
  },
});
