import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import EventsCard from '../../components/events/cards/EventsCard';
import { SvgXml } from 'react-native-svg';
import Notification from '../../../assets/events/Notification';
import axiosInstance from '../../config/AxiosInstance';

const FriendsEvents = () => {
  const [publicEvents, setPublicEvents] = useState([]);
  const [userProfiles, setUserProfiles] = useState({});
  const [filter, setFilter] = useState('all');
  const [not, setNot] = useState(true);

  const handleOptionSelection = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const fetchEventReactions = async (events) => {
    if (!events) return;
    try {
      const updatedEvents = await Promise.all(events.map(async (event) => {
        const response = await axiosInstance.get(`/event/${event.id}/my-reaction`);

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
      const response = await axiosInstance.get('/event/feed/friends');

      if (response.status === 202 && response.data) {
        console.log(response.data);
        await fetchEventReactions(response.data);
      } else {
        console.log('Failed to fetch event data or data is null');
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

  const filteredEvents = publicEvents.filter(event => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'attending') {
      return event.reaction === 'attend';
    } else {
      return event.reaction === 'skip';
    }
  });

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
      <View style={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => handleOptionSelection('all')}
          style={[styles.filterButton, filter === 'all' && styles.selectedFilterButton]}>
          <Text style={styles.filterButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleOptionSelection('attending')}
          style={[styles.filterButton, filter === 'attending' && styles.selectedFilterButton]}>
          <Text style={styles.filterButtonText}>Attending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleOptionSelection('notAttending')}
          style={[styles.filterButton, filter === 'notAttending' && styles.selectedFilterButton]}>
          <Text style={styles.filterButtonText}>Not Attending</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationButton}>
          <SvgXml xml={Notification} />
          {not && (<View style={styles.notificationAlert}></View>)}
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredEvents}
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
    paddingHorizontal: 16
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 6,
    marginVertical: 17
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
  },
  notificationButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    right: 0
  },
  notificationAlert: {
    backgroundColor: 'red',
    width: 10,
    height: 10,
    borderRadius: 50,
    position: 'absolute',
    right: 0,
    color: '#2d2d2d',
  },
  selectedFilterButton: {
    borderWidth: 1,
    borderColor: '#49A078'
  },
  filterButtonText: {
    color: '#2D2D2D',
    fontSize: 14
  },
  selectedFilterButtonText: {
    color: '#FFFFFF',
    fontSize: 14
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
    marginBottom: 90
  },
});

export default FriendsEvents;