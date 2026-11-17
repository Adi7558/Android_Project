import { IAuthRepository, LoginCredentials, RegisterData, AuthSession } from '../../../domain/repositories/IAuthRepository';
import { User } from '../../../domain/entities/User';
import { container } from '../../services/container';

export class LoginUseCase {
  constructor(private readonly authRepository: IAuthRepository = container.authRepository) {}

  async execute(credentials: LoginCredentials): Promise<AuthSession> {
    return this.authRepository.login(credentials);
  }
}

export class RegisterUseCase {
  constructor(private readonly authRepository: IAuthRepository = container.authRepository) {}

  async execute(data: RegisterData): Promise<AuthSession> {
    return this.authRepository.register(data);
  }
}

export class LogoutUseCase {
  constructor(private readonly authRepository: IAuthRepository = container.authRepository) {}

  async execute(): Promise<void> {
    return this.authRepository.logout();
  }
}

export class GetCurrentUserUseCase {
  constructor(private readonly authRepository: IAuthRepository = container.authRepository) {}

  async execute(): Promise<User | null> {
    return this.authRepository.getCurrentUser();
  }
}
