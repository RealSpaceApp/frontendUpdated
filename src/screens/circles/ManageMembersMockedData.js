import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, FlatList, Modal } from 'react-native';
import NavBar from '../../components/navbar/NavBar';
import NavBarCircles from '../../components/navbar/NavBarCircles';
import FriendCardProfilePage from '../../components/profile/FriendCardProfilePage';
import friendsData from '../friends/FriendsList';
import PopupMenuIndicator from '../../../assets/events/PopupMenuIndicator';
import Info from '../../../assets/circles/Info';
import { SvgXml } from 'react-native-svg';
import Arrow from '../../../assets/onboarding/Arrow';
import Location from '../../../assets/events/Location';
import SelectedMember from '../../components/circles/SelectedMember';
import axiosInstance from '../../config/AxiosInstance';

const ManageMembers = ({ navigation }) => {
  const [selected, setSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [modalVisibleRemoveFriend, setModalVisibleRemoveFriend] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [userData] = useState({
    name: 'Groove Gurus',
    bio: 'A crew of music junkies vibing to the latest hits and hidden gems. We live for the beats and the bass drops!',
    photo: '../../../assets/pictures/photo2.png',
    theme: 'Blue03',
    location: 'Florida, USA'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [eventData, setEventData] = useState([]);
  const nonModerators = friendsData.filter(friend => !friend.moderator);

  const fetchEventData = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/event/feed/circles');

      if (response.status === 202) {
        console.log(response.data)
        setEventData(response.data);
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

  const toggleSelectedItem = (id) => {
    setSelectedItems(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const filteredNonModerators = nonModerators.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMembers = friendsData.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderHeader = () => (
    <View>
      <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.goBack()}>
        <SvgXml xml={Arrow} style={styles.arrow} />
      </TouchableOpacity>

      <View style={styles.profileContainer}>


        <View style={styles.userProfile}>
          <Text style={styles.title}>{userData.name}</Text>
          <Text style={styles.textBio}>{userData.bio}</Text>
          <View style={styles.tagsContainer}>
          </View>

          <View style={styles.eventTypeContainer}>
            <Text style={styles.eventTypeText}>3 Moderators</Text>
            <TouchableOpacity style={styles.selectionButton} onPress={() => setModalVisible(true)}>
              <Text style={styles.eventTypeSelection}>Select moderators</Text>
              <SvgXml xml={PopupMenuIndicator} />
            </TouchableOpacity>
          </View>

          <View style={styles.timeContent}>
            <SvgXml xml={Location} />
            <Text style={styles.textBio}>{userData.location}</Text>
          </View>

          <View style={styles.row}>

            <Text style={styles.title2}>{friendsData.length} Members</Text>

            <View style={styles.buttons}>
              <TouchableOpacity style={styles.selectButton}
                onPress={() => setSelected(!selected)}>
                <Text style={styles.textSelect}>Select</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('AddMembers')} style={[styles.addButton, { backgroundColor: '#345CA1' }]}>
                <Text style={styles.textAdd}>Add member</Text>
              </TouchableOpacity>
            </View>
          </View><TextInput
            style={styles.searchBar}
            placeholderTextColor="#3C3C434D"
            placeholder="Search"
            onChangeText={setSearchTerm}
            value={searchTerm}
          />
        </View>

      </View>
    </View>
  );

  return (
    <View style={styles.container}>

      <FlatList
        data={filteredMembers}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <FriendCardProfilePage
            photo={item.photo}
            name={item.name}
            moderator={item.moderator}
            available={item.available}
            selected={selected}
            selectedItem={selectedItems[item.id]}
            setSelectedItem={() => toggleSelectedItem(item.id)}
            id={'2ca14736-12a1-4ac1-8fba-bd639be71b1a'}
          />
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleRemoveFriend}
        onRequestClose={() => {
          setModalVisibleRemoveFriend(!modalVisibleRemoveFriend);
        }}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Remove member?</Text>
            <Text style={styles.modalText}>Are you sure you want to remove 2 members from Groove gurus ?</Text>
            <TouchableOpacity

              onPress={() => setModalVisibleRemoveFriend(!modalVisibleRemoveFriend)}>
              <Text style={styles.closeModalButton2}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity

              onPress={() => setModalVisibleRemoveFriend(!modalVisibleRemoveFriend)}>
              <Text style={styles.actionModalButton}>Remove friend</Text>
            </TouchableOpacity>
          </View>

        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={infoModalVisible}
        onRequestClose={() => { setModalVisible(!modalVisible) }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Moderator</Text>
            <Text style={styles.modalText}>A moderator had the following privileges : </Text>
            <Text style={styles.modalTopicText}>1. Add members</Text>
            <Text style={styles.modalTopicText}>2. Remove members</Text>
            <Text style={styles.modalTopicText}>3. Delete events</Text>

            <TouchableOpacity
              onPress={() => { setInfoModalVisible(false) }}
              style={styles.greenModalButton}>
              <Text style={styles.closeModalText2}>Ok, got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalBackground2}>
          <View style={styles.modalContainer2}>
            <View style={styles.header}>
              <View style={{ flexDirection: 'row', gap: 3, alignItems: 'center' }}>
                <Text style={styles.title2}>Moderator</Text>
                <TouchableOpacity style={styles.selectionButton} onPress={() => setInfoModalVisible(true)}>
                  <SvgXml xml={Info} />
                </TouchableOpacity>
              </View>

              <View style={styles.buttons}>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.selectButton2}>
                  <Text style={styles.textSelect2}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.closeModalButton}>
                  <Text style={styles.closeModalText}>Done</Text>
                </TouchableOpacity></View>
            </View>
            <TextInput
              style={styles.searchBar}
              placeholder="Search"
              placeholderTextColor="#3C3C434D"
              onChangeText={setSearchTerm}
              value={searchTerm}
            />
            <SelectedMember selectedItems={selectedItems} toggleSelectedItem={toggleSelectedItem} />
            <FlatList
              data={filteredNonModerators}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <FriendCardProfilePage
                  color={'#F6F6F6'}
                  photo={item.photo}
                  name={item.name}
                  available={item.available}
                  selected={true}
                  moderator={item.moderator}
                  selectedItem={selectedItems[item.id]}
                  setSelectedItem={() => toggleSelectedItem(item.id)}
                  backgroundColor={'red'}
                  id={'2ca14736-12a1-4ac1-8fba-bd639be71b1a'}
                />
              )}
            />
          </View>
        </View>
      </Modal>

      {selected ? (
        <NavBarCircles
          setModalVisibleRemoveFriend={setModalVisibleRemoveFriend}
        />
      ) : (
        <NavBar profilePage={true} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    alignItems: 'flex-start'
  },
  tagText: {
    color: '#3C3C4399',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  tagsContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: 10,
    width: '100%',
  },
  tag: {
    backgroundColor: '#E7E7E8',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  profileContainer: {
    gap: 12,
    paddingHorizontal: 15,
    zIndex: 1,
  },
  header2: {
    flexDirection: 'row',
    gap: 10,
    position: 'absolute',
    top: 40,
    left: 20,
    justifyContent: 'flex-start'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  timeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 16,
    marginBottom: 26
  },
  selectedPhotosContainer: {
    flexDirection: 'row'
  },
  selectedPhoto: {
    width: 30,
    height: 30,
    borderRadius: 50
  },
  profilePhoto: {
    backgroundColor: '#0A1D4159',
    flexDirection: 'row',
    width: '100%',
    padding: 12,
    marginTop: 325,
    paddingBottom: 14.05,
    gap: 8.43,
    borderRadius: 20,
    alignSelf: 'center',
    zIndex: 3,
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  backgroundImage: {
    width: '100%',
    height: 400,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'absolute',
    top: 0,
    zIndex: 2,
  },
  searchBar: {
    backgroundColor: '#EDEDED',
    height: 40,
    width: '92%',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginVertical: 15,
    margin: 'auto'
  },
  mainPhotoLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  adminText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  userProfile: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16
  },
  textBio: {
    fontSize: 16,
    color: '#494949',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D2D2D',
  },
  title2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D2D2D',
  },
  secondList: {
    padding: 16,
    gap: 20,
    paddingBottom: 140
  },
  settingsButton: {
    marginTop: 50,
    left: 16,
    marginBottom: 16,
  },
  selectButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: '#E7E7E8'
  },
  textSelect: {
    fontSize: 14,
    color: '#3C3C4399',
  },
  selectButton2: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white'
  },
  textSelect2: {
    fontSize: 14,
    color: '#2d2d2d',
  },
  arrow: {
    transform: [{ rotate: '180deg' }]
  },
  selectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
  },
  addButton: {
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAdd: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  selectButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 16,
    backgroundColor: '#E7E7E8'
  },
  textSelect: {
    fontSize: 14,
    color: '#3C3C4399',
  },
  buttons: {
    flexDirection: 'row',
    gap: 10
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
    fontSize: 20
  },
  modalBackground2: {
    backgroundColor: '#00000066',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  modalContainer2: {
    backgroundColor: '#f6f6f6',
    justifyContent: 'center',
    width: '100%',
    height: '90%',
    borderRadius: 20,
    paddingTop: 16,
  },
  modalBackground: {
    backgroundColor: '#00000066',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: 'white',
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
  modalTopicText: {
    fontSize: 14,
    color: '#2D2D2D',
    paddingHorizontal: 16,
  },
  greenModalButton: {
    color: '#FF3333',
    backgroundColor: '#378461',
    marginTop: 10,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20
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
    color: '#2d2d2d',
    paddingVertical: 11,
    textAlign: 'center',
    borderTopColor: 'gray',
    borderTopWidth: 0.5,
  },
  closeModalButton2: {
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
  eventTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderTopColor: '#C7C8C8',
    borderTopWidth: 0.25,
    borderBottomColor: '#C7C8C8',
    borderBottomWidth: 0.25,
    padding: 16,
  },
  eventTypeSelection: {
    fontSize: 16,
    color: '#3C3C4399',
  },
  eventTypeText: {
    fontSize: 17,
    color: 'black',
  },
  closeModalButton: {
    backgroundColor: '#49A078',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  closeModalText: {
    color: 'white',
    fontSize: 16,
  },
  closeModalText2: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    padding: 11
  },
});

export default ManageMembers;