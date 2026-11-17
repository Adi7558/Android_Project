import { Device } from '../../domain/entities/Device';

export const INITIAL_MOCK_DEVICES: Device[] = [
  {
    id: 'dev_001',
    deviceName: 'Pixel 8 Pro (This Device)',
    deviceType: 'mobile',
    operatingSystem: 'Android 14 (Security Patch: Oct 2025)',
    lastActive: 'Active now',
    isCurrentDevice: true,
    ipAddress: '192.168.1.104 (Local Wi-Fi)',
    location: 'Zurich, Switzerland',
    keyFingerprint: 'A7F3 91BC 82D1 29AB 7C12 91FF 3342 9B8E',
  },
  {
    id: 'dev_002',
    deviceName: 'Chrome on Windows 11',
    deviceType: 'browser',
    operatingSystem: 'Windows 11 Pro 64-bit',
    lastActive: '2 hours ago',
    isCurrentDevice: false,
    ipAddress: '178.197.234.12',
    location: 'Zurich, Switzerland',
    keyFingerprint: '52D0 10CC 7A8B 44F1 94A1 88CD 31BF 28E4',
  },
  {
    id: 'dev_003',
    deviceName: 'MacBook Pro 16" (Workstation)',
    deviceType: 'desktop',
    operatingSystem: 'macOS Sequoia 15.2',
    lastActive: '3 days ago',
    isCurrentDevice: false,
    ipAddress: '194.230.145.88',
    location: 'Geneva, Switzerland',
    keyFingerprint: 'B281 44AE 9011 C73D 81FA 5521 99E2 316C',
  },
];
