import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { AuthStackParamList, RootStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme/ThemeContext';
import { AppHeader } from '../../components/common/AppHeader';
import { AppText } from '../../components/common/AppText';
import { AppTextInput } from '../../components/common/AppTextInput';
import { AppButton } from '../../components/common/AppButton';
import { Toast } from '../../components/common/Toast';
import { User, Lock, Mail, ShieldCheck } from '../../theme/icons';
import { useAuth } from '../../hooks/useAuth';

type Props = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'Register'>,
  NativeStackScreenProps<RootStackParamList>
>;

type PasswordStrength = 'Weak' | 'Medium' | 'Strong';

export const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { register, isLoading, error } = useAuth();

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const calculateStrength = (pass: string): { strength: PasswordStrength; score: number } => {
    if (!pass) return { strength: 'Weak', score: 0 };
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 10) score++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass) || /[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { strength: 'Weak', score: 1 };
    if (score <= 3) return { strength: 'Medium', score: 2 };
    return { strength: 'Strong', score: 3 };
  };

  const { strength, score } = calculateStrength(password);

  const getStrengthColor = () => {
    if (score === 1) return theme.colors.error;
    if (score === 2) return theme.colors.warning;
    if (score === 3) return theme.colors.success;
    return theme.colors.border;
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!username.trim()) newErrors.username = 'Username is required.';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid email is required.';
    if (!password || password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    const success = await register({
      fullName: fullName.trim(),
      username: username.trim(),
      email: email.trim(),
      password,
    });

    if (success) {
      setToastMessage('Account created! Generating identity keypair...');
      setTimeout(() => {
        navigation.replace('Main', { screen: 'HomeTab' });
      }, 600);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppHeader
        title="Create Account"
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <AppText variant="headingLarge" color="primary" weight="700">
            Join SecureChat
          </AppText>
          <AppText variant="bodySmall" color="secondary" style={styles.subtitle}>
            Your cryptographic keys will be generated locally on this device.
          </AppText>
        </View>

        {error && (
          <View
            style={[
              styles.errorBanner,
              {
                backgroundColor: theme.colors.errorLight,
                borderColor: theme.colors.error,
              },
            ]}
          >
            <AppText variant="caption" color="error" weight="600">
              {error}
            </AppText>
          </View>
        )}

        <View style={styles.form}>
          <AppTextInput
            label="Full Name"
            placeholder="e.g. Alex Mercer"
            value={fullName}
            onChangeText={(t) => {
              setFullName(t);
              if (errors.fullName) setErrors({ ...errors, fullName: '' });
            }}
            error={errors.fullName}
            leftIcon={<User size={18} color={theme.colors.textMuted} />}
          />

          <AppTextInput
            label="Username"
            placeholder="e.g. alex_mercer"
            value={username}
            onChangeText={(t) => {
              setUsername(t);
              if (errors.username) setErrors({ ...errors, username: '' });
            }}
            autoCapitalize="none"
            error={errors.username}
            leftIcon={<User size={18} color={theme.colors.textMuted} />}
          />

          <AppTextInput
            label="Email Address"
            placeholder="e.g. user@securechat.io"
            value={email}
            onChangeText={(t) => {
              setEmail(t);
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            leftIcon={<Mail size={18} color={theme.colors.textMuted} />}
          />

          <AppTextInput
            label="Master Password"
            placeholder="••••••••••••"
            value={password}
            onChangeText={(t) => {
              setPassword(t);
              if (errors.password) setErrors({ ...errors, password: '' });
            }}
            isPassword={true}
            error={errors.password}
            leftIcon={<Lock size={18} color={theme.colors.textMuted} />}
          />

          {/* Password Strength Meter */}
          {password.length > 0 && (
            <View style={styles.strengthContainer}>
              <View style={styles.strengthHeader}>
                <AppText variant="caption" color="secondary">
                  Password Strength:
                </AppText>
                <AppText
                  variant="caption"
                  customColor={getStrengthColor()}
                  weight="700"
                >
                  {strength}
                </AppText>
              </View>
              <View style={styles.meterBarsRow}>
                {[1, 2, 3].map((barIndex) => (
                  <View
                    key={barIndex}
                    style={[
                      styles.meterBar,
                      {
                        backgroundColor:
                          barIndex <= score ? getStrengthColor() : theme.colors.surfaceTertiary,
                      },
                    ]}
                  />
                ))}
              </View>
            </View>
          )}

          <AppTextInput
            label="Confirm Password"
            placeholder="••••••••••••"
            value={confirmPassword}
            onChangeText={(t) => {
              setConfirmPassword(t);
              if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
            }}
            isPassword={true}
            error={errors.confirmPassword}
            leftIcon={<Lock size={18} color={theme.colors.textMuted} />}
          />

          <AppText variant="caption" color="muted" style={styles.disclaimer}>
            By creating an account, you agree to SecureChat terms of service and zero-knowledge privacy policy.
          </AppText>

          <AppButton
            title="Create Encrypted Account"
            onPress={handleRegister}
            isLoading={isLoading}
            size="lg"
            style={styles.registerBtn}
          />
        </View>

        <View style={styles.loginPrompt}>
          <AppText variant="bodyMedium" color="secondary">
            Already have an account?{' '}
          </AppText>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <AppText variant="bodyMedium" color="primary" weight="700">
              Sign In
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Toast
        visible={!!toastMessage}
        message={toastMessage || ''}
        type="success"
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  headerSection: {
    marginBottom: 20,
  },
  subtitle: {
    marginTop: 4,
    lineHeight: 18,
  },
  errorBanner: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  form: {
    width: '100%',
  },
  strengthContainer: {
    marginTop: -8,
    marginBottom: 14,
  },
  strengthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  meterBarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  meterBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  disclaimer: {
    marginBottom: 20,
    lineHeight: 16,
  },
  registerBtn: {
    marginBottom: 16,
  },
  loginPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
});
