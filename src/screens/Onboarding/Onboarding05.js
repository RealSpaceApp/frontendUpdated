import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ActionButtonGreen from '../../components/events/ActionButtonGreen';
import Stars1 from '../../../assets/onboarding/Stars1';
import { SvgXml } from 'react-native-svg';
import Apple from '../../../assets/onboarding/Apple';
import { _signInWithGoogle } from '../../config/auth';

const Onboarding05 = ({ navigation }) => {
  async function signInWithGoogle() {
    const data = await _signInWithGoogle();
    if (data) {
      navigation.navigate('Onboarding06', { token: data.accessToken });
    }
  }

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
          <ActionButtonGreen content={'Sign In With Google'} onPress={signInWithGoogle} />
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
