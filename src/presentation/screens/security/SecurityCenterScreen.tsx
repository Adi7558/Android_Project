import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme/ThemeContext';
import { AppHeader } from '../../components/common/AppHeader';
import { AppText } from '../../components/common/AppText';
import { SecurityCard } from '../../components/security/SecurityCard';
import { FingerprintCard } from '../../components/security/FingerprintCard';
import { Badge } from '../../components/common/Badge';
import { SectionHeader } from '../../components/common/SectionHeader';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
import { Toast } from '../../components/common/Toast';
import {
  ShieldCheck,
  Key,
  Smartphone,
  Lock,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Radio,
  FileText,
} from '../../theme/icons';
import { useSecurity } from '../../hooks/useSecurity';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'SecurityTab'>,
  NativeStackScreenProps<RootStackParamList>
>;

export const SecurityCenterScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { overview, activities, fetchOverview, rotateKeys, isLoading } = useSecurity();

  const [isRotateModalVisible, setIsRotateModalVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchOverview();
  }, [fetchOverview]);

  const handleRotateConfirm = async () => {
    setIsRotateModalVisible(false);
    const newIdentity = await rotateKeys();
    if (newIdentity) {
      setToastMessage('Identity keypair rotated and published to local vault.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppHeader
        title="Security Center"
        subtitle="Cryptographic vault status & identity management"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchOverview}
            tintColor={theme.colors.primary}
          />
        }
      >
        {/* Top Overall Score Card */}
        <View
          style={[
            styles.scoreCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              borderRadius: theme.borderRadius.large,
              ...theme.shadows.small,
            },
          ]}
        >
          <View style={styles.scoreRow}>
            <View
              style={[
                styles.scoreIconBox,
                { backgroundColor: theme.colors.successLight },
              ]}
            >
              <ShieldCheck size={32} color={theme.colors.securityVerified} />
            </View>
            <View style={styles.scoreTextCol}>
              <View style={styles.scoreHeadingRow}>
                <AppText variant="headingSmall" color="primary">
                  Cryptographic Integrity
                </AppText>
                <Badge
                  label={`${overview.securityScore}% Valid`}
                  variant="success"
                  size="sm"
                />
              </View>
              <AppText variant="caption" color="secondary" style={styles.scoreSub}>
                Zero-Trust architecture active. All local stores encrypted with AES-256.
              </AppText>
            </View>
          </View>
        </View>

        {/* Identity Keys Section */}
        <SectionHeader title="Your Identity Key" />
        <FingerprintCard
          title="Master Public Key Fingerprint (X25519)"
          fingerprint={overview.identityKeyFingerprint}
          onCopy={() => setToastMessage('Public key fingerprint copied')}
        />

        <SecurityCard
          title="Rotate Identity Keypair"
          subtitle={`Last rotated: ${overview.lastKeyRotation}. Re-derives ephemeral ratchets.`}
          icon={<RefreshCw size={20} color={theme.colors.primary} />}
          statusBadge={<Badge label="Action" variant="primary" size="sm" />}
          onPress={() => setIsRotateModalVisible(true)}
        />

        {/* Encryption Protocols Section */}
        <SectionHeader title="Cryptographic Protocols" />
        <SecurityCard
          title="End-to-End Encryption"
          subtitle={overview.encryptionAlgorithm}
          icon={<Lock size={20} color={theme.colors.securityVerified} />}
          statusBadge={<Badge label="Enforced" variant="success" size="sm" />}
        />
        <SecurityCard
          title="Session Ratchet Protocol"
          subtitle={overview.protocolVersion}
          icon={<Radio size={20} color={theme.colors.info} />}
          statusBadge={<Badge label="FIPS-Ready" variant="success" size="sm" />}
        />

        {/* Registered Devices Section */}
        <SectionHeader
          title="Registered Devices"
          actionTitle="Manage"
          onActionPress={() => navigation.navigate('Devices')}
        />
        <SecurityCard
          title="Active Device Sessions"
          subtitle={`${overview.totalDevicesCount} authorized devices currently linked to your identity.`}
          icon={<Smartphone size={20} color={theme.colors.primary} />}
          statusBadge={<Badge label={`${overview.totalDevicesCount} Linked`} variant="muted" size="sm" />}
          onPress={() => navigation.navigate('Devices')}
        />

        {/* Security Audit Activity Section */}
        <SectionHeader title="Recent Security Activity" />
        <View
          style={[
            styles.activityContainer,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              borderRadius: theme.borderRadius.large,
            },
          ]}
        >
          {activities.map((act, index) => {
            const isLast = index === activities.length - 1;
            const isWarn = act.severity === 'warning';
            const isSuccess = act.severity === 'success';

            return (
              <View
                key={act.id}
                style={[
                  styles.activityItem,
                  !isLast && { borderBottomColor: theme.colors.border, borderBottomWidth: 1 },
                ]}
              >
                <View
                  style={[
                    styles.activityIconCircle,
                    {
                      backgroundColor: isWarn
                        ? theme.colors.warningLight
                        : isSuccess
                        ? theme.colors.successLight
                        : theme.colors.surfaceSecondary,
                    },
                  ]}
                >
                  {isWarn ? (
                    <AlertTriangle size={16} color={theme.colors.securityWarning} />
                  ) : isSuccess ? (
                    <CheckCircle2 size={16} color={theme.colors.securityVerified} />
                  ) : (
                    <Lock size={16} color={theme.colors.primary} />
                  )}
                </View>

                <View style={styles.activityInfo}>
                  <View style={styles.activityTitleRow}>
                    <AppText variant="labelMedium" color="primary" numberOfLines={1}>
                      {act.title}
                    </AppText>
                    <AppText variant="caption" color="muted">
                      {act.timestamp}
                    </AppText>
                  </View>
                  <AppText variant="caption" color="secondary" style={styles.activityDesc}>
                    {act.description}
                  </AppText>
                  {act.device && (
                    <AppText variant="caption" color="muted" style={styles.activityMeta}>
                      Device: {act.device} ({act.location})
                    </AppText>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Rotate Key Confirmation Dialog */}
      <ConfirmationDialog
        visible={isRotateModalVisible}
        title="Rotate Identity Keypair?"
        message="Rotating your identity key will generate new X25519 prekey bundles. Existing conversations will notify contacts that your safety number has changed."
        confirmText="Rotate Keys"
        onConfirm={handleRotateConfirm}
        onCancel={() => setIsRotateModalVisible(false)}
      />

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
  scoreCard: {
    padding: 16,
    borderWidth: 1,
    marginBottom: 8,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreIconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  scoreTextCol: {
    flex: 1,
  },
  scoreHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  scoreSub: {
    lineHeight: 16,
  },
  activityContainer: {
    borderWidth: 1,
    marginTop: 6,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    padding: 14,
  },
  activityIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  activityDesc: {
    lineHeight: 16,
  },
  activityMeta: {
    marginTop: 2,
    fontSize: 10,
  },
});
