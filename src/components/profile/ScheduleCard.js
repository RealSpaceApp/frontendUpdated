import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Clock from '../../../assets/events/Clock';

const ScheduleCard = ({ title, time, text }) => {

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>
        
        <Text style={styles.text}>{text}</Text>
        <View style={styles.timeContainer}>
          <View style={styles.timeContent}>
            <SvgXml xml={Clock} style={styles.clock} />
            <Text style={styles.timeText}>{time}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    paddingTop: 0,
    paddingBottom: 8,
    paddingHorizontal: 16,
    gap: 12,
    borderRadius: 20,
    marginVertical: 8,
  },
  header: {
    borderBottomColor: '#3C3C435C',
    borderBottomWidth: 0.5,
    paddingVertical: 12,
  },  
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    lineHeight: 22,
    color: '#000000'
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
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
    fontWeight: 'bold',
    fontSize: 14,
    color: '#2D2D2D',
    lineHeight: 16.71,
  },
  text: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
    paddingVertical: 12,
    color: '#868987'
  },
});

export default ScheduleCard;
