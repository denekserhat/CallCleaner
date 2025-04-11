import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, StatusBar} from 'react-native';
import {verifyToken} from '../services/authService';
import {colors} from '../theme';
import { getAccessToken, getRefreshToken, clearAuthTokens, storeAccessToken, storeRefreshToken } from '../services/tokenService';
import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from '../config/api';

type AuthLoadingScreenProps = {
  navigation?: any;
};

const tryRefreshToken = async (): Promise<boolean> => {
  try {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) return false;

    type RefreshResponse = {
      userId: number;
      fullName: string;
      accessToken: string;
      refreshToken: string;
    };

    const refreshApiClient = axios.create({ baseURL: API_BASE_URL });
    const response = await refreshApiClient.post<RefreshResponse>('/api/auth/refresh-token', { refreshToken });

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

    await storeAccessToken(newAccessToken);
    if (newRefreshToken) {
      await storeRefreshToken(newRefreshToken);
    }
    return true;

  } catch (error) {
    // console.error('AuthLoading: Refresh token failed:', error);
    await clearAuthTokens();
    return false;
  }
};

const AuthLoadingScreen: React.FC<AuthLoadingScreenProps> = ({navigation}) => {
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const accessToken = await getAccessToken();

        if (accessToken) {
          try {
            await verifyToken();
            navigation?.replace('Dashboard');
          } catch (verifyError) {
            const error = verifyError as AxiosError;
            // console.error('Token verification failed:', error.response?.status, error.message);

            if (error.response?.status === 401) {
              console.log('Access token expired or invalid, attempting refresh...');
              const refreshed = await tryRefreshToken();
              if (refreshed) {
                console.log('Token refresh successful, navigating to Dashboard.');
                navigation?.replace('Dashboard');
              } else {
                console.log('Token refresh failed, navigating to Login.');
                navigation?.replace('Login');
              }
            } else {
              console.log('Token verification failed with non-401 error, navigating to Login.');
              await clearAuthTokens();
              navigation?.replace('Login');
            }
          }
        } else {
          console.log('No access token found, navigating to Login.');
          navigation?.replace('Login');
        }
      } catch (error) {
        // console.error('Error during auth status check:', error);
        navigation?.replace('Login');
      }
    };

    checkAuthStatus();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },
});

export default AuthLoadingScreen; 