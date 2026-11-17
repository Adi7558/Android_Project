import { IUserRepository, UpdateProfileData } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { CURRENT_MOCK_USER } from '../mock/users.mock';
import { ValidationFailure } from '../../domain/failures/Failures';
import { delay } from '../mock/delay';

export class MockUserRepository implements IUserRepository {
  private user: User = { ...CURRENT_MOCK_USER };

  async getUserProfile(): Promise<User> {
    await delay(150);
    return { ...this.user };
  }

  async updateProfile(data: UpdateProfileData): Promise<User> {
    await delay(350);
    this.user = {
      ...this.user,
      fullName: data.fullName ?? this.user.fullName,
      statusMessage: data.statusMessage ?? this.user.statusMessage,
      avatarUrl: data.avatarUrl ?? this.user.avatarUrl,
    };
    // TODO [Phase 2]: Update user profile in .NET backend (PUT /api/v1/users/profile)
    return { ...this.user };
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    await delay(400);
    if (!oldPassword || !newPassword) {
      throw new ValidationFailure('Current and new password are required.');
    }
    if (newPassword.length < 8) {
      throw new ValidationFailure('New password must be at least 8 characters long.');
    }
    // TODO [Phase 2]: Hash with Argon2id and update password via .NET API (POST /api/v1/users/change-password)
  }
}
