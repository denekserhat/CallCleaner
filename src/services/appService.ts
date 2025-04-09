import apiClient from './apiClient';
import {VerifyPermissionsRequestDTO} from '../types/dto';

export const getAppVersion = async () => {
  const response = await apiClient.get('/api/app/version');
  return response.data;
};

export const getRequiredPermissions = async () => {
  const response = await apiClient.get('/api/app/required-permissions');
  return response.data; // Array of { id, reason }
};

export const verifyPermissions = async (data: VerifyPermissionsRequestDTO) => {
  const response = await apiClient.post('/api/app/verify-permissions', data);
  return response.data; // { status, missing }
};

export const getPrivacyPolicy = async () => {
  const response = await apiClient.get('/api/app/privacy-policy');
  return response.data; // { url, lastUpdated }
};
