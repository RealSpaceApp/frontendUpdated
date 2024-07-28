import React from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';
import Arrow from '../../../assets/onboarding/Arrow';
import { SvgXml } from 'react-native-svg';

const GoBackButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonOnboarding} onPress={onPress}>
      <SvgXml xml={Arrow} style={styles.arrow}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonOnboarding: {
    backgroundColor: '#FFFFFF',
    width: '50%',
    height: 56,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    transform: [{ rotate: '180deg' }]
  }
});

export default GoBackButton;