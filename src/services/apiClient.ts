import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_BASE_URL} from '../config/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// İstek interceptor'ü: Her isteğe token ekler
apiClient.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Yanıt interceptor'ü: 401 (Unauthorized) durumunda oturumu kapatma vb. işlemler yapılabilir
apiClient.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Burada token yenileme mantığı eklenebilir
      // Şimdilik sadece oturumu kapatıp login ekranına yönlendirebiliriz
      console.error('Unauthorized! Logging out...');
      await AsyncStorage.removeItem('userToken');
      // TODO: Kullanıcıyı Login ekranına yönlendirme mantığı ekle
    }
    return Promise.reject(error);
  },
);

export default apiClient;
