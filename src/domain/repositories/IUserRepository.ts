import { User } from '../entities/User';

export interface UpdateProfileData {
  fullName?: string;
  statusMessage?: string;
  avatarUrl?: string;
}

export interface IUserRepository {
  getUserProfile(): Promise<User>;
  updateProfile(data: UpdateProfileData): Promise<User>;
  changePassword(oldPassword: string, newPassword: string): Promise<void>;
}
