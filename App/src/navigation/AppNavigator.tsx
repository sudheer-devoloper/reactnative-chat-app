import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../screens/LoginScreen';
import { navigationRef } from '../helpers/NavigationService';
import BottomTabs from './BottomTabs';
import ChatScreen from '../screens/ChatScreen';
import withAuth from '../hoc/withAuth';
import SettingsScreen from '../screens/SettingsScreen';
import GalleryScreen from '../screens/GalleryScreen';
import Drawer from './Drawer/Drawer';
import LocationSearchScreen from '../screens/maps/LocationSearchScreen';
import MapSelectionScreen from '../screens/maps/MapSelectionScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState<any>(null);
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser || user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, [user]);

  console.log(isLoggedIn);


  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {!isLoggedIn &&
          <Stack.Screen name="LoginA" component={LoginScreen} options={{ headerShown: false }} />}
        <Stack.Screen name="Drawer" component={Drawer} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChatScreen" component={withAuth(ChatScreen)} options={{ headerShown: false }} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="GalleryScreen" component={GalleryScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={LocationSearchScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Map" component={MapSelectionScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
