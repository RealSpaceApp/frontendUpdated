import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NextButton from '../../components/events/NextButton';
import GoBackButton from '../../components/events/GoBackButton';
import ProgressBar from '../../components/events/ProgressBar';

const ProfileInfo12 = ({ navigation }) => {
  const [birthdate, setBirthdate] = useState('');
  const [isDateValid, setIsDateValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const currentYear = new Date().getFullYear();
  const minimumYear = currentYear - 10;

  const validateDate = (birthdate) => {
    const [d, m, y] = birthdate.split('/').map(Number);
    const day = Number(d);
    const monthNumber = Number(m);
    const yearNumber = Number(y);

    const isValidDay = day >= 1 && day <= 31;
    const isValidMonth = monthNumber >= 1 && monthNumber <= 12;
    const isValidYear = yearNumber >= 1900 && yearNumber <= currentYear;

    if (!isValidDay || !isValidMonth || !isValidYear) {
      setIsDateValid(false);
      setErrorMessage('Please enter a valid date.');
      return;
    }

    const isOlderThan10Years = yearNumber <= minimumYear;
    if (!isOlderThan10Years) {
      setIsDateValid(false);
      setErrorMessage('You must be at least 10 years old to create an account.');
      return;
    }

    setIsDateValid(true);
    setErrorMessage('');
  };

  const handleBirthdateChange = (value) => {
    let formattedValue = '';
    let cleanedValue = value.replace(/\D/g, '');

    if (cleanedValue.length > 0) {
      if (cleanedValue.length < 3) {
        formattedValue = cleanedValue;
      } else if (cleanedValue.length < 5) {
        formattedValue = cleanedValue.substr(0, 2) + '/' + cleanedValue.substr(2);
      } else {
        formattedValue = cleanedValue.substr(0, 2) + '/' + cleanedValue.substr(2, 2) + '/' + cleanedValue.substr(4, 4);
      }
    }

    setBirthdate(formattedValue);
    validateDate(formattedValue);
  };

  const formatBirthdateRFC3339 = (birthdate) => {
    const [day, month, year] = birthdate.split('/');
    return `${year}-${month}-${day}T00:00:00Z`;
  };

  const handleNextPress = async () => {
    if (isDateValid) {
      try {
        const cookie = await AsyncStorage.getItem('cookie');

        if (!cookie) {
          console.warn('No access token found');
          return;
        }

        const formattedDate = formatBirthdateRFC3339(birthdate);

        const formData = new FormData();
        formData.append('birthday', formattedDate);

        const response = await axios.post(`http://172.21.192.1:8080/user/save-profile`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Cookie': cookie || '',
          },
        });

        if (response.status === 202) {
          console.log('Profile saved successfully');
          navigation.navigate('ProfileInfo3');
        } else {
          console.warn('Failed to save profile');
        }
      } catch (error) {
        console.error('Error saving profile:', error);
      }
    } else {
      console.warn('Invalid date');
    }
  };

  return (
    <View style={styles.container}>
      <ProgressBar current={2} style={styles.progress} />
      <View style={styles.container2}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>When is your birthday?</Text>
          <Text style={styles.subtitle}>
            Your birthday lets us notify friends and family to celebrate with you.
          </Text>
          <View style={styles.birthdayContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={birthdate}
                onChangeText={handleBirthdateChange}
                placeholder="DD/MM/YYYY"
                keyboardType="numeric"
                maxLength={10}
              />
              {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            </View>
          </View>
        </View>
        <View>
          <View style={styles.buttonContainer}>
            <GoBackButton onPress={() => navigation.goBack()} />
            <NextButton onPress={handleNextPress} disabled={!isDateValid} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    justifyContent: 'flex-start',
    paddingTop: 66,
  },
  container2: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    justifyContent: 'space-between',
    paddingBottom: 64,
    paddingTop: 20,
  },
  progress: {
    position: 'fixed',
    top: 0,
  },
  titleContainer: {
    gap: 10,
    paddingHorizontal: 20,
  },
  title: {
    color: '#111111',
    fontSize: 24,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#2D2D2D',
    fontSize: 17,
  },
  birthdayContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  inputContainer: {
    flex: 1,
    gap: 8
  },
  input: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: '100%',
    borderRadius: 10,
    textAlign: 'left',
    marginBottom: 4,
    color: '#2D2D2D'
  },
  label: {
    color: '#3C3C434D',
    fontSize: 13,
  },
  errorText: {
    color: 'red',
    marginLeft: 4
  },
  buttonContainer: {
    gap: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignSelf: 'center',
  },
});

export default ProfileInfo12;