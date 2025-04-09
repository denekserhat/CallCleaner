import apiClient from './apiClient';
import { CheckNumberRequestDTO, IncomingCallRequestDTO } from '../types/dto';

export const checkNumber = async (data: CheckNumberRequestDTO) => {
  const response = await apiClient.post('/api/check-number', data);
  return response.data; // { isSpam, spamType, riskScore }
};

export const checkIncomingCall = async (data: IncomingCallRequestDTO) => {
  const response = await apiClient.post('/api/incoming-call', data);
  return response.data; // { action, reason }
};

export const getNumberInfo = async (number: string) => {
  const response = await apiClient.get(`/api/number/${encodeURIComponent(number)}/info`);
  return response.data; // Detaylı numara bilgisi
}; 