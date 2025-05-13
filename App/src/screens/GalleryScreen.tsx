import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { end, start } from '../helpers/constants';
import Icon from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import { goBack } from '../helpers/NavigationService';
import ImagePickerModal from '../components/ImagePickerModal';
import Carousel from '../components/Carousel';


const GalleryScreen = () => {
  const gradient = useSelector((state: any) => state.theme.gradient);
  const font = useSelector((state: any) => state.theme.font);
  const [modalVisible, setModalVisible] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  const [viewerVisible, setViewerVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openViewer = (index: number) => {
    setCurrentIndex(index);
    setViewerVisible(true);
  };


  const handleImagesPicked = (newImages: any[]) => {
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, idx) => idx !== index);
    setImages(newImages);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={gradient?.colors} start={start} end={end} style={styles.headerGradient}>
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => goBack()}>
                <Icon name="arrow-back" size={35} color={"#fff"} />
              </TouchableOpacity>
              <Text style={[styles.headerText, { fontFamily: font }]}>Gallery</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <IconM name="camera-plus-outline" size={35} color={"#fff"} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
      <ScrollView contentContainerStyle={styles.imageContainer}>
        {images.map((img, idx) => (
          <View>
            <TouchableOpacity key={idx} onPress={() => openViewer(idx)}>
              <Image key={idx} source={{ uri: img.path }} style={styles.image} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.pos} onPress={() => removeImage(idx)}>
              <IconM name='close-circle' size={25} color={"#fff"} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <ImagePickerModal visible={modalVisible} onClose={() => setModalVisible(false)} onImagesPicked={handleImagesPicked}/>
      <Carousel images={images} currentIndex={currentIndex} viewerVisible={viewerVisible} setViewerVisible={setViewerVisible} />
    </View>
  )
}

export default GalleryScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    height: 75,
    width: '100%',
    justifyContent: 'center',
  },
  pos: { position: "absolute", right: 0 },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 20,
    gap: 10,
  },
  image: {
    width: 105,
    height: 105,
    borderRadius: 8,
  },
  safeAreaView: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    paddingStart: 5,
    color: '#fff'
  },
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
});