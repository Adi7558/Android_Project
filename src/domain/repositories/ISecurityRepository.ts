import { SecurityIdentity } from '../entities/SecurityIdentity';
import { SecurityActivity } from '../entities/SecurityActivity';

export interface SecurityOverview {
  identityKeyFingerprint: string;
  activeSessionsCount: number;
  totalDevicesCount: number;
  isTwoFactorEnabled: boolean;
  encryptionAlgorithm: string;
  protocolVersion: string;
  lastKeyRotation: string;
  securityScore: number; // 0 - 100
}

export interface ISecurityRepository {
  getSecurityOverview(): Promise<SecurityOverview>;
  getSecurityIdentityForUser(userId: string): Promise<SecurityIdentity>;
  verifyContactIdentity(userId: string): Promise<void>;
  unverifyContactIdentity(userId: string): Promise<void>;
  getSecurityActivities(): Promise<SecurityActivity[]>;
  regenerateIdentityKeys(): Promise<SecurityIdentity>;
}
