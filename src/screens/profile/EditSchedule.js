import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import ActionButtonGreen from '../../components/events/ActionButtonGreen';
import { SvgXml } from 'react-native-svg';
import CloseButton from '../../../assets/onboarding/CloseButton';
import Drill_in from '../../../assets/onboarding/Drill_in';
import NavBar from '../../components/navbar/NavBar';
import axiosInstance from '../../config/AxiosInstance';

const AddSchedule = ({ navigation }) => {
  const [selectedTime, setSelectedTime] = useState('');
  const [details, setDetails] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [scheduleId, setScheduleId] = useState(null);

  const times = ['Morning', 'Afternoon', 'Evening', 'Night'];

  const selectTime = (time) => {
    setSelectedTime(time);
    setModalVisible(false);
  };

  const cancelSelection = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user_id = '4a027aa5-dc0b-4e67-8c3f-97cdb1c46853';
        const response = await axiosInstance.get(`/call-schedule/get-schedules/${user_id}`);

        if (response.status === 201 || response.status === 202) {
          const schedule = response.data[0];
          if (schedule) {
            setSelectedTime(schedule.time_of_the_day);
            setDetails(schedule.details);
            setStartTime(schedule.start_time);
            setEndTime(schedule.end_time);
            setScheduleId(schedule.id);
            setShowContent(true);
          }
        } else {
          Alert.alert('Error', 'Failed to fetch schedule');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'An error occurred while fetching the schedule');
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const body = {
        time_of_the_day: selectedTime.toLowerCase(),
        details: details,
        start_time: startTime,
        end_time: endTime,
      };

      let response;
      if (scheduleId) {
        response = await axiosInstance.post(`/call-schedule/update/${scheduleId}`, body, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        response = await axiosInstance.post('/call-schedule/create', body, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      if (response.status === 201 || response.status === 202) {
        Alert.alert('Success', 'Schedule created successfully');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Failed to create schedule');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while creating the schedule');
    }
  };

  const handleDelete = async () => {
    try {
      if (!scheduleId) {
        Alert.alert('Error', 'No schedule to delete');
        return;
      }

      const response = await axiosInstance.post(`/call-schedule/remove/${scheduleId}`, {}, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201 || response.status === 202) {
        Alert.alert('Success', 'Schedule deleted successfully');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Failed to delete schedule');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while deleting the schedule');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Edit schedule</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
            <Text style={styles.headerButtonText}>Discard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleSubmit}>
            <Text style={styles.headerButtonText}>Host</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container2}>
        {showContent && (
          <View style={styles.titleContainer}>
            <View style={styles.contentContainer}>
              <TouchableOpacity style={styles.content} onPress={() => setModalVisible(true)}>
                <View style={styles.contentText}>
                  <Text style={styles.contentTitle}>Time of the day</Text>
                  <Text style={styles.subtitle2}>{selectedTime || 'Select a time'}</Text>
                </View>
                <SvgXml xml={Drill_in} onPress={() => setModalVisible(true)} />
              </TouchableOpacity>
              <View style={styles.divider}></View>
              <TextInput
                placeholder="Enter details"
                placeholderTextColor="#3C3C434D"
                style={styles.input}
                multiline={true}
                value={details}
                onChangeText={setDetails}
              />
              <View style={styles.timeTextContainer}>
                <Text style={styles.timeText2}>From</Text>
                <TextInput
                  placeholder="Start time"
                  placeholderTextColor="#3C3C434D"
                  style={styles.timeText2}
                  value={startTime}
                  onChangeText={setStartTime}
                />
                <Text style={styles.timeText2}>to</Text>
                <TextInput
                  placeholder="End time"
                  placeholderTextColor="#3C3C434D"
                  style={styles.timeText2}
                  value={endTime}
                  onChangeText={setEndTime}
                />
              </View>
              <TouchableOpacity onPress={handleDelete}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {!showContent && <Text style={styles.subtitle}>Add a schedule</Text>}
        <ActionButtonGreen content={'+'} color={"#F6F6F6"} onPress={() => setShowContent(true)} />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modalTitle}>Time of the day</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <SvgXml xml={CloseButton} onPress={() => cancelSelection()} />
              </TouchableOpacity>
            </View>
            <View style={styles.themesContainer}>
              {times.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.themeOption, item === 'Night' && styles.lastThemeOption]}
                  onPress={() => selectTime(item)}
                >
                  <Text style={styles.buttonText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.cancelButton} onPress={() => cancelSelection()}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <NavBar profilePage={true} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  container2: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingBottom: 64,
    paddingHorizontal: 16,
  },
  titleContainer: {
    paddingTop: 60,
    gap: 10,
    paddingTop: 10,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
    borderBottomColor: '#B9B9B9',
    borderBottomWidth: 0.5,
    paddingTop: 60,
    paddingBottom: 16
  },
  title: {
    color: '#111111',
    fontSize: 24,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#3C3C4399',
    fontSize: 15,
    marginBottom: 16,
  },
  subtitle2: {
    color: '#3C3C4399',
    fontSize: 15,
  },
  content: {
    paddingVertical: 9,
    paddingRight: 15,
    width: '100%',
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  contentTitle: {
    fontSize: 17,
  },
  contentContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
  },
  input: {
    paddingBottom: 120,
    fontSize: 17,
    paddingTop: 5,
    paddingHorizontal: 16,
    color: '#2d2d2d',
  },
  divider: {
    backgroundColor: '#ADADAF',
    height: 0.5,
    width: '100%',
  },
  themeOption: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#B9B9B9',
    fontSize: 17,
    color: 'black'
  },
  deleteText: {
    color: 'red',
    textAlign: 'center',
    paddingVertical: 12,
  },
  cancelButtonText: {
    color: 'red',
    fontSize: 17,
  },
  buttonText: {
    fontSize: 17,
    color: 'black'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000066',
    zIndex: 20,
  },
  modalView: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    height: '50%',
    justifyContent: 'flex-start',
    paddingBottom: 40,
  },
  modalTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  nextButton: {
    position: 'fixed',
    bottom: 0,
  },
  timeText: {
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 6,
    fontSize: 17,
  },
  timeText2: {
    color: '#2D2D2D',
    fontSize: 16,
  },
  timeTextContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#B9B9B9',
    borderTopWidth: 0.5,
    borderTopColor: '#B9B9B9',
    paddingVertical: 12
  },
  themesContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d2d2d',
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderRadius: 10,
    padding: 11,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 60,
    width: '100%',
    marginHorizontal: 16,
  },
  cancelButtonText: {
    color: 'red',
    fontSize: 17,
  },
  headerButtons: {
    flexDirection: 'row',
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
});

export default AddSchedule;
