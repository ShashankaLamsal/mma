import React from "react";
import {createDrawerNavigator,DrawerContentScrollView,DrawerItemList, DrawerItem} from "@react-navigation/drawer";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import { ChannelList } from "stream-chat-expo";

import { Text, StyleSheet } from "react-native";
import ChannelScreen from "../screens/ChannelScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "../context/AuthContext";



const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return(
        
        <Drawer.Navigator drawerContent={CustomDrawerContent}>
            <Drawer.Screen name="ChannelScreen" component={ChannelScreen} options={{title:"Channel"}}/>
            
        </Drawer.Navigator>
        
        
    );
};

const CustomDrawerContent = (props) => {

    const onChannelSelect = (channel: any)=> {
        //navigate to a channel screen
        props.navigation.navigate("ChannelScreen",{channel});
    };
        const {userId}= useAuthContext();
        const filters ={members:{$in:[userId]}};
        const publicFilters={type:"livestream"};
    
    return (
      <SafeAreaView {...props} style={{flex:1}}>
        
        <Text style={styles.title}> Mobile Messaging Application</Text>

        
        <Text style={styles.groupTitle}> Public Channels</Text>
        <ChannelList onSelect={onChannelSelect} filters={publicFilters}/>

        <Text style={styles.groupTitle}> Private Channels</Text>
        <ChannelList onSelect={onChannelSelect} filters={filters}/>


      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        color:"grey",
        fontWeight:"bold",
        alignSelf:"center",
        fontSize:16,
        margin: 10,
    },
    groupTitle: {
        color:"grey",
        fontWeight:"bold",
        fontSize:12,
        margin: 10,
    },
}
);

export default DrawerNavigator;