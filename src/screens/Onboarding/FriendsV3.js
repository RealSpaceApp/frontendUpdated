import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import cover from '../../../assets/pictures/userCover.jpg';

const { width } = Dimensions.get('window');

const FriendsV3 = ({ navigation }) => {
  const [userData, setUserData] = useState({
    name: '',
    bio: '',
    birthday: '',
    email: '',
    number: '',
    photo: '',
    interest1: '',
    interest2: '',
    interest3: '',
    interest4: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookie = await AsyncStorage.getItem('cookie');
        const axiosInstance = axios.create({
          headers: {
            Cookie: cookie || '',
          },
        });
        const response = await axiosInstance.get(`http://172.21.192.1:8080/user/profile`);
        console.debug('FriendsV3 Profile Response:', response.data);

        setUserData({
          name: response.data.name,
          bio: response.data.about,
          birthday: response.data.birthday,
          email: response.data.email,
          number: response.data.phone || '',
          avatar: response.data.avatar,
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.coverPhoto}>
        <Image source={cover} style={styles.imageCoverPhoto} />
      </View>
      <View style={styles.msgContainer}>
        <Text style={styles.msg}>Your profile looks great!</Text>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.profilePhoto}>
          {userData.avatar ? (
            <Image source={{ uri: userData.avatar }} style={styles.photo} />
          ) : (
            <View style={styles.photo} />
          )}

          <Text style={styles.mainPhotoLabel}>{userData.name}</Text>
        </View>

        {/* Info */}
        <View style={styles.userProfile}>
          <Text style={styles.text}>{userData.bio}</Text>
        </View>
        <View style={styles.userProfile}>
          <View style={styles.userInfo}>
            <Text style={styles.label}>Birthday: </Text>
            <Text style={styles.text}>{new Date(userData.birthday).toLocaleDateString()}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.label}>Number: </Text>
            <Text style={styles.text}>{userData.number}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CommunityTags')}>
          <Text style={styles.buttonText}>Call Schedule</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#E6F0EA',
  },
  msgContainer: {
    width: '120%',
    backgroundColor: '#FFFFFF',
    padding: 5,
    zIndex: 2,
    position: 'absolute',
    alignItems: 'center',
    top: 50,
  },
  msg: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111111',
  },
  profileContainer: {
    gap: 12,
    marginTop: width * 0.5625,
  },
  photosContainer: {
    marginBottom: 70,
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
    elevation: 60,
    marginBottom: 40,
  },
  coverPhoto: {
    width: width,
    height: 490,
    position: 'absolute',
    top: 0,
  },
  imageCoverPhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: '#C4C4C4',
  },
  mainPhotoLabel: {
    alignSelf: 'center',
    color: '#494949',
    fontSize: 18,
    fontWeight: 'bold',
  },
  photoLabel: {
    alignSelf: 'center',
    color: '#494949',
    fontSize: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userProfile: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#49A078',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 41,
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
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 19.5,
  },
});

export default FriendsV3;
