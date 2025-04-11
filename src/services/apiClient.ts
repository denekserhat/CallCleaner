import axios, {AxiosError, InternalAxiosRequestConfig} from 'axios';
import {API_BASE_URL} from '../config/api';
import {
  getAccessToken,
  getRefreshToken,
  storeAccessToken,
  storeRefreshToken,
  clearAuthTokens,
} from './tokenService';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// İstek interceptor'ü: Her isteğe access token ekler
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Refresh token isteği yapılıyor mu kontrolü için değişken
let isRefreshing = false;
// Başarısız olan istekleri tutmak için dizi
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void; }[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Yanıt interceptor'ü: 401 durumunda refresh token mekanizmasını çalıştırır
apiClient.interceptors.response.use(
  response => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // 401 hatası mı ve daha önce denenmedi mi? ve refresh token isteği değil mi?
    if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/api/auth/refresh-token') {

      if (isRefreshing) {
        // Eğer zaten refresh işlemi yapılıyorsa, bu isteği kuyruğa ekle
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          if(originalRequest.headers) {
             originalRequest.headers['Authorization'] = 'Bearer ' + token;
          }
          return apiClient(originalRequest); // Yeni token ile tekrar dene
        }).catch(err => {
          return Promise.reject(err); // Refresh token hatası olursa reddet
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) {
          // Refresh token yoksa, oturumu kapat ve login'e yönlendir
          console.log('No refresh token available, logging out.');
          await clearAuthTokens();
          // TODO: Kullanıcıyı Login ekranına yönlendirme mantığı ekle (Navigasyon servisi veya context ile)
          processQueue(error, null); // Kuyruktaki istekleri reddet
          return Promise.reject(error);
        }

        // API'nin refresh token yanıtını varsayalım (gerçek yanıta göre güncelleyin)
        type RefreshResponse = {
          userId: number; // veya string
          fullName: string;
          accessToken: string;
          refreshToken: string; // Opsiyonel: Bazen yeni refresh token dönebilir
        };

        // Refresh token endpoint'ine istek at (yeni bir axios instance ile veya interceptor'ları atlayarak)
        // Not: Direkt apiClient kullanmak döngüye neden olabilir, yeni instance tercih edilir.
        const refreshApiClient = axios.create({ baseURL: API_BASE_URL });
        const response = await refreshApiClient.post<RefreshResponse>('/api/auth/refresh-token', { refreshToken });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

        // Yeni token'ları sakla (API her zaman yeni refresh token döndürüyor)
        await storeAccessToken(newAccessToken);
        await storeRefreshToken(newRefreshToken); // API dokümanına göre her zaman yeni refreshToken geliyor

        // Orijinal isteğin başlığını yeni token ile güncelle
        if (apiClient.defaults.headers.common['Authorization']) {
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        }
         if(originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
         }

        processQueue(null, newAccessToken); // Kuyruktaki istekleri yeni token ile çöz
        isRefreshing = false;
        return apiClient(originalRequest); // Orijinal isteği yeni token ile tekrar dene

      } catch (refreshError: any) {
        console.error('Unable to refresh token:', refreshError);
        await clearAuthTokens(); // Refresh işlemi başarısızsa token'ları temizle
        // TODO: Kullanıcıyı Login ekranına yönlendirme mantığı ekle
        processQueue(refreshError as AxiosError, null); // Kuyruktaki istekleri hata ile reddet
        isRefreshing = false;
        return Promise.reject(refreshError);
      }
    }

    // 401 dışındaki hataları veya tekrar denenen istekleri direkt reddet
    return Promise.reject(error);
  },
);

export default apiClient;
