import { IUserRepository, UpdateProfileData } from '../../../domain/repositories/IUserRepository';
import { User } from '../../../domain/entities/User';
import { container } from '../../services/container';

export class GetUserProfileUseCase {
  constructor(private readonly userRepository: IUserRepository = container.userRepository) {}

  async execute(): Promise<User> {
    return this.userRepository.getUserProfile();
  }
}

export class UpdateProfileUseCase {
  constructor(private readonly userRepository: IUserRepository = container.userRepository) {}

  async execute(data: UpdateProfileData): Promise<User> {
    return this.userRepository.updateProfile(data);
  }
}

export class ChangePasswordUseCase {
  constructor(private readonly userRepository: IUserRepository = container.userRepository) {}

  async execute(oldPass: string, newPass: string): Promise<void> {
    return this.userRepository.changePassword(oldPass, newPass);
  }
}
