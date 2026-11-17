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
import { ShieldCheck, User, Lock, CheckCircle2 } from '../../theme/icons';
import { useAuth } from '../../hooks/useAuth';

type Props = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'Login'>,
  NativeStackScreenProps<RootStackParamList>
>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { login, isLoading, error, clearError } = useAuth();

  const [identifier, setIdentifier] = useState('alex.mercer@securechat.io');
  const [password, setPassword] = useState('Password123!');
  const [rememberMe, setRememberMe] = useState(true);

  const [identifierError, setIdentifierError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const validate = (): boolean => {
    let valid = true;
    clearError();

    if (!identifier.trim()) {
      setIdentifierError('Email or username is required.');
      valid = false;
    } else {
      setIdentifierError(null);
    }

    if (!password) {
      setPasswordError('Password is required.');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      valid = false;
    } else {
      setPasswordError(null);
    }

    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    const success = await login({
      identifier: identifier.trim(),
      password,
      rememberMe,
    });

    if (success) {
      setToastMessage('Authentication successful. Initializing cryptographic session...');
      setTimeout(() => {
        navigation.replace('Main', { screen: 'HomeTab' });
      }, 500);
    }
  };

  const handleFillDemo = () => {
    setIdentifier('alex.mercer@securechat.io');
    setPassword('Password123!');
    setIdentifierError(null);
    setPasswordError(null);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppHeader
        title="Sign In"
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.brandSection}>
          <View
            style={[
              styles.logoBadge,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                ...theme.shadows.small,
              },
            ]}
          >
            <ShieldCheck size={32} color={theme.colors.primary} />
          </View>
          <AppText variant="headingMedium" color="primary" weight="700">
            Welcome to SecureChat
          </AppText>
          <AppText variant="bodySmall" color="secondary" style={styles.subtitle}>
            Enter your credentials to unlock your local encrypted vault.
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
            label="Email or Username"
            placeholder="e.g. alex_mercer or user@example.com"
            value={identifier}
            onChangeText={(text) => {
              setIdentifier(text);
              if (identifierError) setIdentifierError(null);
            }}
            autoCapitalize="none"
            error={identifierError}
            leftIcon={<User size={18} color={theme.colors.textMuted} />}
          />

          <AppTextInput
            label="Password"
            placeholder="••••••••••••"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError(null);
            }}
            isPassword={true}
            error={passwordError}
            leftIcon={<Lock size={18} color={theme.colors.textMuted} />}
          />

          <View style={styles.optionsRow}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setRememberMe(!rememberMe)}
              style={styles.rememberMeRow}
              accessible
              accessibilityRole="checkbox"
              accessibilityLabel="Remember this device"
            >
              <View
                style={[
                  styles.checkbox,
                  {
                    borderColor: rememberMe
                      ? theme.colors.primary
                      : theme.colors.border,
                    backgroundColor: rememberMe
                      ? theme.colors.primary
                      : 'transparent',
                  },
                ]}
              >
                {rememberMe && <CheckCircle2 size={14} color="#FFFFFF" />}
              </View>
              <AppText variant="labelMedium" color="secondary">
                Remember this device
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setToastMessage('Password reset flow will be enabled with .NET Backend.')
              }
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <AppText variant="labelMedium" color="primary" weight="600">
                Forgot password?
              </AppText>
            </TouchableOpacity>
          </View>

          <AppButton
            title="Log In"
            onPress={handleLogin}
            isLoading={isLoading}
            size="lg"
            style={styles.loginBtn}
          />

          <AppButton
            title="Use Demo Account (Alex Mercer)"
            variant="secondary"
            onPress={handleFillDemo}
            size="md"
            style={styles.demoBtn}
          />
        </View>

        <View style={styles.registerPrompt}>
          <AppText variant="bodyMedium" color="secondary">
            Don't have an account?{' '}
          </AppText>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <AppText variant="bodyMedium" color="primary" weight="700">
              Create Account
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Toast
        visible={!!toastMessage}
        message={toastMessage || ''}
        type="info"
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
  brandSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoBadge: {
    width: 60,
    height: 60,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 6,
    maxWidth: 280,
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
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  rememberMeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    marginBottom: 12,
  },
  demoBtn: {
    marginBottom: 16,
  },
  registerPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
});
