import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

const ProfilePhotoFrame = ({ photo, title, number1, number2, word1, word2 }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <Image source={photo} style={styles.photo} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.numbersContainer}>
        <View style={styles.numberContainer}>
          <Text style={styles.number}>{number1}</Text>
          <Text style={styles.word}>{word1}</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.number}>{number2}</Text>
          <Text style={styles.word}>{word2}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    paddingBottom: 12,
    gap: 20,
    marginBottom: 20,
  },
  rectangle: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  photo: {
    width: 345,
    overflow: 'hidden',
    height: 195,
    borderRadius: 4,
  },
  title: {
    fontSize: 17,
    lineHeight: 20.29,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#494949',
  },
  numbersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  numberContainer: {
    alignItems: 'center',
  },
  number: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#494949',
  },
  word: {
    fontSize: 14,
    color: '#494949',
    fontWeight: 'bold',
    opacity: 0.7,
  },
});

export default ProfilePhotoFrame;
