import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import withAuth from '../hoc/withAuth';
import { useSelector } from 'react-redux';
import MyTabs from './TabsScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const gradient = useSelector((state: any) => state.theme.gradient);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        animation: "none",
        tabBarIcon: ({ color, size }) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: gradient?.colors[0],
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'transparent',
          position: 'absolute',
          borderTopWidth: 0,
          elevation: 0, // for Android
        },
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Profile" component={withAuth(MyTabs)} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
