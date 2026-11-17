import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme/ThemeContext';
import { AppHeader } from '../../components/common/AppHeader';
import { AppText } from '../../components/common/AppText';
import { Avatar } from '../../components/common/Avatar';
import { AppButton } from '../../components/common/AppButton';
import { Badge } from '../../components/common/Badge';
import { Toast } from '../../components/common/Toast';
import {
  ShieldCheck,
  ShieldAlert,
  QrCode,
  Copy,
  CheckCircle2,
  Lock,
} from '../../theme/icons';
import { useSecurity } from '../../hooks/useSecurity';
import { SecurityIdentity } from '../../../domain/entities/SecurityIdentity';

type Props = NativeStackScreenProps<RootStackParamList, 'ContactVerification'>;

export const ContactVerificationScreen: React.FC<Props> = ({ route, navigation }) => {
  const { theme } = useTheme();
  const { userId, userName, userAvatar } = route.params;
  const { getContactIdentity, verifyContact, verifiedUserIds } = useSecurity();

  const [identity, setIdentity] = useState<SecurityIdentity | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isVerified = verifiedUserIds[userId] ?? false;

  useEffect(() => {
    const load = async () => {
      const data = await getContactIdentity(userId);
      setIdentity(data);
    };
    load();
  }, [getContactIdentity, userId]);

  const handleMarkVerified = async () => {
    setIsVerifying(true);
    const success = await verifyContact(userId);
    setIsVerifying(false);
    if (success) {
      setToastMessage(`${userName}'s identity verified successfully.`);
    }
  };

  const safetyNumberBlocks = identity?.safetyNumber
    ? identity.safetyNumber.match(/.{1,23}/g) || [identity.safetyNumber]
    : [
        '38192 48102 91823 48190',
        '28190 48192 10928 39182',
        '48192 01928 38192 10293',
      ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppHeader
        title="Verify Contact"
        subtitle="Compare cryptographic safety numbers"
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Contact Identity Card */}
        <View
          style={[
            styles.contactCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              borderRadius: theme.borderRadius.large,
              ...theme.shadows.small,
            },
          ]}
        >
          <Avatar
            name={userName}
            imageUrl={userAvatar}
            size="lg"
            securityRing={isVerified ? 'verified' : 'warning'}
          />
          <AppText variant="headingMedium" color="primary" weight="700" style={styles.contactName}>
            {userName}
          </AppText>
          <Badge
            label={isVerified ? 'Verified Contact' : 'Verification Required'}
            variant={isVerified ? 'success' : 'warning'}
            icon={
              isVerified ? (
                <ShieldCheck size={14} color={theme.colors.securityVerified} />
              ) : (
                <ShieldAlert size={14} color={theme.colors.securityWarning} />
              )
            }
          />

          <AppText variant="caption" color="secondary" align="center" style={styles.explainer}>
            If this safety number matches the number displayed on {userName}'s device, your end-to-end encrypted session is secure against man-in-the-middle interception.
          </AppText>
        </View>

        {/* QR Code Placeholder Graphic Area */}
        <View
          style={[
            styles.qrContainer,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              borderRadius: theme.borderRadius.large,
            },
          ]}
        >
          <View
            style={[
              styles.qrBox,
              {
                backgroundColor: '#FFFFFF',
                borderColor: theme.colors.border,
              },
            ]}
          >
            <QrCode size={160} color="#0F172A" />
          </View>
          <AppText variant="caption" color="muted" align="center" style={styles.qrHint}>
            Scan this QR code on {userName}'s phone or have them scan yours.
          </AppText>
        </View>

        {/* Safety Number Display */}
        <View
          style={[
            styles.safetyCard,
            {
              backgroundColor: theme.colors.surfaceSecondary,
              borderColor: theme.colors.border,
              borderRadius: theme.borderRadius.large,
            },
          ]}
        >
          <View style={styles.safetyHeader}>
            <View style={styles.safetyTitleRow}>
              <Lock size={15} color={theme.colors.primary} style={styles.safetyIcon} />
              <AppText variant="labelLarge" color="primary" weight="700">
                Safety Number
              </AppText>
            </View>
            <TouchableOpacity
              onPress={() => setToastMessage('Safety number copied')}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              style={styles.copyRow}
            >
              <Copy size={14} color={theme.colors.textMuted} />
              <AppText variant="caption" color="muted" style={styles.copyText}>
                Copy
              </AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.numbersGrid}>
            {safetyNumberBlocks.map((block: string, idx: number) => (
              <AppText
                key={idx}
                variant="code"
                color="primary"
                weight="700"
                align="center"
                style={styles.numberBlock}
              >
                {block}
              </AppText>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <AppButton
            title={isVerified ? 'Marked as Verified' : 'Mark as Verified'}
            variant={isVerified ? 'secondary' : 'primary'}
            leftIcon={<CheckCircle2 size={18} color={isVerified ? theme.colors.primary : '#FFFFFF'} />}
            onPress={handleMarkVerified}
            isLoading={isVerifying}
            size="lg"
            style={styles.verifyBtn}
          />

          <AppButton
            title="Scan Contact QR Code"
            variant="outline"
            leftIcon={<QrCode size={18} color={theme.colors.textPrimary} />}
            onPress={() => setToastMessage('QR Camera scanner demo active in Phase 1')}
            size="md"
          />
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
    paddingTop: 16,
    paddingBottom: 40,
  },
  contactCard: {
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 16,
  },
  contactName: {
    marginTop: 10,
    marginBottom: 6,
  },
  explainer: {
    maxWidth: 300,
    lineHeight: 18,
    marginTop: 14,
  },
  qrContainer: {
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 16,
  },
  qrBox: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrHint: {
    marginTop: 14,
    maxWidth: 240,
  },
  safetyCard: {
    padding: 18,
    borderWidth: 1,
    marginBottom: 20,
  },
  safetyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  safetyTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  safetyIcon: {
    marginRight: 6,
  },
  copyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyText: {
    marginLeft: 4,
  },
  numbersGrid: {
    alignItems: 'center',
    gap: 6,
  },
  numberBlock: {
    fontSize: 14,
    letterSpacing: 2,
    lineHeight: 22,
  },
  actionContainer: {
    width: '100%',
  },
  verifyBtn: {
    marginBottom: 12,
  },
});
