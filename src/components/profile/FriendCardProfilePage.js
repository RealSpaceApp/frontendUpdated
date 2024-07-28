import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import Checked from '../../../assets/friends/Checked';
import { useNavigation } from '@react-navigation/native';

const FriendCardProfilePage = ({ id, photo, friend, name, moderator, available, color, selected, setSelectedItem, selectedItem }) => {
  const navigation = useNavigation();
  
  const handleFriendProfile = () => {
    navigation.navigate('FriendsPageProfile', { id });
  };
  
  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: color || '#FFFFFF' }]}
    >
      <Image source={photo} style={styles.photo} />
      <Text style={styles.name}>{name}</Text>
      {selected == false && available === true && friend == true ? (
        <View>
          <TouchableOpacity style={styles.callButton}>
            <Text  style={styles.callText}>Call</Text>
          </TouchableOpacity>
        </View>
      ) : selected == false && available === false && friend == true ? (
        <View>
          <Text style={styles.busyText}>busy</Text>
        </View>
      ) : null}
      {moderator && (<Text  style={styles.moderatorText}>Moderator</Text>)
      }
      {selected == true && selectedItem ? (
        <TouchableOpacity style={styles.online} onPress={setSelectedItem}>
          <Checked />
        </TouchableOpacity>
      ) : selected == true && !selectedItem ? (
        <TouchableOpacity style={styles.offline} onPress={setSelectedItem}></TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    gap: 8,
    paddingVertical: 8,
    marginHorizontal: 16,
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  callText: {
    color: '#2D2D2D'
  },
  busyText: {
    color: '#ACACAC'
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
  callButton:{
    backgroundColor: '#EDEDED',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: -10
  },
  moderatorText: {
    color: '#378461'
  }
});

export default FriendCardProfilePage;