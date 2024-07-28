import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { SvgXml } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NextButton from '../../components/events/NextButton';
import GoBackButton from '../../components/events/GoBackButton';
import ProgressBar from '../../components/events/ProgressBar';
import Clear from '../../../assets/onboarding/Clear';

const ProfileInfo3 = ({ navigation }) => {
  const [bio, setBio] = useState('');
  const maxChars = 2000;

  const handleNext = async () => {
    try {
      const cookie = await AsyncStorage.getItem('cookie');

      if (!cookie) {
        console.warn('No access token found');
        return;
      }

      const formData = new FormData();
      formData.append('about', bio);

      const response = await axios.post(`http://172.21.192.1:8080/user/save-profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Cookie: cookie || '',
        },
      });

      if (response.status === 202) {
        console.log('Profile saved successfully');
        navigation.navigate('ProfileInfo14');
      } else {
        console.warn('Failed to save profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ProgressBar current={3} style={styles.progress} />
      <View style={styles.container2}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>What should your friends know about you, Entered_name?</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              multiline
              numberOfLines={8}
              value={bio}
              onChangeText={(text) => setBio(text)}
              maxLength={maxChars}
              placeholder="Share a bit about your hobbies, what you're passionate about, or a fun fact."
              placeholderTextColor="#3C3C434D"
            />
            {bio.length > 0 && (
              <TouchableOpacity style={styles.clearButton} onPress={() => setBio('')}>
                <SvgXml xml={Clear} />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.subtitle}>{`${bio.length}/${maxChars}`}</Text>
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
    paddingHorizontal: 20
  },
  title: {
    color: '#111111',
    fontSize: 24,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#3C3C434D',
    fontSize: 17,
    marginTop: 24,
    textAlign: 'right'
  },
  content: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 10,
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  input: {
    fontSize: 15,
    color: '#111111',
    textAlignVertical: 'top',
    height: 8 * 22,
  },
  clearButton: {
    position: 'absolute',
    right: 16,
    top: 23,
    zIndex: 1,
  },
  buttonOnboarding: {
    width: 56,
    height: 56,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileInfo3;