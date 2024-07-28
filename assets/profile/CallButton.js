import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Call from '../../assets/profile/Call';

const CallButton = ({ text, color }) => {
    const backgroundColor = color === 'gray' ? '#E7E7E8' : '#49A078' ;
  const textColor = color === 'gray' ? '#3C3C4399' : '#FFFDEC';

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text style={[styles.text, { color: textColor }]}>Call</Text>
      <Call fill={textColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 40,    
    gap: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: '400',
textAlign: 'left',
fontFamily: 'Inter_400Regular',
    lineHeight: 20
  },
});

export default CallButton;