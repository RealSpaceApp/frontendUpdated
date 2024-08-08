import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Image, Modal, Alert } from 'react-native';
import { SvgXml } from 'react-native-svg';
import LocationModal from '../../components/events/modals/LocationModal';
import TimezoneModal from '../../components/events/modals/TimezoneModal';
import PopupMenuIndicator from '../../../assets/events/PopupMenuIndicator';
import CoverPhoto from '../../../assets/circles/CoverPhoto';
import * as ImagePicker from 'react-native-image-picker';
import FormData from 'form-data';
import photo from '../../../assets/pictures/photo3.png';
import BgPhoto from '../../../assets/pictures/interest2.jpg';
import Navbar from '../../components/navbar/NavBar';
import axiosInstance from '../../config/AxiosInstance';

const CreateCircle = ({ navigation, route }) => {
  const { id } = route.params || {};
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [timezoneModalVisible, setTimezoneModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImageURI, setSelectedImageURI] = useState(null);
  const [location, setLocation] = useState('');
  const [gradient, setGradient] = useState('');
  const [tags, setTags] = useState(["Book_club", "Fantasy", "Society"]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const predefinedTags = ["Book_club", "Fantasy", "Society"];

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

  useEffect(() => {
    console.log(id)
    if (id) {
      const fetchEventDetails = async () => {
        try {

          const response = await axiosInstance.get(`/circles/${id}`);

          if (response.status === 202) {
            const event = response.data;
            event.name && setTitle(event.name);
            event.description && setDescription(event.description);
            event.location && setLocation(event.location);
            event.tags && setTags(event.tags);
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
  }, [id]);

  const handleCreateCircle = async () => {
    try {
      const formData = new FormData();
      formData.append('name', title);
      formData.append('description', description);
      formData.append('location', location);
      formData.append('gradient', gradient);
      formData.append('tags', JSON.stringify(tags));

      if (selectedImageURI) {
        const uriParts = selectedImageURI.split('.');
        const fileType = uriParts[uriParts.length - 1];
        const mimeType = fileType === 'jpg' ? 'image/jpeg' : 'image/png';

        formData.append('photo', {
          uri: selectedImageURI,
          name: `photo.${fileType}`,
          type: mimeType,
        });
      }

      let response;
      if (id) {
        // Update existing circle
        response = await axiosInstance.post(`/circles/${id}/update`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // Create new circle
        response = await axiosInstance.post('/circles/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      if (response.status === 202 || response.status === 201) {
        console.log('Success', 'Circle created/updated successfully!', response);
        navigation.goBack();
      } else {
        console.log('Error', 'Failed to create/update circle. Please try again later.');
      }
    } catch (error) {
      console.error('Error creating/updating circle:', error);
      Alert.alert('Error', 'Failed to create/update circle. Please try again later.');
    }
  };

  const handleImageSelection = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setSelectedImageURI(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>New Circle</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
            <Text style={styles.headerButtonText}>Discard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleCreateCircle}>
            <Text style={styles.headerButtonText}>{id ? 'Update' : 'Create'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.header2}>
        <View style={styles.row}>
          <TouchableOpacity onPress={handleImageSelection}>
            {selectedImageURI ? (
              <Image source={{ uri: selectedImageURI }} style={styles.coverPhoto} />
            ) : (
              <SvgXml xml={CoverPhoto} style={styles.coverPhoto} />
            )}
          </TouchableOpacity>
          <TextInput
            style={styles.inputTitle}
            placeholderTextColor="#3C3C434D"
            placeholder="Circle Name"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter Description"
          placeholderTextColor="#3C3C434D"
          multiline
          numberOfLines={6}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />

        <View style={styles.eventTypeContainer}>
          <Text style={styles.eventTypeText}>Location</Text>
          <TouchableOpacity style={styles.selectionButton} onPress={toggleLocationModal}>
            <Text style={styles.eventTypeSelection}>Add location</Text>
            <SvgXml xml={PopupMenuIndicator} />
          </TouchableOpacity>
        </View>

        <View style={styles.eventTypeContainer}>
          <Text style={styles.eventTypeText}>Select gradient</Text>
          <TouchableOpacity style={styles.selectionButton}>
            <SvgXml xml={PopupMenuIndicator} />
          </TouchableOpacity>
        </View>

        <View style={styles.eventTypeContainer}>
          <Text style={styles.eventTypeText}>Tag</Text>
          <TouchableOpacity style={styles.selectionButton} onPress={toggleTimezoneModal}>
            <Text style={styles.eventTypeSelection}>Select tags</Text>
            <SvgXml xml={PopupMenuIndicator} />
          </TouchableOpacity>
        </View>

        <View style={styles.tagsContainer}>
          {predefinedTags.map((tag, index) => (
            <TouchableOpacity key={index} style={styles.tag} onPress={() => setTags([...tags, tag])}>
              <Text style={styles.tagText}>#{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <LocationModal visible={locationModalVisible} onClose={closeLocationModal} />
        <TimezoneModal visible={timezoneModalVisible} onClose={closeTimezoneModal} />
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CircleProfilePreview', {
          title,
          description,
          selectedImageURI,
          location,
          gradient,
          tags
        })}
      >
        <Text style={styles.textAdd}>Preview profile</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={BgPhoto} style={styles.BgPhoto} />
            <Image source={photo} style={styles.photo} />
            <Text style={styles.title}>Circle Name</Text>
            <Text style={styles.textBio}>Your circle is now LIVE !! you need to have people near you to add them as a member</Text>
            <TouchableOpacity style={styles.textCenter} onPress={() => navigation.navigate('Explore')}>
              <Text style={styles.textAdd}>Explore more circles</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
    backgroundColor: '#F6F6F6',
  },
  coverPhoto: {
    width: 60,
    height: 60,
    borderRadius: 20
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
  textBio: {
    fontSize: 16,
    color: '#3C3C4399',
    textAlign: 'center',
    marginHorizontal: 10
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
  addButton: {
    position: 'absolute',
    bottom: 111,
    right: 16,
    backgroundColor: '#378461',
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 40,
  },
  textAdd: {
    color: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    margin: 16
  },
  tagText: {
    color: '#3C3C4399',
    fontSize: 14,
  },
  tagsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: 10,
    width: '100%',
    paddingHorizontal: 16,
    flex: 1,
    height: '100%'
  },
  tag: {
    backgroundColor: '#E7E7E8',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  photo: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginTop: -30
  },
  BgPhoto: {
    width: '100%',
    height: '40%',
    borderRadius: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButton: {
    marginTop: 20,
    color: '#378461',
    fontWeight: 'bold',
  },
  whiteButton: {
    backgroundColor: 'white',
    borderColor: '#49A078',
    borderWidth: 1,
    width: '90%',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 20,
    marginTop: 10
  },
  greenButton: {
    backgroundColor: '#49A078',
    width: '100%',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 20,
    marginTop: 10
  }
});

export default CreateCircle;