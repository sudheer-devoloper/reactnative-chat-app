import { StyleSheet, Text, View, SafeAreaView, Platform, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { navigate } from '../helpers/NavigationService';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { end, start } from '../helpers/constants';

const Header = () => {
    const navigation: any = useNavigation();
    const gradient = useSelector((state: any) => state.theme.gradient);
    const font = useSelector((state: any) => state.theme.font);

    return (
        <LinearGradient colors={gradient?.colors} start={start} end={end} style={{ height: 75, width: "100%", justifyContent: "center" }}>
            <SafeAreaView style={{ paddingTop: Platform.OS == "android" ? 24 : 0, paddingHorizontal: 15, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <Icon name="list-outline" size={30} color={"#fff"} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: "900", color: "#fff",fontFamily:font }}>DEMO-CHAT</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('ChatScreen')}>
                    <MaterialCommunityIcons name="message-reply-outline" size={30} color="white" />
                </TouchableOpacity>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default Header

const styles = StyleSheet.create({})