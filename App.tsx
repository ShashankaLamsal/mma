import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import 'core-js/features/string/replace-all';


import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';

import {StreamChat} from 'stream-chat'; //core library
import { useEffect, useState } from 'react';  //react hooks
import { Text } from 'react-native';
import {OverlayProvider, Chat, ChannelList, Channel, MessageList, Message, MessageInput} from 'stream-chat-expo'; //UI components
import AuthContext from './src/context/AuthContext'; 


const API_KEY="yspae49hvbx8";     //API KEY FOR OUR APP
const client= StreamChat.getInstance(API_KEY);  //creates the client and the connection with the server, only the first time

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const[selectedChannel, setSelectedChannel]=useState(null);


  useEffect(()=>{
    //this is done when component is mounted


    return()=>{
      //this is done when component in unmounted
      client.disconnectUser();
    }

  },[]) //empty dependency []

  const onChannelSelect = (channel)=> {
    setSelectedChannel(channel);
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContext>
          <OverlayProvider> 
            <Chat client={client}>
            
              <Navigation colorScheme={colorScheme} />
            {/* {!selectedChannel ? (
            <ChannelList onSelect={onChannelSelect}/>
            ):(
              <>
              <Channel channel={selectedChannel}> 
              
              <Text style={{margin:50}} onPress={()=> setSelectedChannel(null)}>
              GO BACK
              </Text>

              <MessageList/>
              <MessageInput/>

              </Channel>
              </>
            )
            } */}
            
            </Chat>
          </OverlayProvider>
        </AuthContext>
        <StatusBar style='light'/>
      </SafeAreaProvider>
    );
  }
}
