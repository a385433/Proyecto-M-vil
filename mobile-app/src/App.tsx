import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StatusBar } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import SearchScreen from './screens/SearchScreen';
import ProfileScreen from './screens/ProfileScreen';
import ReservationScreen from './screens/ReservationScreen';
import CalendarScreen from './screens/CalendarScreen';
import RulesScreen from './screens/RulesScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import { RootStackParamList } from './types';
import { AppProvider } from './context/AppContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar />
        <SafeAreaView style={{ flex: 1 }}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Reservation" component={ReservationScreen} />
            <Stack.Screen name="Calendar" component={CalendarScreen} />
            <Stack.Screen name="Rules" component={RulesScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </AppProvider>
  );
}
