import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const NavBar = ({setModalVisibleMuteCalls, setModalVisibleRemoveFriend, setModalVisibleMuteEvents}) => {
  const navigation = useNavigation();
  const route = useRoute();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={[styles.container, styles.profileBackground]}>
      <TouchableOpacity style={styles.removeButton} onPress={() => setModalVisibleRemoveFriend(true)}>
        <Text style={styles.removeText}>Remove Member</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 49,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
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
  removeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF4E7',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E7E7E8',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6
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
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: '#3C3C4399'
  },
  removeText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: '#FF453A'
  },
  photo: {
    width: 26,
    height: 26,
    borderRadius: 100,
  },
});

export default NavBar;