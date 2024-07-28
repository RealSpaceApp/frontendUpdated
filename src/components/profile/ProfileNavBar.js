import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Home from '../../../assets/profile/Home';
import Inbox from '../../../assets/profile/Inbox';
import Bell from '../../../assets/profile/Bell';
import photo from '../../../assets/pictures/photo.png';

const ProfileNavBar = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

    return (
      <View style={styles.container}>
        <TouchableOpacity  onPress={() => navigateToScreen('LandingPageEvents')}>
          <Home/>
        </TouchableOpacity>
        <TouchableOpacity>
          <Bell/>
        </TouchableOpacity>
        <TouchableOpacity>
          <Inbox/>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={photo} style={styles.photo}/>
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    width: 361,
    height: 64,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#9CC5A1E5',
    borderRadius: 50,
    paddingVertical: 20,
  },
  photo: {
    width: 26,
    height: 26,
    borderRadius: 100,
  },
});

export default ProfileNavBar;