import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import ActionButtonGreen from '../../components/events/ActionButtonGreen';
import ProgressBar from '../../components/events/ProgressBar';
import NextButton from '../../components/events/NextButton';
import GoBackButton from '../../components/events/GoBackButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const ProfileInfo16 = ({ navigation }) => {
  const [selectedImageURI, setSelectedImageURI] = useState(null);

  const handleImageSelection = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log('ImagePicker result:', result);

    if (result) {
      console.log('deu certo:', result);
      setSelectedImageURI(result.assets[0].uri);
    }
  };


  const handleSaveProfile = async () => {
    try {
      const cookie = await AsyncStorage.getItem('cookie');

      if (!cookie) {
        console.warn('No access token found');
        return;
      }

      const formData = new FormData();
      formData.append('avatar', {
        uri: selectedImageURI,
        type: 'image/jpeg',
        name: 'avatar.jpg',
      });

      const response = await axios.post('https://realspace-otq5wtkqba-uc.a.run.app/user/save-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Cookie: cookie || '',
        },
      });

      if (response.status === 202) {
        console.log('Profile photo saved successfully');
        navigation.navigate('FriendsV3', { selectedImageURI });
      } else {
        console.warn('Failed to save profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ProgressBar current={4} style={styles.progress} />
      <View style={styles.container2}>
        <View style={styles.profileContainer}>
          <Text style={styles.title}>Add Profile Photo!</Text>
          <View style={styles.profilePhoto}>
            {selectedImageURI ? (
              <Image key={selectedImageURI} source={{ uri: selectedImageURI }} style={styles.photo} />
            ) : (
              <View style={styles.photo} />
            )}

            <Text style={styles.mainPhotoLabel}>Entered_name</Text>
          </View>
          <ActionButtonGreen
            content={'Select Image'}
            color={selectedImageURI ? '#378461' : '#F6F6F6'}
            onPress={handleImageSelection}
          />
        </View>
        <View style={styles.buttonContainer}>
          <GoBackButton onPress={() => navigation.goBack()} />
          <NextButton onPress={handleSaveProfile} />
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
    paddingHorizontal: 16,
  },
  title: {
    color: '#111111',
    fontSize: 24,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  profileContainer: {
    gap: 28,
  },
  profilePhoto: {
    backgroundColor: '#FFFFFF',
    width: 224,
    height: 269,
    padding: 12,
    paddingBottom: 18,
    gap: 8.43,
    borderRadius: 12,
    alignSelf: 'center',
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: '#EBEBEB',
  },
  mainPhotoLabel: {
    alignSelf: 'center',
    color: '#494949',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    gap: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignSelf: 'center',
  },
});

export default ProfileInfo16;
