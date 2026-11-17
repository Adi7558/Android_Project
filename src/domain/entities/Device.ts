export type DeviceType = 'mobile' | 'desktop' | 'tablet' | 'browser';

export interface Device {
  id: string;
  deviceName: string;
  deviceType: DeviceType;
  operatingSystem: string;
  lastActive: string;
  isCurrentDevice: boolean;
  ipAddress: string;
  location: string;
  keyFingerprint: string;
}
