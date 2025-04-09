import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {verifyToken} from '../services/authService';
import {colors} from '../theme';

type AuthLoadingScreenProps = {
  navigation?: any;
};

const AuthLoadingScreen: React.FC<AuthLoadingScreenProps> = ({navigation}) => {
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');

        if (userToken) {
          // Token var, geçerliliğini kontrol et
          try {
            await verifyToken();
            // Token geçerli, Dashboard'a yönlendir
            navigation?.replace('Dashboard');
          } catch (verifyError) {
            console.error('Token verification failed:', verifyError);
            // Token geçersiz veya API hatası, Login'e yönlendir
            await AsyncStorage.removeItem('userToken'); // Geçersiz token'ı temizle
            navigation?.replace('Login');
          }
        } else {
          // Token yok, Login'e yönlendir
          navigation?.replace('Login');
        }
      } catch (error) {
        console.error('Error reading token from storage:', error);
        // AsyncStorage okuma hatası, yine de Login'e yönlendir
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