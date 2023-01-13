import React, { useCallback, useEffect, useState } from 'react';
import AuthContext from "./app/auth/context";
import { View } from "react-native";

import storage from "./app/auth/storage";
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './app/navigation/AuthNavigator';
import AppNavigator from './app/navigation/AppNavigator';
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [user, setUser] = useState();
  const [appIsReady, setAppIsReady] = useState(false);
  const restoreUser = async () => {
    try {
      const storageUser = await storage.getUser();
      if (storageUser) {
        setUser(storageUser)
      };
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    async function prepare() {
      try {
        restoreUser()
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          {
            user ? <AppNavigator /> : <AuthNavigator />
          }
        </NavigationContainer>
      </AuthContext.Provider>
    </View>
  );
}