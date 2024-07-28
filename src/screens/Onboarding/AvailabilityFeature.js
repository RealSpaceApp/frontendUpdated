import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import AvailabilityFeatureImg from '../../../assets/onboarding/AvailabiliyFeatureImg';
import ActionButtonGreen from '../../components/events/ActionButtonGreen';

const AvailabilityFeature = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.containerOverlay, styles.greenContainer]}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
          <Text>Availability </Text>{'\n'}
          <Text>Feature</Text>
        </Text>
        <Text style={styles.subtitle}>Real conversations with those who matter</Text>
        </View>
        <Text style={styles.subtitle}>This feature lets you set and share your daily availability to receive calls from friends and family, so your friends know the best times to reach out to you. </Text>
         <SvgXml xml={AvailabilityFeatureImg} style={styles.image} />
      </View>
      <View style={styles.buttonContainer}>
        <ActionButtonGreen content={'Set your availability'}
       onPress={() => navigation.navigate('AddSchedule')} />
       <ActionButtonGreen content={'Do it later'} color={'white'}
       onPress={() => navigation.navigate('LastOnboarding')} />
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
    justifyContent: 'space-around',
    paddingTop: 50,
    shadowColor: '#38824F',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    lineHeight: 48,
    marginHorizontal: 26,
    marginBottom: 4,
    color: '#FFFFFF',
  },
  titleContainer: {
    marginBottom: 25
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 20,
    color: '#FFFFFF',
    marginHorizontal: 26,
    // fontFamily: 'Roboto_400Regular',
  },
  image: {
    alignSelf: 'center',
    width: '90%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: -25,
    marginTop: -7
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 50,
    marginTop: 20,
    paddingHorizontal: 20
  }
});

export default AvailabilityFeature;