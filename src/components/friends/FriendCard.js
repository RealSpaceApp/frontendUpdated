import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import Checked from '../../../assets/friends/Checked';

const FriendCard = ({ photo, name, friends }) => {
  return (
    <View style={styles.container}>
      <Image source={photo} style={styles.photo} />
      <Text style={styles.name}>{name}</Text>
      {friends === true ? (
        <View style={styles.online}>
          <Checked />
        </View>
      ) : friends === false ? (
        <View style={styles.offline} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 4,
    width: '100%',
    gap: 8
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  name: {
    flex: 1,
    fontSize: 18,
    lineHeight: 21.48,
    fontWeight: '500',
  },
  online: {
    width: 22,
    height: 22,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#378461',
  },
  offline: {
    width: 22,
    height: 22,
    borderRadius: 100,
    borderColor: '#C7C7CC',
    borderWidth: 1,
  },
});

export default FriendCard;