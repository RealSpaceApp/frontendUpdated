import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import EventsCard from '../../components/events/cards/EventsCard';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Hosting = () => {
  const [eventData, setEventData] = useState([]);
  const [userData, setUserData] = useState({ name: '' });

  const fetchEventNotes = async (events) => {
    try {
      const cookie = await AsyncStorage.getItem('cookie');

      if (!cookie) {
        console.warn('No access token found');
        return;
      }

      const updatedEvents = await Promise.all(events.map(async (event) => {
        const response = await axios.get(`https://realspace-otq5wtkqba-uc.a.run.app/event/${event.id}/all-notes`, {
          headers: {
            Cookie: cookie || '',
          },
        });

        if (response.status === 202 || response.status === 200) {
          console.log('ALL NOTES:', response.data);
          return { ...event, notes: response.data };
        } else {
          console.warn(`Failed to fetch notes for event ${event.id}`);
          return event;
        }
      }));

      setEventData(updatedEvents);
    } catch (error) {
      console.error('Error fetching event notes:', error);
      Alert.alert('Error', 'Failed to fetch event notes. Please try again later.');
    }
  };

  const fetchEventData = useCallback(async () => {
    try {
      const cookie = await AsyncStorage.getItem('cookie');

      if (!cookie) {
        console.warn('No access token found');
        return;
      }

      const response = await axios.get('https://realspace-otq5wtkqba-uc.a.run.app/event/feed/hosting', {
        headers: {
          Cookie: cookie || '',
        },
      });

      if (response.status === 202) {
        setEventData(response.data);
        await fetchEventNotes(response.data)
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookie = await AsyncStorage.getItem('cookie');
        const axiosInstance = axios.create({
          headers: {
            Cookie: cookie || '',
          },
        });
        const response = await axiosInstance.get('https://realspace-otq5wtkqba-uc.a.run.app/user/profile');
        setUserData({
          name: response.data.name
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDeleteEvent = async (eventId) => {
    try {
      const cookie = await AsyncStorage.getItem('cookie');

      if (!cookie) {
        console.warn('No access token found');
        return;
      }
      const response = await axios.post('https://realspace-otq5wtkqba-uc.a.run.app/event/delete', {
        ID: eventId,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookie || '',
        }
      });

      if (response.status === 202) {
        setEventData(eventData.filter(event => event.id !== eventId));
      } else {
        console.warn('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      Alert.alert('Error', 'Failed to delete event. Please try again later.');
    }
  };

  const renderEventCard = ({ item }) => (
    <EventsCard
      attending={item.attending}
      creator={true}
      notes={[{ note: 'Yes ! im up for the meeting, I’ll be 15 min late but i’ll meet you guys this evening for sure !', note_time: '2024-07-10T14:54:17.486Z' }, { note: 'Just order a latte for me !', note_time: '2024-07-10T14:54:17.486Z' }]}
      eventId={item.id}
      addNotes={item.allow_notes}
      eventTitle={item.title}
      noteTime={item.note_time}
      time={new Date(item.start_time).toLocaleString()}
      location={item.location}
      text={item.description}
      onDelete={() => handleDeleteEvent(item.id)}
      style={styles.eventCard}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={eventData}
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
    marginTop: 16,
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
  bottom: {
    paddingBottom: 100
  }
});

export default Hosting;