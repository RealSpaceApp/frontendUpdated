import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import ActionButtonGreen from '../../components/events/ActionButtonGreen';
import { SvgXml } from 'react-native-svg';
import CloseButton from '../../../assets/onboarding/CloseButton';
import Drill_in from '../../../assets/onboarding/Drill_in';

const AddSchedule = ({ navigation }) => {
  const [selectedTime, setSelectedTime] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const times = ['Morning', 'Afternoon', 'Evening', 'Night'];

  const selectTime = (time) => {
    setSelectedTime(time);
    setModalVisible(false);
  };

  const cancelSelection = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Add your schedule</Text>
        <View style={styles.contentContainer}>
          <TouchableOpacity
            style={styles.content}
            onPress={() => setModalVisible(true)}
          >
            <View style={styles.contentText}>
              <Text style={styles.contentTitle}>Time of the day</Text>
              <Text style={styles.subtitle2}>{selectedTime || 'Select a time'}</Text>
            </View>
            <SvgXml xml={Drill_in} onPress={() => setModalVisible(true)} />
          </TouchableOpacity>
          <View style={styles.divider}></View>
          <TextInput
            placeholder="enter details"
            placeholderTextColor="#3C3C434D"
            style={styles.input}
            multiline={true}
          />

        </View>
        <Text style={styles.subtitle}>TIMING</Text>
        <View style={styles.timeTextContainer}>
          <Text style={styles.timeText2}>From</Text>
          <Text style={styles.timeText}>"9:41 AM"</Text>
          <Text style={styles.timeText2}>to</Text>
          <Text style={styles.timeText}>"9:41 AM"</Text>
        </View>
        <ActionButtonGreen
          content={'+'}
          color={"white"}
          onPress={() => navigation.navigate('LastOnboarding')}
        />
      </View>

      <ActionButtonGreen
        content={'Next'}
        style={styles.nextButton}
        onPress={() => navigation.navigate('LastOnboarding')}
      />

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
                  style={[
                    styles.themeOption,
                    item === 'Night' && styles.lastThemeOption,
                  ]}
                  onPress={() => selectTime(item)}
                >
                  <Text style={styles.buttonText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => cancelSelection()}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    paddingTop: 86,
    justifyContent: 'space-between',
    paddingBottom: 64,
    paddingHorizontal: 16
  },
  titleContainer: {
    gap: 10,
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
  },
  subtitle2: {
    color: '#3C3C4399',
    fontSize: 15,
  },
  content: {
    backgroundColor: '#EDEDED',
    paddingVertical: 9,
    paddingRight: 15,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentTitle: {
    fontSize: 17
  },
  contentContainer: {
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  input: {
    paddingBottom: 120,
    fontSize: 17,
    paddingTop: 5
  },
  divider: {
    backgroundColor: '#ADADAF',
    height: 0.5,
    width: '100%'
  },
  themeOption: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#B9B9B9',
    fontSize: 17
  },
  cancelButtonText: {
    color: 'red',
    fontSize: 17
  },
  buttonText: {
    fontSize: 17
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000066',
    zIndex: 20
  },
  modalView: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    height: '50%',
    justifyContent: 'flex-start',
    paddingBottom: 40
  },
  modalTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  nextButton: {
    position: 'fixed',
    bottom: 0
  },
  timeText: {
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 6,
    fontSize: 17
  },
  timeText2: {
    color: '#3C3C4399',
    fontSize: 13
  },
  timeTextContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  themesContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold'
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
    fontSize: 17
  },

});

export default AddSchedule;
