/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { navigationRef } from './src/services/NavigationService';

// Ekranlar
import Onboarding from './src/screens/Onboarding';
import Dashboard from './src/screens/Dashboard';
import BlockedCalls from './src/screens/BlockedCalls';
import Settings from './src/screens/Settings';
import Report from './src/screens/Report';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import ForgotPassword from './src/screens/ForgotPassword';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';

// Tema
import {colors} from './src/theme';

// Navigasyon için tip tanımları
type RootStackParamList = {
  Onboarding: undefined;
  AuthLoadingScreen: undefined;
  Dashboard: undefined;
  BlockedCalls: undefined;
  Settings: undefined;
  Report: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: colors.background.primary},
        }}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="AuthLoadingScreen" component={AuthLoadingScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="BlockedCalls" component={BlockedCalls} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Report" component={Report} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({}); // Şimdilik yoruma alalım, belki ileride gerekir

export default App;
