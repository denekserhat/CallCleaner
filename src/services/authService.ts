import apiClient from './apiClient';
import {
  LoginRequestDTO,
  RegisterRequestDTO,
  UpdateProfileRequestDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
} from '../types/DTO'; // DTO path düzeltildi

export const login = async (credentials: LoginRequestDTO) => {
  const response = await apiClient.post('/api/auth/login', credentials);
  return response.data; // Token ve kullanıcı bilgisi dönecek
};

export const register = async (userData: RegisterRequestDTO) => {
  const response = await apiClient.post('/api/auth/register', userData);
  return response.data; // Başarı mesajı ve belki userId
};

export const verifyToken = async () => {
  const response = await apiClient.get('/api/auth/verify-token');
  return response.data; // { userId, isValid }
};

export const updateProfile = async (profileData: UpdateProfileRequestDTO) => {
  const response = await apiClient.put('/api/auth/update-profile', profileData);
  return response.data; // Başarı mesajı ve güncel profil
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
