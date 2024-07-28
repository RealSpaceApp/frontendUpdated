import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import ActionButtonGreen from '../../components/events/ActionButtonGreen';

const { width } = Dimensions.get('window');

const ProfileLook3 = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <View style={styles.msgContainer}>
        <Text style={styles.title}>Your Profile looks empty, lets fix that.</Text>
        <Text style={styles.subtitle}>
          only added friends can see your profile.
        </Text>
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.profilePhoto}>
          <View style={styles.photo} ></View>
          <Text style={styles.mainPhotoLabel}>Your Name</Text>
        </View>

        <View style={styles.userProfile}>
          <Text style={styles.text}>About yourself</Text>
        </View>
        <View style={styles.userProfile}>
          <View style={styles.userInfo}>
            <Text style={styles.label}>Birthday : </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.label}>Number : </Text>
          </View>
        </View>
      </View>

      <ActionButtonGreen content={'Lets go!'} onPress={() => navigation.navigate('LandingPageProfile')} style={styles.buttonNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 23,
    paddingVertical: 16,
    paddingTop: 60,
    paddingBottom: 45,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
  },
  msgContainer: {
    zIndex: 2,
    marginBottom: 20,
    paddingVertical: 16,
    paddingRight: 100,
    width: '102%'
  },
  msg: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111111'
  },
  profileContainer: {
    gap: 12,
    width: '80%'
  },
  photosContainer: {
    marginBottom: 70
  },
  profilePhoto: {
    backgroundColor: '#FFFFFF',
    width: 121,
    height: 148,
    padding: 12,
    paddingBottom: 18,
    gap: 8.43,
    alignItems: 'center',
    borderRadius: 12,
    alignSelf: 'center',
    elevation: 60,
    marginBottom: 40
  },
  coverPhoto: {
    width: width,
    height: 474,
    position: 'absolute',
    top: 0,
  }, title: {
    color: '#111111',
    fontSize: 24,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  imageCoverPhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  photo: {
    width: 108,
    height: 108,
    borderRadius: 3,
    alignSelf: 'center',
    backgroundColor: '#C4C4C4'
  },
  buttonNext: {
    paddingVertical: 16,
  },
  mainPhotoLabel: {
    color: '#494949',
    fontSize: 13,
    fontWeight: 'bold',
  },
  photoLabel: {
    alignSelf: 'center',
    color: '#494949',
    fontSize: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userProfile: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#49A078',
    borderRadius: 12,
    padding: 16,

    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 41
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#494949'
  },
  text: {
    fontSize: 16,
    marginLeft: 4,
    color: '#494949'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 19.5,
  },
});

export default ProfileLook3;