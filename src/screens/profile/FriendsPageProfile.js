import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, TextInput, Modal } from 'react-native';
import { AntDesign, FontAwesome } from 'react-native-vector-icons';
import NavBar from '../../components/navbar/NavBar';
import { themes } from './Themes2';
import FriendCardProfilePage from '../../components/profile/FriendCardProfilePage';
import friendsData from '../friends/FriendsList';
import { LinearGradient } from 'react-native-linear-gradient';
import CloseButton from '../../../assets/onboarding/CloseButton';
import { SvgXml } from 'react-native-svg';
import ActionButtonGreen from '../../components/events/ActionButtonGreen';
import ScheduleCard from '../../components/profile/ScheduleCard';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../../config/AxiosInstance';

const scheduleData = [
  {
    id: 1,
    title: "Morning",
    time: "10:00 - 10:30 AM",
    text: "I usually travel on public transport to my work, so you can call me then"
  },
  {
    id: 2,
    title: "Afternoon",
    time: "03:00 - 05:30 PM",
    text: "My work is done usually at around 3, thats a good time to chill !  "
  },
  {
    id: 3,
    title: "Night",
    time: "10:00 PM",
    text: "I’m available for calls after 10 pm"
  },
];

const LandingPageProfile = ({ id }) => {
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
  });

  const navigation = useNavigation();

  const fetchData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/user/profile/${id}`);
      console.debug('LandingPageProfile Profile Response:', response.data);

      setUserData({
        name: response.data.name,
        bio: response.data.about,
        birthday: response.data.birthday,
        email: response.data.email,
        number: response.data.phone || '',
        photo: response.data.avatar || '../../../assets/pictures/photo2.png',
        theme: 'Blue01',
      });
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const theme = themes[userData.theme];
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const filteredFriends = friendsData.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelectedItem = (id) => {
    setSelectedItems(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const renderHeader = () => (
    <View>
      <Image source={theme.backgroundImage} style={styles.backgroundImage} />
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
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.buttonColor }]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Call Schedule</Text>
        </TouchableOpacity>
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
          <AntDesign name="search1" size={20} color="#000" style={styles.searchIcon} />
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
        data={filteredFriends}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        renderItem={({ item, index }) => (
          <FriendCardProfilePage
            photo={item.photo}
            name={item.name}
            available={item.available}
            selected={selected}
            selectedItem={selectedItems[item.id]}
            setSelectedItem={() => toggleSelectedItem(item.id)}
            onPress={() => navigation.navigate('ProfileSettings')}
          />
        )}
      />
      <NavBar profilePage={true} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modalTitle}>Call schedule</Text>
              <SvgXml xml={CloseButton} onPress={() => setModalVisible(false)} />
            </View>
            <View style={styles.header}>
              <Text style={styles.modalText}>Time right now:</Text>
              <Text style={styles.timeText}>03:25 PM</Text>
            </View>
            <FlatList
              data={scheduleData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ScheduleCard
                  title={item.title}
                  time={item.time}
                  text={item.text}
                  style={styles.eventCard2}
                />
              )}
            />
            <ActionButtonGreen color={theme.buttonColor2} content={'Call'} onPress={() => setModalVisible(false)} />
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
    height: 80,
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
    fontSize: 20,
    color: '#2d2d2d',
  },
  modalView: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    height: '90%',
    justifyContent: 'flex-start',
  },
  modalTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
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