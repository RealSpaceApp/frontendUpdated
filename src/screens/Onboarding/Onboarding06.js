import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Stars2 from '../../../assets/onboarding/Stars2';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Onboarding06 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { token } = route.params;

  useEffect(() => {
    const handleGoogleSignIn = async () => {
      try {
        const response = await axios.post('https://realspace-otq5wtkqba-uc.a.run.app/auth/google/signin', { token });
        await AsyncStorage.setItem('created_at', response.data.user.created_at);
        
        const setCookieHeader = response.headers["set-cookie"];
        if (setCookieHeader) {
          const cookies = setCookieHeader[0].split(', ');
          let accessToken = null;
          let refreshToken = null;
          
          cookies.forEach(cookie => {
            if (cookie.startsWith('access_token=')) {
              accessToken = cookie.split(';')[0].split('=')[1];
            } else if (cookie.startsWith('refresh_token=')) {
              refreshToken = cookie.split(';')[0].split('=')[1];
            }
          });
          
          if (accessToken) {
            await AsyncStorage.setItem('access_token', accessToken);
          } else {
            console.warn('Access token not found in Set-Cookie header');
          }
          
          if (refreshToken) {
            await AsyncStorage.setItem('refresh_token', refreshToken);
          } else {
            console.warn('Refresh token not found in Set-Cookie header');
          }
        } else {
          console.warn('Set-Cookie header not found in response');
        }

        navigation.navigate('LandingPageProfile');
      } catch (error) {
        console.error('Error signing in with Google:', error);
      }
    };    

    handleGoogleSignIn();
  }, [navigation, token]);

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Please wait</Text>
      <SvgXml xml={Stars2} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 64,
    paddingTop: 110,
  },
  subtitle: {
    color: '#2D2D2D',
    fontSize: 15,
    marginBottom: 40
  },
  image: {
    marginBottom: 30
  },
});

export default Onboarding06;