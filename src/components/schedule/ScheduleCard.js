import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import Clock from '../../../assets/events/Clock';

const ScheduleCard = ({ important, name, eventTitle, time, text, location, photo }) => {
  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate('EventDetails', { name, eventTitle, time, text, location, photo, creator });
  };

  const creator = true;
  
  return (
    <TouchableOpacity style={[important ? styles.importantContainer : styles.container]} onPress={handleCardPress}>
      <View>
        <Text style={[styles.title, important && styles.importantText]}>{eventTitle}</Text>
        <Text style={[styles.name, important && styles.importantText]}>{name}</Text>
        <View style={styles.timeContainer}>
          <View style={styles.timeContent}>
            <SvgXml xml={Clock} style={[styles.clock, important && styles.importantSvg]} />
            <Text style={[styles.timeText, important && styles.importantText]}>{time}</Text>
          </View>
        </View>
        <View style={styles.bottomRow}></View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    width: '93%',
    padding: 16,
    gap: 12,
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 9,
    paddingBottom: 0,
  },
  importantContainer: {
    backgroundColor: '#49A078',
    width: '93%',
    padding: 16,
    gap: 12,
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 9,
    paddingBottom: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D2D2D',
  },
  importantText: {
    color: '#ffffff',
  },
  importantSvg: {
    color: '#ffffff',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  timeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  clock: {
    opacity: 0.4,
  },
  timeText: {
    opacity: 0.7,
    fontWeight: '600',
    fontSize: 14,
    color: '#2D2D2D',
  },
  name: {
    color: '#2D2D2D',
    fontSize: 14,
    lineHeight: 21,
  },
});

export default ScheduleCard;