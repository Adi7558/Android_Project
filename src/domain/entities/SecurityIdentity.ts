export interface SecurityIdentity {
  userId: string;
  identityKeyFingerprint: string;
  safetyNumber: string;
  qrCodeData: string;
  isVerified: boolean;
  keyGeneratedAt: string;
  lastVerifiedAt?: string;
  encryptionAlgorithm: string;
  protocolVersion: string;
}
