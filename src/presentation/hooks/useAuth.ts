import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../application/state/store';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout as logoutAction,
  clearAuthError,
  updateCurrentUser,
} from '../../application/state/slices/authSlice';
import {
  LoginUseCase,
  RegisterUseCase,
  LogoutUseCase,
} from '../../application/usecases/auth/AuthUseCases';
import { LoginCredentials, RegisterData } from '../../domain/repositories/IAuthRepository';

const loginUseCase = new LoginUseCase();
const registerUseCase = new RegisterUseCase();
const logoutUseCase = new LogoutUseCase();

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { currentUser, isAuthenticated, token, isLoading, error } = useAppSelector(
    (state) => state.auth
  );

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        dispatch(loginStart());
        const session = await loginUseCase.execute(credentials);
        dispatch(loginSuccess({ user: session.user, token: session.token || 'mock_token' }));
        return true;
      } catch (err: any) {
        dispatch(loginFailure(err.message || 'Login failed'));
        return false;
      }
    },
    [dispatch]
  );

  const register = useCallback(
    async (data: RegisterData) => {
      try {
        dispatch(loginStart());
        const session = await registerUseCase.execute(data);
        dispatch(loginSuccess({ user: session.user, token: session.token || 'mock_token' }));
        return true;
      } catch (err: any) {
        dispatch(loginFailure(err.message || 'Registration failed'));
        return false;
      }
    },
    [dispatch]
  );

  const logout = useCallback(async () => {
    try {
      await logoutUseCase.execute();
      dispatch(logoutAction());
    } catch {
      dispatch(logoutAction());
    }
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  return {
    currentUser,
    isAuthenticated,
    token,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  };
};
