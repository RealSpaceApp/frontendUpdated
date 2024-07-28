import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Add from '../../../assets/events/Add'

const CreatingButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonPrimary} onPress={onPress}>
      <SvgXml xml={Add}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonPrimary: {
    backgroundColor: '#49A078',
    borderRadius: 12,
    padding: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CreatingButton;