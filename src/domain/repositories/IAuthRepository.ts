import { User } from '../entities/User';

export interface LoginCredentials {
  identifier: string; // email or username
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export interface AuthSession {
  user: User;
  token?: string; // Phase 1 mock token, real JWT in Phase 2
}

export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<AuthSession>;
  register(data: RegisterData): Promise<AuthSession>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  isAuthenticated(): Promise<boolean>;
}
