import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';

const ActionButtonGreen = ({ onPress, content, icon, disabled, color }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.buttonPrimary, 
        { backgroundColor: color || '#378461', color: 'black' || '#FFFFFF'},
        disabled && styles.buttonDisabled
      ]} 
      onPress={disabled ? null : onPress}
      disabled={disabled}
      pointerEvents={disabled ? 'none' : 'auto'}
    >
      {icon ? <SvgXml xml={icon} style={styles.icon} /> : null}
      <Text style={[
        styles.buttonText,
        { color: color ? 'black' : '#FFFFFF' }
      ]}>{content}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonPrimary: {
    borderRadius: 100,
    padding: 14,
    width: '100%',
    alignSelf: 'center',
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#378461',
    borderWidth: 1
  },
  buttonDisabled: {
    backgroundColor: '#EDEDED',
    borderColor: '#EDEDED',
    cursor: 'not-allowed',
  },
  icon: {
    marginHorizontal: 8,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19.5,
  },
});

export default ActionButtonGreen;