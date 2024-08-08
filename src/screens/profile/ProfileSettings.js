import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Switch, Modal } from 'react-native';
import NavBar from '../../components/navbar/NavBar';
import { SvgXml } from 'react-native-svg';
import Arrow from '../../../assets/onboarding/Arrow';
import axiosInstance from '../../config/AxiosInstance';

const ProfileSettings = ({ navigation }) => {
  const [allDay, setAllDay] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [friends, setFriends] = useState([]);
  const [ws, setWs] = useState(null);
  const [pendingFriendship, setPendingFriendship] = useState(null);

  const fetchFriends = async () => {
    try {
      const response = await axiosInstance.get('/friends');
      const friendsList = response.data;
      console.log(friendsList);
      setFriends(friendsList);
    } catch (error) {
      console.error('Failed to fetch friends:', error);
    }
  };

  useEffect(() => {
    const websocket = new WebSocket('ws://172.21.192.1:8080/ws');

    websocket.onopen = () => {
      console.log('WebSocket connected');
      setWs(websocket);
    };

    websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('Message from server:', message);

      if (message.friendship === 'connect') {
        console.log('Friendship initiated successfully');
        setPendingFriendship(message);
        setModalVisible(true);
      } else if (message.friendship === 'error') {
        console.error('Failed to initiate friendship');
      } else if (message.friendship === 'accept') {
        console.log('Friendship accepted');
        fetchFriends();
      } else if (message.friendship === 'deny') {
        console.log('Friendship denied');
      }
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    websocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      websocket.close();
    };
  }, []);

  const initiateFriendship = async () => {
    try {
      console.log('Initiating friendship...');
      if (!ws) {
        console.error('WebSocket connection not established');
        return;
      }

      const msg = {
        senderId: "4a027aa5-dc0b-4e67-8c3f-97cdb1c46853",
        receiverId: "2ca14736-12a1-4ac1-8fba-bd639be71b1a",
        action: "friendship"
      };
      ws.send(JSON.stringify(msg));
      console.log('Friendship initiation message sent');
      fetchFriends();
    } catch (error) {
      console.error('Failed to initiate friendship:', error);
    }
  };

  const handleFriendshipResponse = (accept) => {
    if (!ws) {
      console.error('WebSocket connection not established');
      return;
    }

    const msg = {
      senderId: pendingFriendship.receiverId,
      receiverId: pendingFriendship.senderId,
      action: accept ? "friendshipAccept" : "friendshipDeny"
    };

    ws.send(JSON.stringify(msg));
    setModalVisible(false);
    setPendingFriendship(null);
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
        <SvgXml xml={Arrow} style={styles.arrow} />
        <Text style={styles.title}>Profile Settings</Text>
      </TouchableOpacity>

      <View style={styles.header2}>
        <View style={styles.eventTypeContainer}>
          <View style={styles.selectionButton}>
            <Text style={styles.eventTypeText}>Notifications</Text>
          </View>
          <Switch
            value={allDay}
            onValueChange={(value) => setAllDay(value)}
            trackColor={{ false: "#767577", true: "#34C759" }}
            thumbColor={allDay ? "white" : "white"}
            ios_backgroundColor="gray"
            style={styles.switch}
          />
        </View>
        <TouchableOpacity style={styles.eventTypeContainer} onPress={initiateFriendship}>
          <Text style={styles.eventTypeText}>Initiate Friendship</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eventTypeContainer} onPress={() => navigation.navigate('ChangePhoneNumber')}>
          <Text style={styles.eventTypeText}>Change phone number</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.eventTypeContainer}>
          <Text style={styles.eventTypeText}>Send feedback / bugs / issues</Text>
        </TouchableOpacity>

        <View style={styles.eventTypeContainer}>
          <Text style={styles.eventTypeText}>App Version</Text>
          <Text style={styles.modalOptionText}>1.0.2</Text>
        </View>

        <TouchableOpacity style={styles.eventTypeContainer} onPress={() => setModalVisible(true)}>
          <Text style={styles.eventTypeText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={fetchFriends}>
        <Text>Refresh Friends</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Friendship Request</Text>
            <Text style={styles.modalText}>Do you want to accept the friendship request?</Text>
            <TouchableOpacity onPress={() => handleFriendshipResponse(true)}>
              <Text style={styles.acceptButton}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFriendshipResponse(false)}>
              <Text style={styles.denyButton}>Deny</Text>
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
    paddingTop: 60,
    backgroundColor: '#F6F6F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
    gap: 10
  },
  header2: {
    borderTopColor: '#AEB0AF',
    borderTopWidth: 0.5,
    backgroundColor: 'white',
    flex: 1
  },
  arrow: {
    transform: [{ rotate: '180deg' }]
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
    justifyContent: 'center'
  },
  headerButton: {
    marginLeft: 12,
    backgroundColor: 'white',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 50
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
    paddingHorizontal: 16
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
  eventTypeText: {
    fontSize: 17,
    color: 'black',
  },
  eventTypeSelection: {
    fontSize: 17,
    color: '#3C3C4399',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: '50%',
    justifyContent: 'center',
    position: 'relative',
    top: 0
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalOptionText: {
    fontSize: 18,
    color: '#2D2D2D',
    opacity: 0.5
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000066',
    zIndex: 20
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#2d2d2d',
  },
  modalBackground: {
    backgroundColor: '#00000066',
    padding: 20,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: '#DFDFDF',
    justifyContent: 'center',
    borderRadius: 20,
    paddingTop: 16
  },
  modalTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D2D2D',
    textAlign: 'center'
  },
  modalText: {
    fontSize: 14,
    color: '#2D2D2D',
    textAlign: 'center',
    maxWidth: '75%',
    paddingHorizontal: 16,
    marginBottom: 16
  },
  actionModalButton: {
    color: '#FF3333',
    paddingVertical: 11,
    textAlign: 'center',
    borderTopColor: '#3C3C435C',
    borderTopWidth: 0.3,
  },
  actionModalButton2: {
    color: '#2D2D2D',
    paddingVertical: 11,
    textAlign: 'center',
    borderTopColor: '#3C3C435C',
    borderTopWidth: 0.3,
  },
  closeModalButton: {
    color: '#49A078',
    paddingVertical: 11,
    textAlign: 'center',
    borderTopColor: 'gray',
    borderTopWidth: 0.5,
  },
  cancelButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProfileSettings;