import apiClient from './apiClient';
import {
  UpdateBlockingModeRequestDTO,
  UpdateWorkingHoursRequestDTO,
  UpdateNotificationsRequestDTO,
  AddToWhitelistRequestDTO
} from '../types/dto';

export const getSettings = async () => {
  const response = await apiClient.get('/api/settings');
  return response.data; // Settings object dönecek
};

export const updateBlockingMode = async (data: UpdateBlockingModeRequestDTO) => {
  const response = await apiClient.put('/api/settings/blocking-mode', data);
  return response.data;
};

export const updateWorkingHours = async (data: UpdateWorkingHoursRequestDTO) => {
  const response = await apiClient.put('/api/settings/working-hours', data);
  return response.data;
};

export const updateNotifications = async (data: UpdateNotificationsRequestDTO) => {
  const response = await apiClient.put('/api/settings/notifications', data);
  return response.data;
};

export const getWhitelist = async () => {
  const response = await apiClient.get('/api/settings/whitelist');
  return response.data; // Whitelist array dönecek
};

export const addToWhitelist = async (data: AddToWhitelistRequestDTO) => {
  const response = await apiClient.post('/api/settings/whitelist', data);
  return response.data;
};

export const removeFromWhitelist = async (number: string) => {
  const response = await apiClient.delete(`/api/settings/whitelist/${encodeURIComponent(number)}`);
  return response.data;
}; 