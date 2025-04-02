/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {Text, StatusBar, StyleSheet, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Ekranlar
import Dashboard from './src/screens/Dashboard';
import BlockedCalls from './src/screens/BlockedCalls';
import Settings from './src/screens/Settings';
import Report from './src/screens/Report';
import Onboarding from './src/screens/Onboarding';

// Tema
import {colors} from './src/theme';

// Navigasyon için tip tanımları
type RootStackParamList = {
  Onboarding: undefined;
  Dashboard: undefined;
  BlockedCalls: undefined;
  Settings: undefined;
  Report: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // İlk kurulum kontrolü (gerçek uygulamada AsyncStorage kullanılabilir)
    // Burada örnek olarak 3 saniye sonra yüklenmiş gibi davranıyoruz
    const timer = setTimeout(() => {
      setIsFirstLaunch(true); // İlk kurulum modunu değiştirmek için true yapabilirsiniz
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    // Yükleme ekranı
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <Text style={styles.loadingText}>SpamKilit Yükleniyor...</Text>
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Stack.Navigator
        initialRouteName={isFirstLaunch ? 'Onboarding' : 'Dashboard'}
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: colors.background.primary},
        }}>
        {isFirstLaunch && (
          <Stack.Screen name="Onboarding" component={Onboarding} />
        )}
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="BlockedCalls" component={BlockedCalls} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Report" component={Report} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },
  loadingText: {
    fontSize: 18,
    color: colors.text.primary,
    fontWeight: '600',
  },
});

export default App;
