import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { SvgXml } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NextButton from '../../components/events/NextButton';
import GoBackButton from '../../components/events/GoBackButton';
import ProgressBar from '../../components/events/ProgressBar';
import Clear from '../../../assets/onboarding/Clear';

const Name = ({ navigation }) => {
  const [name, setName] = useState('');

  const handleClear = () => {
    setName('');
  };

  const handleNext = async () => {
    try {
      const cookie = await AsyncStorage.getItem('cookie');

      if (!cookie) {
        console.warn('No access token found');
        return;
      }

      const formData = new FormData();
      formData.append('name', name);

      const response = await axios.post(`https://realspace-otq5wtkqba-uc.a.run.app/user/save-profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Cookie: cookie || '',
        },
      });

      if (response.status === 202) {
        console.log('Profile saved successfully');
        navigation.navigate('ProfileInfo12');
      } else {
        console.warn('Failed to save profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ProgressBar current={1} style={styles.progress} />
      <View style={styles.container2}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>What’s your name?</Text>
          <View style={styles.content}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#3C3C434D"
                value={name}
                onChangeText={setName}
              />
              {name.length > 0 && (
                <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
                  <SvgXml xml={Clear} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <View>
          <View style={styles.buttonContainer}>
            <GoBackButton onPress={() => navigation.goBack()} />
            <NextButton onPress={handleNext} />
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
  buttonContainer: {
    gap: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignSelf: 'center',
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
  subtitleButton: {
    color: '#868987',
    fontSize: 13,
    marginLeft: 12,
  },
  content: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 11,
    paddingHorizontal: 16,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 17,
  },
  clearButton: {
    marginLeft: 10,
  },
  clearIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3C3C4399',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearIconText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 17
  },
});

export default Name;
