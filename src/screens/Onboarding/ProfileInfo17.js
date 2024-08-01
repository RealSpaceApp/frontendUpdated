import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import NextButton from '../../components/events/NextButton';
import GoBackButton from '../../components/events/GoBackButton';
import ProgressBar from '../../components/events/ProgressBar';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

const ProfileInfo17 = ({ navigation }) => {
  const route = useRoute();
  const { phoneNumber } = route.params;
  const textInputs = Array.from({ length: 6 }, () => useRef(null));
  const [otp, setOtp] = useState(new Array(6).fill(''));

  const focusNextInput = (index) => {
    if (index < textInputs.length - 1) {
      textInputs[index + 1].current.focus();
    }
  };

  const handleVerifyPhoneNumber = async () => {
    try {
      const formattedOtp = otp.join('');
      await axios.post(`https://realspace-otq5wtkqba-uc.a.run.app/auth/phone/verify`, {
        phone: phoneNumber,
        otp: Number(formattedOtp),
      });

      const createdAt = await AsyncStorage.getItem('created_at');
      if (createdAt) {
        const accountAgeInHours = calculateAccountAgeInHours(createdAt);

        if (accountAgeInHours > 1) {
          navigation.navigate('LandingPageProfile');
        } else {
          navigation.navigate('ProfileLook3');
        }
      } else {
        console.error('created_at not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error verifying phone number:', error);
    }
  };

  const calculateAccountAgeInHours = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    const currentDate = new Date();
    const diffInMilliseconds = currentDate - createdAtDate;
    return diffInMilliseconds / (1000 * 60 * 60);
  };

  const handleInputChange = (value, index) => {
    if (!isNaN(value) && value.length === 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      focusNextInput(index);
    }
  };

  return (
    <View style={styles.container}>
      <ProgressBar current={5} style={styles.progress} />
      <View style={styles.container2}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Enter OTP</Text>
          <Text style={styles.subtitle}>it's sent to {phoneNumber}</Text>
          <View style={styles.content}>
            <View style={styles.codeContainer}>
              {Array.from({ length: 6 }, (_, index) => (
                <TextInput
                  key={index}
                  ref={textInputs[index]}
                  style={styles.codeInput}
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={(value) => handleInputChange(value, index)}
                />
              ))}
            </View>
          </View>
        </View>
        <View>
          <View style={styles.buttonContainer}>
            <GoBackButton onPress={() => navigation.goBack()} />
            <NextButton onPress={handleVerifyPhoneNumber} />
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
  subtitle: {
    color: '#2D2D2D',
    fontSize: 17,
  },
  content: {
    paddingHorizontal: 16,
    width: '100%',
    borderRadius: 10,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 12
  },
  codeInput: {
    width: 43,
    height: 43,
    backgroundColor: 'white',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    color: '#2d2d2d',
  },
});

export default ProfileInfo17;