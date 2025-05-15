import 'react-native-get-random-values';
import React, { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './App/src/redux/store';
import AppNavigator from './App/src/navigation/AppNavigator';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { requestNotificationPermission } from './App/src/utils/notification';
import useFCMToken from './App/src/hooks/useFcmToken';

const App = () => {
  useEffect(() => {
    requestNotificationPermission();
  }, [])

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      await notifee.displayNotification({
        title: remoteMessage.notification?.title || 'New Message',
        body: remoteMessage.notification?.body || '',
        android: {
          channelId: 'default',
          importance: AndroidImportance.HIGH,
        },
      });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    async function setupNotificationChannel() {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });
    }

    setupNotificationChannel();
  }, []);


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
