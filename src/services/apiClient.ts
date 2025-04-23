import axios, {AxiosError, InternalAxiosRequestConfig} from 'axios';
import {API_BASE_URL} from '../config/api';
import {
  getAccessToken,
  getRefreshToken,
  storeAccessToken,
  storeRefreshToken,
  clearAuthTokens,
} from './tokenService';
import NavigationService from './NavigationService';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Açıklama: API'ye gönderilecek her istekten ÖNCE çalışır.
// Görevi: Eğer cihazda bir access token varsa, onu otomatik olarak isteğin 'Authorization' başlığına ekler.
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

// --- Yanıt Interceptor --- //
// Açıklama: API'den bir yanıt alındıktan SONRA veya bir hata oluştuğunda çalışır.
// Görevi: Özellikle 401 (Unauthorized) hatalarını yakalayarak refresh token mekanizmasını tetikler.
// Ayrıca, refresh işlemi sırasında gelen diğer istekleri sıraya alır.

// Refresh token isteği yapılıyor mu kontrolü için değişken
// Birden fazla isteğin aynı anda 401 alması durumunda, sadece bir kez refresh token isteği gönderilmesini sağlar.
let isRefreshing = false;
// Başarısız olan istekleri tutmak için dizi
// Refresh token işlemi tamamlanana kadar 401 alan diğer istekler burada bekletilir.
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

// Bekleyen istekleri işleyen fonksiyon.
// Yeni token alındığında veya refresh başarısız olduğunda çağrılır.
const processQueue = (
  error: AxiosError | null,
  token: string | null = null,
) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Yanıt Interceptor Ana Mantığı
apiClient.interceptors.response.use(
  response => {
    // Başarılı yanıtları (2xx durum kodları) doğrudan döndür.
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // --- Refresh Token Mantığı --- //
    // Koşullar: Gelen hata 401 mi? Bu istek daha önce refresh için denenmedi mi? Bu istek zaten refresh token istemiyor mu?
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== '/api/auth/refresh-token'
    ) {
      if (isRefreshing) {
        // Eğer zaten bir refresh işlemi devam ediyorsa, bu isteği kuyruğa ekle
        // handleRefreshToken tamamlandığında processQueue tarafından işlenecek.
        return new Promise((resolve, reject) => {
          failedQueue.push({resolve, reject});
        })
          .then(token => {
            // Yeni token ile isteği tekrar yapılandır
            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
            }
            return apiClient(originalRequest); // Tekrar dene
          })
          .catch(err => {
            return Promise.reject(err); // Refresh başarısız olduysa reddet
          });
      }

      // Bu istek ilk 401 alan ve refresh işlemini başlatan istek olacak
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await handleRefreshToken(); // Asıl refresh işlemini yapan fonksiyon
        processQueue(null, newAccessToken); // Kuyruğu işle
        // Orijinal isteği yeni token ile tekrar yapılandır ve gönder
        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null); // Kuyruğu hata ile işle
        // handleRefreshToken zaten yönlendirmeyi yaptı veya hata logladı.
        return Promise.reject(refreshError); // Hatayı yukarıya ilet
      } finally {
        isRefreshing = false; // Refresh işlemi bitti (başarılı veya başarısız)
      }
    }

    // 401 dışındaki hataları veya zaten tekrar denenmiş 401 hatalarını doğrudan reddet.
    return Promise.reject(error);
  },
);

// Refresh token işlemini yöneten ayrı async fonksiyon
async function handleRefreshToken(): Promise<string> {
  try {
    const refreshToken = await getRefreshToken(); // Güvenli depodan refresh token'ı al.
    if (!refreshToken) {
      console.log('No refresh token available, logging out.');
      await clearAuthTokens();
      NavigationService.resetRoot('Login');
      throw new Error('No refresh token available');
    }

    type RefreshResponse = {
      userId: number; // veya string
      fullName: string;
      accessToken: string;
      refreshToken: string;
    };

    const refreshApiClient = axios.create({baseURL: API_BASE_URL});
    const response = await refreshApiClient.post<RefreshResponse>(
      '/api/auth/refresh-token',
      {refreshToken},
    );

    const {accessToken: newAccessToken, refreshToken: newRefreshToken} =
      response.data;

    await storeAccessToken(newAccessToken);
    await storeRefreshToken(newRefreshToken);

    // Axios instance'ın default header'ını da güncellemek iyi bir pratik olabilir
    if (apiClient.defaults.headers.common['Authorization']) {
      apiClient.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${newAccessToken}`;
    }

    return newAccessToken; // Yeni access token'ı döndür
  } catch (error: any) {
    await clearAuthTokens(); // Refresh işlemi başarısızsa token'ları temizle
    NavigationService.resetRoot('Login');
    throw error; // Hatayı tekrar fırlat ki interceptor yakalasın ve kuyruğu işlesin
  }
}

export default apiClient;
