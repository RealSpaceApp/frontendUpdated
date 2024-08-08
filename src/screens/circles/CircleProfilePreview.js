import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import NavBar from '../../components/navbar/NavBar';
import { themes } from '../profile/Themes2';
import friendsData from '../friends/FriendsList';
import { LinearGradient } from 'react-native-linear-gradient';
import { SvgXml } from 'react-native-svg';
import WhiteArrow from '../../../assets/onboarding/WhiteArrow';
import Location from '../../../assets/events/Location';
import axiosInstance from '../../config/AxiosInstance';

const photo = require('../../../assets/pictures/circlebg.jpg');

const CircleProfilePreview = ({ navigation }) => {
  const { 
    title, 
    description, 
    selectedImageURI, 
    location, 
    gradient, 
    tags 
  } = route.params;

  const theme = {
    backgroundColor: gradient,
    backgroundColor2: gradient // Assuming the same color for simplicity
  };
  // const [userData] = useState({
  //   name: 'Groove Gurus',
  //   bio: 'A crew of music junkies vibing to the latest hits and hidden gems. We live for the beats and the bass drops!',
  //   photo: '../../../assets/pictures/photo2.png',
  //   theme: 'Blue03',
  //   location: 'Florida, USA'
  // });
  const [eventData, setEventData] = useState([]);

  const fetchEventData = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/event/feed/circles');

      if (response.status === 202) {
        console.log(response.data)
        setEventData(response.data);
      } else {
        console.warn('Failed to fetch event data');
      }
    } catch (error) {
      console.error('Error fetching event data:', error);
      Alert.alert('Error', 'Failed to fetch event data. Please try again later.');
    }
  }, []);

  useEffect(() => {
    fetchEventData();
  }, [fetchEventData]);

  // const theme = themes[userData.theme];
  // const tags = ["Book_club", "Fantasy", "Society"];

  return (
    <View style={styles.container}>
      <Image source={{ uri: selectedImageURI }} style={styles.backgroundImage} />
      <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.goBack()}>
        <SvgXml xml={WhiteArrow} style={styles.arrow} />
      </TouchableOpacity>
      <View style={styles.profilePhoto}>
        <Image source={{ uri: selectedImageURI }} style={styles.photo} />
        <View>
          <Text style={styles.adminText}>Admin</Text>
          <Text style={styles.mainPhotoLabel}>{title}</Text>
        </View>
      </View>
      <LinearGradient
        colors={[theme.backgroundColor, theme.backgroundColor2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.profileContainer}
      >
        <View style={styles.userProfile}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.textBio}>{description}</Text>
          <View style={styles.tagsContainer}>
            {tags.map((tag, index) => (
              <TouchableOpacity key={index} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {location && (
            <View style={styles.timeContent}>
              <SvgXml xml={Location} />
              <Text style={styles.textBio}>{location}</Text>
            </View>
          )}
        </View>
        <NavBar profilePage={true} />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  tagText: {
    color: '#3C3C4399',
    fontSize: 14,
  },
  tagsContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: 10,
    width: '100%',
  },
  tag: {
    backgroundColor: '#E7E7E8',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  profileContainer: {
    gap: 12,
    paddingTop: 80,
    zIndex: 1,
    marginTop: -55,
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
    marginTop: 20
  },
  timeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 16,
    marginBottom: 26
  },
  profilePhoto: {
    backgroundColor: '#0A1D4159',
    flexDirection: 'row',
    width: '100%',
    padding: 12,
    marginTop: 325,
    paddingBottom: 14.05,
    gap: 8.43,
    borderRadius: 20,
    alignSelf: 'center',
    zIndex: 3,
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 50,
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
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  settings: {
    position: 'absolute',
    right: 16,
    top: 25
  },
  adminText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  userProfile: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    marginHorizontal: 16
  },
  textBio: {
    fontSize: 16,
    color: '#494949',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D2D2D',
  },
  title2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D2D2D',
  },
  bottom: {
    height: 180,
    width: '100%',
  },

  settingsButton: {
    position: 'absolute',
    top: 30,
    left: 16,
    zIndex: 2,
    transform: [{ rotate: '180deg' }]
  },

});

export default CircleProfilePreview;