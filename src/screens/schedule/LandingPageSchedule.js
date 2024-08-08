import React, { useState, useCallback, useEffect, createElement } from 'react';
import { View, StyleSheet, Text, FlatList, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import NavBar from '../../components/navbar/NavBar';
import ScheduleCard from '../../components/schedule/ScheduleCard';
import axiosInstance from '../../config/AxiosInstance';

const { width } = Dimensions.get('window');

const LandingPageSchedule = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [userProfiles, setUserProfiles] = useState({});
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  const fetchUpcomingEvents = async () => {
    try {
      const response = await axiosInstance.get('/event/schedule/upcoming-event-dates');
      const data = response.data;
      console.log('schedule', data);
      setEvents(data);
      await fetchEventReactions(response.data);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    }
  };

  const fetchEventsForDate = async (date) => {
    try {
      const response = await axiosInstance.get(`/event/schedule/${date}T00:00:00Z`);
      const data = response.data;
      console.log('FilteredEvents', data);
      setFilteredEvents(data);

      // Fetch user profiles for all events
      data.forEach(event => fetchUserProfile(event.subscriber_id));
      
    } catch (error) {
      console.error('Erro ao buscar eventos para a data:', error);
      setFilteredEvents([]);
    }
  };

  const fetchEventReactions = async (events) => {
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

  const fetchData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/user/profile/`);
      setCurrentUser(response.data.id);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData()
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchEventsForDate(selectedDate);
    }
  }, [selectedDate]);

  const markedDates = {};
  events.forEach(dateString => {
    markedDates[dateString.split('T')[0]] = {
      customStyles: {
        container: {
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: '#378461',
          borderRadius: 20
        },
        text: {
          color: 'black',
          fontWeight: 'normal'
        }
      }
    };
  });

  const today = new Date().toISOString().split('T')[0];
  markedDates[today] = {
    customStyles: {
      container: {
        backgroundColor: '#BABBBA',
        borderRadius: 20
      },
      text: {
        color: 'white',
        fontWeight: 'bold'
      }
    }
  };

  const renderHeader = () => (
    <View>
      <Text style={styles.title}>My Schedule</Text>
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
          }}
          markedDates={{
            ...markedDates,
            [selectedDate]: {
              selected: true,
              selectedColor: '#378461',
              customStyles: {
                container: {
                  backgroundColor: '#378461',
                  borderRadius: 20
                },
                text: {
                  color: 'white',
                  fontWeight: 'bold'
                }
              }
            }
          }}
          markingType={'custom'}
          style={styles.calendar}
        />
      </View>
      <Text style={styles.subtitle}>Upcoming events</Text>
    </View>
  );

  const mapEvent = (event) => {
    const userProfile = userProfiles[event.subscriber_id] || {};
    return {
      id: event.event_id,
      name: userProfile.name || '',
      photo: { uri: userProfile.avatar },
      creator: event.subscriber_id==currentUser? true : false,
      addNotes: event.allow_notes,
      important: false,
      eventTitle: event.title,
      time: new Date(event.start_time).toLocaleString(),
      location: event.location,
      text: event.description,
    };
  };

  if (!filteredEvents) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        <Text style={styles.errorMessage}>No events for selected date</Text>
        <NavBar />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {filteredEvents.length > 0 ? (
        <FlatList
          data={filteredEvents.map(mapEvent)}
          keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
          renderItem={({ item }) => (
            <ScheduleCard
              name={item.name}
              addNotes={item.addNotes}
              important={item.important}
              eventId={item.id}
              eventTitle={item.eventTitle}
              attending={item.reaction || 'attend'}
              creator={item.creator}
              time={item.time}
              location={item.location}
              text={item.text}
              photo={item.photo}
              style={styles.eventCard}
              onDelete={() => handleDeleteEvent(item.id)}
            />
          )}
        />
      ) : (
        <View style={styles.errorMessage}>
          <Text>No events for selected date</Text>
        </View>
      )}
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingBottom: 100,
  },
  calendarContainer: {
    width: width,
    padding: 16,
  },
  title: {
    color: '#2D2D2D',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 60,
    marginLeft: 16,
  },
  subtitle: {
    color: '#646464',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
    marginLeft: 16,
  },
  separator: {
    height: 16,
  },
  eventCard: {
    elevation: 5,
    shadowColor: '#4E4E4E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  calendar: {
    borderRadius: 20,
    width: '100%',
    height: undefined,
    paddingBottom: 16,
  },
  errorMessage: {
    padding: 16,
  }
});

export default LandingPageSchedule;