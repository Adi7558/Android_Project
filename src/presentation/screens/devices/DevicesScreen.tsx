import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme/ThemeContext';
import { AppHeader } from '../../components/common/AppHeader';
import { DeviceCard } from '../../components/devices/DeviceCard';
import { SectionHeader } from '../../components/common/SectionHeader';
import { EmptyState } from '../../components/common/EmptyState';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
import { Toast } from '../../components/common/Toast';
import { Smartphone } from '../../theme/icons';
import { Device } from '../../../domain/entities/Device';
import { container } from '../../../application/services/container';
import { useAppDispatch, useAppSelector, RootState } from '../../../application/state/store';
import { setDevices, removeDevice } from '../../../application/state/slices/devicesSlice';
import { GetDevicesUseCase, RevokeDeviceUseCase } from '../../../application/usecases/devices/DeviceUseCases';

type Props = NativeStackScreenProps<RootStackParamList, 'Devices'>;

const getDevicesUseCase = new GetDevicesUseCase();
const revokeDeviceUseCase = new RevokeDeviceUseCase();

export const DevicesScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { devices } = useAppSelector((state: RootState) => state.devices);

  const [isLoading, setIsLoading] = useState(false);
  const [deviceToRevoke, setDeviceToRevoke] = useState<Device | null>(null);
  const [isRevokeModalVisible, setIsRevokeModalVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchDeviceList = async () => {
    try {
      setIsLoading(true);
      const list = await getDevicesUseCase.execute();
      dispatch(setDevices(list));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDeviceList();
  }, []);

  const handleRevokePrompt = (device: Device) => {
    setDeviceToRevoke(device);
    setIsRevokeModalVisible(true);
  };

  const handleConfirmRevoke = async () => {
    if (deviceToRevoke) {
      await revokeDeviceUseCase.execute(deviceToRevoke.id);
      dispatch(removeDevice(deviceToRevoke.id));
      setIsRevokeModalVisible(false);
      setToastMessage(`Session revoked for ${deviceToRevoke.deviceName}`);
      setDeviceToRevoke(null);
    }
  };

  const currentDevice = devices.find((d: Device) => d.isCurrentDevice);
  const otherDevices = devices.filter((d: Device) => !d.isCurrentDevice);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppHeader
        title="Linked Devices"
        subtitle="Manage authorized cryptographic sessions"
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchDeviceList}
            tintColor={theme.colors.primary}
          />
        }
      >
        {/* Current Device Section */}
        {currentDevice && (
          <View style={styles.sectionWrap}>
            <SectionHeader title="This Device" />
            <DeviceCard device={currentDevice} />
          </View>
        )}

        {/* Other Devices Section */}
        <View style={styles.sectionWrap}>
          <SectionHeader title={`Other Authorized Devices (${otherDevices.length})`} />
          {otherDevices.length > 0 ? (
            otherDevices.map((dev: Device) => (
              <DeviceCard
                key={dev.id}
                device={dev}
                onRevoke={handleRevokePrompt}
              />
            ))
          ) : (
            <EmptyState
              icon={<Smartphone size={32} color={theme.colors.textMuted} />}
              title="No Other Devices"
              description="No additional devices or browser sessions are currently linked to your cryptographic identity."
            />
          )}
        </View>
      </ScrollView>

      {/* Revoke Device Confirmation Dialog */}
      <ConfirmationDialog
        visible={isRevokeModalVisible}
        title="Revoke Device Session?"
        message={`Are you sure you want to revoke "${deviceToRevoke?.deviceName}"? This will terminate its cryptographic session and wipe session keys.`}
        confirmText="Revoke Access"
        isDestructive={true}
        onConfirm={handleConfirmRevoke}
        onCancel={() => {
          setIsRevokeModalVisible(false);
          setDeviceToRevoke(null);
        }}
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
    paddingTop: 8,
    paddingBottom: 40,
  },
  sectionWrap: {
    marginBottom: 16,
  },
});
