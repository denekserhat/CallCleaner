import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

const ACCESS_TOKEN_KEY = 'userToken';
const REFRESH_TOKEN_SERVICE = 'refreshTokenService'; // Keychain için servis adı

// Access Token Yönetimi
export const storeAccessToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
  } catch (error) {
    // console.error('Error storing access token', error);
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  } catch (error) {
    // console.error('Error getting access token', error);
    return null;
  }
};

export const removeAccessToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
  } catch (error) {
    // console.error('Error removing access token', error);
  }
};

// Refresh Token Yönetimi (Keychain ile)
export const storeRefreshToken = async (token: string): Promise<void> => {
  try {
    // Keychain'e kullanıcı adı olarak servis adını, şifre olarak token'ı kaydet
    await Keychain.setGenericPassword(REFRESH_TOKEN_SERVICE, token, { service: REFRESH_TOKEN_SERVICE });
  } catch (error) {
    // console.error('Error storing refresh token', error);
  }
};

export const getRefreshToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({ service: REFRESH_TOKEN_SERVICE });
    if (credentials) {
      return credentials.password;
    }
    return null;
  } catch (error) {
    // console.error('Error getting refresh token', error);
    return null;
  }
};

export const removeRefreshToken = async (): Promise<void> => {
  try {
    await Keychain.resetGenericPassword({ service: REFRESH_TOKEN_SERVICE });
  } catch (error) {
    // console.error('Error removing refresh token', error);
  }
};

// Tüm Tokenları Temizleme
export const clearAuthTokens = async (): Promise<void> => {
  await removeAccessToken();
  await removeRefreshToken();
}; 