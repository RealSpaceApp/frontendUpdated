import React from 'react';
import { Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display';

const CustomText = ({ children, style }) => {
  let [fontsLoaded] = useFonts({
    DMSerifDisplay_400Regular,
  });

  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  } else {
    SplashScreen.hideAsync();
    return <Text style={[{ fontFamily: 'DMSerifDisplay_400Regular' }, style]}>{children}</Text>;
  }
};

export default CustomText;
