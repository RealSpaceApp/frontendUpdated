import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import GeometricForms from '../../../../assets/onboarding/GeometricForms02';
import Arrow from '../../../../assets/onboarding/Arrow';
import Pagination from '../../../../assets/onboarding/Pagination';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.blueContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Plan Together, Thrive Together</Text>
          <Text style={styles.subtitle}>Collaboratively plan events with your community, with polls for dates, venues, and activities.</Text>
        </View>
        <SvgXml xml={GeometricForms} style={styles.image}/>
      </View>
      <View style={styles.buttonsContainer}>
      <TouchableOpacity style={[styles.button, { transform: [{ rotate: '180deg' }] }]} onPress={() => navigation.goBack()}>
        <SvgXml xml={Arrow}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Onboarding04')}>
        <SvgXml xml={Arrow}/>
      </TouchableOpacity>
      </View>
      <SvgXml xml={Pagination} style={styles.pagination}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingBottom: 43,
  },
  blueContainer: {
    backgroundColor: '#E9EAEF',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  textContainer: {
    marginTop: 96,
    marginHorizontal: 26,
    // marginBottom: 66,
  },
  title: {
    fontSize: 46,
    fontWeight: '400',
    lineHeight: 48
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  image: {
    alignSelf: 'flex-end',
  },
  pagination: {
    alignSelf: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginRight: 47,
    alignSelf: 'flex-end',
    marginVertical: 24,
    gap: 8,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;