import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Clock from '../../../assets/events/Clock';
import Location from '../../../assets/events/Location';
import ExpandArrow from '../../../assets/events/ExpandArrow';

const EventsCard = ({ important, name, eventTitle, time, text, location }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={[important ? styles.importantContainer : styles.container, expanded && styles.expandedContainer]}>
      <View>
        <Text style={[styles.title, important && styles.importantText]}>{eventTitle}</Text>
        <Text style={[styles.name, important && styles.importantText]}>{name}</Text>
        <View style={styles.timeContainer}>
          <View style={styles.timeContent}>
            <SvgXml xml={Clock} style={[styles.clock, important && styles.importantSvg]} />
            <Text style={[styles.timeText, important && styles.importantText]}>{time}</Text>
          </View>
        </View>
      </View>
      {expanded && (
        <View style={styles.expandedText}>
          <Text style={[styles.text, important && styles.importantText]}>{text}</Text>
          {location && (
            <View style={styles.locationContainer}>
              <SvgXml xml={Location} style={[styles.locationIcon, important && styles.importantSvg]} />
              <Text style={[styles.locationText, important && styles.importantText]}>{location}</Text>
            </View>
          )}
        </View>
      )}
      <View style={styles.bottomRow}>
        <TouchableOpacity onPress={toggleExpand} style={[styles.expandIcon, expanded && styles.expandedIcon, important && styles.importantSvg]}>
          <ExpandArrow color={important? "#ffffff": "#49A078"}  />
        </TouchableOpacity>
      </View>
    </View>
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
  expandedText: {
    gap: 8,
    marginTop: 8,
  },
  name: {
    color: '#2D2D2D',
    fontSize: 14,
    lineHeight: 21,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: '#2D2D2D',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationIcon: {
    opacity: 0.4,
  },
  locationText: {
    opacity: 0.7,
    fontWeight: '600',
    fontSize: 14,
    color: '#2D2D2D',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    bottom: '12%',
  },
  expandIcon: {
    fontSize: 17.7,
    color: '#49A078',
    fontWeight: '600',
    transform: [{ rotate: '180deg' }],
  },
  expandedIcon: {
    transform: [{ rotate: '0deg' }],
  },
});

export default EventsCard;
