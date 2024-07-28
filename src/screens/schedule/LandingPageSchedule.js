import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import NavBar from '../../components/navbar/NavBar';
import ScheduleCard from '../../components/schedule/ScheduleCard';

const { width } = Dimensions.get('window');

const LandingPageSchedule = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  const fetchUpcomingEvents = async () => {
    try {
      const response = await fetch('http://172.21.192.1:8080/event/schedule/upcoming-event-dates', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('schedule', data);
      setEvents(data);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    }
  };

  const fetchEventsForDate = async (date) => {
    try {
      const response = await fetch(`http://172.21.192.1:8080/event/schedule/${date}T00:00:00Z`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('FilteredEvents', data);
      setFilteredEvents(data);
    } catch (error) {
      console.error('Erro ao buscar eventos para a data:', error);
      setFilteredEvents([]);
    }
  };

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
    return {
      id: event.event_id,
      name: event.title,
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
              eventTitle={item.eventTitle}
              time={item.time}
              location={item.location}
              text={item.text}
              style={styles.eventCard}
            />
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
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