import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Switch } from 'react-native';
import NavBar from '../../components/navbar/NavBar';
import { SvgXml } from 'react-native-svg';
import Arrow from '../../../assets/onboarding/Arrow';

const CircleSettings = ({ navigation }) => {
  const [allDay, setAllDay] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
        <SvgXml xml={Arrow} style={styles.arrow} />
        <Text style={styles.title}>Circle Settings</Text>
      </TouchableOpacity>

      <View style={styles.header2}>
        <View style={styles.switchContainer}>
          <View style={styles.selectionButton}>
            <Text style={styles.eventTypeText}>Notifications</Text>
          </View>
          <Switch
            value={allDay}
            onValueChange={(value) => setAllDay(value)}
            trackColor={{ false: "#767577", true: "#34C759" }}
            thumbColor={allDay ? "white" : "white"}
            ios_backgroundColor="gray"
            style={styles.switch}
          />
        </View>

        <TouchableOpacity style={styles.eventTypeContainer}>
          <Text style={styles.eventTypeText}>Send feedback / bugs / issues</Text>
        </TouchableOpacity>
      </View>
      <NavBar profilePage={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#F6F6F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
    gap: 10
  },
  header2: {
    borderTopColor: '#AEB0AF',
    borderTopWidth: 0.5,
    backgroundColor: 'white',
    flex: 1
  },
  arrow: {
    transform: [{ rotate: '180deg' }]
  },
  title: {
    color: '#2D2D2D',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  selectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center'
  },
  headerButton: {
    marginLeft: 12,
    backgroundColor: 'white',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 50
  },
  headerButtonText: {
    color: '#646464',
    fontSize: 14,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 16
  },
  switchText: {
    fontSize: 16,
    color: '#2D2D2D',
  },
  switch: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },
  eventTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopColor: '#C7C8C8',
    borderTopWidth: 0.25,
    padding: 16,
  },
  eventTypeText: {
    fontSize: 17,
    color: 'black',
  },
  eventTypeSelection: {
    fontSize: 17,
    color: '#3C3C4399',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000066',
    zIndex: 20
  },
});

export default CircleSettings;