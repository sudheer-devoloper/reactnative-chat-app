import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import FaqScreen from '../screens/FaqScreen';
import { StatusBar, View } from 'react-native';
import { useSelector } from 'react-redux';
import { FONTS } from '../utils/fonts';
import withAuth from '../hoc/withAuth';

const Tab = createMaterialTopTabNavigator();

const MyTabs = () => {
    const gradient = useSelector((state: any) => state.theme.gradient);
    const font = useSelector((state: any) => state.theme.font);

    return (
        <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
            <StatusBar
                barStyle="light-content"
                hidden={false}
                backgroundColor="#007fe100"
                translucent={true}
            />

            <Tab.Navigator
                tabBarPosition="top"
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: 'transparent', // Transparent background
                        elevation: 0, // Remove shadow on Android
                        shadowOpacity: 0, // Remove shadow on iOS
                    },
                    tabBarActiveTintColor: gradient.colors[0], // Active tab color
                    tabBarInactiveTintColor: 'gray',   // Inactive tab color
                    tabBarIndicatorStyle: {
                        backgroundColor: gradient.colors[0], // Indicator color (underline)
                    },
                    tabBarLabelStyle: {
                        fontFamily: FONTS.BOLD, // 👈 Replace with your actual font name
                        fontSize: 14,
                        textTransform: 'none', // Optional: disables uppercase labels
                      },
                }}
            >
                <Tab.Screen name="Profile" component={withAuth(ProfileScreen)} />
                <Tab.Screen name="FAQ'S" component={FaqScreen} />
                <Tab.Screen name="Test" component={FaqScreen} />
            </Tab.Navigator>
        </View>
    );
}

export default MyTabs