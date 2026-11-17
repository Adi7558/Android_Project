import { SecurityOverview } from '../../domain/repositories/ISecurityRepository';
import { SecurityIdentity } from '../../domain/entities/SecurityIdentity';
import { SecurityActivity } from '../../domain/entities/SecurityActivity';

export const MOCK_SECURITY_OVERVIEW: SecurityOverview = {
  identityKeyFingerprint: 'A7F3 91BC 82D1 29AB 7C12 91FF 3342 9B8E',
  activeSessionsCount: 3,
  totalDevicesCount: 3,
  isTwoFactorEnabled: true,
  encryptionAlgorithm: 'AES-256-GCM + X25519 (Ratchet)',
  protocolVersion: 'Double Ratchet v3.4-FIPS',
  lastKeyRotation: 'Yesterday at 04:12 AM',
  securityScore: 92, // High security
};

export const MOCK_SECURITY_IDENTITIES: Record<string, SecurityIdentity> = {
  usr_002: {
    userId: 'usr_002', // Rahul Sharma
    identityKeyFingerprint: '94A1 88CD 31BF 28E4 52D0 10CC 7A8B 44F1',
    safetyNumber: '38192 48102 91823 48190 28190 48192 10928 39182 48192 01928 38192 10293',
    qrCodeData: 'SECURECHAT:VERIFY:usr_002:94A188CD31BF28E452D010CC7A8B44F1',
    isVerified: true,
    keyGeneratedAt: '2025-02-10T11:20:00Z',
    lastVerifiedAt: '2025-10-18T10:30:00Z',
    encryptionAlgorithm: 'Curve25519 / Ed25519 / AES-256-GCM',
    protocolVersion: 'Signal Double Ratchet v3',
  },
  usr_003: {
    userId: 'usr_003', // Priya Patil
    identityKeyFingerprint: 'B281 44AE 9011 C73D 81FA 5521 99E2 316C',
    safetyNumber: '71920 19283 48192 01928 39182 48192 38192 48102 91823 48190 28190 48192',
    qrCodeData: 'SECURECHAT:VERIFY:usr_003:B28144AE9011C73D81FA552199E2316C',
    isVerified: true,
    keyGeneratedAt: '2025-02-18T14:40:00Z',
    lastVerifiedAt: '2025-10-17T15:20:00Z',
    encryptionAlgorithm: 'Curve25519 / Ed25519 / AES-256-GCM',
    protocolVersion: 'Signal Double Ratchet v3',
  },
  usr_004: {
    userId: 'usr_004', // Elena Rostova
    identityKeyFingerprint: '1F33 CD89 45A2 90BE 6712 34EE 81A9 D430',
    safetyNumber: '55192 88102 91823 48190 77190 48192 10928 66182 48192 01928 38192 99293',
    qrCodeData: 'SECURECHAT:VERIFY:usr_004:1F33CD8945A290BE671234EE81A9D430',
    isVerified: true,
    keyGeneratedAt: '2025-03-01T08:15:00Z',
    lastVerifiedAt: '2025-10-19T09:15:00Z',
    encryptionAlgorithm: 'Curve25519 / Ed25519 / AES-256-GCM',
    protocolVersion: 'Signal Double Ratchet v3',
  },
  usr_005: {
    userId: 'usr_005', // Marcus Vance (Unverified / Warning)
    identityKeyFingerprint: 'E821 773B A042 18EF 9901 2234 DD88 BC51',
    safetyNumber: '11192 22102 33823 44190 55190 66192 77928 88182 99192 00928 11192 22293',
    qrCodeData: 'SECURECHAT:VERIFY:usr_005:E821773BA04218EF99012234DD88BC51',
    isVerified: false,
    keyGeneratedAt: '2025-10-18T18:10:00Z',
    encryptionAlgorithm: 'Curve25519 / Ed25519 / AES-256-GCM',
    protocolVersion: 'Signal Double Ratchet v3',
  },
  usr_006: {
    userId: 'usr_006', // Dr. Sarah Chen
    identityKeyFingerprint: '44C9 81FE 2351 D099 87BA 3201 EA77 12BC',
    safetyNumber: '99192 88102 77823 66190 55190 44192 33928 22182 11192 00928 99192 88293',
    qrCodeData: 'SECURECHAT:VERIFY:usr_006:44C981FE2351D09987BA3201EA7712BC',
    isVerified: true,
    keyGeneratedAt: '2025-03-20T10:10:00Z',
    lastVerifiedAt: '2025-10-14T10:00:00Z',
    encryptionAlgorithm: 'Curve25519 / Ed25519 / AES-256-GCM',
    protocolVersion: 'Signal Double Ratchet v3',
  },
  usr_007: {
    userId: 'usr_007', // David Kim
    identityKeyFingerprint: '7721 99FA 10CC 34EE B890 4123 6612 DD99',
    safetyNumber: '22192 33102 44823 55190 66190 77192 88928 99182 00192 11928 22192 33293',
    qrCodeData: 'SECURECHAT:VERIFY:usr_007:772199FA10CC34EEB89041236612DD99',
    isVerified: false,
    keyGeneratedAt: '2025-04-05T19:00:00Z',
    encryptionAlgorithm: 'Curve25519 / Ed25519 / AES-256-GCM',
    protocolVersion: 'Signal Double Ratchet v3',
  },
};

export const MOCK_SECURITY_ACTIVITIES: SecurityActivity[] = [
  {
    id: 'act_001',
    title: 'Identity Verification Completed',
    description: 'Elena Rostova safety number was verified via QR scan.',
    timestamp: 'Today at 09:15 AM',
    type: 'verification',
    severity: 'success',
  },
  {
    id: 'act_002',
    title: 'Ephemeral Key Rotation',
    description: 'Prekey bundle refreshed automatically with ratchet tree.',
    timestamp: 'Yesterday at 04:12 AM',
    type: 'key_change',
    severity: 'info',
  },
  {
    id: 'act_003',
    title: 'Safety Number Alert',
    description: 'Marcus Vance identity fingerprint changed unexpectedly.',
    timestamp: 'Oct 18, 06:12 PM',
    type: 'key_change',
    severity: 'warning',
  },
  {
    id: 'act_004',
    title: 'New Session Authorized',
    description: 'Chrome on Windows 11 signed in with multi-factor passkey.',
    timestamp: 'Oct 17, 02:45 PM',
    type: 'login',
    severity: 'info',
    device: 'Chrome / Windows',
    location: 'Zurich, Switzerland',
  },
  {
    id: 'act_005',
    title: 'Password Re-encrypted',
    description: 'Argon2id key derivation parameters updated to high-memory mode.',
    timestamp: 'Oct 10, 11:30 AM',
    type: 'password_reset',
    severity: 'info',
  },
];
