import React from 'react';
import { Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

const TextSFPro = ({ children, style }) => {
  let [fontsLoaded] = useFonts({
    'SFProDisplay-Regular': require('../../../assets/fonts/SF-Pro-Display-Regular.otf'),
  });

  // console.log('Font Loaded:', fontsLoaded);

  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  } else {
    SplashScreen.hideAsync();
    return <Text style={[{ fontFamily: 'SFProDisplay-Regular' }, style]}>{children}</Text>;
  }
};

export default TextSFPro;
