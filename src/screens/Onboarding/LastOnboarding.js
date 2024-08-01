import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import FinalOnboarding from '../../../assets/onboarding/FinalOnboarding';
import ActionButtonGreen from '../../components/events/ActionButtonGreen';

const LastOnboarding = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.containerOverlay, styles.greenContainer]}>
        <Text style={styles.title}>
          <Text>Welcome to Realspace!</Text>
        </Text>
        <View>
          <Text style={styles.subtitle}>An app dedicated to facilitating in-person relationships and genuine social interactions. We want you to be looking up instead of down at this screen.</Text>
        </View>
         <SvgXml xml={FinalOnboarding} style={styles.image} />
      </View>
      <View style={styles.buttonContainer}>
        <ActionButtonGreen content={'Lets go!'}
       onPress={() => navigation.navigate('LandingPageProfile')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  containerOverlay: {
    width: '100%',
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  greenContainer: {
    backgroundColor: '#38824F',
    height: '80%',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom:10
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    lineHeight: 48,
    marginHorizontal: 26,
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 20,
    color: '#FFFFFF',
    marginHorizontal: 26,
  },
  image: {
    alignSelf: 'center',
    width: '90%',
    height: undefined,
    aspectRatio: 1,
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 50,
    marginTop: 20,
    paddingHorizontal: 20
  }
});

export default LastOnboarding;