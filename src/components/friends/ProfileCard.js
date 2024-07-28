import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

const ProfileCard = ({ photo, name, online }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.photoWrapper, online && styles.onlineBorder]}>
        <Image source={photo} style={styles.photo} />
      </View>
      <Text style={[styles.name, online && styles.onlineText]}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  photoWrapper: {
    width: 70,
    height: 70,
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  name: {
    fontSize: 18,
    lineHeight: 21.48,
    fontWeight: '500',
  },
  onlineBorder: {
    borderWidth: 3,
    borderColor: '#49A078',
  },
  onlineText: {
    color: '#49A078'
  },
});

export default ProfileCard;