import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { end, start } from '../utils/constants';
import Icon from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import { goBack } from '../utils/NavigationService';

const GalleryScreen = () => {
  const gradient = useSelector((state: any) => state.theme.gradient);
  const font = useSelector((state: any) => state.theme.font);
  return (
    <View style={styles.container}>
      <LinearGradient colors={gradient?.colors} start={start} end={end} style={styles.headerGradient}>
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => goBack()}>
              <Icon name="arrow-back" size={35} color={"#fff"} />
              </TouchableOpacity>
              <Text style={[styles.headerText,{fontFamily: font}]}>Gallery</Text>
            </View>
            <View>
              <IconM name="camera-plus-outline" size={35} color={"#fff"} />
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
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
  safeAreaView: {
    flex: 1,
    justifyContent: 'center',
    paddingTop:StatusBar.currentHeight
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
});