import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CoverPhoto from '../../../assets/circles/CoverPhoto';
import { SvgXml } from 'react-native-svg';

const CirclesCard = ({ photo, name, eventTitle, id, tags }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (id >= 1 && id <= 8) {
      navigation.navigate('CircleProfileMockedData');
    } else {
      navigation.navigate('CircleProfile', { id });
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>3 Events</Text>
        </TouchableOpacity>
        <View style={styles.header}>
          {photo ? (
            <Image source={photo} style={styles.photo} />
          ) : (
            <SvgXml xml={CoverPhoto} style={styles.coverPhoto} />
          )}
          <View style={styles.textContainer}>
            {name ? <Text style={styles.name}>{eventTitle}</Text> :
            <Text style={styles.name}>undefined</Text>}
            <View style={styles.tagsContainer}>
              {Array.isArray(tags) && tags.map((tag, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.tag}
                >
                  <Text style={styles.tagText}>#{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    gap: 12,
    borderRadius: 20,
  },
  tagText: {
    color: '#3C3C4399',
    fontSize: 14,
  },
  content: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    width: '100%',
    borderRadius: 10,
  },
  tagsContainer: {
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    width: '100%',
    justifyContent: 'flex-start'
  },
  tag: {
    backgroundColor: '#E7E7E8',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    gap: 20,
    padding: 16,
  },
  separator: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#E2DEE9'
  },
  bottom: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  coverPhoto: {
    width: 60,
    height: 60,
    borderRadius: 20
  },
  photo: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  name: {
    color: '#2D2D2D',
    fontSize: 18,
    fontWeight: '700',
  },
  textContainer: {
    width: '75%',
    gap: 10
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  locationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: '30%'
  },
  timeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  expandedText: {
    gap: 8
  },
  clock: {
    opacity: 0.4,
    color: 'black'
  },
  timeText: {
    opacity: 0.7,
    fontWeight: '600',
    fontSize: 14,
    color: '#2D2D2D',
  },
  expandIcon: {
    fontSize: 17.7,
    color: '#49A078',
    fontWeight: '600',
    transform: [{ rotate: '180deg' }],
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeIcon: {
    fontSize: 17.7,
    color: '#49A078',
    fontWeight: '600',
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: '#2D2D2D'
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  expandButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: 191,
    borderRadius: 8
  },
  button: {
    backgroundColor: '#49A078',
    paddingHorizontal: 6,
    paddingVertical: 6,
    position: 'absolute',
    borderRadius: 4,
    top: 16,
    right: 16,
  },
  buttonText: {
    color: '#FFFFFF'
  }
});

export default CirclesCard;