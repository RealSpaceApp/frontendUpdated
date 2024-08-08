import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { SvgXml } from 'react-native-svg';
import CloseButton from '../../../assets/onboarding/CloseButton';
import Drill_down from '../../../assets/onboarding/Drill_down';
import axiosInstance from '../../config/AxiosInstance';

const ChangePhoneNumber = ({ navigation }) => {
  const textInputs = Array.from({ length: 6 }, () => useRef(null));
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [step, setStep] = useState(1);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedDDD, setSelectedDDD] = useState('+351');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleRegisterPhoneNumber = async () => {
    try {
      const formattedPhoneNumber = selectedDDD + phoneNumber;
      setStep(2)
      await axiosInstance.post(`/auth/phone/register`, {
        phone: '+351931938806'
      });

    } catch (error) {
      console.error('Error registering phone number:', error);
    }
  };

  const handleRegisterPhoneNumber2 = async () => {
    try {
      const formattedPhoneNumber = selectedDDD + phoneNumber;
      setStep(4)
      await axiosInstance.post(`/auth/phone/register`, {
        phone: formattedPhoneNumber
      });

    } catch (error) {
      console.error('Error registering phone number:', error);
    }
  };

  const handlePhoneNumberChange = (text) => {
    const formattedText = text.replace(/[^0-9]/g, '');
    setPhoneNumber(formattedText);
  };

  const focusNextInput = (index) => {
    if (index < textInputs.length - 1) {
      textInputs[index + 1].current.focus();
    }
  };

  const handleVerifyPhoneNumber = async () => {
    try {
      const formattedOtp = otp.join('');
      const response = await axiosInstance.post(`/auth/phone/verify`, {
        phone: '+351931938806',
        otp: Number(formattedOtp),
      });
      setStep(3)
    } catch (error) {
      console.error('Error verifying phone number:', error);
    }
  };

  const handleInputChange = (value, index) => {
    if (!isNaN(value) && value.length === 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      focusNextInput(index);
    }
  };

  const renderStep1 = () => (
    <View style={styles.modalView}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <SvgXml xml={CloseButton} />
      </TouchableOpacity>

      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Change number</Text>
          <Text style={styles.subtitle}>An OTP would be send to your current phone number. In order to change the number.</Text>
          <Text style={styles.subtitle}>In case you lost your number.</Text>
          <View style={styles.content}>

          </View>

        </View>
        <View style={styles.buttonContainer2}>
          <TouchableOpacity
            style={styles.button2}
          >
            <Text style={styles.buttonText3}>Send to email</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegisterPhoneNumber}
        >
          <Text style={styles.buttonText}>Send OTP to phone</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText2}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.modalView}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <SvgXml xml={CloseButton} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Change number</Text>
        <Text style={styles.subtitle}>Enter OTP</Text>
        <View style={styles.content}>
          <View style={styles.codeContainer}>
            {Array.from({ length: 6 }, (_, index) => (
              <TextInput
                key={index}
                placeholderTextColor="#3C3C434D"
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleVerifyPhoneNumber}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText2}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.modalView}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <SvgXml xml={CloseButton} />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Change number</Text>
        <Text style={styles.subtitle}>Enter new number</Text>
        <View style={styles.content2}>
          <View style={styles.dropdownContainer}>
            <TouchableOpacity style={styles.dddButton} onPress={() => setDropdownVisible(!dropdownVisible)}>
              <SvgXml xml={Drill_down} />
              <Text style={styles.dddButtonText}>
                {selectedDDD}
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
          placeholderTextColor="#3C3C434D"
            style={styles.largeInput}
            placeholder="Enter phone number"
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
          />

        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegisterPhoneNumber2}
        >
          <Text style={styles.buttonText}>Change number</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText2}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.modalView}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <SvgXml xml={CloseButton} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Change number</Text>
        <View style={styles.content3}>
          <Text style={styles.successMessage2}>Your number is changed to</Text>
          <Text style={styles.successMessage2}>{selectedDDD}{phoneNumber}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LandingPageProfile')}
        >
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText2}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.centeredView}>
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderStep4()}
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
  successMessage2: {
    fontSize: 16,
    fontWeight: 'bold'
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
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16
  },
  titleContainer: {
    gap: 10,
    paddingHorizontal: 16,
  },
  title: {
    color: '#111111',
    fontSize: 24,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#646464',
    fontSize: 15,
  },
  content: {
    width: '100%',
    borderRadius: 10,
  },
  content2: {
    flexDirection: 'row',
  },
  content3: {
    alignSelf: 'center',
    alignItems: 'center',
    justifySelf: 'center',
    marginTop: '50%'
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 12
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000066',
    zIndex: 20
  },
  modalView: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    paddingBottom: 50,
    borderRadius: 10,
    width: '100%',
    height: '90%',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    gap: 13,
    paddingHorizontal: 14,

    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    justifySelf: 'flex-end'
  },
  buttonContainer2: {
    paddingVertical: 16,
    paddingHorizontal: 14,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    backgroundColor: '#49A078',
    width: '100%',
  },
  button2: {
    borderRadius: 20,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    width: '100%'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 19.5,
  },
  buttonText2: {
    color: '#FF453A',
    fontSize: 16,
    lineHeight: 19.5,
  },
  buttonText3: {
    color: '#2D2D2D',
    fontSize: 16,
    lineHeight: 19.5,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 12
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flex: 1,
  },
  largeInput: {
    flex: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    fontSize: 17,
    color: '#2d2d2d',
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
  dropdownContainer: {
    flex: 1,
    marginRight: 10,
  },
  dddButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    backgroundColor: '#EBEBEB',
    borderRadius: 5,
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  dddButtonText: {
    color: '#111111',
    fontSize: 17
  },
  dddArrow: {
    color: '#111111',
  },
  dropdown: {
    position: 'absolute',
    top: 220,
    left: 20,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    elevation: 3,
    zIndex: 1,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    width: 90,
  },
  scrollDropdown: {
    maxHeight: 300,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    color: '#2d2d2d',
  },
});

export default ChangePhoneNumber;