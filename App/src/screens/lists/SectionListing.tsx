import React from 'react';
import {
    SectionList,
    Text,
    View,
    StyleSheet,
    SectionListData,
} from 'react-native';
import { DUMMY_API_DATA } from '../../helpers/constants';


const SECTIONED_DATA = Array.from({ length: 5 }, (_, i) => ({
    title: `Section ${i + 1}`,
    data: DUMMY_API_DATA.slice(i * 10, (i + 1) * 10),
}));

const SectionListing = () => {
    const renderItem = ({ item }: { item: typeof DUMMY_API_DATA[0] }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
        </View>
    );

    const renderSectionHeader = ({
        section,
    }: {
        section: SectionListData<typeof DUMMY_API_DATA[0]>;
    }) => (
        <View style={styles.header}>
            <Text style={styles.headerText}>{section.title}</Text>
        </View>
    );

    return (
        <View style={{ padding: 15 }}>
            <SectionList
                sections={SECTIONED_DATA}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={5}
                removeClippedSubviews={true}
                stickySectionHeadersEnabled={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#e0f0ff',
        padding: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    item: {
        padding: 16,
        backgroundColor: '#f2f2f2',
        marginBottom: 4,
        marginHorizontal: 10,
        borderRadius: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
    },
});

export default SectionListing;
