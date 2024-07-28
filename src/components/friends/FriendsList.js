import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import FriendCard from './FriendCard';

const FriendList = () => {
  const friends = [
    { id: 1, name: 'Sai sumith', photo: require('../../../assets/pictures/photo2.png'), friends: true },
    { id: 2, name: 'Floyd Miles', photo: require('../../../assets/pictures/photo.png'), friends: false },
    { id: 3, name: 'Robert Fox', photo: require('../../../assets/pictures/photo3.png'), friends: false },
]
  return (
    <View style={styles.container}>
      <FlatList
      style={styles.list}
        data={friends}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FriendCard
            photo={item.photo}
            name={item.name}
            friends={item.friends}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    list: {
      flexGrow: 0
    },
  });
  
export default FriendList;
