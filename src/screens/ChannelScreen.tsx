import React from "react";
import{View,Text, StyleSheet} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Channel, MessageList, MessageInput } from "stream-chat-expo";

const ChannelScreen=()=>{

    const route =useRoute();
    const navigation =useNavigation();
    const channel= route.params?.channel;      //? helps to access it safely

    //console.log(channel?.data?.name);     //channel name stored at
    navigation.setOptions({title: channel?.data?.name} || "Channel");

    if(!channel){
        return(
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}> Click on a channel to start</Text>
            </View>
        );
    }

    return(
        <Channel channel={channel} key={channel.data.name}> 

        <MessageList/>
        <MessageInput/>

        </Channel>
        
    );
};

const styles = StyleSheet.create({
    errorText: {
        color:"grey",
        fontWeight:"bold",
        fontSize:20,
    },
    errorContainer: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding:10,
    },
}
);

export default ChannelScreen;