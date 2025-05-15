import { GOOGLE_MAP_KEY } from '@env';
import { API_URL } from './url';
import API from './axios';

export const getLocationBasedOnLatLongs = async (lat: number, lng: number) => {
  try {
    const response = await API.get(
     API_URL.GET_LOCATION_API,
      {
        params: {
          latlng: `${lat},${lng}`,
          key: GOOGLE_MAP_KEY, 
        },
      }
    );

    const results = response.data.results;
    if (response.data.status === 'OK' && results.length > 0) {
      const address = results[0].formatted_address;
      return address;
    } else {
      console.warn('No address found!');
      return null;
    }
  } catch (error) {
    console.error('Error in reverse geocoding:', error);
    return null;
  }
};
