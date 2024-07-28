import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import GeometricForms from '../../../../assets/onboarding/GeometricForms01';
import Arrow from '../../../../assets/onboarding/Arrow';
import Pagination from '../../../../assets/onboarding/Pagination';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.blueContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Connecting people in Real Life, Seamlessly</Text>
          <Text style={styles.subtitle}>Add friends only when you're physically together using Bluetooth.</Text>
        </View>
        <SvgXml xml={GeometricForms} style={styles.image}/>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Onboarding03')}>
        <SvgXml xml={Arrow}/>
      </TouchableOpacity>
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
    backgroundColor: '#CDE3F3',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  textContainer: {
    marginTop: 96,
    marginHorizontal: 26,
  },
  title: {
    fontSize: 48,
    fontWeight: '400',
    lineHeight: 48,
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
  button: {
    width: 56,
    height: 56,
    marginRight: 47,
    alignSelf: 'flex-end',
    marginVertical: 24,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },  
});

export default HomeScreen;
