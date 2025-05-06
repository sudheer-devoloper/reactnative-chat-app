import notifee, { AndroidImportance } from '@notifee/react-native';

export  async function requestNotificationPermission() {
  await notifee.requestPermission();
}



