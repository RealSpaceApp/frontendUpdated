import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import EventsCard from '../../components/events/cards/EventsCard';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PublicEvents = () => {
  const [publicEvents, setPublicEvents] = useState([]);
  const [userProfiles, setUserProfiles] = useState({});

  const fetchEventReactions = async (events) => {
    try {
      const cookie = await AsyncStorage.getItem('cookie');

      if (!cookie) {
        console.warn('No access token found');
        return;
      }

      const updatedEvents = await Promise.all(events.map(async (event) => {
        const response = await axios.get(`http://172.21.192.1:8080/event/${event.id}/my-reaction`, {
          headers: {
            Cookie: cookie || '',
          },
        });

        if (response.status === 202) {
          console.log(response.data);
          return { ...event, reaction: response.data.reaction, notes: response.data.note };
        } else {
          console.warn(`Failed to fetch reaction for event ${event.id}`);
          return event;
        }
      }));

      setPublicEvents(updatedEvents);
      // Fetch user profiles for all events
      updatedEvents.forEach(event => fetchUserProfile(event.subscriber_id));
    } catch (error) {
      console.error('Error fetching event reactions:', error);
      Alert.alert('Error', 'Failed to fetch event reactions. Please try again later.');
    }
  };

  const fetchEventData = useCallback(async () => {
    try {
      const cookie = await AsyncStorage.getItem('cookie');

      if (!cookie) {
        console.warn('No access token found');
        return;
      }

      const response = await axios.get('http://172.21.192.1:8080/event/feed/public', {
        headers: {
          Cookie: cookie || '',
        },
      });

      if (response.status === 202) {
        console.log(response.data);
        await fetchEventReactions(response.data);
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
      const cookie = await AsyncStorage.getItem('cookie');

      if (!cookie) {
        console.warn('No access token found');
        return;
      }

      const response = await axios.get(`http://172.21.192.1:8080/user/profile/${userId}`, {
        headers: {
          Cookie: cookie || '',
        },
      });

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
        attending={item.reaction || 'attend'}
        creator={false}
        name={userProfile.name || 'Creator name'}
        photo={userProfile.avatar ? { uri: userProfile.avatar } : require('../../../assets/pictures/photo7.png')}
        eventId={item.id}
        addNotes={item.allow_notes}
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
        data={publicEvents}
        keyExtractor={(item) => item.id.toString()}
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
    marginTop: 16
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
});

export default PublicEvents;