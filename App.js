import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';

import Tabs from './components/Tabs';

import { PlayerContext, PlayerProvider } from './context/Playercontext'
import { DataContext, DataProvider } from './context/Datacontext'

import CModal from "./components/CModal";

//import './components/i18n';

import { I18nManager } from "react-native";
import RNRestart from "react-native-restart";

export const languageRestart = async () => {
  try {

    if (!I18nManager.isRTL) {
      await I18nManager.allowRTL(true);
      await I18nManager.forceRTL(true);
      await RNRestart.Restart();
    }
  } catch (err) {
    console.log(err);
  }
};

//StatusBar.setBarStyle('light-content', true);



function App() {
  useEffect(() => {
    languageRestart();
    _loadFontsAsync();
  }, []);

  const [fontsLoaded, setFontsLoaded] = useState(false);

  const customFonts = {
    'Cairo-Regular': require('./assets/fonts/Cairo-Regular.ttf'),
    'Cairo-Bold': require('./assets/fonts/Cairo-Bold.ttf'),
    'Cairo-Light': require('./assets/fonts/Cairo-Light.ttf'),
  }
  async function _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    setFontsLoaded(true);
  }
  return (

    <DataProvider>

      <PlayerProvider>
        <NavigationContainer>
          {fontsLoaded ?
            <Tabs /> : null
          }
          <CModal ></CModal>
        </NavigationContainer>
      </PlayerProvider>

    </DataProvider>
  );
}

export default App;