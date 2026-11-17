export interface ColorTheme {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  background: string;
  surface: string;
  surfaceSecondary: string;
  surfaceTertiary: string;
  card: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderLight: string;
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  error: string;
  errorLight: string;
  info: string;
  infoLight: string;
  messageOutgoing: string;
  messageOutgoingText: string;
  messageOutgoingTime: string;
  messageIncoming: string;
  messageIncomingText: string;
  messageIncomingTime: string;
  systemMessageBg: string;
  systemMessageText: string;
  online: string;
  offline: string;
  securityVerified: string;
  securityWarning: string;
  securityDanger: string;
  inputBackground: string;
  inputBorder: string;
  modalBackdrop: string;
  badgeBg: string;
  badgeText: string;
  separator: string;
  fingerprintBg: string;
}

export const lightColors: ColorTheme = {
  primary: '#1D4ED8', // Premium Security Cobalt Blue
  primaryDark: '#1E40AF',
  primaryLight: '#EFF6FF',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceSecondary: '#F1F5F9',
  surfaceTertiary: '#E2E8F0',
  card: '#FFFFFF',
  textPrimary: '#0F172A', // Slate 900
  textSecondary: '#475569', // Slate 600
  textMuted: '#94A3B8', // Slate 400
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  success: '#10B981', // Emerald
  successLight: '#ECFDF5',
  warning: '#F59E0B', // Amber
  warningLight: '#FFFBEB',
  error: '#EF4444', // Red
  errorLight: '#FEF2F2',
  info: '#3B82F6',
  infoLight: '#EFF6FF',
  messageOutgoing: '#1D4ED8',
  messageOutgoingText: '#FFFFFF',
  messageOutgoingTime: '#BFDBFE',
  messageIncoming: '#F1F5F9',
  messageIncomingText: '#0F172A',
  messageIncomingTime: '#64748B',
  systemMessageBg: '#E0E7FF',
  systemMessageText: '#3730A3',
  online: '#10B981',
  offline: '#94A3B8',
  securityVerified: '#10B981',
  securityWarning: '#F59E0B',
  securityDanger: '#EF4444',
  inputBackground: '#F8FAFC',
  inputBorder: '#CBD5E1',
  modalBackdrop: 'rgba(15, 23, 42, 0.6)',
  badgeBg: '#1D4ED8',
  badgeText: '#FFFFFF',
  separator: '#E2E8F0',
  fingerprintBg: '#F1F5F9',
};

export const darkColors: ColorTheme = {
  primary: '#2563EB', // Electric Neon Blue
  primaryDark: '#1D4ED8',
  primaryLight: 'rgba(37, 99, 235, 0.15)',
  background: '#040817', // Deep Obsidian Space Navy
  surface: '#0B132B', // Elevated Navy Glass Surface
  surfaceSecondary: '#0E1A38',
  surfaceTertiary: '#16254E',
  card: '#080E23', // Individual card surface
  textPrimary: '#FFFFFF',
  textSecondary: '#8B9BB4',
  textMuted: '#556885',
  border: 'rgba(255, 255, 255, 0.08)',
  borderLight: 'rgba(37, 99, 235, 0.25)',
  success: '#10B981', // Emerald
  successLight: 'rgba(16, 185, 129, 0.15)',
  warning: '#F59E0B', // Amber / Gold
  warningLight: 'rgba(245, 158, 11, 0.15)',
  error: '#EF4444',
  errorLight: 'rgba(239, 68, 68, 0.15)',
  info: '#3B82F6',
  infoLight: 'rgba(59, 130, 246, 0.15)',
  messageOutgoing: '#2563EB',
  messageOutgoingText: '#FFFFFF',
  messageOutgoingTime: '#93C5FD',
  messageIncoming: '#0E1A38',
  messageIncomingText: '#FFFFFF',
  messageIncomingTime: '#8B9BB4',
  systemMessageBg: 'rgba(37, 99, 235, 0.12)',
  systemMessageText: '#93C5FD',
  online: '#10B981',
  offline: '#556885',
  securityVerified: '#10B981',
  securityWarning: '#F59E0B',
  securityDanger: '#EF4444',
  inputBackground: '#070D1E',
  inputBorder: 'rgba(255, 255, 255, 0.1)',
  modalBackdrop: 'rgba(2, 6, 23, 0.85)',
  badgeBg: '#2563EB',
  badgeText: '#FFFFFF',
  separator: 'rgba(255, 255, 255, 0.06)',
  fingerprintBg: '#070D1E',
};
