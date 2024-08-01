import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Image, Modal } from 'react-native';
import EventsCard from '../../components/events/cards/EventsCard';
import CircleSelection from './CircleSelection';
import { friendEventData, friendsData } from './mockedData';

const CircleEvents = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.circlesContainer}>
          <Image source={require('../../../assets/pictures/photo5.png')} style={[styles.circle, styles.circle1]} />
          <Image source={require('../../../assets/pictures/photo6.png')} style={[styles.circle, styles.circle2]} />
          <Image source={require('../../../assets/pictures/photo7.png')} style={[styles.circle, styles.circle3]} />
        </View>
        <TouchableOpacity onPress={openModal} style={styles.button}>
          <Text style={styles.buttonText}>All Circles</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={friendEventData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <EventsCard
            attending={item.attending}
            addNotes={item.addNotes}
            creator={item.creator}
            photo={item.photo}
            name={item.name}
            eventTitle={item.eventTitle}
            time={item.time}
            location={item.location}
            text={item.text}
            style={styles.eventCard}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <CircleSelection onClose={closeModal} circles={friendsData} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  circlesContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  circle1: {
    zIndex: 3,
  },
  circle2: {
    marginLeft: -10,
    zIndex: 2,
  },
  circle3: {
    marginLeft: -10,
    zIndex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d2d2d',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#378461',
    borderRadius: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  separator: {
    height: 16,
  },
  eventCard: {
    marginVertical: 16,
    elevation: 5,
    shadowColor: '#4E4E4E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default CircleEvents;