import React, { useEffect, useRef } from 'react';
import { View, StatusBar, Animated, Dimensions, Text, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';
import UserBarChart from './components/UserBarChart';
import { useSelector } from 'react-redux';
import { navigate } from '../utils/NavigationService';


export default function DashboardScreen({ navigation }: Navigation) {
  const blocks = Array.from({ length: 5 }).map(() => ({
    translateY: useRef(new Animated.Value(100)).current,
    opacity: useRef(new Animated.Value(0)).current,
  }));

  const gradient = useSelector((state: any) => state.theme.gradient);
  const font = useSelector((state: any) => state.theme.font);

  useEffect(() => {
    const order = [0, 2, 1, 3, 4]; // top-left, bottom-left, top-right, bottom-right
    const animations = order.map((index, i) =>
      Animated.parallel([
        Animated.timing(blocks[index].translateY, {
          toValue: 0,
          duration: 500,
          delay: i * 300,
          useNativeDriver: true,
        }),
        Animated.timing(blocks[index].opacity, {
          toValue: 1,
          duration: 500,
          delay: i * 300,
          useNativeDriver: true,
        }),
      ])
    );
    Animated.stagger(150, animations).start();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#007fe100" translucent={true} />
      <Header />
      <View style={{ padding: 20, flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 1 }}>
            <Animated.View style={{
              height: 160,
              width: 160,
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: 20,
              marginEnd: 20,
              transform: [{ translateY: blocks[0].translateY }],
              opacity: blocks[0].opacity,
              alignItems: "center",
              justifyContent: "center"
            }} >
              <Icon name='people-outline' size={45} color={gradient?.colors[0]} />
              <Text style={{ fontSize: 18, fontFamily: font, color: "#fff" }}>Users</Text>
            </Animated.View>
            <Animated.View style={{
              height: 250,
              width: 160,
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: 20,
              marginEnd: 20,
              marginTop: 20,
              transform: [{ translateY: blocks[2].translateY }],
              opacity: blocks[2].opacity,
            }}>
              <FastImage source={require('../assets/images/homestart.jpg')} style={{ height: 250, width: 160, borderRadius: 20 }} resizeMode={FastImage.resizeMode.cover} />
            </Animated.View>
          </View>
          <View style={{ flex: 1 }}>
            <Animated.View style={{
              height: 250,
              width: 160,
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: 20,
              marginStart: 10,
              marginEnd: 20,
              transform: [{ translateY: blocks[1].translateY }],
              opacity: blocks[1].opacity,
            }} >
              <FastImage source={require('../assets/images/homeEnd.jpg')} style={{ height: 250, width: 160, borderRadius: 20 }} resizeMode={FastImage.resizeMode.cover} />
            </Animated.View>
            <TouchableOpacity onPress={() => navigate('GalleryScreen')}>
              <Animated.View style={{
                height: 160,
                width: 160,
                backgroundColor: "rgba(0,0,0,0.2)",
                borderRadius: 20,
                marginStart: 10,
                marginTop: 20,
                marginEnd: 20,
                transform: [{ translateY: blocks[3].translateY }],
                opacity: blocks[3].opacity,
                alignItems: "center",
                justifyContent: "center"
              }}>
                <MaterialCommunityIcons name="photo" size={50} color={gradient?.colors[0]} />
                <Text style={{ fontSize: 18, fontFamily: font, color: "#fff" }}>Gallery</Text>
              </Animated.View>
            </TouchableOpacity>
          </View>

        </View>

        <View style={{ flex: 1 }}>
          <Animated.View style={{
            height: 160,
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: 20,
            marginStart: 0,
            marginTop: 20,
            marginEnd: 20,
            transform: [{ translateY: blocks[4].translateY }],
            opacity: blocks[4].opacity,
            alignItems: "center",
            justifyContent: "center"
          }}>
            <UserBarChart />
          </Animated.View>

        </View>
      </View>
    </View>
  );
}
