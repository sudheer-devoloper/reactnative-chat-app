import { StyleSheet, View } from 'react-native'
import React from 'react'
import ImageViewing from 'react-native-image-viewing';
import { useSelector } from 'react-redux';

interface CarouselProps {
    images: string[],
    currentIndex: number,
    viewerVisible: boolean,
    setViewerVisible: (val: boolean) => void;
}

const Carousel = (Props: CarouselProps) => {
    const { images, currentIndex, viewerVisible, setViewerVisible } = Props;
     const gradient = useSelector((state: any) => state.theme.gradient);

    const imageDataForViewer = images.map((img: any) => ({
        uri: img.path,
    }));

    return (
        <ImageViewing
            images={imageDataForViewer}
            imageIndex={currentIndex}
            visible={viewerVisible}
            backgroundColor="#fff"
            doubleTapToZoomEnabled={true}
            onRequestClose={() => setViewerVisible(false)}
            FooterComponent={({ imageIndex }) => (
                <View style={styles.footer}>
                    {imageDataForViewer.map((_: any, index: React.Key | null | undefined) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                index === imageIndex ? [styles.activeDot,{backgroundColor:gradient.colors[0]}] : styles.inactiveDot,
                            ]}
                        />
                    ))}
                </View>
            )}
        />
    )
}

export default Carousel

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#333',
    },
    inactiveDot: {
        backgroundColor: '#ccc',
    },
})