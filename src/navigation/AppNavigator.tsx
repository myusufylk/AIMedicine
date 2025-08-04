import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import AtmDetailScreen from '../screens/AtmDetailScreen';
import QRCodeScreen from '../screens/QRCodeScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Anasayfa" component={HomeScreen} />
      <Tab.Screen name="Reçetelerim" component={MapScreen} />
      <Tab.Screen name="Profil" component={AtmDetailScreen} />
    </Tab.Navigator>
  );
}

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={MainTabs} />
      <Stack.Screen name="AtmDetail" component={AtmDetailScreen} />
      <Stack.Screen name="QRCode" component={QRCodeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator; 