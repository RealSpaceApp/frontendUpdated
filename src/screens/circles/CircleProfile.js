import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Modal, Alert, TextInput } from 'react-native';
import NavBar from '../../components/navbar/NavBar';
import { themes } from '../profile/Themes2';
import FriendCardProfilePage from '../../components/profile/FriendCardProfilePage';
import friendsData from '../friends/FriendsList';
import { LinearGradient } from 'react-native-linear-gradient';
import { SvgXml } from 'react-native-svg';
import WhiteArrow from '../../../assets/onboarding/WhiteArrow';
import Settings from '../../../assets/circles/Settings';
import Location from '../../../assets/events/Location';
import EventsCard from '../../components/events/cards/EventsCard';
import { Dropdown } from 'react-native-element-dropdown';
import { useRoute, useNavigation } from '@react-navigation/native';
import axiosInstance from '../../config/AxiosInstance';

const LandingPageProfile = () => {
  const route = useRoute();
  const { id } = route.params;
  const navigation = useNavigation();
  const [selected, setSelected] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [eventType, setEventType] = useState('Public');
  const [showSettingsOptions, setShowSettingsOptions] = useState(false);
  const [userData] = useState({
    theme: 'Blue03',
    location: 'Florida, USA'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [circleData, setCircleData] = useState(null);

  const dropdownRef = useRef(null);

  const fetchCircleData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/circles/${id}`);

      if (response.status === 202) {
        setCircleData(response.data);
      } else {
        console.warn('Failed to fetch circle data');
      }
    } catch (error) {
      console.error('Error fetching circle data:', error);
      Alert.alert('Error', 'Failed to fetch circle data. Please try again later.');
    }
  }, [id]);

  useEffect(() => {
    fetchCircleData();
  }, [fetchCircleData]);

  const filteredMembers = friendsData.slice(0, 6).filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const theme = themes[userData.theme];
  const tags = ["Book_club", "Fantasy", "Society"];

  const toggleSelectedItem = (id) => {
    setSelectedItems(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const deleteCircle = async () => {
    try {
      const response = await axiosInstance.post(`/circles/${id}/delete`);

      if (response.status === 202) {
        Alert.alert('Success', 'Circle deleted successfully.');
        navigation.goBack(); // Go back to the previous screen
      } else {
        console.warn('Failed to delete circle');
      }
    } catch (error) {
      console.error('Error deleting circle:', error);
      Alert.alert('Error', 'Failed to delete circle. Please try again later.');
    }
  };

  const leaveCircle = async () => {
    try {
      const response = await axiosInstance.post(`/circles/${id}/leave`, {}, {
        headers: {
          Cookie: cookie || '',
        },
      });

      if (response.status === 202) {
        Alert.alert('Success', 'You have left the circle.');
        navigation.goBack(); // Go back to the previous screen
      } else {
        console.warn('Failed to leave circle');
      }
    } catch (error) {
      console.error('Error leaving circle:', error);
      Alert.alert('Error', 'Failed to leave circle. Please try again later.');
    }
  };

  if (!circleData) {
    return (
      <View style={styles.container}>
      </View>
    );
  }

  const handleEventTypeChange = (type) => {
    setEventType(type);
    setShowSettingsOptions(false);
  };

  const renderHeader = () => (
    <View>
      {circleData.photo === "" ? <Image source={circleData.photo} style={styles.backgroundImage2} /> :
        <Image source={circleData.photo} style={styles.backgroundImage} />}

      <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.goBack()}>
        <SvgXml xml={WhiteArrow} style={styles.arrow} />
      </TouchableOpacity>
      <View style={styles.profilePhoto}>
        <Image source={friendsData[4].photo} style={styles.photo} />
        <View>
          <Text style={styles.adminText}>Admin</Text>
          <Text style={styles.mainPhotoLabel}>{friendsData[4].name}</Text>
        </View>
        <TouchableOpacity
          style={styles.settings}
          onPress={() => setShowSettingsOptions(!showSettingsOptions)}
        >
          <SvgXml xml={Settings} />
        </TouchableOpacity>
      </View>
      <LinearGradient
        colors={[theme.backgroundColor, theme.backgroundColor2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.profileContainer}
      >
        <View style={styles.userProfile}>
          <Text style={styles.title}>{circleData.name}</Text>
          <Text style={styles.textBio}>{circleData.description}</Text>
          <View style={styles.tagsContainer}>
            {tags.map((tag, index) => (
              <TouchableOpacity key={index} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {userData.location && (
            <View style={styles.timeContent}>
              <SvgXml xml={Location} />
              <Text style={styles.textBio}>{userData.location}</Text>
            </View>
          )}
          <Text style={styles.title2}>{friendsData.length} Members</Text>
        </View>
      </LinearGradient>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      {friendsData.length > 6 && (
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.seeMoreButton}>
          <Text style={styles.seeMoreText}>See More</Text>
        </TouchableOpacity>
      )}
      <View style={styles.secondList}>
        <Text style={styles.title2}>Events</Text>
        <FlatList
          data={circleData.events} // Assuming circleData has an events property
          keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
          renderItem={renderEventCard}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </View>
  );


  const renderEventCard = ({ item }) => (
    <EventsCard
      attending={'attend'}
      creator={false}
      name={'Creator name'}
      photo={require('../../../assets/pictures/photo7.png')}
      eventId={item.id}
      addNotes={true}
      eventTitle={item.title}
      time={new Date(item.start_time).toLocaleString()}
      location={item.location}
      text={item.description}
      style={styles.eventCard}
    />
  );

  const dropdownData = [
    { label: 'Manage members', value: 'ManageMembers' },
    { label: 'Circle settings', value: 'CircleSettings' },
    { label: 'Edit circle', value: 'CreateCircle' },
    { label: 'Leave circle', value: 'CreateEvent', textStyle: styles.optionTextRed }
  ];

  const handleDropdownChange = (item) => {
    if (item.value === 'ManageMembers') {
      navigation.navigate('ManageMembers', { id });
    } else if (item.label === 'Edit circle') {
      navigation.navigate('CreateCircle', { id });
    }
    else {
      navigation.navigate(item.value);
    }
  };


  return (
    <View style={styles.container}>
      <FlatList
        data={friendsData.slice(0, 6)}
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

      {showSettingsOptions && (
        <Dropdown
          style={styles.dropdown}
          data={dropdownData}
          labelField="label"
          valueField="value"
          onChange={handleDropdownChange}
        />
      )}


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <Text style={styles.title2}>{friendsData.length} Members</Text>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.closeModalButton}>
                <Text style={styles.closeModalText}>Done</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.searchBar}
              placeholder="Search"
              onChangeText={setSearchTerm}
              value={searchTerm}
            />
            <FlatList
              data={filteredMembers}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <FriendCardProfilePage
                  photo={item.photo}
                  name={item.name}
                  available={item.available}
                  selected={selected}
                  moderator={item.moderator}
                  selectedItem={selectedItems[item.id]}
                  setSelectedItem={() => toggleSelectedItem(item.id)}
                  id={'2ca14736-12a1-4ac1-8fba-bd639be71b1a'}
                />
              )}
            />
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
  tagText: {
    color: '#3C3C4399',
    fontSize: 14,
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
    paddingTop: 80,
    zIndex: 1,
    marginTop: -55,
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
    marginTop: 20
  },
  timeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 16,
    marginBottom: 26
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
  backgroundImage2: {
    width: '100%',
    height: 400,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'absolute',
    top: 0,
    zIndex: 2,
    backgroundColor: 'white'
  },
  searchBar: {
    backgroundColor: '#7676801F',
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginVertical: 15,
  },
  mainPhotoLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  settings: {
    position: 'absolute',
    right: 16,
    top: 25
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
  bottom: {
    height: 180,
    width: '100%',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    height: '80%',
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
  secondList: {
    padding: 16,
    gap: 20,
    paddingBottom: 140
  },
  seeMoreButton: {
    padding: 10,
    paddingLeft: 16,
    marginHorizontal: 16,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  seeMoreText: {
    fontSize: 16,
    color: '#007AFF',
  },
  settingsButton: {
    position: 'absolute',
    top: 30,
    left: 16,
    zIndex: 2,
    transform: [{ rotate: '180deg' }]
  },
  dropdown: {
    position: 'absolute',
    top: '48%',
    left: '50%',
    width: '40%',
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
  optionText: {
    fontSize: 17,
    color: 'black',
  },
  optionTextRed: {
    fontSize: 17,
    color: '#FF453A',
  },
});

export default LandingPageProfile;
