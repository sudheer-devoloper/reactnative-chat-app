import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import MapView, { Region } from 'react-native-maps';

type Props = {
    initialLat: number;
    initialLng: number;
    onConfirm: (location: { latitude: number; longitude: number }) => void;
};

const MapSelector = ({ initialLat, initialLng, onConfirm }: Props) => {
    const [selectedLocation, setSelectedLocation] = useState({
        latitude: initialLat,
        longitude: initialLng,
    });

    const mapRef = useRef<MapView>(null);

    // Update map and selected location when props change
    useEffect(() => {
        setSelectedLocation({
            latitude: initialLat,
            longitude: initialLng,
        });

        if (mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: initialLat,
                longitude: initialLng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }, 500);
        }
    }, [initialLat, initialLng]);

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: initialLat,
                    longitude: initialLng,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                onRegionChangeComplete={(region: Region) => {
                    setSelectedLocation({
                        latitude: region.latitude,
                        longitude: region.longitude,
                    });
                }}
            />
            <View style={styles.pinContainer}>
                <Text style={styles.pin}>📍</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Confirm Location"
                    onPress={() => {
                        onConfirm(selectedLocation);
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    pinContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -10,
        marginTop: -40,
    },
    pin: {
        fontSize: 30,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
    },
});

export default MapSelector;
