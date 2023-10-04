import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import 'core-js/features/string/replace-all';


import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';

import {StreamChat} from 'stream-chat'; //core library
import { useEffect } from 'react';  //react hooks

import {OverlayProvider, Chat, DeepPartial, Theme} from 'stream-chat-expo'; //UI components
import AuthContext from './src/context/AuthContext'; 
import { DarkColors } from './src/constants/Colors';


const API_KEY="yspae49hvbx8";     //API KEY FOR OUR APP
const client= StreamChat.getInstance(API_KEY);  //creates the client and the connection with the server, only the first time
const theme: DeepPartial<Theme> ={
  colors: DarkColors,
//for dark mode, use this theme
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  


  useEffect(()=>{
    //this is done when component is mounted


    return()=>{
      //this is done when component in unmounted
      client.disconnectUser();
    }

  },[]) //empty dependency []





  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContext>
          <OverlayProvider> 
            <Chat client={client}>

              <Navigation colorScheme={colorScheme} />
            
            </Chat>
          </OverlayProvider>
        </AuthContext>
        <StatusBar style='light'/>
      </SafeAreaProvider>
    );
  }
}
