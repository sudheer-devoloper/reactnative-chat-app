import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from "react-native";
import React from "react";
import { clearStorage } from "../../utils/storage";
import { useDispatch, useSelector } from "react-redux";
import { FONTS } from "../../utils/fonts";
import Icon from "react-native-vector-icons/Ionicons";
import SocialIcon from "react-native-vector-icons/FontAwesome";
import { showResponce } from "../../utils/messageResponder";
import LinearGradient from "react-native-linear-gradient";
import { navigate } from "../../utils/NavigationService";
import { logout } from "../../redux/actions/authActions";

const DrawerHeader = ({ navigation }: Navigation) => {
      const dispatch = useDispatch();
    const font = useSelector((state: any) => state.theme.font);
    const gradient = useSelector((state: any) => state.theme.gradient);

    const handleLogout = async () => {
        try {
            dispatch(logout());
            await clearStorage()
            navigate("Login");
        } catch (e) {
            console.log(e);
        }
    };
    const handleSocialMedia = async () => {
        // await Linking.openURL(url);
        showResponce("Please Provide Link")
    }


    return (
        <LinearGradient colors={gradient.colors} style={styles.mainView}>

            <TouchableOpacity onPress={() => { navigation.toggleDrawer() }} style={styles.toggleDrawer}>
                <Icon name="close" color={"#fff"} size={40} />
            </TouchableOpacity>

            <View style={[styles.row, { paddingVertical: 1 }]}>
                <Text style={[styles.AppName,{fontFamily:font}]}>Demo Chat</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <View style={styles.row}><Text style={[styles.name,{fontFamily:font}]}>Home</Text></View>
            </TouchableOpacity>

            <View style={styles.divider}></View>
            <TouchableOpacity onPress={() => { navigate("Profile");  }}>
                <View style={styles.row}><Text style={[styles.name,{fontFamily:font}]}>Profile</Text></View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleLogout()}>
                <View style={styles.row}><Text style={[styles.name,{fontFamily:font}]}>Logout</Text></View>
            </TouchableOpacity>
            <View style={styles.versionContainer}>
                <Text style={[styles.version,{fontFamily:font}]}>Follow us on social media</Text>
                <View style={styles.socialMediaIconsContainer}>
                    <TouchableOpacity onPress={() => handleSocialMedia()}>
                        <SocialIcon name="instagram" color={"#fff"} size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSocialMedia()}>
                        <SocialIcon name="facebook-square" color={"#fff"} size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <SocialIcon name="twitter" color={"#fff"} size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSocialMedia()}>
                        <SocialIcon name="youtube-play" color={"#fff"} size={25} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={[styles.version,{fontFamily:font}]}>App Version: 0.0.1</Text>
                </View>
            </View>
        </LinearGradient>
    );
};

export default DrawerHeader;

const styles = StyleSheet.create({
    mainView: {
        paddingTop: StatusBar.currentHeight,
        paddingLeft: 20,
        flex:1
    },
    divider: {
        borderStyle: "solid",
        borderBottomWidth: 0.5,
        borderBlockColor: "#FFFFFF",
        marginVertical: 20,
    },
    name: {
        color: "#fff",
        fontFamily: FONTS.BOLD,
        fontSize: 18,
        marginLeft: 15,
    },
    AppName: {
        color: "#fff",
        fontFamily: FONTS.BOLD,
        fontSize: 27,
        marginLeft: 15,
    },
    close: {
        height: 30,
        width: 30,
    },
    backArrowName: {
        color: "#fff",
        fontFamily: FONTS.BOLD,
        fontSize: 24,
        marginLeft: 15,
    },
    subText: {
        color: "#fff",
        fontFamily: FONTS.BOLD,
        fontSize: 12,
        marginLeft: 15,
    },
    socialMediaIconsContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingVertical: 20,
        justifyContent: 'space-evenly'
    },
    image: { height: 65, width: 65 },
    backArrow: { height: 40, width: 40 },
    row: { flexDirection: "row", alignItems: "center", paddingVertical: 15 },
    hamburger: { height: 30, width: 30 },
    toggleDrawer: { alignItems: "flex-end", paddingRight: 20 },
    versionContainer: { position: 'absolute', bottom: 5, padding: 10, width: '100%', alignItems: 'center', justifyContent: 'center' },
    version: { color: '#FFFFFF', textAlign: 'center', width: '100%' }
});
