import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import FriendCard from '../../components/friends/FriendCard';
import NavBar from '../../components/navbar/NavBar';
import friendsData from './FriendsList';

const LandingPageFriends = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFriends = friendsData.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.friendsContainer}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>{friendsData.length}</Text>
            <Text style={styles.title}>Friends</Text>
          </View>
          <TouchableOpacity style={styles.selectButton}>
            <Text style={styles.textSelect}>Select</Text>
          </TouchableOpacity>
        </View>
      
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          onChangeText={setSearchTerm}
          value={searchTerm}
        />
        <FlatList
          data={filteredFriends}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <FriendCard
              photo={item.photo}
              name={item.name}
            />
          )}
        />
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.textAdd}>Add friend</Text>
      </TouchableOpacity>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  friendsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'start',
    padding: 16,
    paddingBottom: 0,
    paddingTop: 66,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D2D2D',
  },
  searchBar: {
    width: '100%',
    backgroundColor: '#7676801F',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 15,
  },
  selectButton: {
    backgroundColor: '#E7E7E8',
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 40,
  },
  textSelect: {
    color: '#3C3C4399',
  },
  addButton: {
    position: 'absolute',
    bottom: 111,
    right: 16,
    backgroundColor: '#378461',
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 40,
  },
  textAdd: {
    color: '#FFFFFF',
  },
});

export default LandingPageFriends;
