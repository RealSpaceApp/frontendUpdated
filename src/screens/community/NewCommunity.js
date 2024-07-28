import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Alert } from 'react-native';
import axios from 'axios';
import NavBar from '../../components/navbar/NavBar';

const NewCommunity = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');

  const hostCommunity = async () => {
    try {
      const response = await axios.post('http://172.21.192.1:8080/community/register', {
        name: title,
        description: description,
        email: email,
      });

      if (response.status === 201 || response.status === 202) {
        Alert.alert('Community hosted successfully!');
        navigation.navigate('LandingPageCommunity');
      } else {
        Alert.alert('Failed to host community. Please try again.');
      }
    } catch (error) {
      console.error('Error hosting community:', error);
      Alert.alert('Failed to host community. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>New Community</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('LandingPageCommunity')}>
            <Text style={styles.headerButtonText}>Discard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={hostCommunity}>
            <Text style={styles.headerButtonText}>Host</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.header2}>
        {/* Inputs */}
        <TextInput
          style={styles.inputTitle}
          placeholder="Enter Community name"
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Description"
          multiline
          numberOfLines={6}
          value={description}
          onChangeText={text => setDescription(text)}
        />
        <Text style={styles.eventTypeText}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
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
  header: {
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
    flex: 1
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
  eventTypeText: {
    fontSize: 17,
    color: 'black',
    marginLeft: 16,
    marginBottom: 10,
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
    textAlignVertical: 'top',
    marginHorizontal: 16,
  },
  inputTitle: {
    fontSize: 20,
    padding: 20,
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
  },
});

export default NewCommunity;