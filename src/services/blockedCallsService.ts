import apiClient from './apiClient';

export const getBlockedCalls = async (page: number = 1, limit: number = 20) => {
  const response = await apiClient.get('/api/blocked-calls', {
    params: { page, limit }
  });
  return response.data; // { calls: BlockedCallDTO[], pagination: {...} } dönecek
};

export const getBlockedCallsStats = async () => {
  const response = await apiClient.get('/api/blocked-calls/stats');
  return response.data; // { today, thisWeek, total } dönecek
};

export const deleteBlockedCall = async (id: string) => {
  const response = await apiClient.delete(`/api/blocked-calls/${id}`);
  return response.data;
};

export const deleteAllBlockedCalls = async () => {
  const response = await apiClient.delete('/api/blocked-calls');
  return response.data;
};

export const reportWrongBlock = async (id: string) => {
  const response = await apiClient.put(`/api/blocked-calls/${id}/report-wrong`);
  return response.data;
}; 