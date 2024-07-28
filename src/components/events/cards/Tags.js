import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import Checked from '../../../../assets/friends/Checked';

const Tags = ({ text, onPress, checked }) => {
  const colorMap = {
    'attending': { text: '#49A078', background: '#E5F7E6', border: '#49A078' },
    'not attending': { text: '#ED915D', background: '#FDF4E7', border: '#ED915D' },
    'attend': { text: '#49A078', background: '#E5F7E6', border: '#49A078' },
    'cancel': { text: '#ED915D', background: '#FDF4E7', border: '#ED915D' },
    'edit event': { text: '#3C3C43', background: '#E7E7E8', border: '#3C3C43' },
    'view notes': { text: '#3C3C43', background: '#E7E7E8', border: '#3C3C43' },
    'add notes': { text: '#3C3C43', background: '#E7E7E8', border: '#3C3C43' },
    'delete event': { text: '#FF3333', background: '#FFDFDF', border: '#FF3333' },
  };

  const tagInfo = colorMap[text.toLowerCase()] || { text: '#000000', background: '#FFFFFF', border: '#000000' };
  const { text: textColor, background: backgroundColor, border: borderColor } = tagInfo;

  const showCheckmark = text.toLowerCase() === 'attending' || text.toLowerCase() === 'not attending';

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor }]} activeOpacity={0.7} onPress={handlePress}>
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
      {showCheckmark && (
        <View style={[styles.checkbox, { backgroundColor: checked ? textColor : 'transparent', borderColor }]}>
          {checked && <Checked style={styles.checkedIcon} />}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 40,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  text: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20,
    textAlign: 'center',
  },
  checkbox: {
    width: 15,
    height: 15,
    borderRadius: 100,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  checkedIcon: {
    width: 3,
    height: 3,
    padding: 2,
  },
});

export default Tags;