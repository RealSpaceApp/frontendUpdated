import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import ActionButtonGreen from '../../components/events/ActionButtonGreen';
import Stars1 from '../../../assets/onboarding/Stars1';
import { SvgXml } from 'react-native-svg';
import Apple from '../../../assets/onboarding/Apple';

GoogleSignin.configure({
  webClientId: '613996156544-390fbjusqhr7j2mv4fljki69u55je212.apps.googleusercontent.com', // Your OAuth 2.0 client ID
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

const Onboarding05 = ({ navigation }) => {
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo);
      navigation.navigate('Onboarding06', { token: userInfo.idToken });
    } catch (error) {
      console.error('Google Sign-In Error:', error.DEVELOPER_ERROR);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-in is in progress');
      } else {
        console.log('An error occurred:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Hey!</Text>
        <Text style={styles.subtitle}>Log in your social accounts</Text>
      </View>
      <View>
        <SvgXml xml={Stars1} style={styles.image} />
        <View style={styles.buttonContainer}>
          <Text style={styles.subtitleButton}>we’ll use this account for notification or account recovery</Text>
          <ActionButtonGreen content={'Sign in with google'} onPress={handleGoogleSignIn} />
          <ActionButtonGreen content={'Sign in with apple'} icon={Apple} onPress={() => navigation.navigate('Onboarding06')} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    justifyContent: 'space-between',
    paddingBottom: 64,
    paddingTop: 110,
  },
  buttonContainer: {
    gap: 10,
    paddingHorizontal: 20,
  },
  titleContainer: {
    gap: 10,
    paddingHorizontal: 20,
  },
  title: {
    color: '#111111',
    fontSize: 32,
    lineHeight: 32,
    fontWeight: 'bold'
  },
  subtitle: {
    color: '#2D2D2D',
    fontSize: 15
  },
  image: {
    alignSelf: 'flex-end',
    marginBottom: 30
  },
  subtitleButton: {
    color: '#868987',
    fontSize: 13,
    marginLeft: 12
  }
});

export default Onboarding05;
