import {
  ISecurityRepository,
  SecurityOverview,
} from '../../domain/repositories/ISecurityRepository';
import { SecurityIdentity } from '../../domain/entities/SecurityIdentity';
import { SecurityActivity } from '../../domain/entities/SecurityActivity';
import {
  MOCK_SECURITY_OVERVIEW,
  MOCK_SECURITY_IDENTITIES,
  MOCK_SECURITY_ACTIVITIES,
} from '../mock/security.mock';
import { MOCK_USERS } from '../mock/users.mock';
import { delay } from '../mock/delay';

export class MockSecurityRepository implements ISecurityRepository {
  private overview: SecurityOverview = { ...MOCK_SECURITY_OVERVIEW };
  private identities: Record<string, SecurityIdentity> = { ...MOCK_SECURITY_IDENTITIES };
  private activities: SecurityActivity[] = [...MOCK_SECURITY_ACTIVITIES];

  async getSecurityOverview(): Promise<SecurityOverview> {
    await delay(200);
    return { ...this.overview };
  }

  async getSecurityIdentityForUser(userId: string): Promise<SecurityIdentity> {
    await delay(200);
    const identity = this.identities[userId];
    if (identity) {
      return { ...identity };
    }

    // Fallback generated mock identity for demonstration
    const user = MOCK_USERS.find((u) => u.id === userId);
    return {
      userId,
      identityKeyFingerprint: user?.publicKeyFingerprint || 'F442 88AA 1092 3381 77C0 19AB 4521 9912',
      safetyNumber: '44192 11102 88823 44190 22190 33192 77928 66182 55192 00928 11192 99293',
      qrCodeData: `SECURECHAT:VERIFY:${userId}:${user?.publicKeyFingerprint || 'DEFAULT'}`,
      isVerified: user?.securityStatus === 'verified',
      keyGeneratedAt: '2025-01-01T00:00:00Z',
      encryptionAlgorithm: 'Curve25519 / Ed25519 / AES-256-GCM',
      protocolVersion: 'Signal Double Ratchet v3',
    };
  }

  async verifyContactIdentity(userId: string): Promise<void> {
    await delay(250);
    if (this.identities[userId]) {
      this.identities[userId] = {
        ...this.identities[userId],
        isVerified: true,
        lastVerifiedAt: new Date().toISOString(),
      };
    }

    const user = MOCK_USERS.find((u) => u.id === userId);
    if (user) {
      user.securityStatus = 'verified';
    }

    this.activities.unshift({
      id: `act_${Date.now()}`,
      title: 'Contact Verified Manually',
      description: `Cryptographic safety number verified for ${user?.fullName || userId}.`,
      timestamp: 'Just now',
      type: 'verification',
      severity: 'success',
    });

    // TODO [Phase 2]: Persist verified contact key fingerprint into SQLite / SQLCipher secure storage
  }

  async unverifyContactIdentity(userId: string): Promise<void> {
    await delay(200);
    if (this.identities[userId]) {
      this.identities[userId] = {
        ...this.identities[userId],
        isVerified: false,
        lastVerifiedAt: undefined,
      };
    }
  }

  async getSecurityActivities(): Promise<SecurityActivity[]> {
    await delay(200);
    return [...this.activities];
  }

  async regenerateIdentityKeys(): Promise<SecurityIdentity> {
    await delay(500);
    const newFingerprint = 'E901 33BA 7721 44EF 1209 88CD 5521 10AA';
    this.overview.identityKeyFingerprint = newFingerprint;
    this.overview.lastKeyRotation = 'Just now';

    this.activities.unshift({
      id: `act_${Date.now()}`,
      title: 'Identity Keypair Rotated',
      description: 'New X25519 identity key generated. Prekey bundle updated.',
      timestamp: 'Just now',
      type: 'key_change',
      severity: 'info',
    });

    // TODO [Phase 2]: Generate new Ed25519/X25519 keypair using Libsodium / CryptoProvider
    // TODO [Phase 2]: Upload new signed prekey to .NET backend
    return {
      userId: 'usr_me_001',
      identityKeyFingerprint: newFingerprint,
      safetyNumber: '99999 88888 77777 66666 55555 44444 33333 22222 11111 00000 12345 67890',
      qrCodeData: `SECURECHAT:VERIFY:usr_me_001:${newFingerprint}`,
      isVerified: true,
      keyGeneratedAt: new Date().toISOString(),
      encryptionAlgorithm: 'Curve25519 / Ed25519 / AES-256-GCM',
      protocolVersion: 'Signal Double Ratchet v3',
    };
  }
}
