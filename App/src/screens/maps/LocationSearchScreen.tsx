import React, { useState, useEffect } from 'react';
import { StatusBar, View, Text, ImageBackground, StyleSheet, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';

import { useSelector } from 'react-redux';
import { FONTS } from '../../helpers/fonts';
import { navigate } from '../../helpers/NavigationService';
import { getLocationBasedOnLatLongs } from '../../../services/location';
import { requestLocationPermission } from '../../helpers/permission';
import GetLocation from 'react-native-get-location';

const bg = require('../../assets/images/bg.jpg');

const LocationSearchScreen = () => {
    const gradient = useSelector((state: any) => state.theme.gradient);
    const [location, setLocation] = useState("");
    const [lat, setLat] = useState<number>();
    const [lng, setLng] = useState<number>();

    useEffect(() => {
        getCurrentLocation();
    }, []);

    const getCurrentLocation = async () => {
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) return;
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
        .then(location => {
            const { latitude, longitude } = location;
            onLocationUpdated({ latitude, longitude })
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
    };
    
    const onLocationUpdated = async (coords: { latitude: number, longitude: number }) => {
        try {
            const locationName = await getLocationBasedOnLatLongs(coords.latitude, coords.longitude);
            setLocation(locationName);
            setLat(coords.latitude);
            setLng(coords.longitude);
        } catch (e) {
            console.error("onLocationUpdated error", e);
        }
    };

    const MapView = () => {
        navigate('Map', {
            lat: lat ?? 17.4486,
            lng: lng ?? 78.3908,
            onLocationUpdated: onLocationUpdated
        });
    };

    return (
        <ImageBackground source={bg} style={styles.bg}>
            <Text style={{ color: "#000", fontSize: 15, paddingTop: 20, fontFamily: FONTS.SEMI_BOLD }}>Your Location :</Text>
            <View style={{ paddingTop: 10, flex: 1 }}>
                <View style={styles.locationInputContainer}>
                    <Text style={styles.locationText}>{!location ? "Please wait for getting current location..!" :location}</Text>
                </View>
                <TouchableOpacity onPress={MapView} style={{ alignItems: "center", justifyContent: 'center', marginTop: 20 }}>
                    <Text style={{ color: "#000", paddingTop: 20, fontFamily: FONTS.SEMI_BOLD, textDecorationLine: "underline" }}>Change Location ?</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default LocationSearchScreen;

const styles = StyleSheet.create({
    bg: { flex: 1, paddingTop: StatusBar.currentHeight, padding: 20 },
    locationInputContainer: {
        height: 50,
        width: "100%",
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 15,
        justifyContent: "center",
        paddingHorizontal: 10
    },
    locationText: { fontSize: 16, fontFamily: FONTS.SEMI_BOLD }
});
