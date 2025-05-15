import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapSelector from './components/MapSelector';
import { goBack } from '../../helpers/NavigationService';
import LocationSearch from './components/LocationSearch';

const MapSelectionScreen = ({ route }: Navigation) => {
  const { lat, lng, onLocationUpdated } = route.params;
  const [latitude, setLatitude] = useState<number>(lat)
  const [longitude, setLongitude] = useState<number>(lng)

  const handleLocationConfirm = (selectedLocation: any) => {
    onLocationUpdated(selectedLocation);
    goBack();
  };

  const [location, setLocation] = useState({
    lat: null,
    lng: null,
    name: '',
  });

  const handleLocationSelect = (lat: number, lng: number, name: string) => {
    setLocation({ lat, lng, name } as any);
    setLatitude(lat)
    setLongitude(lng)
  };


  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <LocationSearch
          onPress={handleLocationSelect}
          selectedLocation={location}
        />
      </View>
      <MapSelector
        initialLat={latitude}
        initialLng={longitude}
        onConfirm={handleLocationConfirm}
      />
    </View>
  );
};

export default MapSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 10,
  },
});
function onLocationUpdated(selectedLocation: any) {
  throw new Error('Function not implemented.');
}

