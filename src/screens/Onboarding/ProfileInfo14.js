import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NextButton from '../../components/events/NextButton';
import GoBackButton from '../../components/events/GoBackButton';
import ProgressBar from '../../components/events/ProgressBar';
import CloseButton from '../../../assets/onboarding/CloseButton';
import Drill_in from '../../../assets/onboarding/Drill_in';
import { SvgXml } from 'react-native-svg';

const ProfileInfo14 = ({ navigation }) => {
  const [theme, setTheme] = useState('Traveling');
  const [modalVisible, setModalVisible] = useState(false);
  const themes = ['Traveling', 'Art', 'Foodie', 'sports', 'Reading', 'Dancing', 'Music', 'Shopping', 'Photography', 'Cooking', 'Gaming', 'Learning', 'Others'];

  const selectTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    setModalVisible(false);
  };

  const cancelSelection = () => {
    setModalVisible(false);
  };

  const handleNext = async () => {
    try {
      const cookie = await AsyncStorage.getItem('cookie');

      if (!cookie) {
        console.warn('No access token found');
        return;
      }

      const formData = new FormData();
      formData.append('hobby', theme);

      const response = await axios.post(`https://realspace-otq5wtkqba-uc.a.run.app/user/save-profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Cookie: cookie || '',
        },
      });

      if (response.status === 202) {
        console.log('Profile saved successfully');
        navigation.navigate('ProfileInfo16');
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
          <Text style={styles.title}>What sums you up in one word?</Text>
          <TouchableOpacity
            style={styles.content}
            onPress={() => setModalVisible(true)}
          >
            <View style={styles.contentText}>
              <Text style={styles.contentTitle}>Cover Photo</Text>
              <Text style={styles.subtitle2}>{theme || 'Select a theme'}</Text>
            </View>
            <SvgXml xml={Drill_in} onPress={() => cancelSelection()} />
          </TouchableOpacity>
          <Text style={styles.subtitle}>This will reflect on your profile page</Text>
        </View>
        <View>
          <View style={styles.buttonContainer}>
            <GoBackButton onPress={() => navigation.goBack()} />
            <NextButton onPress={handleNext} />
          </View>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modalTitle}>Select a Theme</Text>
              <SvgXml xml={CloseButton} onPress={() => cancelSelection()} />
            </View>
            <View style={styles.themesContainer}>
              {themes.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.themeOption,
                    item === 'Deserts' && styles.lastThemeOption,
                  ]}
                  onPress={() => selectTheme(item)}
                >
                  <Text style={styles.buttonText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => cancelSelection()}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    gap: 20,
    paddingHorizontal: 20,
  },
  title: {
    color: '#111111',
    fontSize: 24,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  contentTitle: {
    fontSize: 15,
  },
  subtitle: {
    color: '#3C3C4399',
    fontSize: 13,
    marginTop: -10
  },
  subtitle2: {
    color: '#3C3C4399',
    fontSize: 15,
  },
  content: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 9,
    paddingHorizontal: 16,
    paddingRight: 31,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  themeOption: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#B9B9B9',
    fontSize: 17
  },
  lastThemeOption: {
    paddingVertical: 10,
    borderBottomWidth: 0,
    fontSize: 17
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderRadius: 10,
    padding: 11,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
    width: '100%',
    marginHorizontal: 16,
  },
  cancelButtonText: {
    color: 'red',
    fontSize: 17
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000066',
    zIndex: 20
  },
  buttonText: {
    fontSize: 17
  },
  themesContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 20
  },
  modalView: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    height: '90%',
    justifyContent: 'flex-start',
  },
  modalTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
});

export default ProfileInfo14;