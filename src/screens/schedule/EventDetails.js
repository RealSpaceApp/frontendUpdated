import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Modal, ScrollView, TextInput,TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import NavBar from '../../components/navbar/NavBar';
import { SvgXml } from 'react-native-svg';
import Arrow from '../../../assets/onboarding/Arrow';
import Clock from '../../../assets/events/Clock';
import Tags from  '../../components/events/cards/Tags';
import { useNavigation } from '@react-navigation/native';
import Location from '../../../assets/events/Location';
import CloseButton from '../../../assets/onboarding/CloseButton';
import ActionButtonGreen from '../../components/events/ActionButtonGreen';
import TimerAttend from '../../../assets/events/TimerAttend';
import TimerNotAttend from '../../../assets/events/TimerNotAttend';
import axiosInstance from '../../config/AxiosInstance';

const EventDetails = ({ route }) => {
  const { name, eventTitle, time, text, addNotes, attending, eventId, location, notes, creator, photo, onDelete } = route.params;
  const navigation = useNavigation();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [attendance, setAttendance] = useState(attending);
  const [notesModalVisible, setNotesModalVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('Not attending');
  const [loading, setLoading] = useState(false);

  const handleDeleteEvent = async () => {
    setDeleteModalVisible(true);
  };

  const confirmDeleteEvent = async () => {
    await onDelete();
    setDeleteModalVisible(false);
  };

  const cancelDeleteEvent = () => {
    setDeleteModalVisible(false);
  };

  const handleReaction = async (reaction, note = '') => {
    try {
      if (reaction == 'attend') {
        setLoadingMessage("Attending")
      } else {
        setLoadingMessage("Not attending")
      }
      setLoading(true)
  
      const payload = {
        event_id: eventId,
        type: "public",
        reaction: reaction,
        note: note,
        note_time: new Date().toISOString()
      };
      
      const response = await axiosInstance.post('/event/react', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 202 || response.status === 201) {
        setAttendance(reaction);
        setLoading(false)
        console.log('Reaction updated successfully', response.status);
      } else {
        console.warn('Failed to update reaction');
      }
    } catch (error) {
      console.error('Error updating reaction:', error);
      Alert.alert('Error', 'Failed to update reaction. Please try again later.');
    }
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleSendNote = async () => {
    await handleReaction(attendance, description);
    setDescription('');
    toggleModal();
  };

  const toggleNotesModal = () => {
    setNotesModalVisible(!notesModalVisible);
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header}  onPress={() => navigation.goBack()}>
        <SvgXml xml={Arrow} style={styles.arrow} />
        <Text style={styles.title}>{eventTitle}</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.container2}>
            
        <View>
        <View style={styles.header2}>
          {photo && <Image source={photo} style={styles.photo} />}
          {name && <Text style={styles.name}>{name}</Text>}
          <View style={styles.loadingContainer}>
            {loading == true && loadingMessage == 'Not attending' && <Text style={styles.loadingNotAttend}>{loadingMessage}</Text>}
            {loading == true && loadingMessage == 'Attending' && <Text style={styles.loadingAttend}>{loadingMessage}</Text>}
            {loading == true && loadingMessage == 'Attending' && <SvgXml xml={TimerAttend} />}
            {loading == true && loadingMessage == 'Not attending' && <SvgXml xml={TimerNotAttend} />}
          </View>
        </View>
        {eventTitle && <Text style={styles.title}>{eventTitle}</Text>}
        {time && (
          <View style={styles.timeContainer}>
            <View style={styles.timeContent}>
              <SvgXml xml={Clock} style={styles.clock} />
              <Text style={styles.timeText}>{time}</Text>
            </View>
          </View>
        )}
      </View>
      <View>
        <View style={styles.expandedText}>
          {location && (
            <View style={styles.timeContent}>
              <SvgXml xml={Location} style={styles.clock} />
              <Text style={styles.timeText}>{location}</Text>
            </View>
          )}
          {text && (
            <Text style={[styles.text,  { maxHeight: 40, overflow: 'hidden' }]}>
              {text}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.bottomRow}>
        {creator ? (
          <View style={styles.tagsContainer}>
            <Tags text="Delete event" onPress={handleDeleteEvent} />
            <Tags text="Edit event" onPress={() => navigation.navigate('CreateEvent', { eventId })} />
            <Tags text="View notes" onPress={toggleNotesModal} />
          </View>
        ) : (
          attendance !== undefined && (
            <View style={styles.tagsContainer}>
              {attendance === 'attend' ? (
                <>
                  <Tags text="Attending" checked={true} />
                  <Tags text="Cancel" onPress={() => handleReaction('skip')} />
                </>
              ) : (
                <>
                  <Tags text="Not attending" checked={true} />
                  <Tags text="Attend" onPress={() => handleReaction('attend')} />
                </>
              )}
              {addNotes && <Tags text="Add notes" onPress={toggleModal} />}
            </View>
          )
        )}
        </View>
        <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <View>
                  <View style={styles.modalTitleContainer}>
                    <Text style={styles.modalTitle}>Add Note</Text>
                    <SvgXml xml={CloseButton} onPress={toggleModal} />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="reason for cancellation of event"
                    multiline
                    placeholderTextColor="#3C3C434D"
                    numberOfLines={10}
                    value={description}
                    onChangeText={text => setDescription(text)}
                  />
                </View>

                <View style={styles.modalButtons}>
                  <ActionButtonGreen color={'#49A078'} content={'Send'} onPress={handleSendNote} />
                  <ActionButtonGreen color={'white'} content={'Cancel without a note'} onPress={toggleModal} />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        visible={notesModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleNotesModal}
      >
        <TouchableWithoutFeedback onPress={toggleNotesModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <View>
                  <View style={styles.modalTitleContainer}>
                    <Text style={styles.modalTitle}>Event Notes</Text>
                    <SvgXml xml={CloseButton} onPress={toggleNotesModal} />
                  </View>
                  <ScrollView>
                    <View style={styles.container}>
                      <View>
                        <View style={styles.header2}>
                          {photo && <Image source={photo} style={styles.photo} />}
                          {name && <Text style={styles.name}>{name}</Text>}
                        </View>
                        {eventTitle && <Text style={styles.title}>{eventTitle}</Text>}
                        {time && (
                          <View style={styles.timeContainer}>
                            <View style={styles.timeContent}>
                              <SvgXml xml={Clock} style={styles.clock} />
                              <Text style={styles.timeText}>{time}</Text>
                            </View>
                          </View>
                        )}
                        <Text style={[styles.text, !expanded && { maxHeight: 40, overflow: 'hidden' }]}>
                          {text}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.bottom}></View>
                    {notes && notes.map((note, index) => (
                      <View key={index} style={styles.noteContainer}>
                        {<Image source={creatorPhoto} style={styles.photo} />}
                        <View>
                          <View style={styles.header}>
                            {<Text style={styles.name}>user</Text>}
                            <Text style={styles.noteTime}>{new Date(note.note_time).toLocaleString()}</Text>
                          </View>
                          <View style={styles.noteText}>
                            <Text style={styles.noteTextContainer}>{note.note}</Text>
                          </View>

                        </View>

                      </View>
                    ))}
                  </ScrollView>
                </View>

              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        visible={deleteModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={cancelDeleteEvent}
      >
        <TouchableWithoutFeedback onPress={cancelDeleteEvent}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBackground2}>


              <TouchableWithoutFeedback>
                <View style={styles.modalContainer2}>
                  <Text style={styles.modalTitle}>Delete the event?</Text>
                  <Text style={styles.modalText2}>Are you sure you want to delete this event? Attendees will be notified if you proceed</Text>
                  <TouchableOpacity
                    onPress={cancelDeleteEvent}>
                    <Text style={styles.closeModalButton2}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={confirmDeleteEvent}>
                    <Text style={styles.actionModalButton2}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback></View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
        </View>
      </View>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#F6F6F6',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopColor: '#AEB0AF',
    borderTopWidth: 0.5,
    flex: 1
  },
  container2: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: 12,
    gap: 12,
    borderRadius: 20,
  },
  arrow: {
    transform: [{ rotate: '180deg' }],
    marginRight: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  header2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  name: {
    color: '#2D2D2D',
    fontSize: 18,
    fontWeight: '700',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d2d2d',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  timeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  expandedText: {
    gap: 8
  },
  clock: {
    opacity: 0.4,
  },
  timeText: {
    opacity: 0.7,
    fontWeight: '600',
    fontSize: 14,
    color: '#2D2D2D',
  },
  expandIcon: {
    fontSize: 17.7,
    color: '#49A078',
    fontWeight: '600',
    transform: [{ rotate: '180deg' }],
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeIcon: {
    fontSize: 17.7,
    color: '#49A078',
    fontWeight: '600',
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: '#2D2D2D'
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8
  },
  expandButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: 191,
    borderRadius: 8
  },
  bottom: {
    marginBottom: 20
  },
  modalContainer: {
    backgroundColor: '#F6F6F6',
    justifyContent: 'space-between',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    width: '100%',
    height: '90%',
    backgroundColor: '#EEEEEE',
    padding: 20,
  },
  modalTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D2D2D',
    textAlign: 'center'
  },
  modalOverlay: {
    backgroundColor: '#00000066',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  closeModalButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#49A078',
    borderRadius: 5,
  },
  closeModalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalButtons: {
    gap: 10,
    marginBottom: 50
  },
  noteContainer: {
    marginBottom: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 15
  },
  noteTextContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
  },
  noteText: {
    fontSize: 14,
    color: '#333',
    width: '82%'
  },
  noteTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  modalText2: {
    fontSize: 14,
    color: '#646464',
    textAlign: 'center',
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingTop: 10,
    marginBottom: 16
  },
  closeModalButton2: {
    color: 'black',
    paddingVertical: 11,
    textAlign: 'center',
    borderTopColor: 'gray',
    borderTopWidth: 0.5,
  },
  cancelButton2: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  cancelButtonText2: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  actionModalButton2: {
    color: '#FF3333',
    paddingVertical: 11,
    textAlign: 'center',
    borderTopColor: '#3C3C435C',
    borderTopWidth: 0.3,
  },
  modalBackground2: {
    padding: 20,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer2: {
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 20,
    paddingTop: 16
  },
});

export default EventDetails;