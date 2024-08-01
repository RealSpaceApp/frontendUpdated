import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import EventsCard from '../../components/events/cards/EventsCard';
import axiosInstance from '../../config/AxiosInstance';
      
const CircleEvents = () => {
  const [eventData, setEventData] = useState([]);
  const [userProfiles, setUserProfiles] = useState({});

  const fetchEventData = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/event/feed/circles');

      if (response.status === 202) {
        console.log(response.data)
        setEventData(response.data);
        // Fetch user profiles for all events
        response.data.forEach(event => fetchUserProfile(event.subscriber_id));
      } else {
        console.warn('Failed to fetch event data');
      }
    } catch (error) {
      console.error('Error fetching event data:', error);
      Alert.alert('Error', 'Failed to fetch event data. Please try again later.');
    }
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const response = await axiosInstance.get(`/user/profile/${userId}`);

      if (response.status === 202) {

        setUserProfiles(prevProfiles => ({
          ...prevProfiles,
          [userId]: response.data,
        }));
      } else {
        console.warn(`Failed to fetch profile for user ${userId}`);
      }
    } catch (error) {
      console.error(`Error fetching profile for user ${userId}:`, error);
      Alert.alert('Error', 'Failed to fetch user profile. Please try again later.');
    }
  };

  useEffect(() => {
    fetchEventData();
  }, [fetchEventData]);

  const renderEventCard = ({ item }) => {
    const userProfile = userProfiles[item.subscriber_id] || {};
    return (
      <EventsCard
        attending={'attend'}
        creator={false}
        name={userProfile.name || 'Creator name'}
        photo={userProfile.avatar ? { uri: userProfile.avatar } : require('../../../assets/pictures/photo7.png')}
        eventId={item.id}
        addNotes={true}
        eventTitle={item.title}
        time={new Date(item.start_time).toLocaleString()}
        location={item.location}
        text={item.description}
        style={styles.eventCard}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={eventData}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        renderItem={renderEventCard}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <View style={styles.bottom}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  circlesContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  circlesAndTextContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  circle1: {
    zIndex: 1,
  },
  circle2: {
    marginLeft: -20,
    zIndex: 2,
  },
  circle3: {
    marginLeft: -20,
    zIndex: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d2d2d',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  separator: {
    height: 16,
  },
  eventCard: {
    marginVertical: 16,
    elevation: 5,
    shadowColor: '#4E4E4E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '100%',
    height: '95%',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    color: '#2d2d2d',
  },
  modalTitleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d2d2d',
  },
  circleListItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleListImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#378461',
    borderRadius: 20,
  },
});

export default CircleEvents;