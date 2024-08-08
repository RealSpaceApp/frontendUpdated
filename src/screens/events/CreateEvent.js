import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Switch, TouchableWithoutFeedback, ScrollView, Alert } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Navbar from '../../components/navbar/NavBar';
import Clock2 from '../../../assets/events/Clock2';
import LocationModal from '../../components/events/modals/LocationModal';
import TimezoneModal from '../../components/events/modals/TimezoneModal';
import VisibilityModal from '../../components/events/modals/VisibilityModal';
import PopupMenuIndicator from '../../../assets/events/PopupMenuIndicator';
import axiosInstance from '../../config/AxiosInstance';

const CreateEvent = ({ navigation, route }) => {
  const { eventId } = route.params || {};
  const [allDay, setAllDay] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [timezoneModalVisible, setTimezoneModalVisible] = useState(false);
  const [visibilityModalVisible, setVisibilityModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('Public');
  const [eventLength, setEventLength] = useState('start_and_end_time');
  const [repetition, setRepetition] = useState('does_not_repeat');
  const [selectCircle, setSelectCircle] = useState([]);
  const [endTime, setEndTime] = useState(null);
  const [location, setLocation] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [notificationSetting, setNotificationSetting] = useState('dont_notify_them');
  const [visibilitySetting, setVisibilitySetting] = useState('visible');
  const [visibility, setVisibility] = useState([]);
  const [numberOfSpots, setNumberOfSpots] = useState(0);
  const [allowNotes, setAllowNotes] = useState(true);
  const [showEventTypeOptions, setShowEventTypeOptions] = useState(false);
  const [showEventLengthOptions, setShowEventLengthOptions] = useState(false);
  const [showRepetitionOptions, setShowRepetitionOptions] = useState(false);
  const [startDate, setStartDate] = useState({ month: '', day: '', year: '', time: '' });
  const [endDate, setEndDate] = useState({ month: '', day: '', year: '', time: '' });

  const [modifiedFields, setModifiedFields] = useState({
    endTime: false,
    location: false,
    timeZone: false,
    visibility: false,
  });

  const handleEventTypeChange = (type) => {
    setEventType(type);
    setShowEventTypeOptions(false);
    setShowEventLengthOptions(false);
    setShowRepetitionOptions(false);
  };

  const toggleEventLengthOptions = () => {
    setShowEventLengthOptions(!showEventLengthOptions);
    setShowRepetitionOptions(false);
    setShowEventTypeOptions(false);
  };

  const toggleRepetitionOptions = () => {
    setShowRepetitionOptions(!showRepetitionOptions);
    setShowEventLengthOptions(false);
    setShowEventTypeOptions(false);
  };

  const toggleMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions);
  };

  const toggleLocationModal = () => {
    setLocationModalVisible(!locationModalVisible);
  };

  const closeLocationModal = () => {
    setLocationModalVisible(false);
  };

  const toggleTimezoneModal = () => {
    setTimezoneModalVisible(!timezoneModalVisible);
  };

  const closeTimezoneModal = () => {
    setTimezoneModalVisible(false);
  };

  const toggleVisibilityModal = () => {
    setVisibilityModalVisible(!visibilityModalVisible);
  };

  const closeVisibilityModal = () => {
    setVisibilityModalVisible(false);
  };

  useEffect(() => {
    if (eventId) {
      const fetchEventDetails = async () => {
        try {
          const response = await axiosInstance.get(`/event/${eventId}`);

          if (response.status === 202) {
            const event = response.data;
            event.title && setTitle(event.title);
            event.description && setDescription(event.description);
            event.eventType && setEventType(event.eventType);
            event.eventLength && setEventLength(event.eventLength);
            event.endTime && setEndTime(event.endTime);
            event.location && setLocation(event.location);
            event.timeZone && setTimeZone(event.timeZone);
            event.repetition && setRepetition(event.repetition);
            event.allowNotes && setAllowNotes(event.allowNotes);
            if (event.start_time) {
              const startDateTime = new Date(event.start_time);
              setStartDate({
                month: String(startDateTime.getUTCMonth() + 1).padStart(2, '0'),
                day: String(startDateTime.getUTCDate()).padStart(2, '0'),
                year: String(startDateTime.getUTCFullYear()),
                time: startDateTime.toISOString().substring(11, 16),
              });
            }
            if (event.end_time) {
              const endDateTime = new Date(event.end_time);
              setEndDate({
                month: String(endDateTime.getUTCMonth() + 1).padStart(2, '0'),
                day: String(endDateTime.getUTCDate()).padStart(2, '0'),
                year: String(endDateTime.getUTCFullYear()),
                time: endDateTime.toISOString().substring(11, 16),
              });
            }
          } else {
            console.warn('Failed to fetch event details');
          }
        } catch (error) {
          console.error('Error fetching event details:', error);
          Alert.alert('Error', 'Failed to fetch event details. Please try again later.');
        }
      };

      fetchEventDetails();
    }
  }, [eventId]);

  const handleCreateEvent = async () => {
    try {
      const formatDateTime = ({ month, day, year, time }) => {
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${time}:00Z`;
      };

      const start_time = formatDateTime(startDate);
      const end_time = formatDateTime(endDate);

      let response;
      if (eventId) {
        console.log(eventId)
        const eventPayload = {
          ID: eventId,
          title: title,
          description: description,
          type: eventType.toLowerCase(),
          length_of_event: eventLength.toLowerCase(),
          repitition: repetition.toLowerCase(),
          start_time: start_time,
          end_time: end_time,
        };
        response = await axiosInstance.post(`/event/update`, eventPayload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        const eventPayload = {
          title: title,
          description: description,
          type: eventType.toLowerCase(),
          length_of_event: eventLength.toLowerCase(),
          repitition: repetition.toLowerCase(),
          start_time: start_time,
          end_time: end_time,
        };

        if (eventType.toLowerCase() === 'circles') {
          eventPayload.select_circle = ['fbd31487-fc5a-458e-81c2-e18f80f010c0'];
        }
        response = await axiosInstance.post('/event/create', eventPayload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      if (response.status === 201 || response.status === 202) {
        console.log('Success', 'Event saved successfully!');
        navigation.goBack();
      } else {
        console.log('Error', 'Failed to save event. Please try again later.');
      }
    } catch (error) {
      console.error('Error saving event:', error);
      console.log('Error', 'Failed to save event. Please try again later.');
    }
  };

  const handleOptionalFieldChange = (field, value) => {
    setModifiedFields({ ...modifiedFields, [field]: true });
    switch (field) {
      case 'endTime':
        setEndTime(value);
        break;
      case 'location':
        setLocation(value);
        break;
      case 'timeZone':
        setTimeZone(value);
        break;
      case 'visibility':
        setVisibility(value);
        break;
      default:
        break;
    }
  };

  const closeAllPopups = () => {
    setShowEventTypeOptions(false);
    setShowEventLengthOptions(false);
    setShowRepetitionOptions(false);
  };

  return (
    <TouchableWithoutFeedback onPress={closeAllPopups}>
      <View style={styles.container}>
        <ScrollView>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>New Event</Text>
            <View style={styles.headerButtons}>
              <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
                <Text style={styles.headerButtonText}>Discard</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton} onPress={handleCreateEvent}>
                <Text style={styles.headerButtonText}>Host</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.header2}>
            {/* Inputs */}

            <TextInput
              style={styles.inputTitle}
              placeholderTextColor="#3C3C434D"
              placeholder="Add title"
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="#3C3C434D"
              placeholder="Enter description"
              multiline
              numberOfLines={6}
              value={description}
              onChangeText={(text) => setDescription(text)}
            />

            {/* All Day Switch */}
            <View style={styles.switchContainer}>
              <View style={styles.selectionButton}>
                <SvgXml xml={Clock2} />
                <Text style={styles.switchText}>All Day</Text>
              </View>
              <Switch
                value={allDay}
                onValueChange={(value) => setAllDay(value)}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={allDay ? '#378461' : '#f4f3f4'}
                ios_backgroundColor="#78788029"
                style={styles.switch}
              />
            </View>

            {/* Event Type */}
            <View style={styles.eventTypeContainer}>
              <Text style={styles.eventTypeText}>Event Type</Text>
              <TouchableOpacity
                onPress={() => setShowEventTypeOptions(true)}
                style={styles.selectionButton}
              >
                <Text style={styles.eventTypeSelection}>{eventType}</Text>
                <SvgXml xml={PopupMenuIndicator} />
              </TouchableOpacity>
            </View>

            {/* Options for Event Type */}
            {showEventTypeOptions && (
              <View style={styles.optionContainer1}>
                <TouchableOpacity onPress={() => handleEventTypeChange('public')} style={styles.option}>
                  <Text style={styles.optionText}>Public</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEventTypeChange('circles')} style={styles.option}>
                  <Text style={styles.optionText}>Circles</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEventTypeChange('community')} style={styles.option}>
                  <Text style={styles.optionText}>Community</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Length of the Event */}
            <View style={styles.eventTypeContainer}>
              <Text style={styles.eventTypeText}>Length of the Event</Text>
              <TouchableOpacity onPress={toggleEventLengthOptions} style={styles.selectionButton}>
                <Text style={styles.eventTypeSelection}>{eventLength}</Text>
                <SvgXml xml={PopupMenuIndicator} />
              </TouchableOpacity>
            </View>

            {/* Options for Length of the Event */}
            {showEventLengthOptions && (
              <View style={styles.optionContainer2}>
                <TouchableOpacity onPress={() => setEventLength('starting_from')} style={styles.option}>
                  <Text style={styles.optionText}>Starting from</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setEventLength('start_and_end_time')} style={styles.option}>
                  <Text style={styles.optionText}>Start and end time</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Date and Time Inputs */}
            <View style={styles.eventTypeContainer}>
              <Text style={styles.eventTypeText}>Start Date and Time</Text>
              <View style={styles.timeContainer}>
                <TextInput
                  style={styles.timeInput}
                  placeholder="MM"
                  placeholderTextColor="#3C3C434D"
                  keyboardType="numeric"
                  maxLength={2}
                  value={startDate.month}
                  onChangeText={(text) => setStartDate({ ...startDate, month: text })}
                />
                <TextInput
                  style={styles.timeInput}
                  placeholder="DD"
                  placeholderTextColor="#3C3C434D"
                  keyboardType="numeric"
                  maxLength={2}
                  value={startDate.day}
                  onChangeText={(text) => setStartDate({ ...startDate, day: text })}
                />
                <TextInput
                  style={styles.timeInput}
                  placeholder="YYYY"
                  placeholderTextColor="#3C3C434D"
                  keyboardType="numeric"
                  maxLength={4}
                  value={startDate.year}
                  onChangeText={(text) => setStartDate({ ...startDate, year: text })}
                />
                <TextInput
                  style={styles.timeInput}
                  placeholder="HH:MM"
                  placeholderTextColor="#3C3C434D"
                  value={startDate.time}
                  onChangeText={(text) => setStartDate({ ...startDate, time: text })}
                />
              </View>
            </View>

            <View style={styles.eventTypeContainer}>
              <Text style={styles.eventTypeText}>End Date and Time</Text>
              <View style={styles.timeContainer}>
                <TextInput
                  style={styles.timeInput}
                  placeholder="MM"
                  placeholderTextColor="#3C3C434D"
                  keyboardType="numeric"
                  maxLength={2}
                  value={endDate.month}
                  onChangeText={(text) => setEndDate({ ...endDate, month: text })}
                />
                <TextInput
                  style={styles.timeInput}
                  placeholder="DD"
                  placeholderTextColor="#3C3C434D"
                  keyboardType="numeric"
                  maxLength={2}
                  value={endDate.day}
                  onChangeText={(text) => setEndDate({ ...endDate, day: text })}
                />
                <TextInput
                  style={styles.timeInput}
                  placeholder="YYYY"
                  placeholderTextColor="#3C3C434D"
                  keyboardType="numeric"
                  maxLength={4}
                  value={endDate.year}
                  onChangeText={(text) => setEndDate({ ...endDate, year: text })}
                />
                <TextInput
                  style={styles.timeInput}
                  placeholder="HH:MM"
                  placeholderTextColor="#3C3C434D"
                  value={endDate.time}
                  onChangeText={(text) => setEndDate({ ...endDate, time: text })}
                />
              </View>
            </View>

            {/* START */}
            {/* <View style={styles.eventTypeContainer}>
              <View style={styles.selectionButton}>
                <Text style={styles.eventTypeText}>Monday, 1 Apr 2024</Text>
              </View>
              <Text style={styles.modalOptionText}>5:00 PM</Text>
            </View> */}

            {/* END */}
            {/* <View style={styles.eventTypeContainer}>
              <View style={styles.selectionButton}>
                <Text style={styles.eventTypeText}>Monday, 1 Apr 2024</Text>
              </View>
              <Text style={styles.modalOptionText}>5:00 PM</Text>
            </View> */}

            {/* Repetition */}
            <View style={styles.eventTypeContainer}>
              <Text style={styles.eventTypeText}>Repetition</Text>
              <TouchableOpacity onPress={toggleRepetitionOptions} style={styles.selectionButton}>
                <Text style={styles.eventTypeSelection}>{repetition}</Text>
                <SvgXml xml={PopupMenuIndicator} />
              </TouchableOpacity>
            </View>

            {/* Options for Repetition */}
            {showRepetitionOptions && (
              <View style={styles.optionContainer3}>
                <TouchableOpacity onPress={() => setRepetition('does_not_repeat')} style={styles.option}>
                  <Text style={styles.optionText}>Does not repeat</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRepetition('every_day')} style={styles.option}>
                  <Text style={styles.optionText}>Every day</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRepetition('every_week')} style={styles.option}>
                  <Text style={styles.optionText}>Every week</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRepetition('every_month')} style={styles.option}>
                  <Text style={styles.optionText}>Every month</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRepetition('every_year')} style={styles.option}>
                  <Text style={styles.optionText}>Every year</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* More Options */}
            {!showMoreOptions && (
              <TouchableOpacity onPress={toggleMoreOptions} style={styles.eventTypeContainer}>
                <Text style={styles.eventTypeText}>More Options..</Text>
              </TouchableOpacity>
            )}

            {showMoreOptions && (
              <View>
                <View style={styles.additionalEventsContainer}>
                  <Text style={styles.additionalEvents}>ADDITIONAL DETAILS</Text>
                </View>
                <View style={styles.eventTypeContainer}>
                  <Text style={styles.eventTypeText}>Location</Text>
                  <TouchableOpacity style={styles.selectionButton} onPress={toggleLocationModal}>
                    <Text style={styles.eventTypeSelection}>add location</Text>
                    <SvgXml xml={PopupMenuIndicator} />
                  </TouchableOpacity>
                </View>
                <View style={styles.eventTypeContainer}>
                  <Text style={styles.eventTypeText}>Timezone</Text>
                  <TouchableOpacity style={styles.selectionButton} onPress={toggleTimezoneModal}>
                    <Text style={styles.eventTypeSelection}>Indian Standard Time</Text>
                    <SvgXml xml={PopupMenuIndicator} />
                  </TouchableOpacity>
                </View>
                <View style={styles.eventTypeContainer}>
                  <Text style={styles.eventTypeText}>Visibility</Text>
                  <TouchableOpacity style={styles.selectionButton} onPress={toggleVisibilityModal}>
                    <Text style={styles.eventTypeSelection}>Set visibility</Text>
                    <SvgXml xml={PopupMenuIndicator} />
                  </TouchableOpacity>
                </View>
                <View style={styles.eventTypeContainer}>
                  <Text style={styles.eventTypeText}>Number of Spots</Text>
                  <TouchableOpacity style={styles.selectionButton}>
                    <Text style={styles.eventTypeSelection}>Pop-up</Text>
                    <SvgXml xml={PopupMenuIndicator} />
                  </TouchableOpacity>
                </View>
                <View style={styles.lastEventTypeContainer}>
                  <Text style={styles.eventTypeText}>Allow notes</Text>
                  <Switch
                    value={allDay}
                    onValueChange={(value) => setAllDay(value)}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={allDay ? '#378461' : '#f4f3f4'}
                    ios_backgroundColor="#78788029"
                    style={styles.switch}
                  />
                </View>
              </View>
            )}

            <LocationModal visible={locationModalVisible} onClose={closeLocationModal} />
            <TimezoneModal visible={timezoneModalVisible} onClose={closeTimezoneModal} />
            <VisibilityModal visible={visibilityModalVisible} onClose={closeVisibilityModal} />

          </View>
        </ScrollView>
        <Navbar />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
    backgroundColor: '#F6F6F6',
  },
  header: {
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  header2: {
    borderTopColor: '#AEB0AF',
    borderTopWidth: 0.5,
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    color: '#2D2D2D',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  selectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
  },
  headerButton: {
    marginLeft: 12,
    backgroundColor: 'white',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 50,
  },
  headerButtonText: {
    color: '#646464',
    fontSize: 14,
  },
  input: {
    backgroundColor: '#F6F6F6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    textAlignVertical: 'top',
    marginHorizontal: 16,
    color: '#2d2d2d',
  },
  inputTitle: {
    fontSize: 20,
    padding: 20,
    fontWeight: 'bold',
    color: '#2d2d2d',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 16,
    color: '#2d2d2d',
  },
  switchText: {
    fontSize: 16,
    color: '#2D2D2D',
  },
  switch: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },
  eventTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopColor: '#C7C8C8',
    borderTopWidth: 0.25,
    padding: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastEventTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopColor: '#C7C8C8',
    borderTopWidth: 0.25,
    padding: 16,
    paddingBottom: 50,
  },
  additionalEventsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  eventTypeText: {
    fontSize: 17,
    color: 'black',
  },
  additionalEvents: {
    fontSize: 15,
    color: '#3C3C4399',
    paddingTop: 10,
  },
  eventTypeSelection: {
    fontSize: 17,
    color: '#3C3C4399',
  },
  optionContainer1: {
    position: 'absolute',
    top: '48%',
    left: '67%',
    width: '30%',
    backgroundColor: 'white',
    borderTopWidth: 0.25,
    borderColor: '#C7C8C8',
    paddingHorizontal: 16,
    paddingBottom: 8,
    zIndex: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 6,
  },
  optionContainer2: {
    position: 'absolute',
    top: '56%',
    left: '67%',
    width: '30%',
    backgroundColor: 'white',
    borderTopWidth: 0.25,
    borderColor: '#C7C8C8',
    paddingHorizontal: 16,
    paddingBottom: 8,
    zIndex: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 6,
  },
  optionContainer3: {
    position: 'absolute',
    top: '35%',
    left: '67%',
    width: '30%',
    backgroundColor: 'white',
    borderTopWidth: 0.25,
    borderColor: '#C7C8C8',
    paddingHorizontal: 16,
    paddingBottom: 8,
    zIndex: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 6,
  },
  option: {
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 17,
    color: 'black',
  },
  modalOptionText: {
    fontSize: 18,
    color: '#2D2D2D',
  },
  timeInput: {
    fontSize: 15,
    color: 'black',
  }
});

export default CreateEvent;