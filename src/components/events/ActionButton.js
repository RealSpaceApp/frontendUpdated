import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const ActionButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('ProfileInfo16')} >
      <Text style={styles.buttonText}>Add note</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonPrimary: {
    backgroundColor: '#49A078',
    borderRadius: 12,
    padding: 16,
    width: 350,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19.5,
  },
});

export default ActionButton;