import React from 'react';
import { VirtualizedList, Text, View, StyleSheet } from 'react-native';
import { DUMMY_API_DATA } from '../../helpers/constants';

const getItem = (data: typeof DUMMY_API_DATA, index: number) => data[index];
const getItemCount = (data: typeof DUMMY_API_DATA) => data.length;

const VirtualisedListing = () => {
    const renderItem = ({ item }: { item: typeof DUMMY_API_DATA[0] }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
        </View>
    );

    return (
        <View style={{ padding: 15 }}>
            <VirtualizedList
                data={DUMMY_API_DATA}
                initialNumToRender={10}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
                maxToRenderPerBatch={10}
                windowSize={5}
                removeClippedSubviews={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#d1e7ff',
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
});

export default VirtualisedListing;
