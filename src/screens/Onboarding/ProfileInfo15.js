import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import NextButton from '../../components/events/NextButton';
import GoBackButton from '../../components/events/GoBackButton';
import ProgressBar from '../../components/events/ProgressBar';
import { SvgXml } from 'react-native-svg';
import Drill_down from '../../../assets/onboarding/Drill_down';
import axios from 'axios';

const ProfileInfo15 = ({ navigation }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedDDD, setSelectedDDD] = useState('+351');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleRegisterPhoneNumber = async () => {
    try {
      const formattedPhoneNumber = selectedDDD + phoneNumber;
      await axios.post(`https://realspace-otq5wtkqba-uc.a.run.app/auth/phone/register`, {
        "phone": formattedPhoneNumber
      });
      navigation.navigate('ProfileInfo17', { phoneNumber: formattedPhoneNumber });
    } catch (error) {
      console.error('Error registering phone number:', error);
    }
  };  

  const handlePhoneNumberChange = (text) => {
    const formattedText = text.replace(/[^0-9]/g, '');
    setPhoneNumber(formattedText);
  };

  const ddds = [
    '+1', '+7', '+20', '+27', '+30', '+31', '+32', '+33', '+34', '+36', '+39',
    '+40', '+41', '+43', '+44', '+45', '+46', '+47', '+48', '+49', '+51', '+52',
    '+53', '+54', '+55', '+56', '+57', '+58', '+60', '+61', '+62', '+63', '+64',
    '+65', '+66', '+81', '+82', '+84', '+86', '+90', '+91', '+92', '+93', '+94',
    '+95', '+98', '+211', '+212', '+213', '+216', '+218', '+220', '+221', '+222',
    '+223', '+224', '+225', '+226', '+227', '+228', '+229', '+230', '+231', '+232',
    '+233', '+234', '+235', '+236', '+237', '+238', '+239', '+240', '+241', '+242',
    '+243', '+244', '+245', '+246', '+248', '+249', '+250', '+251', '+252', '+253',
    '+254', '+255', '+256', '+257', '+258', '+260', '+261', '+262', '+263', '+264',
    '+265', '+266', '+267', '+268', '+269', '+290', '+291', '+297', '+298', '+299',
    '+350', '+351', '+352', '+353', '+354', '+355', '+356', '+357', '+358', '+359',
    '+370', '+371', '+372', '+373', '+374', '+375', '+376', '+377', '+378', '+379',
    '+380', '+381', '+382', '+383', '+385', '+386', '+387', '+389', '+420', '+421',
    '+423', '+500', '+501', '+502', '+503', '+504', '+505', '+506', '+507', '+508',
    '+509', '+590', '+591', '+592', '+593', '+594', '+595', '+596', '+597', '+598',
    '+599', '+670', '+672', '+673', '+674', '+675', '+676', '+677', '+678', '+679',
    '+680', '+681', '+682', '+683', '+685', '+686', '+687', '+688', '+689', '+690',
    '+691', '+692', '+850', '+852', '+853', '+855', '+856', '+870', '+880', '+886',
    '+960', '+961', '+962', '+963', '+964', '+965', '+966', '+967', '+968', '+970',
    '+971', '+972', '+973', '+974', '+975', '+976', '+977', '+992', '+993', '+994',
    '+995', '+996', '+998'
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProgressBar current={5} style={styles.progress} />
      <View style={styles.container2}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Enter your phone number</Text>
          <View style={styles.content}>
            <View style={styles.dropdownContainer}>
              <TouchableOpacity style={styles.dddButton} onPress={() => setDropdownVisible(!dropdownVisible)}>
                <SvgXml xml={Drill_down} />
                <Text style={styles.dddButtonText}>
                  {selectedDDD}
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.largeInput}
              placeholder="Enter phone number"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
            />
          </View>
        </View>
      </View>
      {dropdownVisible && (
        <View style={styles.dropdown}>
          <ScrollView nestedScrollEnabled={true} style={styles.scrollDropdown}>
            {ddds.map((ddd) => (
              <TouchableOpacity
                key={ddd}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedDDD(ddd);
                  setDropdownVisible(false);
                }}
              >
                <Text>{ddd}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <GoBackButton onPress={() => navigation.goBack()} />
        <NextButton onPress={handleRegisterPhoneNumber} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F6F6F6',
    justifyContent: 'space-between',
    paddingTop: 66,
    paddingBottom: 64,
  },
  container2: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 64,
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
    paddingHorizontal: 20,
  },
  title: {
    color: '#111111',
    fontSize: 24,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 20,
    flexDirection: 'row',
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
    fontSize: 17
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
  },
});

export default ProfileInfo15;
