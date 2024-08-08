import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, TextInput, Modal } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavBar from '../../components/navbar/NavBar';
import NavBarFriends from '../../components/navbar/NavBarFriends';
import { themes } from './Themes2';
import FriendCardProfilePage from '../../components/profile/FriendCardProfilePage';
import friendsData from '../friends/FriendsList';
import { LinearGradient } from 'react-native-linear-gradient';
import Search from '../../../assets/events/Search';
import { SvgXml } from 'react-native-svg';
import { useFocusEffect } from '@react-navigation/native';
import SettingsIcon from '../../../assets/profile/SettingsIcon'
import axiosInstance from '../../config/AxiosInstance';

const LandingPageProfile = ({ navigation }) => {
  const [selected, setSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});

  const [userData, setUserData] = useState({
    name: '',
    bio: '',
    birthday: '',
    email: '',
    number: '',
    photo: '',
    theme: 'Blue01',
    events_attended: ''
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/user/profile/`);
      console.debug('LandingPageProfile Profile Response:', response.data);

      setUserData({
        name: response.data.name,
        bio: response.data.about,
        birthday: response.data.birthday,
        email: response.data.email,
        number: response.data.phone || '',
        photo: response.data.avatar || '../../../assets/pictures/photo2.png',
        theme: 'Blue01',
        events_attended: response.events_attended
      });
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  }, []);

  const fetchFriends = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/friends/`);
      console.debug('friends list', response.data);

      setFriendsData(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
      fetchFriends();
    }, [fetchData, fetchFriends])
  );
  const theme = themes[userData.theme];
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisibleMuteCalls, setModalVisibleMuteCalls] = useState(false);
  const [modalVisibleRemoveFriend, setModalVisibleRemoveFriend] = useState(false);
  const [modalVisibleMuteEvents, setModalVisibleMuteEvents] = useState(false);

  const toggleSelectedItem = useCallback((id) => {
    setSelectedItems(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  }, []);


  const handleFriendProfile = () => {
    const id = '2ca14736-12a1-4ac1-8fba-bd639be71b1a';
    navigation.navigate('FriendsPageProfile', { id });
  };

  const filteredFriendsData = friendsData.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderHeader = () => (
    <View>
      <Image source={theme.backgroundImage} style={styles.backgroundImage} />
      <View style={styles.header2}>
        <TouchableOpacity style={[styles.editButton, { backgroundColor: theme.buttonColor3 }]}
          onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.textEdit}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.settingsButton, { backgroundColor: theme.buttonColor3 }]}
          onPress={() => navigation.navigate('ProfileSettings')}>
          <SvgXml xml={SettingsIcon} style={styles.textEdit} />
        </TouchableOpacity>
      </View>
      <View style={styles.profilePhoto}>
        <Image source={{ uri: userData.photo }} style={styles.photo} />
        <Text style={styles.mainPhotoLabel}>{userData.name}</Text>
      </View>
      <LinearGradient
        colors={[theme.backgroundColor, theme.backgroundColor2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.profileContainer}
      >
        <View style={styles.userProfile}>
          <Text style={styles.textBio}>{userData.bio}</Text>
          <View style={styles.divisor}></View>
          <View style={styles.secondRow}>
            <View style={styles.userInfo}>
              <Text style={styles.text}>{new Date(userData.birthday).toLocaleDateString()}</Text>
              <Text style={styles.label}>Birthday</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.text}>12</Text>
              <Text style={styles.label}>Events attended</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.friendsContainer}>
        <View style={styles.friendsHeader}>
          <View>
            <Text style={styles.title}>{friendsData.length} Friends</Text>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.selectButton}
              onPress={() => setSelected(!selected)}>
              <Text style={styles.textSelect}>Select</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.addButton, { backgroundColor: theme.buttonColor2 }]}>
              <Text style={styles.textAdd}>Add a friend</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.searchBar}>
          <SvgXml xml={Search} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#3C3C434D"
            onChangeText={setSearchTerm}
            value={searchTerm}
          />
          <FontAwesome name="microphone" size={20} color="#000" style={styles.microphoneIcon} />
        </View>
      </View>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.bottom}></View>
  );

  return (
    <View style={styles.container}>

      <FlatList
        data={filteredFriendsData}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        renderItem={({ item }) => (
          <FriendCardProfilePage
            photo={item.photo}
            name={item.name}
            available={item.available}
            selected={selected}
            selectedItem={selectedItems[item.id]}
            setSelectedItem={() => toggleSelectedItem(item.id)}
            id={'2ca14736-12a1-4ac1-8fba-bd639be71b1a'}
          />
        )}
      />
      {selected ? (
        <NavBarFriends
          setModalVisibleMuteCalls={setModalVisibleMuteCalls}
          setModalVisibleRemoveFriend={setModalVisibleRemoveFriend}
          setModalVisibleMuteEvents={setModalVisibleMuteEvents}
        />
      ) : (
        <NavBar profilePage={true} />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleMuteCalls}
        onRequestClose={() => {
          setModalVisibleMuteCalls(!modalVisibleMuteCalls);
        }}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Mute calls?</Text>
            <Text style={styles.modalText}>You will no longer see their calls.</Text>
            <TouchableOpacity

              onPress={() => setModalVisibleMuteCalls(!modalVisibleMuteCalls)}>
              <Text style={styles.closeModalButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity

              onPress={() => setModalVisibleMuteCalls(!modalVisibleMuteCalls)}>
              <Text style={styles.actionModalButton2}>Remove friend</Text>
            </TouchableOpacity>
          </View>

        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleRemoveFriend}
        onRequestClose={() => {
          setModalVisibleRemoveFriend(!modalVisibleRemoveFriend);
        }}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Remove friend?</Text>
            <Text style={styles.modalText}>Once removed you’ll have to meet them again to add them as a friend.</Text>
            <TouchableOpacity

              onPress={() => setModalVisibleRemoveFriend(!modalVisibleRemoveFriend)}>
              <Text style={styles.closeModalButton}>Cancel</Text>
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
        visible={modalVisibleMuteEvents}
        onRequestClose={() => {
          setModalVisibleMuteEvents(!modalVisibleMuteEvents);
        }}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Mute Events?</Text>
            <Text style={styles.modalText}>You will no longer see their events.</Text>
            <TouchableOpacity
              onPress={() => setModalVisibleMuteEvents(!modalVisibleMuteEvents)}>
              <Text style={styles.closeModalButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisibleMuteEvents(!modalVisibleMuteEvents)}>
              <Text style={styles.actionModalButton2}>Mute friend</Text>
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
    backgroundColor: '#F6F6F6',
  },
  returnButton: {
    position: 'absolute',
    top: 40,
    left: 27,
  },
  profileContainer: {
    gap: 12,
    paddingHorizontal: 15,
    paddingTop: 80,
    zIndex: 1,
    marginTop: -55,
  },
  header: {
    flexDirection: 'row',
    gap: 5
  },
  header2: {
    flexDirection: 'row',
    gap: 10,
    position: 'absolute',
    top: 40,
    right: 27,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10
  },
  eventCard2: {
    marginVertical: 16,
    elevation: 5,
    shadowColor: '#4E4E4E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  profilePhoto: {
    backgroundColor: '#FFFFFF',
    width: 156.86,
    Height: 191.9,
    padding: 8.43,
    marginTop: 250,
    paddingBottom: 14.05,
    gap: 8.43,
    borderRadius: 12,
    alignSelf: 'center',
    elevation: 60,
    zIndex: 3,
  },
  photo: {
    width: 140,
    height: 140,
    borderRadius: 4,
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
  mainPhotoLabel: {
    alignSelf: 'center',
    color: '#494949',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userProfile: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#494949',
  },
  text: {
    fontSize: 16,
    marginLeft: 4,
    color: '#494949',
  },
  textBio: {
    fontSize: 16,
    marginLeft: 4,
    color: '#494949',
    paddingHorizontal: 15
  },
  button: {
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 19.5,
  },
  friendsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D2D2D',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D2D2D',
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondRow: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginHorizontal: 24,
    marginTop: 16
  },
  divisor: {
    backgroundColor: '#E2DEE9',
    width: '100%',
    height: 0.5,
    marginTop: 16,
  },
  searchBar: {
    width: '100%',
    backgroundColor: '#7676801F',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    marginLeft: 5,
    color: '#2d2d2d',
  },
  searchIcon: {
    marginLeft: 10,
    color: '#3C3C4399'
  },
  microphoneIcon: {
    marginRight: 10,
    color: '#3C3C4399'
  },
  addButton: {
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 10,
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
    paddingHorizontal: 10,
    backgroundColor: '#E7E7E8'
  },
  textSelect: {
    fontSize: 14,
    color: '#3C3C4399',
  },
  friendsContainer: {
    marginTop: 20,
    flex: 1,
    paddingHorizontal: 15,
  },
  editButton: {
    borderRadius: 20,
    padding: 7,
    width: 76,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  settingsButton: {
    borderRadius: 50,
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  textEdit: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  bottom: {
    height: 100,
    width: '100%',
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

export default LandingPageProfile;