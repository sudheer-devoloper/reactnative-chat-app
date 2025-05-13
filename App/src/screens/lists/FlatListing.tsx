import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { DUMMY_API_DATA } from '../../helpers/constants'

const FlatListing = () => {

    const renderItem = ({ item }: { item: typeof DUMMY_API_DATA[0] }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
        </View>
    );

    return (
        <View style={{padding:15}}>
            <FlatList
                data={DUMMY_API_DATA}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                initialNumToRender={10} // Optimizes first render
                maxToRenderPerBatch={10} // Controls render batches
                windowSize={5} // Number of viewable screens to render ahead
                removeClippedSubviews={true} // Improves memory usage
            />
        </View>
    )
}

export default FlatListing

const styles = StyleSheet.create({
    item: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f9c2ff',
        borderRadius: 8,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
      },
})