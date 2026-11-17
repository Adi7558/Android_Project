import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from '../../components/common/AppText';
import { ShieldCheck, Lock } from '../../theme/icons';
import { useAuth } from '../../hooks/useAuth';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigation.replace('Main', { screen: 'HomeTab' });
      } else {
        navigation.replace('Auth', { screen: 'Welcome' });
      }
    }, 1400);

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigation]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          paddingTop: insets.top + 30,
          paddingBottom: Math.max(insets.bottom, 24) + 20,
        },
      ]}
    >
      <View style={styles.content}>
        {/* Shield Icon Emblem */}
        <View
          style={[
            styles.logoContainer,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              ...theme.shadows.large,
            },
          ]}
        >
          <View
            style={[
              styles.innerLogo,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <ShieldCheck size={48} color="#FFFFFF" />
          </View>
        </View>

        {/* Brand Name */}
        <AppText variant="displayLarge" color="primary" weight="700" style={styles.appName}>
          SecureChat
        </AppText>

        {/* Tagline */}
        <AppText
          variant="bodyMedium"
          color="secondary"
          align="center"
          style={styles.tagline}
        >
          Private conversations. Protected by design.
        </AppText>
      </View>

      <View style={styles.footer}>
        <ActivityIndicator size="small" color={theme.colors.primary} />
        <View style={styles.cryptoBadge}>
          <Lock size={12} color={theme.colors.textMuted} style={styles.cryptoIcon} />
          <AppText variant="caption" color="muted">
            End-to-End Encrypted Architecture
          </AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 28,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  innerLogo: {
    width: 76,
    height: 76,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  tagline: {
    maxWidth: 260,
    lineHeight: 22,
  },
  footer: {
    alignItems: 'center',
  },
  cryptoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },
  cryptoIcon: {
    marginRight: 6,
  },
});
