import apiClient from './apiClient';
import { SubmitReportRequestDTO } from '../types/dto';

export const submitReport = async (data: SubmitReportRequestDTO) => {
  const response = await apiClient.post('/api/reports', data);
  return response.data;
};

export const getRecentCallsForReport = async (limit: number = 10) => {
  const response = await apiClient.get('/api/reports/recent-calls', {
    params: { limit }
  });
  return response.data;
};

export const getSpamTypes = async () => {
  const response = await apiClient.get('/api/reports/spam-types');
  return response.data;
}; 