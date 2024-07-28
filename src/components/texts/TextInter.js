import React from 'react';
import { Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';

const TextInter = ({ children, style }) => {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
  });

  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  } else {
    SplashScreen.hideAsync();
    return <Text style={[{ fontFamily: 'Inter_400Regular' }, style]}>{children}</Text>;
  }
};

export default TextInter;
