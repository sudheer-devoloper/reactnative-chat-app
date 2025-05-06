import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFcmToken } from '../redux/actions/fcmActions';

const useFCMToken = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
        dispatch(setFcmToken(token));
      } catch (error) {
        console.error('Failed to get FCM token:', error);
      }
    };

    // Get initial token
    getToken();

    // Update token on refresh
    return messaging().onTokenRefresh((newToken) => {
      console.log('FCM Token Refreshed:', newToken);
      dispatch(setFcmToken(newToken));
    });
  }, [dispatch]);
};

export default useFCMToken;
