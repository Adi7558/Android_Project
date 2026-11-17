export type SecurityStatus = 'verified' | 'unverified' | 'warning';

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  statusMessage?: string;
  isOnline: boolean;
  lastSeen?: string;
  securityStatus: SecurityStatus;
  publicKeyFingerprint: string;
  phoneNumber?: string;
  createdAt: string;
}
