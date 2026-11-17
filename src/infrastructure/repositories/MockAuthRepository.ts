import {
  IAuthRepository,
  LoginCredentials,
  RegisterData,
  AuthSession,
} from '../../domain/repositories/IAuthRepository';
import { User } from '../../domain/entities/User';
import { AuthFailure } from '../../domain/failures/Failures';
import { CURRENT_MOCK_USER } from '../mock/users.mock';
import { delay } from '../mock/delay';

export class MockAuthRepository implements IAuthRepository {
  private currentUser: User | null = CURRENT_MOCK_USER;
  private isLogged: boolean = true;

  async login(credentials: LoginCredentials): Promise<AuthSession> {
    // Simulate brief network latency for realistic loading states
    await delay(600);

    // Simple mock validation
    if (!credentials.identifier || !credentials.password) {
      throw new AuthFailure('Username/email and password are required.');
    }

    if (credentials.password.length < 6) {
      throw new AuthFailure('Password must be at least 6 characters long.');
    }

    // Accept demo accounts or mock user
    const normalizedIdentifier = credentials.identifier.trim().toLowerCase();
    const isValidIdentifier =
      normalizedIdentifier === 'alex_mercer' ||
      normalizedIdentifier === 'alex.mercer@securechat.io' ||
      normalizedIdentifier.includes('@') ||
      normalizedIdentifier.length >= 3;

    if (!isValidIdentifier) {
      throw new AuthFailure('Invalid credentials. Please verify your username or password.');
    }

    this.currentUser = {
      ...CURRENT_MOCK_USER,
      email: normalizedIdentifier.includes('@') ? normalizedIdentifier : CURRENT_MOCK_USER.email,
      username: !normalizedIdentifier.includes('@') ? normalizedIdentifier : CURRENT_MOCK_USER.username,
    };
    this.isLogged = true;

    // TODO [Phase 2]: Connect to .NET Backend API (POST /api/v1/auth/login)
    // TODO [Phase 2]: Store JWT access/refresh token in Android EncryptedSharedPreferences / Keychain
    return {
      user: this.currentUser,
      token: 'mock_jwt_session_token_phase1',
    };
  }

  async register(data: RegisterData): Promise<AuthSession> {
    await delay(750);

    if (!data.fullName || !data.email || !data.password || !data.username) {
      throw new AuthFailure('All registration fields are required.');
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      username: data.username.toLowerCase().trim(),
      email: data.email.toLowerCase().trim(),
      fullName: data.fullName.trim(),
      statusMessage: 'Encrypted & verified.',
      isOnline: true,
      securityStatus: 'verified',
      publicKeyFingerprint: '88C1 44AE 9011 C73D 81FA 5521 99E2 316C',
      createdAt: new Date().toISOString(),
    };

    this.currentUser = newUser;
    this.isLogged = true;

    // TODO [Phase 2]: Connect to .NET Backend API (POST /api/v1/auth/register)
    // TODO [Phase 2]: Generate X25519 identity keypair and publish signed prekey bundle to backend
    return {
      user: newUser,
      token: 'mock_jwt_session_token_phase1',
    };
  }

  async logout(): Promise<void> {
    await delay(300);
    this.currentUser = null;
    this.isLogged = false;

    // TODO [Phase 2]: Invalidate session in .NET backend (POST /api/v1/auth/logout)
    // TODO [Phase 2]: Clear cryptographic session keys and local cache
  }

  async getCurrentUser(): Promise<User | null> {
    return this.currentUser;
  }

  async isAuthenticated(): Promise<boolean> {
    return this.isLogged;
  }
}
