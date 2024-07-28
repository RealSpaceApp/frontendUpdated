import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const SubmitButton = ({ onPress, text }) => {
  return (
    <TouchableOpacity style={styles.buttonPrimary} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonPrimary: {
    backgroundColor: '#000000',
    borderRadius: 12,
    padding: 16,
    width: 300,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19.5,
  },
});

export default SubmitButton;