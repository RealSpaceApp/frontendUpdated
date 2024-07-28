import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Community from '../../../assets/events/navbar/Community';
import Events from '../../../assets/events/navbar/Events';
import Friends from '../../../assets/events/navbar/Friends';
import MyEvents from '../../../assets/events/navbar/MyEvents';
import photo from '../../../assets/pictures/photo.png';

const NavBar = ({ profilePage }) => {
  const navigation = useNavigation();
  const route = useRoute();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={[styles.container, profilePage && styles.profileBackground]}>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigateToScreen('LandingPageCommunity')}>
        <View style={route.name === ('LandingPageCommunity'|| 'NewCommunity') ? styles.iconActive : styles.icon}>
          <Community opacity={route.name === ('LandingPageCommunity' || 'NewCommunity') ? "1" : "0.7"} 
          color={profilePage ? "#000" : "#FFFFFF"} />
        </View>
        <Text style={[styles.text, { color: profilePage ? "#000" : "#FFFFFF" }]}>Community</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigateToScreen('LandingPageCircles')}>
        <View style={route.name === 'LandingPageCircles' ? styles.iconActive : styles.icon}>
          <Friends opacity={route.name === 'LandingPageCircles' ? "1" : "0.7"} 
          color={profilePage ? "#000" : "#FFFFFF"} />
        </View>
        <Text style={[styles.text, { color: profilePage ? "#000" : "#FFFFFF" }]}>Circles</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigateToScreen('LandingPageEvents')}>
        <View style={route.name === 'LandingPageEvents' ? styles.iconActive : styles.icon}>
          <Events opacity={route.name === 'LandingPageEvents' ? "1" : "0.7"} 
          color={profilePage ? "#000" : "#FFFFFF"} />
        </View>
        <Text style={[styles.text, { color: profilePage ? "#000" : "#FFFFFF" }]}>Events</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigateToScreen('LandingPageSchedule')}>
        <View style={route.name === 'LandingPageSchedule' ? styles.iconActive : styles.icon}>
          <MyEvents opacity={route.name === 'LandingPageSchedule' ? "1" : "0.7"} 
          color={profilePage ? "#000" : "#FFFFFF"} />
        </View>
        <Text style={[styles.text, { color: profilePage ? "#000" : "#FFFFFF" }]}>Schedule</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigateToScreen('LandingPageProfile')}>
        <Image source={photo} style={styles.photo} />
        <Text style={[styles.text, { color: profilePage ? "#000" : "#FFFFFF" }]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 6,
    paddingBottom: 30,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#378461',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  profileBackground: {
    backgroundColor: '#BDBDBD99',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconActive: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2D6C50',
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  text: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '400',
  },
  photo: {
    width: 26,
    height: 26,
    borderRadius: 100,
  },
});

export default NavBar;
