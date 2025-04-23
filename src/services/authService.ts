import apiClient from './apiClient';
import {
  LoginRequestDTO,
  RegisterRequestDTO,
  UpdateProfileRequestDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
} from '../types/DTO';
import { getRefreshToken, clearAuthTokens } from './tokenService';

export const login = async (credentials: LoginRequestDTO) => {
  const response = await apiClient.post('/api/auth/login', credentials);
  return response.data;
};

export const register = async (userData: RegisterRequestDTO) => {
  const response = await apiClient.post('/api/auth/register', userData);
  return response.data;
};

export const verifyToken = async () => {
  const response = await apiClient.get('/api/auth/verify-token');
  return response.data;
};

export const updateProfile = async (profileData: UpdateProfileRequestDTO) => {
  const response = await apiClient.put('/api/auth/update-profile', profileData);
  return response.data;
};

export const forgotPassword = async (data: ForgotPasswordDTO) => {
  const response = await apiClient.post('/api/auth/forgot-password', data);
  return response.data;
};

export const resetPassword = async (data: ResetPasswordDTO) => {
  const response = await apiClient.post('/api/auth/reset-password', data);
  return response.data;
};

export const confirmEmail = async (userId: string, token: string) => {
  const response = await apiClient.get(
    `/api/auth/confirm-email?userId=${userId}&token=${token}`,
  );
  return response.data;
};

export const logout = async () => {
  try {
    const refreshToken = await getRefreshToken();
    if (refreshToken) {
      await apiClient.post('/api/auth/logout', { refreshToken }).catch(err => {
         console.warn('Logout API call failed (token might be already invalid):', err);
      });
    }
  } finally {
    await clearAuthTokens();
  }
};
