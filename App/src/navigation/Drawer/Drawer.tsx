import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerHeader from "./DrawerHeader.tsx";
import React from "react";
import BottomTabs from "../BottomTabs.tsx";
import ProfileScreen from "../../screens/ProfileScreen.tsx";

function Drawer() {
  const Drawer = createDrawerNavigator();

  const options:Object = { drawerPosition: "left", headerShown: false, drawerStyle: { backgroundColor: "#2B3969",width:'75%' } }

  return (
    <Drawer.Navigator screenOptions={options}
      drawerContent={(props: React.JSX.IntrinsicAttributes & Navigation) => <DrawerHeader {...props} />}
    >
      <Drawer.Screen name="BottomTabs" component={BottomTabs} />
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}
export default Drawer;
