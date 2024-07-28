import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import friendsData from '../../screens/friends/FriendsList';
import RemoveSelection from '../../../assets/circles/RemoveSelection';
import { SvgXml } from 'react-native-svg';

const SelectedMember = ({ selectedItems, toggleSelectedItem }) => {
  const selectedIds = Object.keys(selectedItems).filter(id => selectedItems[id]);
  if (selectedIds.length === 0) {
    return <Text style={styles.subtitle2}>NOBODY SELECTED</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.subtitle}>SELECTED</Text>
        <Text style={styles.subtitle}>MAX 5</Text>
      </View>
      <View style={styles.selectedPhotosContainer}>
        {selectedIds.map(id => {
          const friend = friendsData.find(f => f.id.toString() === id);
          return (
            <View key={id} style={styles.selectedItem}>
              <Image
                source={friend.photo}
                style={styles.selectedPhoto}
              />
              <TouchableOpacity onPress={() => toggleSelectedItem(id)} style={styles.removeButton}>
                <SvgXml xml={RemoveSelection} style={styles.icon} />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    marginBottom: 10
  },
  selectedPhotosContainer: {
    flexDirection: 'row',
    paddingHorizontal: 6,
  },
  selectedItem: {
    position: 'relative',
    marginRight: 10,
  },
  selectedPhoto: {
    width: 53,
    height: 53,
    borderRadius: 50,
    borderColor: '#378461',
    borderWidth: 3
  },
  subtitle: {
    fontSize: 15,
    color: '#3C3C4399',
  },
  subtitle2: {
    fontSize: 15,
    color: '#3C3C4399',
    paddingHorizontal: 16,
    margin: 16,
  },
  removeButton: {
    position: 'absolute',
    top: 35,
    right: -5,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default SelectedMember;