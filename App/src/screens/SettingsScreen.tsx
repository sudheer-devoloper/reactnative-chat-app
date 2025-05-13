import React from 'react';
import { View, Button, SafeAreaView, StatusBar, Text, Touchable, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setFont, setGradient } from '../redux/actions/themeActions';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONTS } from '../helpers/fonts';
import { goBack, navigate, navigationRef } from '../helpers/NavigationService';
import LinearGradient from 'react-native-linear-gradient';

const SettingsScreen = () => {
    const dispatch = useDispatch();
    const gradient = useSelector((state: any) => state.theme.gradient);
    const font = useSelector((state: any) => state.theme.font);

    const blueGradient = {
        colors: ['#4c669f', '#3b5998', '#192f6a'],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
    };

    const redGradient = {
        colors: ['#ff6a00', '#ee0979'],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
    };

    const purpleGradient = {
        colors: ["#d900ee", "#6200ee", "#0015ee"],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
    }

    const Font = (props: any) => {
        const { title, fontType } = props;
        return (
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: 20 }}>
                <Text style={{ fontSize: 16, fontFamily: font,color:"#ffffff" }}>{title}</Text>
                <TouchableOpacity onPress={() => dispatch(setFont(fontType))}>
                    <View style={{ height: 35, width: 100, borderWidth: 1, borderRadius: 5, borderColor: "#d4d4d4", backgroundColor: "#d4d4d4", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontSize: 16, fontFamily: font }}>Set Font</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    const Color = (props: any) => {
        const { title, color } = props;
        return (
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: 20 }}>
                <Text style={{ fontSize: 16, fontFamily: font ,color:"#ffffff"}}>{title}</Text>
                <TouchableOpacity onPress={() => dispatch(setGradient(color))}>
                    <View style={{ height: 35, width: 100, borderWidth: 1, borderRadius: 5, borderColor: "#d4d4d4", backgroundColor: "#d4d4d4", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontSize: 16, fontFamily: font }}>Set Color</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <LinearGradient colors={gradient?.colors} style={{ backgroundColor: "fff", flex: 1 }}>
            <SafeAreaView style={{ paddingTop: StatusBar.currentHeight }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", margin: 15 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => goBack()}>
                            <Icon name='arrow-back' color={"#ffffff"} size={35} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 25, fontFamily: FONTS.MEDIUM, paddingStart: 5,color:"#ffffff" }}>Settings</Text>
                    </View>
                </View>
                <View style={{ margin: 20 }}>
                    <Text style={{ fontSize: 25, fontFamily: FONTS.MEDIUM,color:"#ffffff" }}>Colors</Text>
                    <Color title="Blue Gradient" color={blueGradient} />
                    <Color title="Red Gradient" color={redGradient} />
                    <Color title="Purple Gradient" color={purpleGradient} />
                </View>
                <View style={{ margin: 20 }}>
                    <Text style={{ fontSize: 25, fontFamily: FONTS.MEDIUM, color:"#ffffff"}}>Fonts</Text>
                    <Font title="Medium" fontType={FONTS.MEDIUM} />
                    <Font title="Bold" fontType={FONTS.BOLD} />
                    <Font title="Italic" fontType={FONTS.ITALIC} />
                    <Font title="Regular" fontType={FONTS.REGULAR} />
                    <Font title="Semi Bold" fontType={FONTS.SEMI_BOLD} />
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default SettingsScreen;
