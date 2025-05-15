import React, { useCallback, useEffect, useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAP_KEY } from '@env';
import { useFocusEffect } from '@react-navigation/native';
import { getLocationBasedOnLatLongs } from '../../../../services/location';

const LocationSearch = (props: any) => {
    const [selLocation, setSelLocation] = useState("")
    const {
        onPress, queryParams = {}, selectedLocation, placeholder = 'Search', debounce = 0, types = 'geocode',
        autoFillOnNotFound = false, currentLocation = false, currentLocationLabel = 'Current location',
        enableHighAccuracyLocation = true, listUnderlayColor = '#c8c7cc', timeout = 20000,
    } = props;

    useFocusEffect(useCallback(() => {
        if(selectedLocation.lat && selectedLocation.lng){
            console.log("u are in");
            getLocation();
        }
    }, []))

    const getLocation = async () => {
        const location = await getLocationBasedOnLatLongs(selectedLocation.lat, selectedLocation.lng)
        setSelLocation(location);
    }
    

    return (
        <GooglePlacesAutocomplete
            placeholder={placeholder}
            query={{
                key: GOOGLE_MAP_KEY,
                language: 'en',
                types: types,
                ...queryParams,
            }}
            autoFillOnNotFound={autoFillOnNotFound}
            currentLocation={currentLocation}
            currentLocationLabel={currentLocationLabel}
            debounce={debounce}
            disableScroll={false}
            enableHighAccuracyLocation={enableHighAccuracyLocation}
            enablePoweredByContainer={true}
            fetchDetails={true}
            filterReverseGeocodingByTypes={[]}
            GooglePlacesDetailsQuery={{}}
            GooglePlacesSearchQuery={{
                rankby: 'distance',
                type: 'restaurant',
            }}
            GoogleReverseGeocodingQuery={{}}
            isRowScrollable={true}
            keyboardShouldPersistTaps="always"
            listUnderlayColor={listUnderlayColor}
            listViewDisplayed="auto"
            keepResultsAfterBlur={false}
            minLength={1}
            nearbyPlacesAPI="GooglePlacesSearch"
            numberOfLines={1}
            onFail={() => { }}
            onNotFound={() => { }}
            onPress={(data, details = null) => {
                if (details?.geometry?.location) {
                    const { lat, lng } = details.geometry.location;
                    if (onPress) {
                        onPress(lat, lng);
                    }
                }
            }}
            onTimeout={() => console.warn('google places autocomplete: request timeout')}
            predefinedPlaces={[]}
            predefinedPlacesAlwaysVisible={false}
            styles={{}}
            suppressDefaultStyles={false}
            textInputHide={false}
            textInputProps={{
                // value: selectedLocation ? selLocation : '',
                // onChangeText: (text) => setSelLocation(text)
            }}
            timeout={timeout}
        />
    );
};

export default LocationSearch;
