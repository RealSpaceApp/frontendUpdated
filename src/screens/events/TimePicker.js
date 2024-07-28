import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const TimePicker = () => {
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');
  const [isPM, setIsPM] = useState(false);

  const hours = Array.from(Array(12).keys()).map((h) => {
    const formattedHour = (h + 1).toString().padStart(2, '0');
    return { label: formattedHour, value: formattedHour };
  });

  const minutes = Array.from(Array(60).keys()).map((m) => {
    const formattedMinute = m.toString().padStart(2, '0');
    return { label: formattedMinute, value: formattedMinute };
  });

  const handleHourChange = (value) => {
    setHour(value);
  };

  const handleMinuteChange = (value) => {
    setMinute(value);
  };

  const togglePeriod = () => {
    setIsPM((prevIsPM) => !prevIsPM);
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerRow}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={hour}
            style={styles.picker}
            onValueChange={(itemValue) => handleHourChange(itemValue)}
          >
            {hours.map((h) => (
              <Picker.Item key={h.value} label={h.label} value={h.value} />
            ))}
          </Picker>
          <Text style={styles.pickerLabel}>Hours</Text>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={minute}
            style={styles.picker}
            onValueChange={(itemValue) => handleMinuteChange(itemValue)}
          >
            {minutes.map((m) => (
              <Picker.Item key={m.value} label={m.label} value={m.value} />
            ))}
          </Picker>
          <Text style={styles.pickerLabel}>Minutes</Text>
        </View>

        <View style={styles.periodContainer}>
          <Text style={styles.periodLabel}>{isPM ? 'PM' : 'AM'}</Text>
          <Switch
            value={isPM}
            onValueChange={togglePeriod}
            style={styles.periodSwitch}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isPM ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Set Time</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F6F6F6',
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  pickerContainer: {
    alignItems: 'center',
  },
  picker: {
    width: 80,
    height: 150,
  },
  pickerLabel: {
    marginTop: 10,
    fontSize: 18,
  },
  periodContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  periodLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  periodSwitch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#2196F3',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default TimePicker;