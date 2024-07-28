import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Img2 from '../../../assets/community/Img2';
import Img from '../../../assets/community/Img';
import NavBar from '../../components/navbar/NavBar';

const LandingPageCommunity = ({ navigation }) => {
  return (
    <View style={styles.container}>
      
      <SvgXml xml={Img2} style={styles.image2}/>
      <SvgXml xml={Img} style={styles.image}/>
      <View style={styles.contentContainer}>
        <View style={styles.content}>
        <Text style={styles.title}>Community section coming soon !</Text>
        <Text style={styles.subtitle}>Host events, across your community members. Engage with users and create connections that matter</Text>          
        </View>

      <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('NewCommunity')} >
      <Text style={styles.buttonText}>Register</Text>
    </TouchableOpacity>
      </View>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F6F6F6'
  },
  image2: {
    justifySelf: 'flex-start',
    alignSelf: 'flex-start'
  },
  image: {
    justifySelf: 'flex-end',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 0
  },
  contentContainer: {
    width: '100%',
    padding: 16,
    position: 'absolute',
    top: '35%'
  },
  content: {
 backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 27
  },
  subtitle: {
    fontSize: 18,
    color: '#646464',
    lineHeight: 26,
    marginTop: 8,
    marginBottom: 16
  },
  buttonPrimary: {
    backgroundColor: '#378461',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15
  }
})
export default LandingPageCommunity;