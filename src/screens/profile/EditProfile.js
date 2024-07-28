import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Alert } from 'react-native';
import NavBar from '../../components/navbar/NavBar';
import { themes } from './Themes2';
import { SvgXml } from 'react-native-svg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'react-native-image-picker';
import Edit from '../../../assets/profile/Edit';
import { useFocusEffect } from '@react-navigation/native';

const EditProfile = ({ navigation }) => {
  const [userData, setUserData] = useState({
    name: '',
    bio: '',
    birthday: '',
    photo: '',
  });
  const [originalData, setOriginalData] = useState({});
  const [selectedImageURI, setSelectedImageURI] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const cookie = await AsyncStorage.getItem('cookie');
      const axiosInstance = axios.create({
        headers: {
          Cookie: cookie || '',
        },
      });

      const response = await axiosInstance.get('http://172.21.192.1:8080/user/profile');
      console.debug('LandingPageProfile Profile Response:', response.data);

      setUserData({
        name: response.data.name,
        bio: response.data.about,
        birthday: formatDateString(response.data.birthday),
        email: response.data.email,
        number: response.data.phone || '',
        photo: response.data.avatar || '../../../assets/pictures/photo2.png',
        theme: 'Blue01',
      });
      setOriginalData({
        name: response.data.name,
        bio: response.data.about,
        birthday: formatDateString(response.data.birthday),
        photo: response.data.avatar || '../../../assets/pictures/photo2.png',
      });
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleInputChange = (name, value) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

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

    console.log('Image Picker Result:', result);

    if (!result.canceled) {
      const selectedUri = result.assets[0].uri;
      console.log('Image URI:', selectedUri);
      setSelectedImageURI(selectedUri);
      setUserData((prevUserData) => ({
        ...prevUserData,
        photo: selectedUri,
      }));
    }
  };

  const handleSaveChanges = async () => {
    try {
      const cookie = await AsyncStorage.getItem('cookie');
      console.log('Cookie:', cookie);

      if (!cookie) {
        console.warn('No access token found');
        return;
      }

      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('about', userData.bio);
      formData.append('birthday', new Date(userData.birthday.split('/').reverse().join('-')).toISOString());

      if (selectedImageURI) {
        const fileName = selectedImageURI.split('/').pop();
        const fileType = fileName.split('.').pop();

        formData.append('avatar', {
          uri: selectedImageURI,
          type: `image/${fileType}`,
          name: fileName,
        });
      }

      const response = await axios.post('http://172.21.192.1:8080/user/save-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Cookie: cookie || '',
        },
      });

      console.log('Response:', response);

      if (response.status === 202) {
        console.log('Profile saved successfully');
        setOriginalData(userData);
        navigation.navigate('LandingPageProfile');
      } else {
        console.warn('Failed to save profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
      }
    }
  };





  const handleDiscardChanges = () => {
    setUserData(originalData);
    navigation.navigate('LandingPageProfile');
  };

  const theme = themes['Blue01'];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image source={theme.backgroundImage} style={styles.backgroundImage} />
        <View style={styles.header}>
          <View style={styles.row}>
            <TouchableOpacity onPress={handleDiscardChanges} style={styles.buttonContainer}>
              <Text>Discard</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSaveChanges} style={styles.buttonContainer}>
              <Text>Save changes</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleImageSelection} style={styles.editButtonContainer}>
            <SvgXml xml={Edit} style={styles.editButton} />
          </TouchableOpacity>
        </View>

        <View style={styles.profilePhoto}>
          <Image source={{ uri: userData.photo }} style={styles.photo} />
          <Text style={styles.mainPhotoLabel}>{userData.name}</Text>
          <TouchableOpacity onPress={handleImageSelection} style={styles.editButtonContainerProfile}>
            <SvgXml xml={Edit} style={styles.editButton} />
          </TouchableOpacity>
        </View>

        <View style={styles.editContainer}>
          <View style={styles.editImages}>
            <Text style={styles.inputTitle}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="#3C3C434D"
              value={userData.name}
              onChangeText={(text) => handleInputChange('name', text)}
            />
          </View>

          <TextInput
            style={styles.inputBio}
            placeholder="Bio"
            placeholderTextColor="#3C3C434D"
            value={userData.bio}
            multiline
            numberOfLines={6}
            onChangeText={(text) => handleInputChange('bio', text)}
            textAlignVertical="top"
          />
          <View style={styles.editImages}>
            <Text>Birthday</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Birthday"
              placeholderTextColor="#3C3C434D"
              value={userData.birthday}
              onChangeText={(text) => handleInputChange('birthday', text)}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('EditSchedule')}
          >
            <Text style={styles.buttonText}>Edit call availability</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
          >
            <Text style={styles.buttonText}>Select Gradient</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <NavBar profilePage={true} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 160,
  },
  profileContainer: {
    gap: 12,
    paddingHorizontal: 15,
    paddingTop: 80,
    zIndex: 1,
    marginTop: -55,
  },
  header: {
    gap: 5,
    zIndex: 10,
    flexDirection: 'row',
    position: 'absolute',
    top: 40,
    right: 16,
    justifyContent: 'flex-end',
  },
  header2: {
    flexDirection: 'row',
    gap: 10,
    position: 'absolute',
    top: 40,
    right: 27,
  },
  editButtonContainer: {
    position: 'absolute',
    top: 315
  },
  editButtonContainerProfile: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
  profilePhoto: {
    backgroundColor: '#FFFFFF',
    width: 156.86,
    height: 191.9,
    padding: 8.43,
    marginTop: 250,
    paddingBottom: 14.05,
    gap: 8.40,
    borderRadius: 20,
    alignSelf: 'center',
    elevation: 20,
    zIndex: 3,
  },
  photo: {
    width: 140,
    height: 140,
    borderRadius: 12,
  },
  backgroundImage: {
    width: '100%',
    height: 400,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'absolute',
    top: 0,
    zIndex: 2,
  },
  mainPhotoLabel: {
    alignSelf: 'center',
    color: '#494949',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userProfile: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#494949',
  },
  text: {
    fontSize: 16,
    marginLeft: 4,
    color: '#494949',
  },
  textBio: {
    fontSize: 16,
    marginLeft: 4,
    color: '#494949',
    paddingHorizontal: 15,
  },
  button: {
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16
  },
  buttonText: {
    color: '#2D2D2D',
    fontSize: 16,
    lineHeight: 19.5,
  },
  timeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D2D2D',
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  editContainer: {
    gap: 15,
    marginTop: 30,
  },
  buttonContainer: {
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderRadius: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    fontSize: 16,
  },
  inputBio: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 20,
    color: '#646464',
    textAlignVertical: 'top',
  },
  editImages: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 16,
  },
  inputTitle: {
    fontSize: 16,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
});

export default EditProfile;