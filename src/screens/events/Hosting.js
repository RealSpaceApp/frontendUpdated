import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import EventsCard from '../../components/events/cards/EventsCard';
import axiosInstance from '../../config/AxiosInstance';

const Hosting = () => {
  const [eventData, setEventData] = useState([]);
  const [userData, setUserData] = useState({ name: '' });

  const fetchEventNotes = async (events) => {
    try {
      const updatedEvents = await Promise.all(events.map(async (event) => {
        const response = await axiosInstance.get(`/event/${event.id}/all-notes`);

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
      const response = await axiosInstance.get('/event/feed/hosting');

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
        const response = await axiosInstance.get('/user/profile');
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

      const response = await axiosInstance.post('/event/delete', {
        ID: eventId,
      }, {
        headers: {
          'Content-Type': 'application/json',
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
      //notes={[{ note: 'Yes ! im up for the meeting, I’ll be 15 min late but i’ll meet you guys this evening for sure !', note_time: '2024-07-10T14:54:17.486Z' }, { note: 'Just order a latte for me !', note_time: '2024-07-10T14:54:17.486Z' }]}
      notes={item.notes}
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