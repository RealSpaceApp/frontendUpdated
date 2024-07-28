import React from 'react';
import { Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat';

const TextM = ({ children, style }) => {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
  });

  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  } else {
    SplashScreen.hideAsync();
    return <Text style={[{ fontFamily: 'Montserrat_400Regular' }, style]}>{children}</Text>;
  }
};

export default TextM;
