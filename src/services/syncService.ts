import apiClient from './apiClient';
import { SyncBlockedNumbersRequestDTO, SyncSettingsRequestDTO } from '../types/dto';

export const getLastUpdateTimestamps = async () => {
  const response = await apiClient.get('/api/sync/last-update');
  return response.data; // { settingsTimestamp, blockedNumbersTimestamp }
};

export const syncBlockedNumbers = async (data: SyncBlockedNumbersRequestDTO) => {
  const response = await apiClient.post('/api/sync/blocked-numbers', data);
  return response.data; // { syncedCount, message }
};

export const syncSettings = async (data: SyncSettingsRequestDTO) => {
  const response = await apiClient.post('/api/sync/settings', data);
  return response.data; // { message }
}; 